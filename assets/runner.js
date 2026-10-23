/*
 * Python for B.Pharm — COREGENIX
 * The small Python program that runs a student's code safely inside Pyodide,
 * captures print() output, gives friendly error hints and runs the lesson check.
 */
const RUNNER_PY = String.raw`
import sys, io, json, traceback, contextlib

_HINTS = {
    "NameError": "Python could not find that name. Check the spelling (Python is case-sensitive) and make sure you created the variable first.",
    "SyntaxError": "Python could not understand this line. Look for a missing quote, bracket, colon (:) or a stray character.",
    "IndentationError": "Indentation (the spaces at the start of a line) is wrong. Lines inside if / for / while / def need 4 spaces.",
    "TabError": "Mixed tabs and spaces. Use 4 spaces for each indent.",
    "TypeError": "You are mixing types, for example text + number. Try int(), float() or an f-string.",
    "ZeroDivisionError": "You divided by zero. Check the value you are dividing by.",
    "ValueError": "The value has the right type but an unusable content, for example int('abc').",
    "KeyError": "That key is not in the dictionary. Check the spelling of the key.",
    "IndexError": "That position does not exist in the list. Remember counting starts at 0.",
    "AttributeError": "That object does not have that method or property. Check the spelling after the dot.",
    "TimeoutError": "Your code ran for too long. Is there a loop that never ends?",
}

def _make_tracer(limit):
    state = {"n": 0}
    def local(frame, event, arg):
        if event == "line":
            state["n"] += 1
            if state["n"] > limit:
                raise TimeoutError("Your code ran too long - is there a loop that never ends?")
        return local
    def glob(frame, event, arg):
        if frame.f_code.co_filename == "<your code>":
            return local
        return None
    return glob

def _describe(e):
    line = None
    if isinstance(e, SyntaxError):
        line = e.lineno
        text = type(e).__name__ + ": " + str(e.msg)
    else:
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "<your code>":
                line = fr.lineno
        text = type(e).__name__ + ": " + str(e)
    if line:
        text += "  (line " + str(line) + ")"
    return text, _HINTS.get(type(e).__name__, "")

def run_user(code, check=None):
    ns = {"__name__": "__main__"}
    out = io.StringIO()
    result = {"error": None, "hint": "", "output": "", "passed": None, "message": ""}
    tracer = _make_tracer(1500000)
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        try:
            compiled = compile(code, "<your code>", "exec")
            sys.settrace(tracer)
            try:
                exec(compiled, ns)
            finally:
                sys.settrace(None)
        except Exception as e:
            result["error"], result["hint"] = _describe(e)
    result["output"] = out.getvalue()

    if check and result["error"] is None:
        cns = dict(ns)
        cns["__output__"] = result["output"]
        cns["__code__"] = code
        try:
            sys.settrace(tracer)
            try:
                with contextlib.redirect_stdout(io.StringIO()):
                    exec(compile(check, "<check>", "exec"), cns)
            finally:
                sys.settrace(None)
            result["passed"] = True
        except AssertionError as e:
            result["passed"] = False
            result["message"] = str(e) or "Not quite - read the task again and compare with your output."
        except Exception as e:
            result["passed"] = False
            result["message"] = "Almost! Something is not ready yet - make sure every variable or function from the task exists and holds the right kind of value."
    elif check and result["error"] is not None:
        result["passed"] = False
        result["message"] = "Fix the error above first, then press Check again."
    return json.dumps(result)
`;

if (typeof module !== 'undefined') module.exports = { RUNNER_PY };

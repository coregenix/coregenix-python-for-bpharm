/*
 * Python for B.Pharm — COREGENIX
 * All lesson content lives here. To add a lesson, copy one block and edit it.
 *
 * Fields
 *   id        unique number
 *   level     0 = Beginner, 1 = Intermediate, 2 = Pharma Lab
 *   emoji     icon shown on the card
 *   title     lesson title
 *   intro     HTML explanation
 *   example   code the student can run and edit
 *   task      HTML description of the challenge
 *   starter   code the challenge editor starts with
 *   hint      shown when the student presses "Hint"
 *   solution  shown after 3 failed attempts
 *   check     Python that runs AFTER the student's code. It can use the student's
 *             variables/functions, plus __output__ (printed text) and __code__ (source).
 *             Use assert with a friendly message.
 *   quiz      [{ q, options[], answer (index), why }]
 */
const LEVELS = [
  { name: 'Beginner', blurb: 'Your first steps: print, variables, maths and text.' },
  { name: 'Intermediate', blurb: 'Make decisions, repeat work and organise data.' },
  { name: 'Pharma Lab', blurb: 'Real calculations from analysis, formulation and stability.' },
];

const LESSONS = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 1, level: 0, emoji: '👋', title: 'Hello, Pharmacy World',
    intro: `
      <p>Python is a programming language that reads almost like English. In pharmacy it is used for
      <b>dose calculations</b>, <b>assay and dissolution data</b>, <b>graphs</b>, <b>stability studies</b> and even <b>drug discovery</b>.</p>
      <p>The <code>print()</code> function shows a message on the screen. Text always goes inside quotation marks.</p>
      <div class="tip"><b>Comment:</b> a line that starts with <code>#</code> is a note for humans. Python ignores it.</div>`,
    example: String.raw`# This is a comment - Python ignores it
print("Hello, Pharmacy!")
print("Paracetamol 500 mg")
print("Tablets per strip:", 10)`,
    task: `Print the line <b>Welcome to Python for B.Pharm</b> on the screen.`,
    starter: String.raw`# write your code below
`,
    hint: `Put the text inside quotes and give it to print(), like print("Hello").`,
    solution: String.raw`print("Welcome to Python for B.Pharm")`,
    check: String.raw`assert "Welcome to Python for B.Pharm" in __output__, "Print exactly: Welcome to Python for B.Pharm (capital letters and dots matter)."`,
    quiz: [
      { q: 'Which function displays text on the screen?', options: ['show()', 'print()', 'display()', 'say()'], answer: 1, why: 'print() is the built-in function that writes to the output.' },
      { q: 'What does a line starting with # do?', options: ['Runs faster', 'Prints a hashtag', 'It is a comment that Python ignores', 'Causes an error'], answer: 2, why: 'Comments explain your code to humans; Python skips them.' },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 2, level: 0, emoji: '🏷️', title: 'Variables & Data Types',
    intro: `
      <p>A <b>variable</b> is like a labelled bottle on the shelf: the label is the name, the content is the value.</p>
      <ul>
        <li><code>str</code> – text, e.g. <code>"Aspirin"</code></li>
        <li><code>int</code> – whole numbers, e.g. <code>500</code></li>
        <li><code>float</code> – decimals, e.g. <code>1.5</code></li>
        <li><code>bool</code> – <code>True</code> or <code>False</code></li>
      </ul>
      <div class="tip">Names use letters, digits and underscores, and cannot start with a digit. Use clear names like <code>dose_mg</code>.</div>`,
    example: String.raw`drug_name = "Paracetamol"   # str   - text
strength_mg = 500           # int   - whole number
price = 1.5                 # float - decimal
is_otc = True               # bool  - True / False

print(drug_name, strength_mg, price, is_otc)
print(type(strength_mg))`,
    task: `Fill in the four variables for any drug you like: <code>drug_name</code> (text), <code>strength_mg</code> (whole number),
      <code>price_per_strip</code> (decimal) and <code>is_prescription</code> (True/False).`,
    starter: String.raw`drug_name = None
strength_mg = None
price_per_strip = None
is_prescription = None
`,
    hint: `Replace each None with a value of the right type. A decimal needs a point, e.g. 42.5. Booleans are written True or False without quotes.`,
    solution: String.raw`drug_name = "Cetirizine"
strength_mg = 10
price_per_strip = 28.5
is_prescription = False`,
    check: String.raw`assert isinstance(drug_name, str) and drug_name.strip() != "", "drug_name must be text, e.g. \"Cetirizine\"."
assert isinstance(strength_mg, int) and not isinstance(strength_mg, bool), "strength_mg must be a whole number (int)."
assert isinstance(price_per_strip, float), "price_per_strip must be a decimal (float), e.g. 28.5."
assert isinstance(is_prescription, bool), "is_prescription must be True or False."`,
    quiz: [
      { q: 'Which data type is the value 12.5?', options: ['int', 'str', 'float', 'bool'], answer: 2, why: 'Numbers with a decimal point are floats.' },
      { q: 'Which is a valid variable name?', options: ['2nd_dose', 'dose-mg', 'dose mg', 'dose_mg'], answer: 3, why: 'No spaces or hyphens, and it cannot start with a digit.' },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 3, level: 0, emoji: '🧮', title: 'Dose Maths with Operators',
    intro: `
      <p>Python is a powerful calculator. The basic operators:</p>
      <table class="mini">
        <tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
        <tr><td><code>+ -</code></td><td>add, subtract</td><td><code>5 - 2</code></td><td>3</td></tr>
        <tr><td><code>*</code></td><td>multiply</td><td><code>60 * 10</code></td><td>600</td></tr>
        <tr><td><code>/</code></td><td>divide (decimal)</td><td><code>7 / 2</code></td><td>3.5</td></tr>
        <tr><td><code>//</code></td><td>whole-number divide</td><td><code>7 // 2</code></td><td>3</td></tr>
        <tr><td><code>%</code></td><td>remainder</td><td><code>7 % 2</code></td><td>1</td></tr>
        <tr><td><code>**</code></td><td>power</td><td><code>2 ** 3</code></td><td>8</td></tr>
      </table>
      <p>Paediatric doses are often given as <b>mg per kg of body weight</b>: <code>dose = weight × mg_per_kg</code>.</p>`,
    example: String.raw`weight_kg = 60
dose_per_kg = 10            # mg/kg
total = weight_kg * dose_per_kg
print("Total dose:", total, "mg")

print(7 // 2, 7 % 2, 2 ** 3)   # 3 1 8`,
    task: `A child weighs <b>18 kg</b>. The dose is <b>15 mg/kg</b> and each tablet is <b>125 mg</b>.
      Calculate <code>total_dose_mg</code> and <code>tablets_needed</code> (total dose ÷ tablet strength).`,
    starter: String.raw`weight_kg = 18
dose_mg_per_kg = 15
tablet_strength_mg = 125

total_dose_mg = None      # weight x dose per kg
tablets_needed = None     # total dose / tablet strength

print(total_dose_mg, tablets_needed)`,
    hint: `total_dose_mg = weight_kg * dose_mg_per_kg, then divide that by tablet_strength_mg with /.`,
    solution: String.raw`weight_kg = 18
dose_mg_per_kg = 15
tablet_strength_mg = 125

total_dose_mg = weight_kg * dose_mg_per_kg
tablets_needed = total_dose_mg / tablet_strength_mg

print(total_dose_mg, tablets_needed)`,
    check: String.raw`assert total_dose_mg == 270, "total_dose_mg should be 18 x 15 = 270."
assert abs(tablets_needed - 2.16) < 0.01, "tablets_needed should be 270 / 125 = 2.16."`,
    quiz: [
      { q: 'What is 17 % 5?', options: ['3', '2', '3.4', '12'], answer: 1, why: '17 divided by 5 is 3 with remainder 2. The % operator gives the remainder.' },
      { q: 'Which expression gives 3.5?', options: ['7 // 2', '7 / 2', '7 % 2', '7 ** 2'], answer: 1, why: 'Single slash is normal (decimal) division.' },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 4, level: 0, emoji: '🏷️', title: 'Strings & Labels',
    intro: `
      <p>Text in Python is a <b>string</b>. The easiest way to mix text and values is an <b>f-string</b>:
      put an <code>f</code> before the quote and wrap variables in curly brackets.</p>
      <p>Useful string tools: <code>.upper()</code>, <code>.lower()</code>, <code>.replace(a, b)</code>, <code>len(text)</code>.</p>
      <div class="tip">Perfect for printing dispensing labels without typing numbers by hand.</div>`,
    example: String.raw`drug = "Amoxicillin"
strength = 500
label = f"{drug} {strength} mg"
print(label)
print(label.upper())
print(len(label), "characters")`,
    task: `Use an f-string to build <code>label</code> so that it equals <b>Amoxicillin 500 mg Capsule</b>.
      Then print the label in capital letters.`,
    starter: String.raw`drug = "Amoxicillin"
strength = 500
form = "Capsule"

label = None
`,
    hint: `label = f"{drug} {strength} mg {form}" - then print(label.upper()).`,
    solution: String.raw`drug = "Amoxicillin"
strength = 500
form = "Capsule"

label = f"{drug} {strength} mg {form}"
print(label.upper())`,
    check: String.raw`assert label == "Amoxicillin 500 mg Capsule", "label should be exactly: Amoxicillin 500 mg Capsule"
assert "AMOXICILLIN 500 MG CAPSULE" in __output__, "Print the label in capitals with print(label.upper())."`,
    quiz: [
      { q: 'If dose = 500, which line prints  Dose: 500 mg ?', options: ['print("Dose: {dose} mg")', 'print(f"Dose: {dose} mg")', 'print(f"Dose: dose mg")', 'print("Dose: " + dose + " mg")'], answer: 1, why: 'An f-string needs the leading f and curly brackets. The last option fails because you cannot add a number to text.' },
      { q: '"aspirin".upper() returns…', options: ['"Aspirin"', '"ASPIRIN"', '"aspirin"', '"ASPIRIN" and prints it'], answer: 1, why: 'upper() returns a new string in capital letters.' },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: 5, level: 1, emoji: '🗄️', title: 'Lists: Your Pharmacy Shelf',
    intro: `
      <p>A <b>list</b> keeps many values in order, like medicines on a shelf. Write it with square brackets.</p>
      <ul>
        <li><code>shelf[0]</code> – first item (counting starts at <b>0</b>)</li>
        <li><code>.append(x)</code> – add to the end</li>
        <li><code>.remove(x)</code> – take an item out</li>
        <li><code>.sort()</code> – A to Z</li>
        <li><code>len(shelf)</code> – how many items</li>
      </ul>`,
    example: String.raw`shelf = ["Paracetamol", "Ibuprofen", "Cetirizine"]
print(shelf[0])
shelf.append("Aspirin")
shelf.remove("Ibuprofen")
shelf.sort()
print(shelf, len(shelf))`,
    task: `Update the <code>stock</code> list: add <b>"Amoxicillin"</b>, remove <b>"Ibuprofen"</b>, sort it A to Z,
      and store the number of items in <code>total_items</code>.`,
    starter: String.raw`stock = ["Paracetamol", "Ibuprofen", "Cetirizine"]

# your code here

total_items = None
`,
    hint: `Use stock.append(...), stock.remove(...), stock.sort() and total_items = len(stock).`,
    solution: String.raw`stock = ["Paracetamol", "Ibuprofen", "Cetirizine"]

stock.append("Amoxicillin")
stock.remove("Ibuprofen")
stock.sort()

total_items = len(stock)`,
    check: String.raw`assert stock == ["Amoxicillin", "Cetirizine", "Paracetamol"], "stock should be sorted and contain Amoxicillin, Cetirizine, Paracetamol."
assert total_items == 3, "total_items should be 3 (use len(stock))."`,
    quiz: [
      { q: 'What is the index of the FIRST item in a list?', options: ['1', '0', '-1', 'first'], answer: 1, why: 'Python starts counting at 0.' },
      { q: 'Which method adds an item at the end of a list?', options: ['.add()', '.insert_end()', '.append()', '.push_back()'], answer: 2, why: 'append() adds one item to the end.' },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id: 6, level: 1, emoji: '🚦', title: 'Decisions: if / elif / else',
    intro: `
      <p>Programs can make decisions. Python runs the first block whose condition is <code>True</code>.
      Note the colon <code>:</code> and the <b>4-space indent</b>.</p>
      <p>Comparison operators: <code>==</code> equal, <code>!=</code> not equal, <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>. Combine with <code>and</code>, <code>or</code>, <code>not</code>.</p>
      <div class="tip">Use <code>==</code> to compare and a single <code>=</code> to store a value.</div>`,
    example: String.raw`dose_mg = 650
if dose_mg > 1000:
    print("Above single maximum - check with the doctor")
elif dose_mg >= 500:
    print("Normal adult dose")
else:
    print("Low dose")`,
    task: `Set <code>category</code> from the BMI: below 18.5 → <b>Underweight</b>, below 25 → <b>Normal</b>,
      below 30 → <b>Overweight</b>, otherwise <b>Obese</b>. Your code is also tested with other BMI values.`,
    starter: String.raw`bmi = 27.3
category = None

# write if / elif / else below
`,
    hint: `Start with: if bmi < 18.5: category = "Underweight" - then elif bmi < 25 ... and finish with else.`,
    solution: String.raw`bmi = 27.3
category = None

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"`,
    check: String.raw`import re
tests = [(17, "Underweight"), (18.5, "Normal"), (22, "Normal"), (24.9, "Normal"), (25, "Overweight"), (27.3, "Overweight"), (30, "Obese"), (33, "Obese")]
for value, expected in tests:
    src = re.sub(r"(?m)^bmi\s*=.*$", "bmi = " + str(value), __code__, count=1)
    ns2 = {}
    exec(src, ns2)
    assert ns2.get("category") == expected, "For bmi = " + str(value) + " the category should be " + expected + " but your code gave " + str(ns2.get("category")) + "."`,
    quiz: [
      { q: 'Which operator checks if two values are equal?', options: ['=', '==', '=>', 'is equal'], answer: 1, why: 'A single = stores a value; == compares.' },
      { q: 'In an if / elif / else chain, how many blocks run?', options: ['All of them', 'Only the first one whose condition is True (or else)', 'Always the last one', 'Two'], answer: 1, why: 'Python stops at the first condition that is True.' },
    ],
  },

  /* ------------------------------------------------------------------ 7 */
  {
    id: 7, level: 1, emoji: '🔁', title: 'Loops: Repeat Without Retyping',
    intro: `
      <p>A <b>for loop</b> repeats a block for each item or number. <code>range(1, 5)</code> gives 1, 2, 3, 4.</p>
      <p>A <b>while loop</b> repeats <i>while</i> a condition stays True - perfect for serial dilutions where you stop at a target.</p>
      <div class="tip">If a while-loop condition never becomes False, the program never ends. Always change something inside the loop.</div>`,
    example: String.raw`# Dose schedule - every 6 hours
for n in range(1, 5):
    hour = 6 * n
    print(f"Dose {n} due at {hour:02d}:00")

# While loop - keep halving
amount = 100
while amount > 10:
    amount = amount / 2
    print(amount)`,
    task: `Serial dilution: start with <code>concentration = 1000</code> µg/mL. Use a <b>while</b> loop that halves the concentration,
      adds 1 to <code>steps</code> and prints the new concentration each time. Stop when the concentration is <b>below 10</b>.`,
    starter: String.raw`concentration = 1000   # ug/mL
steps = 0

# repeat: halve, count the step, print
# stop when concentration is below 10
`,
    hint: `while concentration >= 10:  then  concentration = concentration / 2,  steps = steps + 1,  print(concentration).`,
    solution: String.raw`concentration = 1000   # ug/mL
steps = 0

while concentration >= 10:
    concentration = concentration / 2
    steps = steps + 1
    print(concentration)`,
    check: String.raw`assert steps == 7, "You should need 7 halvings (1000 -> 7.8125). You counted " + str(steps) + "."
assert abs(concentration - 7.8125) < 1e-9, "Final concentration should be 7.8125 ug/mL."
assert "7.8125" in __output__, "Print the concentration inside the loop so every step is shown."`,
    quiz: [
      { q: 'What does range(3) produce?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'], answer: 1, why: 'range(3) starts at 0 and stops before 3.' },
      { q: 'A while loop keeps running…', options: ['exactly once', 'while its condition is True', 'until you press Enter', 'for 10 rounds'], answer: 1, why: 'The condition is checked before every round.' },
    ],
  },

  /* ------------------------------------------------------------------ 8 */
  {
    id: 8, level: 1, emoji: '📖', title: 'Dictionaries: A Drug Database',
    intro: `
      <p>A <b>dictionary</b> stores data as <code>key: value</code> pairs - like a drug reference book where you look up a name to get details.</p>
      <ul>
        <li><code>db["paracetamol"]</code> – look up a value</li>
        <li><code>db["new"] = ...</code> – add or change an entry</li>
        <li><code>for name, info in db.items():</code> – loop through all</li>
      </ul>
      <p>Values can be anything - even another dictionary.</p>`,
    example: String.raw`drug_db = {
    "paracetamol": {"class": "Analgesic", "max_daily_mg": 4000},
    "cetirizine": {"class": "Antihistamine", "max_daily_mg": 10},
}
print(drug_db["paracetamol"]["class"])

for name, info in drug_db.items():
    print(name, "->", info["max_daily_mg"], "mg/day")`,
    task: `Add an entry <b>"ibuprofen"</b> with class <b>"NSAID"</b> and <code>max_daily_mg</code> <b>1200</b>.
      Then print the maximum daily dose of paracetamol by looking it up in the dictionary.`,
    starter: String.raw`drug_db = {
    "paracetamol": {"class": "Analgesic", "max_daily_mg": 4000},
    "cetirizine": {"class": "Antihistamine", "max_daily_mg": 10},
}

# add ibuprofen, then print the paracetamol maximum
`,
    hint: `drug_db["ibuprofen"] = {"class": "NSAID", "max_daily_mg": 1200}  and  print(drug_db["paracetamol"]["max_daily_mg"]).`,
    solution: String.raw`drug_db = {
    "paracetamol": {"class": "Analgesic", "max_daily_mg": 4000},
    "cetirizine": {"class": "Antihistamine", "max_daily_mg": 10},
}

drug_db["ibuprofen"] = {"class": "NSAID", "max_daily_mg": 1200}
print(drug_db["paracetamol"]["max_daily_mg"])`,
    check: String.raw`assert "ibuprofen" in drug_db, "Add the key \"ibuprofen\" to drug_db."
assert drug_db["ibuprofen"].get("class") == "NSAID", "ibuprofen class should be \"NSAID\"."
assert drug_db["ibuprofen"].get("max_daily_mg") == 1200, "ibuprofen max_daily_mg should be 1200."
assert "4000" in __output__, "Print the paracetamol maximum daily dose (4000)."`,
    quiz: [
      { q: 'A dictionary stores data as…', options: ['index: item', 'key: value pairs', 'rows and columns', 'only numbers'], answer: 1, why: 'Every entry has a key and a value.' },
      { q: 'What happens if you read a key that does not exist, e.g. db["xyz"]?', options: ['Returns None', 'Returns 0', 'KeyError', 'Creates it'], answer: 2, why: 'Python raises KeyError. Use db.get("xyz") to get None instead.' },
    ],
  },

  /* ------------------------------------------------------------------ 9 */
  {
    id: 9, level: 1, emoji: '⚙️', title: 'Functions: Your Own Calculators',
    intro: `
      <p>A <b>function</b> is a reusable recipe, like a Standard Operating Procedure. Define it once with <code>def</code> and call it any time.</p>
      <p><code>return</code> sends the result back. Parameters can have <b>default values</b>.</p>
      <div class="tip">Body Surface Area (Mosteller): <code>BSA = √(height_cm × weight_kg / 3600)</code>. In Python, square root is <code>** 0.5</code>.</div>`,
    example: String.raw`def bmi(weight_kg, height_m):
    return weight_kg / height_m ** 2

def dose(weight_kg, mg_per_kg=10):      # default value
    return weight_kg * mg_per_kg

print(round(bmi(70, 1.75), 1))
print(dose(20), dose(20, 15))`,
    task: `Write two functions:<br>
      1) <code>bsa(height_cm, weight_kg)</code> returns the Mosteller BSA rounded to 2 decimals.<br>
      2) <code>child_dose(weight_kg, mg_per_kg=15)</code> returns weight × mg/kg.`,
    starter: String.raw`def bsa(height_cm, weight_kg):
    pass


def child_dose(weight_kg, mg_per_kg=15):
    pass


print(bsa(170, 70))
print(child_dose(20))
`,
    hint: `bsa: return round((height_cm * weight_kg / 3600) ** 0.5, 2).  child_dose: return weight_kg * mg_per_kg.`,
    solution: String.raw`def bsa(height_cm, weight_kg):
    return round((height_cm * weight_kg / 3600) ** 0.5, 2)


def child_dose(weight_kg, mg_per_kg=15):
    return weight_kg * mg_per_kg


print(bsa(170, 70))
print(child_dose(20))`,
    check: String.raw`assert abs(bsa(170, 70) - 1.82) < 0.01, "bsa(170, 70) should be about 1.82."
assert abs(bsa(150, 45) - 1.37) < 0.01, "bsa(150, 45) should be about 1.37."
assert child_dose(20) == 300, "child_dose(20) should use the default 15 mg/kg and give 300."
assert child_dose(20, 10) == 200, "child_dose(20, 10) should give 200."`,
    quiz: [
      { q: 'Which keyword defines a function?', options: ['function', 'def', 'make', 'func'], answer: 1, why: 'def starts a function definition.' },
      { q: 'What does return do?', options: ['Prints the value', 'Ends Python', 'Sends a value back to the caller', 'Repeats the function'], answer: 2, why: 'return hands the result back so you can store or print it.' },
    ],
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: 10, level: 1, emoji: '🛡️', title: 'Safe Code: try / except',
    intro: `
      <p>Real users type wrong things. <code>try / except</code> lets your program survive errors instead of crashing.</p>
      <p>In pharmacy software this matters: <b>an impossible weight must never produce a dose</b>. Check and reject it.</p>`,
    example: String.raw`text = "abc"
try:
    weight = float(text)
    print("Weight accepted:", weight)
except ValueError:
    print("That is not a number!")`,
    task: `Write <code>safe_dose(weight_text)</code>. It converts the text to a number and returns <b>weight × 10</b> (mg).
      If the text is not a number, <b>or the weight is zero or negative</b>, return <code>None</code>.`,
    starter: String.raw`def safe_dose(weight_text):
    pass


print(safe_dose("60"))
print(safe_dose("abc"))
`,
    hint: `try: weight = float(weight_text) / except ValueError: return None. Then if weight <= 0: return None, else return weight * 10.`,
    solution: String.raw`def safe_dose(weight_text):
    try:
        weight = float(weight_text)
    except ValueError:
        return None
    if weight <= 0:
        return None
    return weight * 10


print(safe_dose("60"))
print(safe_dose("abc"))`,
    check: String.raw`assert safe_dose("60") == 600, "safe_dose(\"60\") should be 600."
assert safe_dose(" 12.5 ") == 125, "safe_dose(\" 12.5 \") should be 125."
assert safe_dose("abc") is None, "Text that is not a number must return None."
assert safe_dose("-5") is None, "A negative weight must return None."
assert safe_dose("0") is None, "A weight of zero must return None."`,
    quiz: [
      { q: 'Which error does int("abc") raise?', options: ['KeyError', 'ValueError', 'IndexError', 'NameError'], answer: 1, why: 'The type is right (text) but the content cannot become an integer.' },
      { q: 'Why validate input in pharmacy software?', options: ['It makes the code longer', 'Impossible values could lead to unsafe results', 'Python requires it', 'To slow users down'], answer: 1, why: 'Patient safety depends on rejecting nonsense data.' },
    ],
  },

  /* ------------------------------------------------------------------ 11 */
  {
    id: 11, level: 2, emoji: '📊', title: 'Lab Data: math & statistics',
    intro: `
      <p>Python's built-in <code>statistics</code> and <code>math</code> modules save hours in the analytical lab.</p>
      <ul>
        <li><code>statistics.mean(data)</code>, <code>statistics.stdev(data)</code> (sample SD)</li>
        <li><code>math.sqrt()</code>, <code>math.log()</code> (natural log), <code>math.exp()</code></li>
      </ul>
      <p><b>%RSD</b> (relative standard deviation) = <code>SD / mean × 100</code> - a standard measure of precision in assays.</p>`,
    example: String.raw`import statistics, math

data = [99.2, 100.5, 98.7]
print("mean:", statistics.mean(data))
print("SD  :", round(statistics.stdev(data), 3))
print(math.sqrt(16), round(math.log(10), 3))`,
    task: `Six tablets were assayed (% of label claim): <code>[99.2, 100.5, 98.7, 101.1, 100.0, 99.6]</code>.
      Calculate <code>mean_val</code>, <code>sd</code> (sample standard deviation) and <code>rsd</code> (%RSD).`,
    starter: String.raw`import statistics

assay = [99.2, 100.5, 98.7, 101.1, 100.0, 99.6]

mean_val = None
sd = None
rsd = None

print(mean_val, sd, rsd)
`,
    hint: `mean_val = statistics.mean(assay), sd = statistics.stdev(assay), rsd = sd / mean_val * 100.`,
    solution: String.raw`import statistics

assay = [99.2, 100.5, 98.7, 101.1, 100.0, 99.6]

mean_val = statistics.mean(assay)
sd = statistics.stdev(assay)
rsd = sd / mean_val * 100

print(mean_val, sd, rsd)`,
    check: String.raw`import statistics
exp_mean = statistics.mean([99.2, 100.5, 98.7, 101.1, 100.0, 99.6])
exp_sd = statistics.stdev([99.2, 100.5, 98.7, 101.1, 100.0, 99.6])
exp_rsd = exp_sd / exp_mean * 100
assert abs(mean_val - exp_mean) < 0.01, "mean_val should be about " + str(round(exp_mean, 2)) + "."
assert abs(sd - exp_sd) < 0.01, "sd should be the SAMPLE standard deviation, statistics.stdev(...)."
assert abs(rsd - exp_rsd) < 0.01, "rsd = sd / mean_val * 100."`,
    quiz: [
      { q: 'How is %RSD calculated?', options: ['mean / SD × 100', 'SD / mean × 100', 'SD × mean', 'mean − SD'], answer: 1, why: 'Relative SD expresses the SD as a percentage of the mean.' },
      { q: 'Which module provides sqrt()?', options: ['statistics', 'random', 'math', 'sys'], answer: 2, why: 'math.sqrt(x) gives the square root.' },
    ],
  },

  /* ------------------------------------------------------------------ 12 */
  {
    id: 12, level: 2, emoji: '🌈', title: 'Calibration Curve (Beer–Lambert)',
    intro: `
      <p>In UV spectroscopy, absorbance is proportional to concentration (<b>Beer–Lambert law</b>). You measure standards, fit a straight line
      <code>A = slope × C + intercept</code> and read unknown samples from it.</p>
      <p>Python can do the regression for you: <code>slope, intercept = statistics.linear_regression(x, y)</code>.
      The correlation coefficient is <code>statistics.correlation(x, y)</code>; square it to get <b>R²</b>.</p>
      <div class="tip">Rearranged for an unknown: <code>C = (A − intercept) / slope</code></div>`,
    example: String.raw`import statistics

x = [1, 2, 3, 4]
y = [2.1, 3.9, 6.2, 7.8]
slope, intercept = statistics.linear_regression(x, y)
print(round(slope, 3), round(intercept, 3))
print("R2 =", round(statistics.correlation(x, y) ** 2, 4))`,
    task: `Standards (µg/mL): <code>[2, 4, 6, 8, 10]</code> gave absorbance <code>[0.105, 0.212, 0.318, 0.419, 0.526]</code>.
      Find <code>slope</code>, <code>intercept</code>, <code>r_squared</code>, and the concentration of the unknown sample
      (<code>unknown_abs = 0.367</code>) as <code>unknown_conc</code>.`,
    starter: String.raw`import statistics

conc = [2, 4, 6, 8, 10]                         # ug/mL
absorbance = [0.105, 0.212, 0.318, 0.419, 0.526]

slope = None
intercept = None
r_squared = None

unknown_abs = 0.367
unknown_conc = None

print(slope, intercept, r_squared, unknown_conc)
`,
    hint: `slope, intercept = statistics.linear_regression(conc, absorbance). r_squared = statistics.correlation(conc, absorbance) ** 2. unknown_conc = (unknown_abs - intercept) / slope.`,
    solution: String.raw`import statistics

conc = [2, 4, 6, 8, 10]                         # ug/mL
absorbance = [0.105, 0.212, 0.318, 0.419, 0.526]

slope, intercept = statistics.linear_regression(conc, absorbance)
r_squared = statistics.correlation(conc, absorbance) ** 2

unknown_abs = 0.367
unknown_conc = (unknown_abs - intercept) / slope

print(slope, intercept, r_squared, unknown_conc)`,
    check: String.raw`import statistics
cx = [2, 4, 6, 8, 10]
cy = [0.105, 0.212, 0.318, 0.419, 0.526]
s, i = statistics.linear_regression(cx, cy)
r2 = statistics.correlation(cx, cy) ** 2
u = (0.367 - i) / s
assert abs(slope - s) < 0.002, "slope looks off. Use statistics.linear_regression(conc, absorbance)."
assert abs(intercept - i) < 0.005, "intercept looks off."
assert abs(r_squared - r2) < 0.001, "r_squared = statistics.correlation(conc, absorbance) ** 2"
assert abs(unknown_conc - u) < 0.1, "unknown_conc = (unknown_abs - intercept) / slope  (about " + str(round(u, 2)) + " ug/mL)."`,
    quiz: [
      { q: 'In a calibration curve, what goes on the x-axis?', options: ['Absorbance', 'Concentration of the standards', 'Time', 'Wavelength'], answer: 1, why: 'Concentration is the independent variable you control.' },
      { q: 'An R² very close to 1 means…', options: ['No relationship', 'The line fits the standards very well', 'The sample is pure', 'The slope is 1'], answer: 1, why: 'R² near 1 shows excellent linearity.' },
    ],
  },

  /* ------------------------------------------------------------------ 13 */
  {
    id: 13, level: 2, emoji: '⏳', title: 'Shelf Life: First-Order Stability',
    intro: `
      <p>Many drugs degrade by <b>first-order kinetics</b>: <code>ln(C₀ / C) = k × t</code>.</p>
      <ul>
        <li>Rate constant: <code>k = ln(C₀ / C) / t</code></li>
        <li>Shelf life (10 % loss): <code>t₉₀ = ln(100 / 90) / k</code></li>
        <li>Half-life: <code>t½ = ln(2) / k</code></li>
      </ul>
      <p>Use <code>math.log()</code> for the natural logarithm.</p>`,
    example: String.raw`import math

k = 0.01                      # per day
t90 = math.log(100 / 90) / k
half_life = math.log(2) / k
print(round(t90, 1), "days to 90 %")
print(round(half_life, 1), "days half-life")`,
    task: `A suspension drops from <b>100 %</b> to <b>92 %</b> of label claim in <b>20 days</b>.
      Calculate the rate constant <code>k</code> (per day), the shelf life <code>t90</code> and the <code>half_life</code>.`,
    starter: String.raw`import math

initial = 100      # % label claim at day 0
after = 92         # % label claim at day 20
days = 20

k = None           # per day
t90 = None         # days until 90 % remains
half_life = None   # days

print(k, t90, half_life)
`,
    hint: `k = math.log(initial / after) / days.  t90 = math.log(100 / 90) / k.  half_life = math.log(2) / k.`,
    solution: String.raw`import math

initial = 100      # % label claim at day 0
after = 92         # % label claim at day 20
days = 20

k = math.log(initial / after) / days
t90 = math.log(100 / 90) / k
half_life = math.log(2) / k

print(k, t90, half_life)`,
    check: String.raw`import math
ek = math.log(100 / 92) / 20
et90 = math.log(100 / 90) / ek
ehl = math.log(2) / ek
assert abs(k - ek) < 0.0001, "k = math.log(initial / after) / days  (about " + str(round(ek, 5)) + " per day)."
assert abs(t90 - et90) < 0.5, "t90 = math.log(100 / 90) / k  (about " + str(round(et90, 1)) + " days)."
assert abs(half_life - ehl) < 1, "half_life = math.log(2) / k  (about " + str(round(ehl, 1)) + " days)."`,
    quiz: [
      { q: 'What does t90 represent?', options: ['Time for 90 % degradation', 'Time until 90 % of the drug remains (shelf life)', 'Temperature at 90 °C', '90 tablets'], answer: 1, why: 't90 is the time when potency falls to 90 % of the initial value.' },
      { q: 'In Python, which call gives the natural logarithm?', options: ['math.log10(x)', 'math.ln(x)', 'math.log(x)', 'math.exp(x)'], answer: 2, why: 'math.log(x) is the natural log; math.log10 is base 10.' },
    ],
  },
];

if (typeof module !== 'undefined') module.exports = { LESSONS, LEVELS };

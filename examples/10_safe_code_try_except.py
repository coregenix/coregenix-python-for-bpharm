"""Lesson 10: Safe Code: try / except
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 10_safe_code_try_except.py
"""

# ---- Example ----
text = "abc"
try:
    weight = float(text)
    print("Weight accepted:", weight)
except ValueError:
    print("That is not a number!")


# ---- Challenge solution ----
def safe_dose(weight_text):
    try:
        weight = float(weight_text)
    except ValueError:
        return None
    if weight <= 0:
        return None
    return weight * 10


print(safe_dose("60"))
print(safe_dose("abc"))

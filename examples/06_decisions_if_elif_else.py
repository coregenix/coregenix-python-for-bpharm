"""Lesson 6: Decisions: if / elif / else
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 06_decisions_if_elif_else.py
"""

# ---- Example ----
dose_mg = 650
if dose_mg > 1000:
    print("Above single maximum - check with the doctor")
elif dose_mg >= 500:
    print("Normal adult dose")
else:
    print("Low dose")


# ---- Challenge solution ----
bmi = 27.3
category = None

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

"""Lesson 4: Strings & Labels
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 04_strings_labels.py
"""

# ---- Example ----
drug = "Amoxicillin"
strength = 500
label = f"{drug} {strength} mg"
print(label)
print(label.upper())
print(len(label), "characters")


# ---- Challenge solution ----
drug = "Amoxicillin"
strength = 500
form = "Capsule"

label = f"{drug} {strength} mg {form}"
print(label.upper())

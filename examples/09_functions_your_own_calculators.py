"""Lesson 9: Functions: Your Own Calculators
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 09_functions_your_own_calculators.py
"""

# ---- Example ----
def bmi(weight_kg, height_m):
    return weight_kg / height_m ** 2

def dose(weight_kg, mg_per_kg=10):      # default value
    return weight_kg * mg_per_kg

print(round(bmi(70, 1.75), 1))
print(dose(20), dose(20, 15))


# ---- Challenge solution ----
def bsa(height_cm, weight_kg):
    return round((height_cm * weight_kg / 3600) ** 0.5, 2)


def child_dose(weight_kg, mg_per_kg=15):
    return weight_kg * mg_per_kg


print(bsa(170, 70))
print(child_dose(20))

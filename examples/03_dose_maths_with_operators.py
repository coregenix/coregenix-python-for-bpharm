"""Lesson 3: Dose Maths with Operators
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 03_dose_maths_with_operators.py
"""

# ---- Example ----
weight_kg = 60
dose_per_kg = 10            # mg/kg
total = weight_kg * dose_per_kg
print("Total dose:", total, "mg")

print(7 // 2, 7 % 2, 2 ** 3)   # 3 1 8


# ---- Challenge solution ----
weight_kg = 18
dose_mg_per_kg = 15
tablet_strength_mg = 125

total_dose_mg = weight_kg * dose_mg_per_kg
tablets_needed = total_dose_mg / tablet_strength_mg

print(total_dose_mg, tablets_needed)

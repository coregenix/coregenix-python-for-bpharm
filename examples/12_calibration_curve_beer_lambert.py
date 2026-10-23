"""Lesson 12: Calibration Curve (Beer–Lambert)
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 12_calibration_curve_beer_lambert.py
"""

# ---- Example ----
import statistics

x = [1, 2, 3, 4]
y = [2.1, 3.9, 6.2, 7.8]
slope, intercept = statistics.linear_regression(x, y)
print(round(slope, 3), round(intercept, 3))
print("R2 =", round(statistics.correlation(x, y) ** 2, 4))


# ---- Challenge solution ----
import statistics

conc = [2, 4, 6, 8, 10]                         # ug/mL
absorbance = [0.105, 0.212, 0.318, 0.419, 0.526]

slope, intercept = statistics.linear_regression(conc, absorbance)
r_squared = statistics.correlation(conc, absorbance) ** 2

unknown_abs = 0.367
unknown_conc = (unknown_abs - intercept) / slope

print(slope, intercept, r_squared, unknown_conc)

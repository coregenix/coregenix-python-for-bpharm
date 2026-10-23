"""Lesson 11: Lab Data: math & statistics
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 11_lab_data_math_statistics.py
"""

# ---- Example ----
import statistics, math

data = [99.2, 100.5, 98.7]
print("mean:", statistics.mean(data))
print("SD  :", round(statistics.stdev(data), 3))
print(math.sqrt(16), round(math.log(10), 3))


# ---- Challenge solution ----
import statistics

assay = [99.2, 100.5, 98.7, 101.1, 100.0, 99.6]

mean_val = statistics.mean(assay)
sd = statistics.stdev(assay)
rsd = sd / mean_val * 100

print(mean_val, sd, rsd)

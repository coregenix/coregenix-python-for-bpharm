"""Lesson 13: Shelf Life: First-Order Stability
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 13_shelf_life_first_order_stability.py
"""

# ---- Example ----
import math

k = 0.01                      # per day
t90 = math.log(100 / 90) / k
half_life = math.log(2) / k
print(round(t90, 1), "days to 90 %")
print(round(half_life, 1), "days half-life")


# ---- Challenge solution ----
import math

initial = 100      # % label claim at day 0
after = 92         # % label claim at day 20
days = 20

k = math.log(initial / after) / days
t90 = math.log(100 / 90) / k
half_life = math.log(2) / k

print(k, t90, half_life)

"""Lesson 7: Loops: Repeat Without Retyping
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 07_loops_repeat_without_retyping.py
"""

# ---- Example ----
# Dose schedule - every 6 hours
for n in range(1, 5):
    hour = 6 * n
    print(f"Dose {n} due at {hour:02d}:00")

# While loop - keep halving
amount = 100
while amount > 10:
    amount = amount / 2
    print(amount)


# ---- Challenge solution ----
concentration = 1000   # ug/mL
steps = 0

while concentration >= 10:
    concentration = concentration / 2
    steps = steps + 1
    print(concentration)

"""Lesson 5: Lists: Your Pharmacy Shelf
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 05_lists_your_pharmacy_shelf.py
"""

# ---- Example ----
shelf = ["Paracetamol", "Ibuprofen", "Cetirizine"]
print(shelf[0])
shelf.append("Aspirin")
shelf.remove("Ibuprofen")
shelf.sort()
print(shelf, len(shelf))


# ---- Challenge solution ----
stock = ["Paracetamol", "Ibuprofen", "Cetirizine"]

stock.append("Amoxicillin")
stock.remove("Ibuprofen")
stock.sort()

total_items = len(stock)

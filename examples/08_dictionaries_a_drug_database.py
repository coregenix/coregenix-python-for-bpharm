"""Lesson 8: Dictionaries: A Drug Database
Python for B.Pharm - COREGENIX (Made by Sant Kumar, coregenix@rediffmail.com)

Run with:  python 08_dictionaries_a_drug_database.py
"""

# ---- Example ----
drug_db = {
    "paracetamol": {"class": "Analgesic", "max_daily_mg": 4000},
    "cetirizine": {"class": "Antihistamine", "max_daily_mg": 10},
}
print(drug_db["paracetamol"]["class"])

for name, info in drug_db.items():
    print(name, "->", info["max_daily_mg"], "mg/day")


# ---- Challenge solution ----
drug_db = {
    "paracetamol": {"class": "Analgesic", "max_daily_mg": 4000},
    "cetirizine": {"class": "Antihistamine", "max_daily_mg": 10},
}

drug_db["ibuprofen"] = {"class": "NSAID", "max_daily_mg": 1200}
print(drug_db["paracetamol"]["max_daily_mg"])

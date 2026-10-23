<div align="center">

# 💊 Python for B.Pharm 🐍

### Learn Python the pharmacy way — interactive, free, no installation

**Run real Python in your browser · Pharmacy examples · Auto-checked challenges · XP & badges**

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JavaScript%20%7C%20Pyodide-blue)
![For](https://img.shields.io/badge/For-B.Pharm%20Students-orange)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**🌐 Live website:** `https://coregenix.github.io/coregenix-python-for-bpharm/`
*(works after you follow the 3-step setup below)*

**Made by [Sant Kumar](https://github.com/coregenix) · COREGENIX · ✉️ [coregenix@rediffmail.com](mailto:coregenix@rediffmail.com)**

</div>

---

## 🎯 Why this project?

Python is now a subject in the B.Pharm course. It is used in pharmacy for dose calculations, analytical data (assay, dissolution, UV calibration), stability studies, graphs, and even drug discovery.
Most beginners find installing Python and writing the first program frightening.

**This project removes that fear.** Open the website, read a short lesson, edit the example, press **Run**, and see the result instantly — all inside the browser.

## ✨ Features

| Feature | What it gives the student |
|---|---|
| ▶ **Live Python editor** | Real Python (Pyodide / WebAssembly) runs in the browser, nothing to install |
| 🧩 **Auto-checked challenges** | Instant feedback, hints, and a solution after 3 wrong tries |
| 💡 **Friendly error help** | Errors are explained in simple words (NameError, IndentationError…) |
| 🧠 **Quizzes** | 2 questions per lesson with explanations |
| 🏅 **XP, levels, badges, streaks, confetti** | Makes learning feel like a game |
| 🧪 **Playground** | Free space to experiment; code is saved in the browser |
| 📱 **Mobile friendly** | Works on phone, tablet and laptop |
| 🔒 **Private** | No login, no tracking; progress stays in the student's own browser |

## 📚 Course content (13 lessons)

| Level | Lessons |
|---|---|
| 🌱 **Beginner** | 1. Hello, Pharmacy World · 2. Variables & Data Types · 3. Dose Maths with Operators · 4. Strings & Labels |
| 🧪 **Intermediate** | 5. Lists (pharmacy shelf) · 6. if / elif / else (BMI) · 7. Loops (serial dilution) · 8. Dictionaries (drug database) · 9. Functions (BSA & dose calculators) · 10. try / except (safe code) |
| 🔬 **Pharma Lab** | 11. Statistics: mean, SD, %RSD · 12. Calibration curve (Beer–Lambert) · 13. Shelf life: first-order stability |

## 🚀 Setup in 3 steps (publish your own website free)

1. **Upload** all files of this folder to a new GitHub repository named `coregenix-python-for-bpharm`
   (on github.com → *New repository* → *uploading an existing file* → drag the whole folder content → *Commit changes*).
2. Go to **Settings → Pages**. Under **Build and deployment → Source** choose **GitHub Actions**.
3. Open the **Actions** tab and wait for *Deploy to GitHub Pages* to turn green (about 1 minute).
   Your site is now live at `https://<your-username>.github.io/coregenix-python-for-bpharm/`

> 💡 No GitHub Actions? Choose **Source: Deploy from a branch → main → /(root)** instead. It works the same.

### Run it on your own computer

```bash
# any simple web server works, for example:
python -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly also works in most browsers. An internet connection is needed once to load Python from the CDN.)

## 🗂️ Repository structure

```
coregenix-python-for-bpharm/
├── index.html              # the website
├── assets/
│   ├── style.css           # dark GitHub-style theme
│   ├── app.js              # routing, editor, XP, badges, quizzes
│   ├── runner.js           # safe Python runner + friendly errors + answer checker
│   └── lessons.js          # ALL lesson content (edit here to add lessons)
├── examples/               # the same programs as plain .py files for offline practice
├── .github/workflows/      # automatic deployment to GitHub Pages
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## ➕ How to add your own lesson

Open `assets/lessons.js`, copy any lesson block, change the `id`, `title`, `intro`, `example`, `task`, `starter`, `hint`, `solution`, `check` and `quiz`.
The `check` field is Python code that runs after the student's code and uses `assert` to verify the answer:

```js
check: `assert total_dose_mg == 270, "total_dose_mg should be 18 x 15 = 270."`
```

Save, commit, and the website updates automatically.

## 🧭 Roadmap ideas

- [ ] Plots with matplotlib (dissolution profiles)
- [ ] Pharmacokinetics lessons (one-compartment model)
- [ ] Hindi interface
- [ ] Printable certificate on completion
- [ ] Practice-exam mode

Have an idea? Open an **Issue** or send a mail.

## ⚠️ Disclaimer

This is an **educational** project. The pharmacy calculations teach programming and must **not** be used for real patient dosing or clinical decisions.

## 🙏 Credits

- Python in the browser by [Pyodide](https://pyodide.org)
- Created with ❤️ by **Sant Kumar — COREGENIX**
- Contact: **coregenix@rediffmail.com**

If this helps you, please give the repository a ⭐ and share it with your classmates!

---

<div align="center">

**COREGENIX** · Developing innovative healthcare, biotech & AI-driven research solutions
Made by **Sant Kumar** · ✉️ coregenix@rediffmail.com

</div>

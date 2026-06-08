<div align="center">

# 🌟 InAmigos Foundation — Internship Project Portfolio

**Product Development & Web Engineering Internship**

[![InAmigos Foundation](https://img.shields.io/badge/Organization-InAmigos%20Foundation-blue?style=for-the-badge&logo=heart)](https://inamigosfoundation.org.in)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Auto Update](https://img.shields.io/badge/Daily%20Quote-Auto%20Updated-orange?style=for-the-badge&logo=github-actions)](https://github.com)

</div>

---

> 💡 **Quote of the Day**
>
> <!-- QUOTE_START -->
> *"The best way to find yourself is to lose yourself in the service of others."* — Mahatma Gandhi
> <!-- QUOTE_END -->
>
> *✨ This quote refreshes automatically every day via GitHub Actions.*

---

## 📖 About This Repository

This repository contains the complete technical tasks completed during the **Product Development and Web Engineering Internship** at **InAmigos Foundation** — a registered Section 8 NGO working towards:

- 📚 Education
- 👩 Women Empowerment
- 🍱 Food Relief
- 🌱 Environmental Sustainability

---

## 📂 Repository Structure

```
.
├── task 1/                              # Task 1: Foundation Awareness Webpage
│   ├── images/                          # Graphic assets and logos
│   ├── index.html                       # Core HTML markup with SEO/meta tags
│   ├── style.css                        # Custom CSS styling (dark/light tokens)
│   └── script.js                        # Interactivity, theme toggle, and counters
│
├── Task 2/                              # Task 2: Website Improvement Analysis
│   ├── screenshots/                     # Raw screenshots captured by Puppeteer
│   ├── screenshots_annotated/           # PIL annotated screenshots highlighting flaws
│   ├── report.html                      # Analysis report layout template
│   ├── Website_Improvement_Analysis_Report.pdf
│   ├── capture.js                       # Puppeteer screenshot capture script
│   ├── annotate_images.py               # Python PIL annotation script
│   ├── compile_pdf.js                   # HTML → A4 PDF compiler
│   └── package.json                     # Node.js dependencies
│
├── Task 3/                              # Task 3: Volunteer Opportunities Database
│   ├── Volunteer_Opportunities_India.xlsx
│   └── compile_data.py                  # Python script to compile & style the sheet
│
├── .github/
│   └── workflows/
│       └── daily-quote.yml              # GitHub Actions: Daily Quote Auto-Updater
│
└── README.md
```

---

## 🌐 Task 1 — InAmigos Foundation Awareness Webpage

A modern, responsive, and interactive landing page built to drive awareness, recruit volunteers, and gather support for the foundation.

### ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🌗 Dynamic Theme Toggle | Smooth light/dark mode using CSS variables |
| 🔍 SEO Optimization | Title, description, and Open Graph metadata |
| 📊 Animated Counters | Number counters that animate on scroll |
| 🖼️ Gallery Filter | Category filters with a custom lightbox popup |
| 💎 Modern UI | Glassmorphism cards, Google Fonts, hover micro-animations |

### 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### ▶️ How to Run

```bash
# Simply open in any browser
open "task 1/index.html"
```

---

## 📊 Task 2 — Website Improvement Analysis Report

An automated workflow to capture, annotate, and compile a professional audit report for the live NGO website.

### ✨ Key Features

| Feature | Description |
|--------|-------------|
| 📸 Auto Screenshot Capture | Puppeteer captures full-page screenshots (desktop & mobile) |
| 🔴 Programmatic Annotations | Python PIL draws numbered red badges on screenshots |
| 📄 PDF Compilation | HTML report compiled into A4 PDF with headers & page numbers |

### 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=flat&logo=puppeteer&logoColor=white)

### ▶️ How to Run

```bash
# Step 1: Navigate to Task 2 folder
cd "Task 2"

# Step 2: Install Node dependencies
npm install

# Step 3: Capture screenshots
node capture.js

# Step 4: Annotate screenshots
python3 annotate_images.py

# Step 5: Compile final PDF
node compile_pdf.js
```

---

## 📋 Task 3 — Volunteer Opportunities Database

A curated, styled Excel database of 16 prominent volunteering, internship, and fellowship programs across India.

### ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🗂️ 16 Programs Curated | Details: eligibility, duration, stipend, application links |
| 🎨 Premium Styling | Dark-navy header, zebra striping, borders via openpyxl |

### 🛠️ Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![OpenPyXL](https://img.shields.io/badge/OpenPyXL-217346?style=flat&logo=microsoft-excel&logoColor=white)

### ▶️ How to Run

```bash
# Step 1: Install dependencies
pip install pandas openpyxl

# Step 2: Run the compiler
python3 "Task 3/compile_data.py"

# Step 3: Open the output
# Open Volunteer_Opportunities_India.xlsx in Excel / LibreOffice / Google Sheets
```

---

## ⚙️ System Requirements

| Tool | Version |
|------|---------|
| Node.js | v16.x or higher |
| Python | v3.8 or higher |
| Google Chrome | Latest (used by Puppeteer) |

---

## 🤖 Daily Quote — Auto Update Setup

This README updates itself **every day automatically** using GitHub Actions. Here's how to set it up:

### Step 1: Create the workflow file

Save the following as `.github/workflows/daily-quote.yml` in your repo:

```yaml
name: 🌟 Daily Quote Updater

on:
  schedule:
    - cron: '0 3 * * *'   # Runs every day at 3:00 AM UTC (8:30 AM IST)
  workflow_dispatch:        # Also allows manual trigger from GitHub UI

jobs:
  update-quote:
    runs-on: ubuntu-latest

    permissions:
      contents: write       # Required to push commits

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Fetch Quote & Update README
        run: |
          # Fetch today's quote from ZenQuotes API
          RESPONSE=$(curl -s "https://zenquotes.io/api/today")
          QUOTE=$(echo $RESPONSE | python3 -c "
          import sys, json
          data = json.load(sys.stdin)
          q = data[0]['q'].replace('\"', '\\\"')
          a = data[0]['a']
          print(f'*\"{q}\"* — {a}')
          ")

          # Replace content between markers in README
          python3 - <<'PYEOF'
          import re

          with open("README.md", "r") as f:
              content = f.read()

          new_quote = """$QUOTE"""
          updated = re.sub(
              r'<!-- QUOTE_START -->.*?<!-- QUOTE_END -->',
              f'<!-- QUOTE_START -->\n> {new_quote}\n> <!-- QUOTE_END -->',
              content,
              flags=re.DOTALL
          )

          with open("README.md", "w") as f:
              f.write(updated)
          PYEOF

      - name: Commit & Push Changes
        run: |
          git config --global user.name "Quote Bot 🤖"
          git config --global user.email "quote-bot@github.com"
          git add README.md
          git diff --cached --quiet || git commit -m "✨ Daily Quote Update — $(date +'%d %b %Y')"
          git push
```

### Step 2: Enable Workflow Permissions

Go to your repo → **Settings** → **Actions** → **General** → set **Workflow permissions** to **Read and write permissions**.

### Step 3: Done! 🎉

Every day at **8:30 AM IST**, your README will auto-update with a fresh quote — and GitHub will record a green contribution square for that day!

---

## 👤 Author

**Deepak Raj JS**
Intern — Product Development & Web Engineering
InAmigos Foundation

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com)

---

<div align="center">
  <sub>Made with ❤️ for <strong>InAmigos Foundation</strong> — Building a better India, one step at a time.</sub>
</div>
```

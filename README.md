# InAmigos Foundation Internship Project Portfolio

This repository contains the technical tasks completed during the Product Development and Web Engineering Internship at **InAmigos Foundation** (a registered Section 8 NGO working towards education, women empowerment, food relief, and environmental sustainability in India).

The repository is structured into three distinct tasks, ranging from responsive web development to automated quality audits and structured database compilation.

---

## 📂 Repository Structure

```directory
.
├── task 1/                         # Task 1: Foundation Awareness Webpage
│   ├── images/                     # Graphic assets and logos
│   ├── index.html                  # Core HTML markup with SEO/meta tags
│   ├── style.css                   # Custom CSS styling (dark/light tokens)
│   └── script.js                   # Interactivity, theme toggle, and counters
│
├── Task 2/                         # Task 2: Website Improvement Analysis
│   ├── screenshots/                # Raw screenshots captured by Puppeteer
│   ├── screenshots_annotated/      # PIL annotated screenshots highlighting flaws
│   ├── report.html                 # Analysis report layout template
│   ├── Website_Improvement_Analysis_Report.pdf # Compiled PDF report
│   ├── capture.js                  # Puppeteer script to capture desktop/mobile pages
│   ├── annotate_images.py          # Python script to overlay boxes & badges
│   ├── compile_pdf.js              # Script compiling HTML report into A4 PDF
│   └── package.json                # Node.js dependencies (Puppeteer)
│
├── Task 3/                         # Task 3: Volunteer Opportunities Database
│   ├── Volunteer_Opportunities_India.xlsx # Formatted Excel sheet (16 programs)
│   └── compile_data.py            # Python script to compile and style the sheet
│
└── README.md                       # Portfolio documentation
```

---

## 🌟 Task Details & Setup Instructions

### 🌐 Task 1: InAmigos Foundation Webpage
A modern, responsive, and interactive landing page built for the InAmigos Foundation. Designed to drive awareness, recruit volunteers, and gather support.

* **Key Features:**
  * **Dynamic Theme Toggle:** Smooth light/dark mode transition using CSS variables.
  * **SEO & Social Optimization:** Properly configured title, description, and Open Graph (OG) social card metadata.
  * **Interactive Stat Counters:** Custom JavaScript number-counters that animate when the user scrolls to the impact metrics.
  * **Interactive Gallery Filter:** Filter drives by categories (Education, Relief, Environment, Animal Care) with a fully integrated custom lightbox popup.
  * **Interactive CSS Design:** Clean glassmorphism cards, modern Google Fonts (Inter & Outfit), and micro-animations on hover states.
* **Tech Stack:** HTML5, Vanilla CSS3, JavaScript (ES6), Lucide Icons CDN.
* **How to Run:**
  Open `task 1/index.html` directly in any web browser.

---

### 📊 Task 2: Website Improvement Analysis Report
An automated workflow to capture, annotate, and compile a website audit report for the live NGO website (`https://inamigosfoundation.org.in`).

* **Key Features:**
  * **Automated Screenshot Capture:** Using Puppeteer to automatically navigate to the website and capture full-page and section-specific screenshots on both desktop (1280x800) and mobile (375x812) viewports.
  * **Programmatic Annotations:** Python Pillow (PIL) script that reads coordinate arrays and draws numbered red badges and bounding boxes directly onto screenshots.
  * **Professional PDF Compilation:** Uses Puppeteer to print the HTML report into a standard A4 PDF document with custom margins, confidentiality headers, and page numbers.
* **Tech Stack:** Node.js, Puppeteer-core, Python 3, Pillow (PIL).
* **Setup & Run:**
  1. Navigate to the folder:
     ```bash
     cd "Task 2"
     ```
  2. Install Node dependencies:
     ```bash
     npm install
     ```
  3. Run the screenshot capture tool:
     ```bash
     node capture.js
     ```
  4. Run the annotator tool:
     ```bash
     python3 annotate_images.py
     ```
  5. Compile the final PDF:
     ```bash
     node compile_pdf.js
     ```

---

### Excel Task 3: Volunteer Opportunities Database
A curated database compilation of 16 prominent volunteering, internship, and fellowship programs in India.

* **Key Features:**
  * **Curated Database:** Includes details like organization name, eligibility criteria, duration, stipend details, application links, and program descriptions.
  * **Premium Styling (openpyxl):** Auto-styled spreadsheet utilizing a dark-navy header theme (`#1E3A8A`), zebra striping, custom line borders, explicit column widths, and proper cell-text wrapping for readable descriptions.
* **Tech Stack:** Python 3, Pandas, Openpyxl.
* **Setup & Run:**
  1. Install dependencies:
     ```bash
     pip install pandas openpyxl
     ```
  2. Run the compiler script:
     ```bash
     python3 "Task 3/compile_data.py"
     ```
  3. Open `Volunteer_Opportunities_India.xlsx` in Excel, LibreOffice Calc, or Google Sheets to view the results.

---

## 🛠️ Requirements & System Prerequisites

* **Node.js:** v16.x or higher
* **Python:** v3.8 or higher
* **Google Chrome:** Installed on system (used by Puppeteer executable configurations)

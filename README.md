# 🌐 Developer Portfolio

A professional, simple, and clean developer portfolio website for **Avula Sai Praneeth Yaswanth Reddy**, optimized for showcase of **AI/ML Engineering** and **Cloud Architecture** skills.

Featuring a dark theme design with interactive styling, glassmorphism, responsive grids, and an **interactive mock terminal dashboard**!

---

## 🚀 Key Features

* 💻 **Interactive Bash Terminal**: A mini-terminal in the Hero section where visitors can type commands (`help`, `skills`, `projects`, `certifications`, `education`, `about`, `contact`, `clear`) to interactively query information.
* 🎨 **Premium Aesthetics**: Slate-dark background, blueprint grid overlays, glowing neon radial card drops, and customizable scrollbars.
* ⚙️ **Smooth Animations**: Autocomplete blinking cursors, typing effects, hover scaling, and section links underliners.
* 🎯 **Lucide Icons Integration**: SVG icon components replacing standard text blocks.
* 📬 **Validating Contact Form**: Built-in client-side validation, floating label states, and button loading spinners.

---

## 🛠️ Tech Stack

* **HTML5** (Semantic structures, accessibility-friendly)
* **CSS3** (Variables/tokens, custom transitions, grid layouts, glassmorphism)
* **JavaScript** (Typing controllers, terminal command processors, form interceptors)
* **Lucide CDN** (Dynamic vector rendering)

---

## 📂 Project Structure

```
Portfolio/
├── index.html   # Main page structure & layouts
├── style.css    # Typography, colors, tokens, animation guidelines
├── app.js       # Observers, mock terminal, and validators
└── README.md    # Project documentation
```

---

## 🏗️ Local Running

Simply open the `index.html` file in any modern web browser, or launch a live reloading server using `npx`:

```bash
# Start a local hot-reloading dev server on port 3000
npx -y browser-sync start --server --files "index.html, style.css, app.js" --port 3000
```

# 🚀 Modern Developer Portfolio Website

A clean, responsive, and high-performance personal portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external framework build steps required).

---

## ✨ Features

- 🌓 **Dark / Light Theme Toggle**: Seamless mode switching with persistent local storage support.
- ⚡ **Dynamic Hero Section**: Interactive typewriter role effect, status badge ("Available for work"), and call-to-action buttons.
- 👨‍💻 **About & Stats**: Clean biographical profile, quick facts, and animated statistical counters.
- 🛠️ **Categorized Skills**: Beautifully grouped tech stack cards (Frontend, Backend, Tools & Workflow) with interactive tags.
- 💼 **Interactive Projects Grid**:
  - Category filtering (*All, Frontend, Full Stack, UI/Web Design*).
  - Project cards with sleek gradient mockups and action buttons.
  - Interactive project detail modal with feature lists and direct links.
- ⏳ **Experience & Education Timeline**: Elegant vertical milestone timeline.
- 💬 **Client Testimonials**: Verified rating cards and reviews.
- 📬 **Interactive Contact Form**: Real-time client-side form validation with notification toasts.
- 📱 **100% Responsive Design**: Optimized across mobile screens, tablets, laptops, and ultra-wide displays.
- 🎯 **Zero Dependencies / Build Steps**: Simply double-click `index.html` to run in any modern web browser.

---

## 📁 File Structure

```
Portfolio/
├── index.html        # Semantic HTML5 structure & content
├── style.css         # Modern CSS styles, custom variables, animations, and media queries
├── script.js         # Interactive features (themes, filters, modals, counters, validation)
└── README.md         # Documentation & guide
```

---

## 🚀 How to Run

1. Open the project folder in File Explorer:
   `c:\Users\DELL\OneDrive\Desktop\Portfolio`
2. Double-click **`index.html`** or right-click and choose **Open with > Chrome / Edge / Firefox**.
3. That's it! Everything works directly in your web browser.

---

## ✏️ How to Customize

- **Personal Info**: Open `index.html` and replace placeholders (e.g. `John Doe`, bio, email, social links).
- **Skills**: Add or remove `<div class="skill-pill">` elements under `#skills` in `index.html`.
- **Projects**: Edit existing cards in `index.html` and update the `projectData` object inside `script.js` to change the modal details.
- **Colors & Branding**: Modify CSS variables in `style.css` (e.g. `--accent-primary`, `--accent-secondary`).

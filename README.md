# Md. Tanvir Hasib Fahim — Portfolio

A responsive personal portfolio website built with plain **HTML5, CSS3, and vanilla JavaScript**, using a soft neumorphic (Soft UI) design. No frameworks, no build tools — it works simply by opening `index.html` or hosting the folder on GitHub Pages.

## Overview

The site covers: Home/Hero, About, Education, Technical Skills, Projects, What I Do, Contact, and Footer, with a fixed navigation bar, mobile hamburger menu, smooth scrolling, scroll-reveal animations, and a front-end-only contact form.

## Technologies

- HTML5 (semantic markup, SEO meta tags, Open Graph tags)
- CSS3 (custom properties/variables, Flexbox, Grid, media queries, neumorphic shadows)
- Vanilla JavaScript (no libraries/frameworks)
- [Font Awesome](https://fontawesome.com/) via CDN for icons
- Google Fonts (Sora + Inter) via CDN

## Folder Structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── profile.jpg
│   ├── favicon.png
│   └── project/
│       ├── research-assistant.jpg
│       ├── food-ordering.jpg
│       ├── bookstore.jpg
│       └── transportation.jpg
│
└── README.md
```

## Running Locally

No build step is required.

1. Download or clone the folder.
2. Double-click `index.html` to open it in your browser, **or** serve it locally for the best results:
   ```bash
   # Using Python
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

## Deploying to GitHub Pages

1. **Create a GitHub repository**
   - Go to [github.com/new](https://github.com/new).
   - Name it, for example, `portfolio` (or `your-username.github.io` for a root-level site).
   - Keep it public, then click **Create repository**.

2. **Upload the files**
   - On the new repo page, click **uploading an existing file**, drag in all files and folders from this project (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`), and commit.
   - Or, via Git:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio commit"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**
   - In your repository, go to **Settings → Pages**.
   - Under **Build and deployment → Source**, select **Deploy from a branch**.
   - Choose the `main` branch and `/ (root)` folder, then click **Save**.

4. **Open the live portfolio**
   - After a minute or two, your site will be live at:
     ```
     https://<your-username>.github.io/<repo-name>/
     ```
   - If you named the repo `your-username.github.io`, it will be live at `https://<your-username>.github.io/`.

## Replacing the Profile Image

- Replace `assets/profile.jpg` with your own photo, keeping the same filename (or update the `src` in `index.html`'s hero section if you rename it).
- A square-ish, well-lit photo works best since it's cropped into a circle.

## Replacing Project Images

- Add real screenshots to `assets/project/` using these exact filenames so they show up automatically:
  - `research-assistant.jpg`
  - `food-ordering.jpg`
  - `bookstore.jpg`
  - `transportation.jpg`
- If an image file is missing, the card automatically shows a clean icon-based placeholder instead of a broken image.

## Updating Personal Information

All personal content lives directly in `index.html`:

- **Hero / Name / Titles** — inside `<section class="hero">`.
- **About Me** — inside `<section id="about">`.
- **Education** — inside `<section id="education">`.
- **Skills** — inside `<section id="skills">`.
- **Projects** — inside `<section id="projects">` (edit title, tech pills, description, and GitHub link per `<article class="project-card">`).
- **Contact details** — inside `<section id="contact">` (email, phone, address, LinkedIn, GitHub links).

Colors can be changed globally by editing the CSS variables at the top of `style.css`:

```css
:root {
  --bg: #e8ecf1;
  --surface: #e8ecf1;
  --text: #222831;
  --muted: #6b7280;
  --accent: #4f46e5;
}
```

## Accessibility & Performance Notes

- Semantic landmarks (`header`, `main`, `section`, `footer`) and heading hierarchy.
- Visible focus states for keyboard navigation.
- `prefers-reduced-motion` is respected — animations are minimized for users who request it.
- All external assets are loaded from HTTPS CDNs compatible with GitHub Pages.

---

Designed & developed by **Md. Tanvir Hasib Fahim**.

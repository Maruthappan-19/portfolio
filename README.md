# Maruthappan M — Portfolio Website

> High-fidelity portfolio website for **Maruthappan M, Aspiring Software Engineer**, replicating the design language, typography, interactions, and aesthetic of [Jameson Nuss's Portfolio](https://jamesonnuss.com/).

---

## 🚀 Live Preview & Running Locally

The portfolio application is located in the `client` directory.

### Quick Start:

```bash
# 1. Navigate to client
cd client

# 2. Install dependencies (already installed)
npm install

# 3. Start local development server
npm run dev

# 4. Or build and preview production release
npm run build
npm run preview -- --port 3000
```

The site will be live at `http://localhost:3000/` or `http://localhost:5173/`.

---

## 🎨 Design & Architecture Highlights

* **Visual Identity:** Deep `#000000` pitch black aesthetic, crisp white typography, and Jameson Nuss's signature **Electric Volt (`#c1ff14`)** accent for selection highlights, tags, and micro-interactions.
* **Border Radius & Layout Grid:** Consistent `20px` border-radius across cards, screenshot viewports, and modals; fluid grid spanning with generous whitespace (`4vw` – `6vw`).
* **Interactive Navigation:** Sticky glassmorphic navbar with backdrop blur (`backdrop-filter: blur(20px)`), mobile drawer menu, and resume action pill.
* **Full-Resolution Modal Lightbox:** Click on any project screenshot or certificate to view high-resolution details without leaving the page.
* **Zero-Fail Contact Architecture:** Direct one-click email copying, pre-filled mail client composer, and direct phone/LinkedIn/GitHub links.

---

## 📁 Page Structure

1. **Home (`/`):**
   * Editorial introduction and career positioning.
   * Current academic standing at *Saranathan College of Engineering*.
   * Transition link: `Recent work.` with signature volt styling.
   * Asymmetrical featured projects preview.
   * Iconic global footer: `"Let's Build Together"`.

2. **Work (`/work`):**
   * Curated catalog of 4 major projects:
     1. **NexusGuard** (AI-Assisted Financial Fraud Detection & Autonomous Investigation)
     2. **SnapSense AI** (Offline Multilingual Screenshot Semantic Search)
     3. **MeshWave** (Offline Emergency Communication System via ESP32, BLE & LoRa)
     4. **Smart Home Automation** (IoT & Voice-Controlled Home Prototype)
   * Callout card: *"More work available upon request."*

3. **Case Study Detail Pages (`/work/:slug`):**
   * Dedicated pages for `/work/nexusguard`, `/work/snapsense-ai`, `/work/meshwave`, and `/work/smart-home-automation`.
   * Problem statements, solutions, personal contributions, and technical architecture workflows.
   * High-resolution galleries using verified screenshots (`NG0-NG6`, `SS1-SS3`, `MW1-MW2`, `M23`).
   * Next project pagination banner.

4. **About (`/about`):**
   * Authentic editorial bio & career objective.
   * Profile photograph (`profile pic.jpeg`) with 20px rounded borders.
   * Categorized skills matrix (Programming Languages, Backend & APIs, Databases, AI & Applied Tech, Tools & CS Core).
   * Work experience & internships (Cognifyz Technologies, BigLearn, Prodigy InfoTech).
   * Education (B.Tech IT, 8.3 CGPA; HSC 91%).
   * 50+ LeetCode problems solved & core DSA focus.
   * Complete verified certificate gallery with full-resolution inspection modals.

5. **Contact (`/contact`):**
   * "Get in touch." editorial layout.
   * One-click email copy button (`maruthappanm2006@gmail.com`).
   * Phone number (`+91 9360596629`), location (`Tiruchirappalli, Tamil Nadu, India`).
   * Social profiles: GitHub (`https://github.com/Maruthappan-19`), LinkedIn (`https://www.linkedin.com/in/maruthappan-murugappan`).
   * Message composer opening default email client with validated fields.

---

## 🚢 Deployment to Vercel or GitHub Pages

### Deploying to Vercel (Recommended — Free & 1 Click)
1. Push this repository to your GitHub account (`https://github.com/Maruthappan-19`).
2. Log in to [vercel.com](https://vercel.com) with GitHub.
3. Import the repository, set **Root Directory** to `client`, and click **Deploy**.
4. Your site will be live with free global CDN and HTTPS!

### Deploying to GitHub Pages
1. In `client/vite.config.ts`, set `base: '/portfolio/'` (matching your repository name).
2. Run `npm run build` inside `client`.
3. Deploy the resulting `client/dist` folder to the `gh-pages` branch.

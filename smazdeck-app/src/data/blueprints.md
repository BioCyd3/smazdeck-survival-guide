---

### **Project: Smazdeck Survival (GitHub Pages Edition)**

**Vision:** To be the definitive, data-driven resource for competitive players, engineered for extreme performance and clarity. By leveraging a static-first architecture, this guide will be blazing-fast, reliable, and completely free to host on GitHub Pages.

---

### **I. Brand Identity & Design System**

This remains the core aesthetic foundation and is unchanged.

- **Name:** Smazdeck Survival
- **Slogan:** Master the Meta. Dominate the Game.
- **Primary Font:** **Inter**.
- **Heading Font:** **Exo 2**.
- **Color Smazette:**
  - `#111827` (Slate 900) - **Primary Background**
  - `#1F2937` (Slate 800) - **Card/Element Background**
  - `#4B5563` (Slate 600) - **Borders & Dividers**
  - `#FBBF24` (Amber 400) - **Primary Accent (Gold/Yellow)**
  - `#E5E7EB` (Slate 200) - **Primary Text**
  - `#FFFFFF` (White) - **Heading Text**
- **Functional Colors (Tier System):**
  - **S-Tier:** `#DC2626` (Red 600) border with `#FBBF24` accent.
  - **A-Tier:** `#7C3AED` (Violet 600).
  - **B-Tier:** `#2563EB` (Blue 600).
  - **C-Tier:** `#6B7280` (Slate 500).

---

### **II. Page Structure & User Experience (Unchanged)**

The user-facing experience, page content, and data interconnectivity remain exactly as planned. All pages previously defined will be built: Homepage, Tier List Pages, Smazdex, Smaz Profiles, Team Comp pages, Builds page, and all three Mechanics pages. The difference is _how_ these pages are generated and served.

---

### **III. Recommended Tech Stack (Revised for Static Hosting)**

- **Framework:** **Vite + React**. This is the ideal choice. Vite is an incredibly fast build tool that outputs a highly optimized, static bundle of HTML, CSS, and JS, which is exactly what GitHub Pages requires. React provides the component-based architecture to build the complex UI.
- **Routing:** **React Router Dom**. The standard for client-side routing in React applications. It will handle the navigation between pages on the user's browser after the initial load.
- **Styling:** **Tailwind CSS**. Perfect for rapid, utility-first styling directly within the components.
- **Deployment:** **GitHub Actions** for automated builds and deployment to the `gh-pages` branch.

---

### **IV. The 100% Complete File & Folder Structure (Vite + React)**

This structure is organized for clarity and scalability within a Vite project.

```
Smazdeck-survival/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions workflow for auto-deployment
│
├── public/
│   ├── images/
│   │   ├── Smazs/
│   │   │   ├── Abuzzinian.png
│   │   │   ├── Adolphonis.png
│   │   │   ├── Anubeast.png
│   │   │   ├── Axollium.png
│   │   │   ├── Baboom.png
│   │   │   ├── Barkplug.png
│   │   │   ├── Blazeal.png
│   │   │   ├── Bruiseberry.png
│   │   │   ├── Cerverdant.png
│   │   │   ├── Chefeuillier.png
│   │   │   ├── Dolphriend.png
│   │   │   ├── Emboa.png
│   │   │   ├── Fingenue.png
│   │   │   ├── Finnabelle.png
│   │   │   ├── Flaries.png
│   │   │   ├── Flouffant.png
│   │   │   ├── Fluff-Static.png  # Note: File names should be URL-safe
│   │   │   ├── Ghillant.png
│   │   │   ├── Graffitty.png
│   │   │   ├── Herculeaf.png
│   │   │   ├── Hoofrit.png
│   │   │   ├── Incineraptor.png
│   │   │   ├── Keranosaur.png
│   │   │   ├── Kilohopp.png
│   │   │   ├── Lendanear.png
│   │   │   ├── Lucidina.png
│   │   │   ├── Magmolin.png
│   │   │   ├── Mantleray.png
│   │   │   ├── Maximito.png
│   │   │   ├── Meowdame.png
│   │   │   ├── Ninjump.png
│   │   │   ├── Oneirina.png
│   │   │   ├── Platyputz.png
│   │   │   ├── Regalion.png
│   │   │   ├── Revontulet.png
│   │   │   ├── Rotorlotor.png
│   │   │   ├── Servolt.png
│   │   │   ├── Silvaurus.png
│   │   │   ├── Snowkami.png
│   │   │   ├── Squeezel.png
│   │   │   ├── Statchew.png
│   │   │   ├── Surveilynx.png
│   │   │   ├── Terrastudo.png
│   │   │   ├── Thunderclawd.png
│   │   │   ├── Vulcanid.png
│   │   │   ├── Wattweiler.png
│   │   │   ├── Wildfuror.png
│   │   │   ├── Woozard.png
│   │   │   └── Wyviemo.png
│   │   └── icons/
│   │       ├── Smazdex.svg
│   │       ├── team-comp.svg
│   │       ├── production.svg
│   │       └── traits.svg
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── ui/
│   │   │   ├── Accordion.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Tooltip.jsx
│   │   └── Smaz/
│   │       ├── SmazCard.jsx
│   │       ├── SmazSkillCard.jsx
│   │       ├── SmazTraitBadge.jsx
│   │       └── TierRow.jsx
│   │
│   ├── data/
│   │   ├── builds/
│   │   │   ├── best_battle_builds.json
│   │   │   └── team-comps.json
│   │   ├── game_mechanics/
│   │   │   ├── camp_upgrades.json
│   │   │   └── tech_tree_buffs.json
│   │   ├── tier_lists/
│   │   │   ├── backline_dps_tier_list.json
│   │   │   ├── defensive_battle_trait_tier_list.json
│   │   │   ├── frontline_hybrid_tier_list.json
│   │   │   ├── offensive_battle_trait_tier_list.json
│   │   │   ├── overall_battle_tier_list.json
│   │   │   ├── production_Smaz_tier_list.json
│   │   │   ├── pure_dps_tier_list.json
│   │   │   ├── rage_skill_tier_list.json
│   │   │   ├── support_debuff_tier_list.json
│   │   │   └── tank_bruiser_tier_list.json
│   │   ├── Smazs.json
│   │   └── traits.json
│   │
│   ├── lib/
│   │   └── data-helpers.js           # Functions to load and process data
│   │
│   ├── pages/
│   │   ├── BuildsPage.jsx
│   │   ├── CampUpgradesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── MechanicsLayout.jsx       # Wrapper for mechanics pages with sub-nav
│   │   ├── NotFoundPage.jsx
│   │   ├── SmazProfilePage.jsx
│   │   ├── SmazdexPage.jsx
│   │   ├── TeamCompDetailPage.jsx
│   │   ├── TeamCompsPage.jsx
│   │   ├── TechTreePage.jsx
│   │   ├── TierListPage.jsx
│   │   └── TraitsPage.jsx
│   │
│   ├── styles/
│   │   └── main.css                  # Global styles and Tailwind directives
│   │
│   ├── App.jsx                       # Root component, contains the Router setup
│   └── main.jsx                      # Application entry point, renders App
│
├── .gitignore
├── index.html                        # The single HTML shell for the entire app
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js                    # Vite build tool configuration
└── README.md
```

---

### **V. Critical GitHub Pages Configuration & Deployment**

This is the most important section for ensuring compatibility.

#### **1. `vite.config.js`**

This file MUST be configured to tell Vite about the repository's sub-path on GitHub pages.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repo-name' with your actual GitHub repository name
const repositoryName = 'Smazdeck-survival';

export default defineConfig({
  // The base path for all assets. Crucial for GitHub Pages deployment.
  base: `/${repositoryName}/`,
  plugins: [react()],
});
```

#### **2. Client-Side Routing Fix**

GitHub Pages doesn't understand routes like `/Smazs/barkplug`. If a user refreshes on that page, they'll get a 404. We solve this with a custom `404.html` and a small script in `index.html`.

**A. Create `public/404.html`**

Create a new file `404.html` inside the `/public` directory.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Smazdeck Survival - Redirecting...</title>
    <script type="text/javascript">
      // Get the current path from the URL.
      var path = window.location.pathname;

      // Preserve the search query and hash if they exist.
      var search = window.location.search;
      var hash = window.location.hash;

      // Store the full path in sessionStorage to be retrieved by the main app.
      sessionStorage.redirect = path + search + hash;

      // Redirect to the root of the application (index.html).
      // The React Router will then read sessionStorage and handle the routing.
      window.location.replace(
        '/' + (path.split('/')[1] || '') // Handles repo sub-path
      );
    </script>
  </head>
  <body></body>
</html>
```

**B. Modify `index.html`**

Add this script to the `<head>` of your main `index.html` file to handle the redirect.

```html
<!-- Add this script inside the <head> of your main index.html -->
<script type="text/javascript">
  (function () {
    // Check if we were redirected from the 404 page.
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != window.location.href) {
      // If so, use the history API to push the correct URL into the browser's history.
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

#### **3. Automated Deployment with GitHub Actions**

This eliminates manual builds. Create the file `.github/workflows/deploy.yml`.

```yaml
# Simple workflow for deploying a static Vite site to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['main']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build # This runs the 'vite build' script from package.json
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload the 'dist' directory created by 'npm run build'
          path: './dist'

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### **4. Final GitHub Repository Settings**

1.  Push your code to the `main` branch. The GitHub Action will automatically run.
2.  Go to your repository's `Settings` > `Pages`.
3.  Under "Build and deployment", set the **Source** to **"GitHub Actions"**.

Your site is now live, fully automated, and architected perfectly for the GitHub Pages environment. Every component, page, and deployment step is accounted for.

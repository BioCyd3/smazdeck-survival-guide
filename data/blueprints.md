---

### **Project Blueprint: Smazdeck Survival (GitHub Pages Master Guide)**

**Vision:** To be the definitive, data-driven resource for competitive Smazdeck Survival players, engineered for extreme performance, clarity, and accessibility. By leveraging a static-first architecture with Vite and React, this guide will be blazing-fast, reliable, and entirely free to host and deploy via GitHub Pages.

**Motto:** Master the Meta. Dominate the Game.

---

### **I. Brand Identity & Design System**

This is the aesthetic foundation. All components should adhere strictly to this system for a cohesive, professional user experience.

*   **Primary Font (Body & UI):** **Inter** - Chosen for its exceptional readability on screens.
*   **Heading Font (Titles & Headers):** **Exo 2** - A modern, slightly technical font that provides a clean, impactful look.
*   **Core Color Palette (Tailwind CSS):**
    *   `bg-slate-900` (`#111827`) - **Primary Background:** Deep, comfortable dark theme.
    *   `bg-slate-800` (`#1F2937`) - **Card/Element Background:** Subtle contrast for content containers.
    *   `border-slate-600` (`#4B5563`) - **Borders & Dividers:** Clean separation of UI elements.
    *   `text-slate-200` (`#E5E7EB`) - **Primary Text:** High-readability body text.
    *   `text-white` (`#FFFFFF`) - **Heading Text:** Sharp, prominent headings.
*   **Accent & Functional Colors:**
    *   **Primary Accent:** `bg-amber-400` / `text-amber-400` (`#FBBF24`) - Used for primary links, buttons, and important highlights.
    *   **S-Tier:** `border-red-600` (`#DC2626`) with `text-amber-400` accents.
    *   **A-Tier:** `border-violet-600` (`#7C3AED`).
    *   **B-Tier:** `border-blue-600` (`#2563EB`).
    *   **C-Tier:** `border-slate-500` (`#6B7280`).

---

### **II. Recommended Technology Stack**

This stack is optimized for performance, developer experience, and seamless deployment to GitHub Pages.

*   **Build Tool/Framework:** **Vite + React**. Vite provides a lightning-fast development server and a highly optimized static build output, which is precisely what GitHub Pages serves. React enables a robust, scalable component-based architecture.
*   **Routing:** **React Router Dom**. The industry standard for creating a Single Page Application (SPA) experience. It handles all client-side navigation after the initial page load.
*   **Styling:** **Tailwind CSS**. A utility-first CSS framework that allows for rapid, consistent styling directly within JSX components, perfectly aligning with the defined design system.
*   **Deployment:** **GitHub Actions**. For fully automated, continuous deployment. Every push to the `main` branch will trigger a new build and deploy it to the `gh-pages` branch, making the site live automatically.

---

### **III. The Definitive File & Folder Structure**

This is the complete, OCD-level structure for the project. It prioritizes clarity, scalability, and separation of concerns.


smazdeck-app/
├── .github/
│ └── workflows/
│ └── deploy.yml # GitHub Actions workflow for automated deployment.
│
├── public/
│ ├── images/
│ │ ├── smazs/ # All Smaz profile images (e.g., 1.png, 2.png, ...)
│ │ │ ├── 1.png # Corresponds to Abuzzinian.png
│ │ │ └── ... # Name images by Smaz ID for easy programmatic access.
│ │ └── icons/
│ │ ├── smazdex.svg
│ │ └── ... # Other UI icons.
│ ├── 404.html # CRITICAL: For handling SPA routing on GitHub Pages.
│ └── favicon.ico # Site favicon.
│
├── src/
│ ├── assets/ # Static assets imported into components (e.g., SVGs).
│ │ └── react.svg
│ │
│ ├── components/
│ │ ├── common/ # High-level, reusable components (Header, Footer, etc.).
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ └── SearchBar.jsx
│ │ ├── Smaz/ # Components specific to displaying Smaz data.
│ │ │ ├── SmazCard.jsx
│ │ │ ├── SmazSkillCard.jsx
│ │ │ └── TierRow.jsx
│ │ └── ui/ # Generic, low-level UI elements (buttons, cards, badges).
│ │ ├── Accordion.jsx
│ │ ├── Badge.jsx
│ │ ├── Card.jsx
│ │ └── Tooltip.jsx
│ │
│ ├── data/ # All game data, separated for maintainability.
│ │ ├── builds/
│ │ │ ├── best_battle_builds.json
│ │ │ └── team-comps.json
│ │ ├── game_mechanics/
│ │ │ ├── camp_upgrades.json
│ │ │ └── tech_tree_buffs.json
│ │ ├── tier_lists/
│ │ │ ├── backline_dps_tier_list.json
│ │ │ ├── defensive_battle_trait_tier_list.json
│ │ │ ├── frontline_hybrid_tier_list.json
│ │ │ ├── offensive_battle_trait_tier_list.json
│ │ │ ├── overall_battle_tier_list.json
│ │ │ ├── production_pal_tier_list.json
│ │ │ ├── pure_dps_tier_list.json
│ │ │ ├── rage_skill_tier_list.json
│ │ │ ├── support_debuff_tier_list.json
│ │ │ └── tank_bruiser_tier_list.json
│ │ ├── smazs.json # Corrected name for Smaz data file.
│ │ └── traits.json
│ │
│ ├── hooks/ # Custom React hooks (e.g., useDebounce for search).
│ │ └── useDebounce.js
│ │
│ ├── layouts/ # Layout components that provide structure to pages.
│ │ ├── MechanicsLayout.jsx
│ │ └── RootLayout.jsx
│ │
│ ├── lib/
│ │ └── data-helpers.js # Functions for loading and processing data from /data.
│ │
│ ├── pages/ # Each file represents a unique page/route.
│ │ ├── BuildsPage.jsx
│ │ ├── CampUpgradesPage.jsx
│ │ ├── HomePage.jsx
│ │ ├── NotFoundPage.jsx
│ │ ├── SmazProfilePage.jsx
│ │ ├── SmazdexPage.jsx
│ │ ├── TeamCompsPage.jsx
│ │ ├── TechTreePage.jsx
│ │ ├── TierListPage.jsx
│ │ └── TraitsPage.jsx
│ │
│ ├── styles/
│ │ └── main.css # Global styles and Tailwind CSS directives.
│ │
│ ├── App.jsx # Root component, contains the router provider.
│ └── main.jsx # Application entry point, defines routes and renders App.
│
├── .gitignore # Standard file to ignore node_modules, dist, etc.
├── index.html # The single HTML entry point for the entire SPA.
├── package.json # Project metadata and dependencies.
├── postcss.config.js # PostCSS configuration (for Tailwind and Autoprefixer).
├── tailwind.config.js # Tailwind CSS theme and plugin configuration.
├── vite.config.js # Vite build tool configuration.
└── README.md # Project documentation.

Generated code
---

### **IV. Data Schema & Management**

The `src/data` directory is the single source of truth. Data is kept in JSON for simplicity and ease of editing. The `src/lib/data-helpers.js` file should be the only place that directly imports these JSON files, providing clean functions for the rest of the app to use.

**Example Schema - `smazs.json`:**
Each Smaz object should have a consistent structure. Note that `id` is added programmatically in `data-helpers.js` for stable keys and routing.
```json
[
  {
    "name": "Fluff Static",
    "skills": [
      {
        "skill_name": "Fluff Static",
        "description": "Deals 208% damage to a single enemy.",
        "ascension_effects": [ "Damage +15%", "Damage +35%", "..." ]
      },
      // ... more skills
    ]
  },
  // ... more Smazs
]
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

Example Schema - overall_battle_tier_list.json:
All tier list files should follow this structure for consistency.

Generated json
{
  "title": "Overall Battle Smaz Tier List",
  "description": "An overall ranking of Smaz...",
  "tiers": [
    {
      "tier": "S",
      "tier_name": "Game-Changing",
      "entries": [
        {
          "name": "Barkplug",
          "explanation": "Top-tier damage dealer that also makes the entire team's damage better."
        },
        // ... more entries
      ]
    },
    // ... more tiers (A, B, C)
  ]
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Json
IGNORE_WHEN_COPYING_END
V. Routing Strategy (src/main.jsx)

A clean routing structure is essential. We will use nested routes with layout components (RootLayout, MechanicsLayout) to avoid boilerplate code.

Generated jsx
// src/main.jsx - The single source of truth for all application routes.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/main.css';

// Layouts
import RootLayout from './layouts/RootLayout';
import MechanicsLayout from './layouts/MechanicsLayout';

// Pages
import HomePage from './pages/HomePage';
import SmazdexPage from './pages/SmazdexPage';
import SmazProfilePage from './pages/SmazProfilePage';
import TierListPage from './pages/TierListPage';
import BuildsPage from './pages/BuildsPage';
import TeamCompsPage from './pages/TeamCompsPage';
import CampUpgradesPage from './pages/CampUpgradesPage';
import TechTreePage from './pages/TechTreePage';
import TraitsPage from './pages/TraitsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Root layout with Header/Footer wraps all pages
    errorElement: <NotFoundPage />, // Catch-all for routing errors
    children: [
      { index: true, element: <HomePage /> },
      { path: 'smazdex', element: <SmazdexPage /> },
      { path: 'smaz/:id', element: <SmazProfilePage /> },
      { path: 'tier-lists', element: <TierListPage /> },
      { path: 'builds', element: <BuildsPage /> },
      { path: 'team-comps', element: <TeamCompsPage /> },
      {
        // Nested route for all game mechanics pages
        path: 'mechanics',
        element: <MechanicsLayout />,
        children: [
          { path: 'camp-upgrades', element: <CampUpgradesPage /> },
          { path: 'tech-tree', element: <TechTreePage /> },
          { path: 'traits', element: <TraitsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> }, // Handles any other path
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Jsx
IGNORE_WHEN_COPYING_END
VI. GitHub Pages Deployment: The Complete Guide

This is the most critical section for ensuring the project works flawlessly on GitHub Pages. Follow these steps precisely.

Step 1: Configure vite.config.js

Vite needs to know the sub-path where the site will be hosted (e.g., https://username.github.io/your-repo-name/).

Generated javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Replace 'smazdeck-app' with your actual GitHub repository name.
const repositoryName = 'smazdeck-app'; 

export default defineConfig({
  // This tells Vite to prepend `/${repositoryName}/` to all asset paths in the build.
  base: `/${repositoryName}/`, 
  plugins: [react()],
})
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END
Step 2: Implement the SPA Routing Fix

GitHub Pages only knows about index.html. When a user refreshes on /smazdex, GitHub will return a 404 error. This two-part fix redirects all 404s back to the main app, which then handles the routing correctly.

A. Create public/404.html
This file catches the 404 error from GitHub, saves the intended URL, and redirects to the root.

Generated html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Smazdeck Survival - Redirecting...</title>
    <script type="text/javascript">
      var path = window.location.pathname;
      var repo = path.split('/')[1];
      sessionStorage.redirect = path + window.location.search + window.location.hash;
      window.location.replace('/' + repo + '/');
    </script>
  </head>
  <body></body>
</html>
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Html
IGNORE_WHEN_COPYING_END

B. Modify index.html
Add a script to the <head> of your main index.html. This script runs on load, checks if a redirect happened, and uses the History API to show the correct URL in the address bar without a page reload.

Generated html
<!-- Add this script to the <head> of your main index.html -->
<script type="text/javascript">
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != window.location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Html
IGNORE_WHEN_COPYING_END
Step 3: Automate Deployment with GitHub Actions

Create the file .github/workflows/deploy.yml. This workflow will automatically build and deploy your site whenever you push to the main branch.

Generated yaml
# .github/workflows/deploy.yml
name: Deploy Vite site to GitHub Pages

on:
  push:
    branches: ['main'] # Trigger the workflow on pushes to the main branch
  workflow_dispatch:   # Allows manual triggering from the Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build static site
        run: npm run build # This executes 'vite build' from package.json
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist' # The output directory from 'npm run build'

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
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Yaml
IGNORE_WHEN_COPYING_END
Step 4: Configure GitHub Repository Settings

The final step is to tell GitHub to use the Actions workflow to deploy your site.

Push your code, including the deploy.yml file, to your repository on GitHub.

Navigate to your repository's Settings tab.

In the left sidebar, click on Pages.

Under the "Build and deployment" section, change the Source from "Deploy from a branch" to "GitHub Actions".

GitHub will now use your deploy.yml workflow. After the action completes successfully (check the "Actions" tab), your site will be live at the URL provided on the Pages settings page.

---

### **VII. Component Architecture & Responsibilities**

This section breaks down the responsibility of each component defined in the file structure. This promotes reusability and a clear separation of concerns.

#### **`/components/ui/` (Generic UI Elements)**

*   **`Card.jsx`**
    *   **Responsibility:** Provides a consistent container style for content blocks.
    *   **Props:** `children`, `className` (for overrides/additions).
    *   **Implementation:** A simple `div` wrapper with base styles from the design system (`bg-slate-800`, `p-4`, `rounded-lg`, `shadow-md`).

*   **`Badge.jsx`**
    *   **Responsibility:** Displays small, inline pieces of information, like traits or categories.
    *   **Props:** `children`, `className`, `variant` (`'primary'`, `'secondary'`, etc.).
    *   **Implementation:** A `span` with base styles. The `variant` prop can map to different color schemes (e.g., primary is `bg-amber-400 text-slate-900`).

*   **`Accordion.jsx`**
    *   **Responsibility:** A collapsible content area to hide/show information, used for tier rows.
    *   **Props:** `title`, `children`, `startOpen` (boolean, optional).
    *   **State:** Manages an internal `isOpen` state via `useState`.
    *   **Implementation:** A `button` for the title and a conditional render for the `children`. Should use Tailwind CSS for smooth open/close transitions and include ARIA attributes (`aria-expanded`, `aria-controls`).

*   **`Tooltip.jsx`**
    *   **Responsibility:** Provides hover-activated informational text.
    *   **Props:** `text`, `children`.
    *   **Implementation:** Can be a simple wrapper using the browser's native `title` attribute for an MVP. For a polished feel, this can be upgraded to a CSS-only or library-based tooltip later.

#### **`/components/common/` (Application-Wide Components)**

*   **`Header.jsx`**
    *   **Responsibility:** Main site navigation.
    *   **Props:** None.
    *   **Implementation:** Uses `NavLink` from `react-router-dom` for all links to provide active styling (`style={({ isActive }) => ...}`). The navigation structure must match the routes defined in `main.jsx`.

*   **`Footer.jsx`**
    *   **Responsibility:** Displays closing information and branding.
    *   **Props:** None.
    *   **Implementation:** A static component containing the site slogan and copyright information.

*   **`SearchBar.jsx`**
    *   **Responsibility:** A controlled input field for filtering lists.
    *   **Props:** `searchTerm` (string), `setSearchTerm` (function), `placeholder` (string).
    *   **Implementation:** An `<input>` element whose `value` and `onChange` are handled by the parent component's state.

#### **`/components/Smaz/` (Smaz-Specific Components)**

*   **`SmazCard.jsx`**
    *   **Responsibility:** A small, clickable card representing one Smaz in a list (Smazdex, Tier Lists).
    *   **Props:** `smaz` (object).
    *   **Implementation:** Wrapped in a `Link` component from `react-router-dom` pointing to `/smaz/${smaz.id}`. Displays the Smaz image and name. Uses the `Card` UI component as its base.

*   **`SmazSkillCard.jsx`**
    *   **Responsibility:** Displays detailed information about a single Smaz skill.
    *   **Props:** `skill` (object).
    *   **Implementation:** Shows the skill name, description, and maps over `ascension_effects` to render a list of `Badge` components.

*   **`TierRow.jsx`**
    *   **Responsibility:** Displays all Smazs belonging to a specific tier (e.g., "S-Tier").
    *   **Props:** `tier` (object containing `tier_name`, `tier` letter, and `smazs` array).
    *   **Implementation:** Uses the `Accordion` component with the `tier.tier_name` as the title. Inside, it maps over the `tier.smazs` array and renders a `SmazCard` for each one in a responsive grid.

---

### **VIII. State Management Philosophy**

The project will adhere to a simple and efficient state management strategy, avoiding unnecessary complexity.

1.  **Local State First:** The vast majority of state will be managed locally within components using `useState`. Examples include the `searchTerm` in `SmazdexPage.jsx` or the `isOpen` flag in `Accordion.jsx`. This is the most performant and easiest-to-understand approach.
2.  **No Global State Manager:** Since all game data is static and loaded from local JSON files, a global state management library (like Redux, Zustand, or MobX) is **not necessary**. This avoids significant boilerplate and complexity. Data is fetched once via `data-helpers.js` when a component mounts and stored in local state with `useState` and `useEffect`.
3.  **Prop Drilling is Acceptable (in moderation):** For this application's scale, passing props down 2-3 levels is perfectly acceptable and more straightforward than implementing a context system.
4.  **Use `useContext` Only if Necessary:** If a piece of state is truly global (e.g., a future dark/light mode toggle) and required by many disconnected components, `React.Context` is the appropriate built-in solution. For this project's defined scope, it is not required.

---

### **IX. Search & Filtering Logic**

The search functionality on pages like the Smazdex will be fast, responsive, and entirely client-side.

*   **Strategy:** On page load, fetch the entire list of Smazs. The search input will filter this already-loaded array in real-time.
*   **Debouncing:** To prevent performance degradation from re-rendering on every single keystroke, a `useDebounce` custom hook will be implemented. This hook delays the state update of the search term until the user has stopped typing for a short period (e.g., 300ms).

    ```javascript
    // src/hooks/useDebounce.js
    import { useState, useEffect } from 'react';

    export function useDebounce(value, delay) {
      const [debouncedValue, setDebouncedValue] = useState(value);
      useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      }, [value, delay]);
      return debouncedValue;
    }
    ```

*   **Implementation:** The page component will have two state variables: `searchTerm` (updates instantly) and `debouncedSearchTerm` (updates via the hook). The filtering logic will use the `debouncedSearchTerm`.
*   **Case-Insensitive:** All search comparisons must be case-insensitive. Convert both the Smaz name and the search term to lowercase before checking for inclusion (`smaz.name.toLowerCase().includes(searchTerm.toLowerCase())`).

---

### **X. Accessibility (a11y) Commitment**

Accessibility is a core requirement, not an afterthought. The site will be built to be usable by as many people as possible.

*   **Semantic HTML:** Use HTML5 elements (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`) correctly to define page structure for screen readers.
*   **Keyboard Navigation:** All interactive elements (`<button>`, `<a>`, `<select>`, `<input>`) must be fully operable via the keyboard alone. A clear and consistent focus outline will be implemented using Tailwind's focus utilities (e.g., `focus:ring-2 focus:ring-offset-2 focus:ring-amber-400`).
*   **ARIA Attributes:** Use ARIA (Accessible Rich Internet Applications) attributes where semantic HTML is insufficient. For example, `aria-expanded` on accordions and `aria-label` for icon-only buttons.
*   **Image Alt Text:** Every `<img>` tag must have a descriptive `alt` attribute. For purely decorative images, use `alt=""`.
*   **Color Contrast:** The chosen design system must adhere to WCAG 2.1 AA contrast ratios for all text against its background.

---

### **XI. Performance & Optimization Strategy**

The goal is a sub-second load time and a buttery-smooth user experience.

*   **Build Optimizations (Handled by Vite):**
    *   **Tree Shaking:** Unused code is automatically eliminated from the final bundle.
    *   **Code Splitting:** Vite automatically splits code by route, so users only download the JavaScript needed for the current page.
    *   **Minification:** All JS, CSS, and HTML is minified for the smallest possible file size.
*   **Asset Optimization:**
    *   **Images:** All images in `public/images/` must be compressed before being added to the repository. Use tools like **TinyPNG** or **ImageOptim**. Convert images to a modern format like **WebP** where possible for further size reduction.
*   **React Best Practices:**
    *   **`React.memo`:** Wrap components like `SmazCard` in `React.memo` to prevent them from re-rendering if their props haven't changed, which is common in large lists.
    *   **Stable Keys:** Always use a stable, unique ID (like `smaz.id`) for the `key` prop when rendering lists with `.map()`.
    *   **Minimal Re-renders:** Keep state as local as possible to avoid triggering unnecessary renders of the entire component tree.

---

### **XII. Search Engine Optimization (SEO) for SPAs**

To ensure the guide is discoverable on search engines, dynamic page titles and meta tags are essential.

*   **Tool:** The `react-helmet-async` library will be used. It provides a simple, declarative way to manage the document head.
*   **Setup:**
    1.  Install the package: `npm install react-helmet-async`.
    2.  Wrap the entire application in `main.jsx` with the `<HelmetProvider>`.
*   **Implementation:** In every page component (e.g., `SmazProfilePage.jsx`), use the `<Helmet>` component to set page-specific metadata.

    ```jsx
    // Example in src/pages/SmazProfilePage.jsx
    import { Helmet } from 'react-helmet-async';
    // ...

    function SmazProfilePage() {
      // ... (logic to get smaz data)

      if (!smaz) return null;

      return (
        <>
          <Helmet>
            <title>{smaz.name} | Smazdeck Survival</title>
            <meta name="description" content={`Complete guide to ${smaz.name}, including skills, stats, and optimal builds in Smazdeck Survival.`} />
          </Helmet>
          {/* ... rest of the page JSX */}
        </>
      );
    }
    ```

---

### **XIII. Project Dependencies & Scripts (`package.json`)**

This is the definitive list of dependencies required to build and run the project.

```json
{
  "name": "smazdeck-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",              // Core library for building the UI.
    "react-dom": "^18.2.0",            // Renders React components in the DOM.
    "react-helmet-async": "^2.0.4",  // Manages document head for SEO.
    "react-router-dom": "^6.22.3"      // Handles client-side routing.
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1", // Vite plugin for React integration.
    "autoprefixer": "^10.4.19",      // Adds vendor prefixes to CSS.
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",              // CSS transformation tool.
    "tailwindcss": "^3.4.3",        // Utility-first CSS framework.
    "vite": "^5.2.0"                  // The build tool and development server.
  }
}

### **XIV. Detailed Page-by-Page Component Breakdown**

This section outlines the specific components, state, and logic required for each page, serving as a direct implementation guide.

#### **`HomePage.jsx`**
*   **Purpose:** The main landing page, providing a high-level overview and navigation to key sections.
*   **State:** None. This is a static presentational page.
*   **Components Used:**
    *   `RootLayout` (via router)
    *   `ui/Card`
    *   `react-router-dom/Link`
*   **Logic:** Simple JSX rendering links to the Smazdex and Tier Lists pages.

#### **`SmazdexPage.jsx`**
*   **Purpose:** Displays a searchable, filterable grid of all Smazs in the game.
*   **State:**
    *   `smazs` (Array): Holds the complete list of Smaz objects, loaded once on mount.
    *   `searchTerm` (String): The current value of the search input, updated on every keystroke.
    *   `debouncedSearchTerm` (String): The debounced value of `searchTerm`, used for filtering to prevent re-renders on every key press.
*   **Components Used:**
    *   `RootLayout`
    *   `common/SearchBar`
    *   `Smaz/SmazCard`
*   **Logic:**
    1.  On mount (`useEffect`), call `getAllSmazs()` from `data-helpers.js` and set the `smazs` state.
    2.  The `SearchBar` component's value is controlled by the `searchTerm` state.
    3.  The `useDebounce` hook listens to `searchTerm` and updates `debouncedSearchTerm` after a delay.
    4.  A `filteredSmazs` array is derived by filtering the main `smazs` array based on the `debouncedSearchTerm`.
    5.  The component maps over `filteredSmazs` to render a grid of `SmazCard` components.

#### **`SmazProfilePage.jsx`**
*   **Purpose:** Displays all detailed information for a single Smaz.
*   **State:**
    *   `smaz` (Object | null): Holds the data for the specific Smaz being viewed. Initialized to `null`.
*   **Components Used:**
    *   `RootLayout`
    *   `ui/Card`
    *   `Smaz/SmazSkillCard`
    *   `react-helmet-async/Helmet`
*   **Logic:**
    1.  Uses the `useParams` hook from `react-router-dom` to get the `:id` from the URL.
    2.  On mount or when `id` changes (`useEffect`), it calls `getSmazById(id)` and sets the `smaz` state.
    3.  If `smaz` is `null`, it displays a loading message or a "Not Found" component.
    4.  If `smaz` is found, it renders the Smaz image, name, and maps over `smaz.skills` to display a list of `SmazSkillCard` components.
    5.  Uses the `Helmet` component to dynamically set the page title and meta description for SEO.

#### **`TierListPage.jsx`**
*   **Purpose:** Displays various game tier lists, selectable via a dropdown.
*   **State:**
    *   `allTierLists` (Object): A static object containing all tier list data, loaded once.
    *   `selectedTierListKey` (String): The key of the currently selected tier list (e.g., `'overall_battle_tier_list'`).
    *   `processedTierList` (Object | null): The data for the selected tier list, processed to include full Smaz objects instead of just names.
*   **Components Used:**
    *   `RootLayout`
    *   `Smaz/TierRow`
*   **Logic:**
    1.  On mount, loads all tier list data and all Smaz data.
    2.  A dropdown (`<select>`) allows the user to change the `selectedTierListKey`.
    3.  An `useEffect` hook runs whenever `selectedTierListKey` changes. It finds the corresponding tier list data, iterates through its tiers and entries, and replaces the Smaz names with the full Smaz objects (including ID and image path) from the master Smaz list. The result is set in `processedTierList`.
    4.  The component maps over the `processedTierList.tiers` to render a `TierRow` for each tier.

#### **`BuildsPage.jsx`**, **`TeamCompsPage.jsx`**, etc.
*   **Purpose:** To display static, guide-style data from JSON files.
*   **State:** A single state variable (e.g., `builds`) to hold the data loaded from the corresponding helper function.
*   **Components Used:**
    *   `RootLayout`
    *   `ui/Card`
    *   `ui/Badge`
*   **Logic:** On mount (`useEffect`), these pages call their respective data helper function (e.g., `getAllBuilds()`) and set the state. They then map over the data to render it in a structured, readable format using UI components.

#### **`NotFoundPage.jsx`**
*   **Purpose:** A user-friendly page for any route that doesn't match, including the initial 404 from GitHub Pages.
*   **State:** None.
*   **Components Used:**
    *   `RootLayout`
    *   `react-router-dom/Link`
*   **Logic:** Simple static JSX.

---

### **XV. Code Style & Linting Configuration**

To maintain a pristine and consistent codebase, a strict ESLint configuration is mandatory.

*   **Configuration File:** `.eslintrc.cjs` (or similar, depending on ESLint version).
*   **Core Rules & Plugins:**
    *   `eslint:recommended`: The baseline set of recommended rules.
    *   `plugin:react/recommended`: Standard React-specific linting rules.
    *   `plugin:react/jsx-runtime`: Eliminates the need for `import React from 'react'` in every file.
    *   `plugin:react-hooks/recommended`: Enforces the Rules of Hooks.
    *   `plugin:react-refresh/recommended`: Ensures components are compatible with Vite's Fast Refresh.
*   **Key Configuration Details:**

    ```javascript
    // .eslintrc.cjs
    module.exports = {
      root: true,
      env: { browser: true, es2020: true },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      ignorePatterns: ['dist', '.eslintrc.cjs'],
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      settings: { react: { version: '18.2' } },
      plugins: ['react-refresh'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'react/prop-types': 'off', // Prop types are not necessary for a project of this scale with static data.
        'no-unused-vars': ['warn', { 'args': 'none' }], // Warn about unused variables, but ignore unused function arguments.
        'indent': ['error', 2], // Enforce 2-space indentation.
        'quotes': ['error', 'single'], // Enforce single quotes.
        'semi': ['error', 'always'], // Require semicolons.
        'eqeqeq': 'error', // Require the use of === and !==.
        'no-console': 'warn', // Warn about console.log statements left in the code.
      },
    };
    ```

---

### **XVI. Error Handling Strategy**

A robust application anticipates and gracefully handles errors.

1.  **Routing Errors (404 Not Found):**
    *   **Mechanism:** Handled by React Router's `errorElement` property on the root route definition in `main.jsx`.
    *   **Implementation:** The `errorElement` will be our custom `NotFoundPage.jsx`. This provides a consistent "Not Found" experience for both invalid internal links and direct access to non-existent URLs.

2.  **Data Loading Errors:**
    *   **Scenario:** A Smaz ID in the URL is invalid (e.g., `/smaz/999`).
    *   **Mechanism:** The data helper function (`getSmazById`) will return `undefined`.
    *   **Implementation:** The component (`SmazProfilePage`) must check for this. If the state variable for the data remains `null` or `undefined` after the fetch attempt, it should render a user-friendly "Smaz not found" message or redirect to the `NotFoundPage`.

3.  **Component Rendering Errors (Runtime Errors):**
    *   **Mechanism:** React's built-in Error Boundaries.
    *   **Strategy:** For this application's complexity, a single, app-wide error boundary is sufficient. This can be wrapped around the `<Outlet />` in `RootLayout.jsx`.
    *   **Implementation (Optional but Recommended):** Create a generic `ErrorBoundary.jsx` component that catches JavaScript errors in its child component tree, logs those errors, and displays a fallback UI instead of a crashed application.

---

### **XVII. Testing Strategy (Future-Proofing)**

While not required for the initial launch, this blueprint outlines a testing strategy to ensure long-term stability and easier maintenance.

*   **Unit Tests (Vitest):**
    *   **Target:** `src/lib/data-helpers.js`. Test that functions like `getAllSmazs` and `getSmazById` return the expected data format and handle edge cases (e.g., invalid IDs) correctly.
    *   **Why:** Ensures the core data logic is reliable and free of regressions.

*   **Component Tests (Vitest + React Testing Library):**
    *   **Target:** `src/components/ui/` and `src/components/common/`. Test individual UI components in isolation.
    *   **Example:** For `Accordion.jsx`, test that clicking the button toggles the visibility of its children. For `SearchBar.jsx`, test that typing into the input correctly calls the `setSearchTerm` prop.
    *   **Why:** Verifies that UI components behave as expected and are accessible.

*   **End-to-End (E2E) Tests (Playwright or Cypress):**
    *   **Target:** Critical user flows.
    *   **Example Scenarios:**
        1.  A user navigates to the Smazdex, types "Barkplug" into the search bar, and verifies that only the Barkplug card is visible.
        2.  A user clicks on the Barkplug card, is taken to the correct profile page, and verifies the skill "Ion Disruption" is displayed.
        3.  A user navigates to the Tier Lists, selects "Production Smaz Tier List" from the dropdown, and confirms that Baboom is listed in the S-Tier.
    *   **Why:** Guarantees that the entire application works together as a cohesive whole from the user's perspective.

---

### **XVIII. Pre-Deployment Quality & Launch Checklist**

This checklist must be completed before every deployment to `main` to ensure the highest quality.

*   **[ ] Code Quality & Linting:**
    *   Run `npm run lint`. There must be zero errors.
    *   All code has been formatted according to project standards (e.g., Prettier).

*   **[ ] Functionality:**
    *   All internal links navigate to the correct pages.
    *   Search/filter functionality works as expected on all relevant pages.
    *   The SPA routing fix has been tested by directly navigating to a deep link (e.g., `your-site/smaz/5`) and refreshing the page.

*   **[ ] Performance:**
    *   All images in `public/images/` have been compressed.
    *   Run a Lighthouse audit on the production build. Aim for scores of 95+ in Performance, Accessibility, Best Practices, and SEO.

*   **[ ] Accessibility (a11y):**
    *   Manually tab through all interactive elements on each page to ensure logical order and visible focus states.
    *   Verify all images have meaningful `alt` text.
    *   Check for sufficient color contrast using browser developer tools.

*   **[ ] SEO:**
    *   Verify that each page has a unique and descriptive `<title>` and `<meta name="description">` via `react-helmet-async`.
    *   The `public/favicon.ico` is present and correctly configured.

*   **[ ] Configuration:**
    *   The `base` path in `vite.config.js` exactly matches the GitHub repository name.
    *   The `404.html` and `index.html` scripts for the SPA redirect are in place.

---
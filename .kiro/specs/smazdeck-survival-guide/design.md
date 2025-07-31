# Design Document

## Overview

The Smazdeck Survival Guide is a static React application built with Vite, designed for optimal performance and seamless deployment to GitHub Pages. The application follows a component-based architecture with a clear separation of concerns, utilizing Tailwind CSS for consistent styling and React Router for client-side navigation. The design prioritizes performance, accessibility, and maintainability while providing a comprehensive resource for competitive players.

## Architecture

### Technology Stack
- **Frontend Framework:** React 18 with functional components and hooks
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** React Router DOM v6 with nested routes and layouts
- **Styling:** Tailwind CSS with custom design system
- **SEO:** React Helmet Async for dynamic meta tags
- **Deployment:** GitHub Actions with automated deployment to GitHub Pages

### Application Structure
```
smazdeck-app/
├── .github/workflows/deploy.yml    # CI/CD pipeline
├── public/
│   ├── images/smazs/              # Smaz profile images
│   ├── icons/                     # UI icons
│   ├── 404.html                   # SPA routing fix
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/                # Shared components
│   │   ├── Smaz/                  # Smaz-specific components
│   │   └── ui/                    # Generic UI elements
│   ├── data/                      # JSON data files
│   ├── hooks/                     # Custom React hooks
│   ├── layouts/                   # Layout components
│   ├── lib/                       # Data helpers and utilities
│   ├── pages/                     # Route components
│   └── styles/                    # Global styles
└── Configuration files
```

### Design System
- **Primary Colors:** Dark theme with slate backgrounds (#111827, #1F2937)
- **Accent Colors:** Amber primary (#FBBF24), tier-specific colors
- **Typography:** Inter for body text, Exo 2 for headings
- **Component Patterns:** Card-based layouts, consistent spacing, accessible interactions

## Components and Interfaces

### Core Layout Components

#### RootLayout
- **Purpose:** Provides consistent header/footer structure for all pages
- **Features:** Navigation menu, responsive design, semantic HTML structure
- **Props:** None (uses Outlet for child routes)

#### MechanicsLayout  
- **Purpose:** Nested layout for game mechanics pages
- **Features:** Sub-navigation for mechanics sections
- **Props:** None (uses Outlet for child routes)

### UI Components

#### Card Component
```jsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
```
- **Purpose:** Consistent container styling with dark theme
- **Implementation:** Base styles with Tailwind classes, customizable via className

#### Badge Component
```jsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tier';
  className?: string;
}
```
- **Purpose:** Display small pieces of information (traits, categories)
- **Implementation:** Variant-based styling with color mapping

#### Accordion Component
```jsx
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  startOpen?: boolean;
}
```
- **Purpose:** Collapsible content sections for tier lists
- **Implementation:** useState for open/closed state, ARIA attributes for accessibility

### Smaz-Specific Components

#### SmazCard Component
```jsx
interface SmazCardProps {
  smaz: {
    id: string;
    name: string;
    image?: string;
  };
}
```
- **Purpose:** Clickable card representation in lists and grids
- **Implementation:** React Router Link wrapper, optimized images, hover effects

#### SmazSkillCard Component
```jsx
interface SmazSkillCardProps {
  skill: {
    skill_name: string;
    description: string;
    ascension_effects: string[];
  };
}
```
- **Purpose:** Detailed skill information display
- **Implementation:** Card layout with badges for ascension effects

#### TierRow Component
```jsx
interface TierRowProps {
  tier: {
    tier: string;
    tier_name: string;
    entries: Array<{
      name: string;
      explanation: string;
      smaz?: SmazData;
    }>;
  };
}
```
- **Purpose:** Expandable tier section with Smaz grid
- **Implementation:** Accordion wrapper with responsive grid layout

### Page Components

#### SmazdexPage
- **State Management:** Local state for Smazs list, search term, and debounced search
- **Features:** Real-time search with debouncing, responsive grid layout
- **Performance:** React.memo for SmazCard components, stable keys for list rendering

#### SmazProfilePage
- **State Management:** Single Smaz object loaded by ID from URL params
- **Features:** Dynamic SEO meta tags, comprehensive skill display
- **Error Handling:** Loading states and 404 handling for invalid IDs

#### TierListPage
- **State Management:** All tier lists, selected tier list key, processed tier data
- **Features:** Dropdown selection, dynamic tier list processing
- **Data Processing:** Replaces Smaz names with full objects including images and IDs

## Data Models

### Smaz Data Structure
```json
{
  "id": "generated-unique-id",
  "name": "Smaz Name",
  "skills": [
    {
      "skill_name": "Skill Name",
      "description": "Skill description",
      "ascension_effects": ["Effect 1", "Effect 2"]
    }
  ]
}
```

### Tier List Structure
```json
{
  "title": "Tier List Title",
  "description": "Tier list description",
  "tiers": [
    {
      "tier": "S",
      "tier_name": "Tier Display Name",
      "entries": [
        {
          "name": "Smaz Name",
          "explanation": "Tier placement explanation"
        }
      ]
    }
  ]
}
```

### Data Management Strategy
- **Single Source of Truth:** All data stored in `src/data/` JSON files
- **Data Helpers:** Centralized functions in `src/lib/data-helpers.js`
- **ID Generation:** Programmatic ID assignment for stable routing and keys
- **Caching:** Browser caching for static JSON files, no runtime caching needed

## Error Handling

### Client-Side Error Boundaries
- **Implementation:** React Error Boundaries for component-level error catching
- **Fallback UI:** User-friendly error messages with navigation options
- **Error Logging:** Console logging for development debugging

### Routing Error Handling
- **404 Pages:** Custom NotFoundPage component for invalid routes
- **SPA Routing Fix:** GitHub Pages 404.html redirect mechanism
- **URL Validation:** Parameter validation in route components

### Data Loading Error Handling
- **Loading States:** Skeleton components and loading indicators
- **Failed Requests:** Retry mechanisms and error messages
- **Missing Data:** Graceful degradation with placeholder content

## Testing Strategy

### Component Testing
- **Unit Tests:** Individual component functionality and prop handling
- **Integration Tests:** Component interaction and data flow
- **Accessibility Tests:** ARIA attributes and keyboard navigation

### Performance Testing
- **Bundle Analysis:** Vite bundle analyzer for optimization opportunities
- **Lighthouse Audits:** Performance, accessibility, and SEO scoring
- **Load Testing:** Page load times and interaction responsiveness

### Cross-Browser Testing
- **Modern Browsers:** Chrome, Firefox, Safari, Edge support
- **Mobile Testing:** iOS Safari and Android Chrome compatibility
- **Responsive Testing:** Various screen sizes and orientations

## Performance Optimizations

### Build Optimizations
- **Code Splitting:** Automatic route-based splitting via Vite
- **Tree Shaking:** Unused code elimination
- **Asset Optimization:** Image compression and modern formats (WebP)
- **Minification:** JavaScript, CSS, and HTML minification

### Runtime Optimizations
- **React.memo:** Prevent unnecessary re-renders in list components
- **Debounced Search:** 300ms delay for search input to reduce renders
- **Lazy Loading:** Dynamic imports for non-critical components
- **Stable Keys:** Consistent key props for efficient list updates

### Caching Strategy
- **Static Assets:** Long-term caching for images and fonts
- **Application Code:** Cache busting via Vite's hash-based filenames
- **Data Files:** Browser caching for JSON data with appropriate headers

## Accessibility Implementation

### Semantic HTML Structure
- **Landmarks:** Proper use of header, nav, main, section, footer elements
- **Headings:** Logical heading hierarchy (h1-h6)
- **Lists:** Proper ul/ol structure for navigation and content

### ARIA Implementation
- **Labels:** aria-label for icon buttons and complex interactions
- **States:** aria-expanded for accordions, aria-current for navigation
- **Descriptions:** aria-describedby for additional context
- **Live Regions:** aria-live for dynamic content updates

### Keyboard Navigation
- **Focus Management:** Logical tab order and visible focus indicators
- **Keyboard Shortcuts:** Standard navigation patterns (Enter, Space, Arrow keys)
- **Skip Links:** Skip to main content functionality
- **Focus Trapping:** Modal and dropdown focus management

### Visual Accessibility
- **Color Contrast:** WCAG 2.1 AA compliance for all text/background combinations
- **Focus Indicators:** High-contrast focus rings using Tailwind utilities
- **Alternative Text:** Descriptive alt attributes for all content images
- **Scalable Text:** Relative units and responsive typography

## SEO and Meta Tag Strategy

### Dynamic Meta Tags
- **Page Titles:** Unique, descriptive titles for each route
- **Meta Descriptions:** Compelling descriptions for search results and social sharing
- **Open Graph Tags:** Social media preview optimization
- **Canonical URLs:** Proper URL structure for search indexing

### Content Structure
- **Structured Data:** JSON-LD markup for rich snippets
- **Sitemap Generation:** Automated sitemap for search engine discovery
- **Robot.txt:** Search engine crawling guidelines
- **Internal Linking:** Strategic cross-linking between related content

### GitHub Pages SEO Considerations
- **Custom Domain:** Optional custom domain configuration
- **HTTPS:** Secure connection for SEO benefits
- **URL Structure:** Clean, descriptive URLs without hash routing
- **Performance:** Fast loading times as ranking factor
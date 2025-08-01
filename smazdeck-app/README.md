# Smazdeck Survival Guide

A comprehensive, data-driven web application designed to be the definitive resource for competitive Smazdeck Survival players. The application provides tier lists, character profiles, build guides, team compositions, and game mechanics information through a fast, accessible, and mobile-friendly interface.

## Features

- **Smazdex**: Complete database of all Smazs with detailed profiles, skills, and ascension effects
- **Tier Lists**: Multiple tier rankings for different game modes and strategies
- **Build Guides**: Recommended battle builds with detailed information
- **Team Compositions**: Effective team combinations and strategic explanations
- **Game Mechanics**: Information about camp upgrades, tech tree buffs, and traits
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation support
- **SEO Optimized**: Dynamic meta tags and structured content for search engines

## Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router DOM v6 with nested routes and layouts
- **Styling**: Tailwind CSS with custom design system
- **SEO**: React Helmet Async for dynamic meta tags
- **Testing**: Vitest with React Testing Library
- **Deployment**: GitHub Actions with automated deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smazdeck-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically

## Project Structure

```
smazdeck-app/
├── .github/workflows/     # CI/CD pipeline configuration
├── public/               # Static assets
│   ├── images/smazs/    # Smaz profile images
│   ├── icons/           # UI icons
│   └── 404.html         # SPA routing fix for GitHub Pages
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Shared components
│   │   ├── Smaz/        # Smaz-specific components
│   │   └── ui/          # Generic UI elements
│   ├── data/            # JSON data files
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Data helpers and utilities
│   ├── pages/           # Route components
│   └── styles/          # Global styles
└── Configuration files
```

## Data Management

The application uses a centralized data management system:

- **Data Files**: All game data is stored in `src/data/` as JSON files
- **Data Helpers**: Centralized functions in `src/lib/data-helpers.js` for data access
- **ID Generation**: Programmatic ID assignment for stable routing and keys
- **Caching**: Browser caching for static JSON files

## Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions:

1. **Automatic Deployment**: Push to the main branch triggers automatic build and deployment
2. **Build Process**: Vite optimizes assets through code splitting and minification
3. **SPA Routing**: Custom 404.html handles client-side routing on GitHub Pages
4. **Performance**: Optimized for fast loading with code splitting and asset optimization

### Manual Deployment

To deploy manually:

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist/` directory
3. Deploy the contents of `dist/` to your hosting provider

## Testing

The application includes comprehensive test coverage:

- **Unit Tests**: Individual component functionality and prop handling
- **Integration Tests**: Component interaction and data flow
- **Accessibility Tests**: ARIA attributes and keyboard navigation

Run tests with:
```bash
npm run test
```

## Accessibility

The application is built with accessibility in mind:

- **Semantic HTML**: Proper use of landmarks and heading hierarchy
- **ARIA Implementation**: Labels, states, and descriptions for screen readers
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Alternative Text**: Descriptive alt attributes for all content images

## Performance

The application is optimized for performance:

- **Code Splitting**: Automatic route-based splitting via Vite
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image compression and modern formats
- **Debounced Search**: 300ms delay for search input to reduce renders
- **React.memo**: Prevent unnecessary re-renders in list components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `npm run test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Icons and images from the Smazdeck Survival community
- Deployed on GitHub Pages

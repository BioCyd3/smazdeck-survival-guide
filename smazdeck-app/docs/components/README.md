# Component Documentation

This directory contains comprehensive documentation for all enhanced components in the Smazdeck Survival Guide application. The components are organized into categories for easy navigation and reference.

## Component Categories

### UI Components (`/src/components/ui/`)
Core reusable UI components that form the foundation of the design system:

- **[Button](./ui/Button.md)** - Comprehensive button system with variants, sizes, and states
- **[Card](./ui/Card.md)** - Flexible card component with multiple variants and layouts
- **[Typography](./ui/Typography.md)** - Heading, Text, Caption, and Label components
- **[Form Controls](./ui/FormControls.md)** - Input, Select, Checkbox, Radio, and SearchBar components
- **[Navigation](./ui/Navigation.md)** - Breadcrumb, Tabs, Pagination, and MobileNavigation components
- **[Feedback](./ui/Feedback.md)** - LoadingSpinner, LoadingState, Skeleton, and ProgressBar components
- **[Layout](./ui/Layout.md)** - ResponsiveContainer, ResponsiveTable, and layout utilities
- **[Interactive](./ui/Interactive.md)** - Tooltip, Accordion, and other interactive components

### Smaz Components (`/src/components/Smaz/`)
Specialized components for displaying Smaz-related data:

- **[SmazCard](./smaz/SmazCard.md)** - Enhanced Smaz profile display component
- **[TierList](./smaz/TierList.md)** - Tier list visualization and interaction components
- **[SmazSkillCard](./smaz/SmazSkillCard.md)** - Skill and ability display component
- **[SmazTraitBadge](./smaz/SmazTraitBadge.md)** - Trait visualization component

### Common Components (`/src/components/common/`)
Shared application-level components:

- **[Header](./common/Header.md)** - Application header with navigation
- **[Footer](./common/Footer.md)** - Application footer
- **[SearchBar](./common/SearchBar.md)** - Global search functionality

### Layout Components (`/src/components/layout/`)
Page and section layout components:

- **[MobilePageLayout](./layout/MobilePageLayout.md)** - Mobile-optimized page layout
- **[RootLayout](./layout/RootLayout.md)** - Application root layout wrapper

## Accessibility Features

All components in this documentation include:

- **WCAG AA Compliance** - Color contrast ratios and accessibility standards
- **Keyboard Navigation** - Full keyboard support with proper focus management
- **Screen Reader Support** - Semantic HTML and ARIA labels
- **Touch-Friendly Design** - Optimized for mobile and touch interactions
- **Responsive Design** - Mobile-first approach with breakpoint documentation

## Usage Guidelines

### Import Patterns
```jsx
// Individual component import (recommended)
import { Button } from '../components/ui/Button';

// Multiple components from same module
import { Card, CardHeader, CardContent } from '../components/ui/Card';

// Smaz-specific components
import { SmazCard } from '../components/Smaz/SmazCard';
```

### Styling Conventions
- All components use Tailwind CSS classes
- Custom CSS is minimal and component-scoped
- Design tokens are defined in `tailwind.config.js`
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

### Testing
Each component includes:
- Unit tests with React Testing Library
- Accessibility tests with @axe-core/react
- Visual regression tests for consistent styling
- Keyboard navigation tests

## Best Practices

1. **Semantic HTML** - Use appropriate HTML elements for accessibility
2. **Progressive Enhancement** - Ensure functionality without JavaScript
3. **Mobile-First** - Design for mobile devices first, then enhance for desktop
4. **Performance** - Optimize for Core Web Vitals and loading performance
5. **Consistency** - Follow established patterns and design tokens

## Quick Reference

### Common Props
Most components share these common props:

- `className` - Additional CSS classes
- `children` - Component content
- `disabled` - Disabled state
- `loading` - Loading state
- `size` - Size variant (`xs`, `sm`, `md`, `lg`, `xl`)
- `variant` - Style variant (component-specific)

### Responsive Utilities
- `useResponsive()` hook for device detection
- Touch-friendly sizing on mobile devices
- Automatic layout adjustments for different screen sizes

### Animation Classes
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-scale-in` - Scale in animation
- `animate-glow-pulse` - Glow pulse effect
- `animate-float` - Floating animation

For detailed information about each component, navigate to the specific component documentation files.
# Design System Documentation

The Smazdeck Survival Guide design system provides a comprehensive set of design tokens, components, and guidelines for creating consistent, accessible, and visually appealing user interfaces.

## Overview

### Design Philosophy
- **Gaming Aesthetic**: Dark theme with vibrant accents that appeal to gamers
- **Readability First**: Optimized typography and contrast for extended reading
- **Accessibility**: WCAG AA compliant with inclusive design principles
- **Performance**: Lightweight and optimized for fast loading
- **Consistency**: Systematic approach to colors, spacing, and typography

### Design Tokens
All design decisions are codified as design tokens in `tailwind.config.js`:
- **Colors**: Comprehensive color palette with semantic meanings
- **Typography**: Font families, sizes, and line heights
- **Spacing**: Consistent spacing scale based on 8px grid
- **Shadows**: Depth system with gaming-inspired glows
- **Animations**: Smooth transitions and micro-interactions

## Color System

### Primary Palette

#### Slate (Base Colors)
The foundation of the dark theme interface:

```css
slate-50:  #f8fafc  /* Lightest text */
slate-100: #f1f5f9  /* Primary text */
slate-200: #e2e8f0  /* Secondary text */
slate-300: #cbd5e1  /* Tertiary text */
slate-400: #94a3b8  /* Muted text */
slate-500: #64748b  /* Disabled text */
slate-600: #475569  /* Borders */
slate-700: #334155  /* Card backgrounds */
slate-800: #1e293b  /* Primary backgrounds */
slate-850: #172033  /* Custom intermediate */
slate-900: #0f172a  /* Page background */
slate-950: #020617  /* Deepest background */
```

#### Primary (Amber)
Brand color for primary actions and highlights:

```css
primary-50:  #fefce8  /* Lightest tint */
primary-100: #fef9c3
primary-200: #fef08a
primary-300: #fde047
primary-400: #facc15  /* Primary brand color */
primary-500: #eab308  /* Default primary */
primary-600: #ca8a04  /* Hover state */
primary-700: #a16207  /* Active state */
primary-800: #854d0e
primary-900: #713f12
primary-950: #422006  /* Darkest shade */
```

#### Secondary (Blue)
Supporting color for secondary actions:

```css
secondary-50:  #f0f9ff
secondary-100: #e0f2fe
secondary-200: #bae6fd
secondary-300: #7dd3fc
secondary-400: #38bdf8
secondary-500: #0ea5e9  /* Default secondary */
secondary-600: #0284c7  /* Hover state */
secondary-700: #0369a1  /* Active state */
secondary-800: #075985
secondary-900: #0c4a6e
secondary-950: #082f49
```

### Tier Colors
Special colors for tier list rankings:

#### S-Tier (Red)
```css
tier-s-50:  #fef2f2
tier-s-100: #fee2e2
tier-s-200: #fecaca
tier-s-300: #fca5a5
tier-s-400: #f87171
tier-s-500: #ef4444  /* S-tier red */
tier-s-600: #dc2626
tier-s-700: #b91c1c
tier-s-800: #991b1b
tier-s-900: #7f1d1d
```

#### A-Tier (Purple)
```css
tier-a-50:  #faf5ff
tier-a-100: #f3e8ff
tier-a-200: #e9d5ff
tier-a-300: #d8b4fe
tier-a-400: #c084fc
tier-a-500: #a855f7  /* A-tier purple */
tier-a-600: #9333ea
tier-a-700: #7c3aed
tier-a-800: #6b21a8
tier-a-900: #581c87
```

#### B-Tier (Blue)
```css
tier-b-50:  #eff6ff
tier-b-100: #dbeafe
tier-b-200: #bfdbfe
tier-b-300: #93c5fd
tier-b-400: #60a5fa
tier-b-500: #3b82f6  /* B-tier blue */
tier-b-600: #2563eb
tier-b-700: #1d4ed8
tier-b-800: #1e40af
tier-b-900: #1e3a8a
```

#### C-Tier (Green)
```css
tier-c-50:  #ecfdf5
tier-c-100: #d1fae5
tier-c-200: #a7f3d0
tier-c-300: #6ee7b7
tier-c-400: #34d399
tier-c-500: #10b981  /* C-tier green */
tier-c-600: #059669
tier-c-700: #047857
tier-c-800: #065f46
tier-c-900: #064e3b
```

### Semantic Colors

#### Success
```css
success-500: #22c55e  /* Success green */
success-600: #16a34a  /* Hover state */
success-700: #15803d  /* Active state */
```

#### Warning
```css
warning-500: #f59e0b  /* Warning amber */
warning-600: #d97706  /* Hover state */
warning-700: #b45309  /* Active state */
```

#### Error
```css
error-500: #ef4444  /* Error red */
error-600: #dc2626  /* Hover state */
error-700: #b91c1c  /* Active state */
```

#### Info
```css
info-500: #0ea5e9  /* Info blue */
info-600: #0284c7  /* Hover state */
info-700: #0369a1  /* Active state */
```

### Color Usage Guidelines

#### Text Colors
```jsx
// Primary text on dark backgrounds
<p className="text-slate-100">Primary text content</p>

// Secondary text for less important information
<p className="text-slate-200">Secondary text content</p>

// Muted text for captions and metadata
<p className="text-slate-400">Muted text content</p>

// Accent text for highlights
<p className="text-amber-400">Highlighted content</p>
```

#### Background Colors
```jsx
// Page background
<body className="bg-slate-900">

// Card backgrounds
<div className="bg-slate-800">

// Interactive element backgrounds
<button className="bg-amber-500 hover:bg-amber-600">
```

#### Border Colors
```jsx
// Default borders
<div className="border border-slate-700">

// Interactive borders
<input className="border border-slate-600 focus:border-amber-400">

// Tier-specific borders
<div className="border-2 border-tier-s-500">
```

## Typography System

### Font Families

#### Sans (Body Text)
Primary font for body text and UI elements:
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
```

**Characteristics:**
- Excellent readability at all sizes
- Comprehensive character set
- Optimized for screens
- Multiple weights available

#### Display (Headings)
Font for headings and display text:
```css
font-family: 'Exo 2', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Characteristics:**
- Gaming-inspired aesthetic
- Strong visual presence
- Good for headings and titles
- Maintains readability

#### Mono (Code)
Monospace font for code and technical content:
```css
font-family: 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'Menlo', 'Consolas', 'DejaVu Sans Mono', monospace;
```

**Characteristics:**
- Programming ligatures (Fira Code)
- Excellent code readability
- Consistent character width
- Multiple fallbacks

### Font Sizes and Line Heights

#### Typography Scale
```css
text-xs:   0.75rem (12px) / 1rem (16px)     /* Small UI text */
text-sm:   0.875rem (14px) / 1.25rem (20px) /* Secondary text */
text-base: 1rem (16px) / 1.5rem (24px)      /* Body text */
text-lg:   1.125rem (18px) / 1.75rem (28px) /* Large body text */
text-xl:   1.25rem (20px) / 1.75rem (28px)  /* Small headings */
text-2xl:  1.5rem (24px) / 2rem (32px)      /* Medium headings */
text-3xl:  1.875rem (30px) / 2.25rem (36px) /* Large headings */
text-4xl:  2.25rem (36px) / 2.5rem (40px)   /* Display headings */
text-5xl:  3rem (48px) / 1                  /* Hero headings */
text-6xl:  3.75rem (60px) / 1               /* Large hero */
text-7xl:  4.5rem (72px) / 1                /* Extra large */
text-8xl:  6rem (96px) / 1                  /* Massive */
text-9xl:  8rem (128px) / 1                 /* Extreme */
```

#### Responsive Typography
Typography scales across breakpoints:

```jsx
// Responsive heading sizes
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>

// Responsive body text
<p className="text-sm md:text-base lg:text-lg">
  Responsive body text
</p>
```

### Font Weights
```css
font-light:    300  /* Light text */
font-normal:   400  /* Regular text */
font-medium:   500  /* Medium emphasis */
font-semibold: 600  /* Strong emphasis */
font-bold:     700  /* Bold text */
```

### Typography Usage

#### Headings
```jsx
// Page titles
<h1 className="text-4xl font-display font-semibold text-slate-100">
  Page Title
</h1>

// Section headings
<h2 className="text-2xl font-display font-semibold text-slate-200">
  Section Title
</h2>

// Subsection headings
<h3 className="text-xl font-display font-medium text-slate-200">
  Subsection Title
</h3>
```

#### Body Text
```jsx
// Primary body text
<p className="text-base font-sans text-slate-200 leading-relaxed">
  Main content text with optimal readability
</p>

// Secondary text
<p className="text-sm font-sans text-slate-400">
  Secondary information or captions
</p>

// Lead text
<p className="text-lg font-sans text-slate-100 leading-relaxed">
  Introductory or lead paragraph text
</p>
```

#### Code Text
```jsx
// Inline code
<code className="font-mono text-sm bg-slate-800 px-1 py-0.5 rounded">
  inline code
</code>

// Code blocks
<pre className="font-mono text-sm bg-slate-800 p-4 rounded-lg overflow-x-auto">
  <code>Code block content</code>
</pre>
```

## Spacing System

### Spacing Scale
Based on 8px grid system for consistent spacing:

```css
0:    0px      /* No spacing */
px:   1px      /* Hairline */
0.5:  2px      /* 0.125rem */
1:    4px      /* 0.25rem */
1.5:  6px      /* 0.375rem */
2:    8px      /* 0.5rem */
2.5:  10px     /* 0.625rem */
3:    12px     /* 0.75rem */
3.5:  14px     /* 0.875rem */
4:    16px     /* 1rem */
5:    20px     /* 1.25rem */
6:    24px     /* 1.5rem */
7:    28px     /* 1.75rem */
8:    32px     /* 2rem */
9:    36px     /* 2.25rem */
10:   40px     /* 2.5rem */
11:   44px     /* 2.75rem */
12:   48px     /* 3rem */
14:   56px     /* 3.5rem */
16:   64px     /* 4rem */
18:   72px     /* 4.5rem - Custom */
20:   80px     /* 5rem */
24:   96px     /* 6rem */
28:   112px    /* 7rem */
32:   128px    /* 8rem */
36:   144px    /* 9rem */
40:   160px    /* 10rem */
44:   176px    /* 11rem */
48:   192px    /* 12rem */
52:   208px    /* 13rem */
56:   224px    /* 14rem */
60:   240px    /* 15rem */
64:   256px    /* 16rem */
72:   288px    /* 18rem */
80:   320px    /* 20rem */
88:   352px    /* 22rem - Custom */
96:   384px    /* 24rem */
128:  512px    /* 32rem - Custom */
144:  576px    /* 36rem - Custom */
```

### Spacing Usage

#### Padding
```jsx
// Component padding
<div className="p-4">Standard padding</div>
<div className="px-6 py-4">Horizontal and vertical padding</div>
<div className="p-2 md:p-4 lg:p-6">Responsive padding</div>
```

#### Margins
```jsx
// Component margins
<div className="mb-4">Bottom margin</div>
<div className="mx-auto">Centered with auto margins</div>
<div className="mt-8 mb-12">Top and bottom margins</div>
```

#### Gaps
```jsx
// Flexbox and grid gaps
<div className="flex gap-4">Flex with gap</div>
<div className="grid grid-cols-3 gap-6">Grid with gap</div>
<div className="space-y-4">Vertical spacing between children</div>
```

## Shadow System

### Shadow Scale
Depth system with subtle shadows and gaming glows:

```css
/* Standard shadows */
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:      0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)

/* Gaming glows */
shadow-glow-sm: 0 0 5px rgb(251 191 36 / 0.5)
shadow-glow:    0 0 10px rgb(251 191 36 / 0.5)
shadow-glow-lg: 0 0 20px rgb(251 191 36 / 0.5)

/* Tier-specific glows */
shadow-glow-tier-s: 0 0 15px rgb(239 68 68 / 0.5)
shadow-glow-tier-a: 0 0 15px rgb(168 85 247 / 0.5)
shadow-glow-tier-b: 0 0 15px rgb(59 130 246 / 0.5)
shadow-glow-tier-c: 0 0 15px rgb(16 185 129 / 0.5)
```

### Shadow Usage

#### Card Elevation
```jsx
// Basic card shadow
<Card className="shadow-lg">Basic card</Card>

// Elevated card
<Card className="shadow-xl">Elevated card</Card>

// Interactive card with glow
<Card className="shadow-lg hover:shadow-glow">
  Interactive card
</Card>
```

#### Focus States
```jsx
// Focus with glow effect
<Button className="focus-visible:shadow-glow focus-visible:shadow-amber-500/25">
  Glowing focus
</Button>
```

#### Tier-Specific Glows
```jsx
// S-tier glow
<div className="shadow-glow-tier-s">S-tier element</div>

// A-tier glow
<div className="shadow-glow-tier-a">A-tier element</div>
```

## Border Radius System

### Radius Scale
```css
rounded-none: 0px
rounded-sm:   0.125rem (2px)
rounded:      0.25rem (4px)
rounded-md:   0.375rem (6px)
rounded-lg:   0.5rem (8px)
rounded-xl:   0.75rem (12px)
rounded-2xl:  1rem (16px)
rounded-3xl:  1.5rem (24px)
rounded-full: 9999px
```

### Border Radius Usage

#### Components
```jsx
// Cards and containers
<Card className="rounded-lg">Standard card</Card>

// Buttons
<Button className="rounded-lg">Standard button</Button>

// Images and avatars
<img className="rounded-full" />

// Input fields
<Input className="rounded-md" />
```

## Animation System

### Animation Classes
```css
/* Fade animations */
animate-fade-in:    fadeIn 0.5s ease-in-out
animate-slide-up:   slideUp 0.3s ease-out
animate-slide-down: slideDown 0.3s ease-out
animate-scale-in:   scaleIn 0.2s ease-out

/* Gaming-specific animations */
animate-glow-pulse: glowPulse 2s ease-in-out infinite
animate-float:      float 3s ease-in-out infinite
```

### Transition Durations
```css
transition-75:   75ms
transition-100:  100ms
transition-150:  150ms
transition-200:  200ms
transition-300:  300ms
transition-400:  400ms  /* Custom */
transition-500:  500ms
transition-600:  600ms  /* Custom */
transition-700:  700ms
transition-1000: 1000ms
```

### Animation Usage

#### Hover Effects
```jsx
// Scale on hover
<Card className="transition-transform duration-200 hover:scale-105">
  Scalable card
</Card>

// Glow on hover
<Button className="transition-shadow duration-200 hover:shadow-glow">
  Glowing button
</Button>
```

#### Loading States
```jsx
// Fade in content
<div className="animate-fade-in">
  Content that fades in
</div>

// Floating animation
<div className="animate-float">
  Floating element
</div>
```

#### Focus States
```jsx
// Smooth focus transitions
<Input className="transition-all duration-200 focus:shadow-glow focus:border-amber-400" />
```

## Background System

### Gradient Utilities
```css
/* Standard gradients */
bg-gradient-radial: radial-gradient(var(--tw-gradient-stops))
bg-gradient-conic:  conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))

/* Gaming-specific gradients */
bg-gradient-gaming: linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 41 59) 50%, rgb(15 23 42) 100%)
bg-gradient-card:   linear-gradient(145deg, rgb(30 41 59 / 0.8) 0%, rgb(15 23 42 / 0.9) 100%)

/* Tier gradients */
bg-gradient-tier-s: linear-gradient(135deg, rgb(239 68 68 / 0.1) 0%, rgb(220 38 38 / 0.05) 100%)
bg-gradient-tier-a: linear-gradient(135deg, rgb(168 85 247 / 0.1) 0%, rgb(147 51 234 / 0.05) 100%)
bg-gradient-tier-b: linear-gradient(135deg, rgb(59 130 246 / 0.1) 0%, rgb(37 99 235 / 0.05) 100%)
bg-gradient-tier-c: linear-gradient(135deg, rgb(16 185 129 / 0.1) 0%, rgb(5 150 105 / 0.05) 100%)
```

### Background Usage

#### Page Backgrounds
```jsx
// Main page background
<body className="bg-slate-900 bg-gradient-gaming">

// Card backgrounds
<Card className="bg-gradient-card">
  Card with gradient background
</Card>
```

#### Tier Backgrounds
```jsx
// S-tier background
<div className="bg-gradient-tier-s border-tier-s-500">
  S-tier content
</div>
```

## Component Patterns

### Interactive States
Standard pattern for interactive elements:

```jsx
// Button interaction pattern
<button className="
  bg-amber-500 
  text-slate-900 
  hover:bg-amber-600 
  hover:scale-105 
  hover:shadow-lg 
  active:bg-amber-700 
  active:scale-95 
  focus-visible:ring-amber-500 
  focus-visible:shadow-glow 
  focus-visible:shadow-amber-500/25
  transition-all 
  duration-200 
  ease-out
">
  Interactive Button
</button>
```

### Card Pattern
Standard card styling:

```jsx
<div className="
  bg-slate-800 
  border 
  border-slate-700 
  rounded-lg 
  p-4 
  shadow-lg 
  transition-all 
  duration-200 
  hover:shadow-xl 
  hover:border-slate-600 
  hover:-translate-y-1
">
  Card Content
</div>
```

### Form Element Pattern
Standard form input styling:

```jsx
<input className="
  bg-slate-800 
  border 
  border-slate-600 
  rounded-md 
  px-3 
  py-2 
  text-slate-100 
  placeholder-slate-400 
  focus:border-amber-400 
  focus:ring-2 
  focus:ring-amber-400/20 
  focus:outline-none 
  transition-all 
  duration-200
" />
```

## Usage Guidelines

### Do's
- Use design tokens consistently across components
- Follow the 8px spacing grid system
- Maintain proper color contrast ratios
- Use semantic color meanings appropriately
- Apply animations sparingly for better performance
- Test responsive behavior across breakpoints

### Don'ts
- Don't use arbitrary values outside the design system
- Don't mix different spacing systems
- Don't use colors that don't meet accessibility standards
- Don't overuse animations or glows
- Don't ignore responsive design principles
- Don't break the visual hierarchy

### Best Practices
1. **Consistency**: Use design tokens for all styling decisions
2. **Accessibility**: Always check color contrast and keyboard navigation
3. **Performance**: Optimize animations and transitions
4. **Responsive**: Design mobile-first with progressive enhancement
5. **Semantic**: Use colors and typography meaningfully
6. **Testing**: Validate design system usage in components
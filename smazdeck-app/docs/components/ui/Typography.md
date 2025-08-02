# Typography Components

The typography system provides consistent text styling across the application with semantic HTML elements, responsive sizing, and accessibility features.

## Components

- **Heading** - Semantic headings with multiple variants
- **Text** - Body text with various styles
- **Caption** - Small descriptive text
- **Label** - Form and UI labels

## Import

```jsx
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Caption } from '../components/ui/Caption';
import { Label } from '../components/ui/Label';
```

## Heading Component

Semantic headings with consistent visual hierarchy.

### Basic Usage

```jsx
<Heading level={1}>Main Page Title</Heading>
<Heading level={2} variant="subheading">Section Title</Heading>
<Heading level={3} color="accent">Highlighted Heading</Heading>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1-6` | `1` | Semantic heading level |
| `variant` | `string` | `'heading'` | Visual style variant |
| `color` | `string` | `'primary'` | Text color theme |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Heading content |

### Variants

#### Display
Large, prominent headings for hero sections:
```jsx
<Heading level={1} variant="display">Hero Title</Heading>
<Heading level={2} variant="display">Large Display</Heading>
```

**Sizes:**
- H1: `text-5xl md:text-6xl lg:text-7xl`
- H2: `text-4xl md:text-5xl lg:text-6xl`
- H3: `text-3xl md:text-4xl lg:text-5xl`
- H4: `text-2xl md:text-3xl lg:text-4xl`
- H5: `text-xl md:text-2xl lg:text-3xl`
- H6: `text-lg md:text-xl lg:text-2xl`

#### Heading (Default)
Standard headings for content sections:
```jsx
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>
```

**Sizes:**
- H1: `text-4xl md:text-5xl lg:text-6xl`
- H2: `text-3xl md:text-4xl lg:text-5xl`
- H3: `text-2xl md:text-3xl lg:text-4xl`
- H4: `text-xl md:text-2xl lg:text-3xl`
- H5: `text-lg md:text-xl lg:text-2xl`
- H6: `text-base md:text-lg lg:text-xl`

#### Subheading
Lighter weight headings for subsections:
```jsx
<Heading level={2} variant="subheading">Subsection</Heading>
```

**Features:**
- Medium font weight instead of semibold
- Slightly smaller than equivalent heading levels
- Better for content hierarchy

### Colors

```jsx
<Heading color="primary">Primary Text</Heading>     {/* text-slate-200 */}
<Heading color="secondary">Secondary Text</Heading> {/* text-slate-300 */}
<Heading color="accent">Accent Text</Heading>       {/* text-amber-400 */}
<Heading color="muted">Muted Text</Heading>         {/* text-slate-400 */}
<Heading color="gradient">Gradient Text</Heading>   {/* gradient-text */}
```

## Text Component

Body text with consistent styling and responsive behavior.

### Basic Usage

```jsx
<Text>Regular body text</Text>
<Text size="lg" color="secondary">Large secondary text</Text>
<Text variant="lead">Lead paragraph text</Text>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'base'` | Text size |
| `variant` | `string` | `'body'` | Text style variant |
| `color` | `string` | `'primary'` | Text color |
| `weight` | `string` | `'normal'` | Font weight |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Text content |

### Sizes

```jsx
<Text size="xs">Extra small text</Text>    {/* text-xs */}
<Text size="sm">Small text</Text>          {/* text-sm */}
<Text size="base">Base text</Text>         {/* text-base */}
<Text size="lg">Large text</Text>          {/* text-lg */}
<Text size="xl">Extra large text</Text>    {/* text-xl */}
```

### Variants

#### Body (Default)
Standard body text with optimal line height:
```jsx
<Text variant="body">
  Regular paragraph text with proper line spacing for readability.
</Text>
```

#### Lead
Prominent introductory text:
```jsx
<Text variant="lead">
  Lead paragraph that introduces the main content.
</Text>
```

#### Small
Smaller text for captions and notes:
```jsx
<Text variant="small">
  Small text for additional information.
</Text>
```

### Font Weights

```jsx
<Text weight="light">Light text</Text>       {/* font-light */}
<Text weight="normal">Normal text</Text>     {/* font-normal */}
<Text weight="medium">Medium text</Text>     {/* font-medium */}
<Text weight="semibold">Semibold text</Text> {/* font-semibold */}
<Text weight="bold">Bold text</Text>         {/* font-bold */}
```

## Caption Component

Small descriptive text for images, tables, and UI elements.

### Basic Usage

```jsx
<Caption>Image caption text</Caption>
<Caption color="muted">Subtle caption</Caption>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'secondary'` | Text color |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Caption content |

### Usage Examples

```jsx
// Image caption
<figure>
  <img src="/image.jpg" alt="Description" />
  <Caption>Figure 1: Example image with caption</Caption>
</figure>

// Table caption
<table>
  <Caption>User statistics for the current month</Caption>
  <thead>...</thead>
</table>

// Form help text
<div>
  <Label>Email Address</Label>
  <Input type="email" />
  <Caption color="muted">We'll never share your email</Caption>
</div>
```

## Label Component

Form labels and UI element labels with proper accessibility.

### Basic Usage

```jsx
<Label htmlFor="email">Email Address</Label>
<Label required>Required Field</Label>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | Associated form element ID |
| `required` | `boolean` | `false` | Show required indicator |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `ReactNode` | - | Label content |

### Features

- Automatic required indicator (`*`)
- Proper form association with `htmlFor`
- Consistent styling across forms
- Accessible color contrast

### Usage Examples

```jsx
// Basic form label
<Label htmlFor="username">Username</Label>
<Input id="username" type="text" />

// Required field
<Label htmlFor="email" required>Email Address</Label>
<Input id="email" type="email" required />

// Checkbox label
<div className="flex items-center">
  <Checkbox id="terms" />
  <Label htmlFor="terms" className="ml-2">
    I agree to the terms and conditions
  </Label>
</div>
```

## Typography Scale

The typography system uses a consistent scale based on Tailwind's default sizes with custom line heights:

| Size | Font Size | Line Height | Usage |
|------|-----------|-------------|-------|
| `xs` | 0.75rem (12px) | 1rem | Small UI text |
| `sm` | 0.875rem (14px) | 1.25rem | Secondary text |
| `base` | 1rem (16px) | 1.5rem | Body text |
| `lg` | 1.125rem (18px) | 1.75rem | Large body text |
| `xl` | 1.25rem (20px) | 1.75rem | Small headings |
| `2xl` | 1.5rem (24px) | 2rem | Medium headings |
| `3xl` | 1.875rem (30px) | 2.25rem | Large headings |
| `4xl` | 2.25rem (36px) | 2.5rem | Display headings |

## Font Families

### Sans (Body Text)
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
```

### Display (Headings)
```css
font-family: 'Exo 2', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Mono (Code)
```css
font-family: 'Fira Code', 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

## Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1-h6)
- Semantic text elements (p, span, etc.)
- Form label associations

### Color Contrast
- WCAG AA compliant contrast ratios
- High contrast mode support
- Sufficient contrast for all text sizes

### Responsive Typography
- Readable sizes on all devices
- Scalable with user preferences
- Maintains readability when zoomed

### Screen Reader Support
- Proper heading structure
- Descriptive text content
- Form label associations

## Responsive Behavior

### Mobile-First Approach
Typography scales appropriately across breakpoints:

```jsx
// Responsive heading
<Heading level={1} variant="display">
  {/* Automatically scales: text-5xl md:text-6xl lg:text-7xl */}
  Responsive Title
</Heading>
```

### Breakpoint Scaling
- **Mobile (default)**: Base sizes optimized for mobile reading
- **Tablet (md)**: Slightly larger for better readability
- **Desktop (lg)**: Full scale for immersive experience

## Examples

### Article Header
```jsx
<header>
  <Heading level={1} variant="display" color="accent">
    Complete Guide to Smaz Builds
  </Heading>
  <Text variant="lead" color="secondary" className="mt-4">
    Learn how to create powerful team compositions and optimize your gameplay strategy.
  </Text>
  <Caption className="mt-2">
    Last updated: March 15, 2024
  </Caption>
</header>
```

### Form Section
```jsx
<section>
  <Heading level={2}>Account Information</Heading>
  <div className="mt-4 space-y-4">
    <div>
      <Label htmlFor="name" required>Full Name</Label>
      <Input id="name" type="text" required />
    </div>
    <div>
      <Label htmlFor="email" required>Email Address</Label>
      <Input id="email" type="email" required />
      <Caption color="muted">We'll use this for account notifications</Caption>
    </div>
  </div>
</section>
```

### Content Hierarchy
```jsx
<article>
  <Heading level={1}>Main Article Title</Heading>
  <Text variant="lead">
    Introduction paragraph with lead styling for better visual hierarchy.
  </Text>
  
  <Heading level={2} className="mt-8">Section Title</Heading>
  <Text>
    Regular body text with optimal line spacing and readability.
  </Text>
  
  <Heading level={3} variant="subheading" className="mt-6">Subsection</Heading>
  <Text size="sm" color="secondary">
    Smaller secondary text for additional details.
  </Text>
</article>
```

## Testing

### Unit Tests
```jsx
import { render, screen } from '@testing-library/react';
import { Heading, Text, Label } from './Typography';

test('renders heading with correct level', () => {
  render(<Heading level={2}>Test Heading</Heading>);
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('associates label with form element', () => {
  render(
    <>
      <Label htmlFor="test-input">Test Label</Label>
      <input id="test-input" />
    </>
  );
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});
```

### Accessibility Tests
```jsx
import { axe } from '@axe-core/react';

test('typography is accessible', async () => {
  const { container } = render(
    <div>
      <Heading level={1}>Accessible Heading</Heading>
      <Text>Accessible body text</Text>
      <Label htmlFor="input">Accessible Label</Label>
      <input id="input" />
    </div>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```
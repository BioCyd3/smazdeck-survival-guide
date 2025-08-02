# Card Component

The Card component provides a flexible container for grouping related content with multiple variants, interactive states, and loading capabilities. It includes sub-components for structured content layout.

## Import

```jsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardSkeleton 
} from '../components/ui/Card';
```

## Basic Usage

```jsx
// Basic card
<Card>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Complete card structure
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main card content
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

## Props

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Card content |
| `variant` | `string` | `'default'` | Card style variant |
| `size` | `string` | `'md'` | Card padding size |
| `interactive` | `boolean` | `false` | Enable interactive states |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `hover` | `boolean` | `true` | Enable hover effects |
| `className` | `string` | `''` | Additional CSS classes |

## Variants

### Default
Standard card with slate background and border:
```jsx
<Card variant="default">
  Default card content
</Card>
```

### Elevated
Enhanced shadow for prominence:
```jsx
<Card variant="elevated">
  Elevated card content
</Card>
```

### Outlined
Transparent background with prominent border:
```jsx
<Card variant="outlined">
  Outlined card content
</Card>
```

### Glass
Semi-transparent with backdrop blur effect:
```jsx
<Card variant="glass">
  Glass card content
</Card>
```

## Sizes

Controls internal padding:

```jsx
<Card size="sm">Small padding</Card>
<Card size="md">Medium padding</Card>
<Card size="lg">Large padding</Card>
<Card size="xl">Extra large padding</Card>
```

### Size Specifications
- `sm`: 12px padding (p-3)
- `md`: 16px padding (p-4)
- `lg`: 24px padding (p-6)
- `xl`: 32px padding (p-8)

## Interactive Cards

Enable click interactions and keyboard navigation:

```jsx
<Card 
  interactive 
  onClick={() => console.log('Card clicked')}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      console.log('Card activated');
    }
  }}
>
  <CardContent>
    Clickable card content
  </CardContent>
</Card>
```

### Interactive Features
- Cursor pointer on hover
- Scale transform (1.02x) on hover
- Scale down (0.98x) on active
- Keyboard navigation support
- Focus indicators with amber glow
- ARIA role="button" when interactive

## Loading States

Show skeleton content while loading:

```jsx
<Card loading>
  {/* Content will be replaced with skeleton */}
</Card>

// Or use CardSkeleton directly
<Card>
  <CardSkeleton lines={4} />
</Card>
```

### Loading Features
- Animated pulse effect
- Prevents user interaction
- Maintains card dimensions
- Customizable skeleton lines

## Sub-Components

### CardHeader
Container for card title and description:

```jsx
<CardHeader>
  <CardTitle>Title Here</CardTitle>
  <CardDescription>Description text</CardDescription>
</CardHeader>
```

### CardTitle
Semantic heading for card title:

```jsx
<CardTitle>Card Title</CardTitle>
```
- Uses `h3` element by default
- Styled with `text-xl font-semibold`
- Light text color (`text-slate-100`)

### CardDescription
Descriptive text below title:

```jsx
<CardDescription>
  Additional information about the card content
</CardDescription>
```
- Uses `p` element
- Muted text color (`text-slate-400`)
- Smaller font size (`text-sm`)

### CardContent
Main content area:

```jsx
<CardContent>
  <p>Main card content goes here</p>
</CardContent>
```
- No top padding (pt-0) to align with header
- Flexible content container

### CardFooter
Footer area for actions:

```jsx
<CardFooter>
  <Button>Action</Button>
</CardFooter>
```
- Flexbox layout for action alignment
- Top padding for separation

## Hover Effects

Cards include subtle hover animations:

```jsx
// Hover effects enabled by default
<Card hover>
  Content with hover effects
</Card>

// Disable hover effects
<Card hover={false}>
  Content without hover effects
</Card>
```

### Hover Animations
- Enhanced shadow (`hover:shadow-xl`)
- Border color change (`hover:border-slate-600`)
- Upward translation (`hover:-translate-y-1`)
- Smooth transitions (200ms duration)

## Accessibility Features

### Keyboard Navigation
- Tab navigation for interactive cards
- Enter and Space key activation
- Proper focus indicators
- Focus ring with amber glow

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- ARIA roles for interactive cards
- Descriptive content structure

### High Contrast Support
- Maintains readability in high contrast mode
- Sufficient color contrast ratios
- Border visibility in all modes

## Responsive Behavior

### Mobile Optimizations
- Touch-friendly interactive areas
- Appropriate spacing on small screens
- Readable text sizes across devices

### Breakpoint Behavior
- Consistent appearance across screen sizes
- Responsive padding and margins
- Maintains aspect ratios

## Examples

### Profile Card
```jsx
<Card variant="elevated" interactive>
  <CardHeader>
    <CardTitle>John Doe</CardTitle>
    <CardDescription>Senior Developer</CardDescription>
  </CardHeader>
  <CardContent>
    <img src="/avatar.jpg" alt="Profile" className="w-16 h-16 rounded-full" />
    <p className="mt-2 text-sm text-slate-300">
      Experienced developer with expertise in React and Node.js
    </p>
  </CardContent>
  <CardFooter>
    <Button size="sm">View Profile</Button>
  </CardFooter>
</Card>
```

### Stats Card
```jsx
<Card variant="glass" size="lg">
  <CardContent>
    <div className="text-center">
      <div className="text-3xl font-bold text-amber-400">1,234</div>
      <div className="text-sm text-slate-400">Total Users</div>
    </div>
  </CardContent>
</Card>
```

### Loading Card
```jsx
<Card loading size="lg">
  <CardHeader>
    <CardTitle>Loading...</CardTitle>
    <CardDescription>Please wait</CardDescription>
  </CardHeader>
  <CardContent>
    This content will show skeleton while loading
  </CardContent>
</Card>
```

### Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} interactive onClick={() => selectItem(item)}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
      </CardContent>
    </Card>
  ))}
</div>
```

## Testing

### Unit Tests
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Card, CardTitle, CardContent } from './Card';

test('renders card with content', () => {
  render(
    <Card>
      <CardContent>Test content</CardContent>
    </Card>
  );
  expect(screen.getByText('Test content')).toBeInTheDocument();
});

test('handles interactive card clicks', () => {
  const handleClick = jest.fn();
  render(
    <Card interactive onClick={handleClick}>
      <CardContent>Clickable card</CardContent>
    </Card>
  );
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Tests
```jsx
import { axe } from '@axe-core/react';

test('card is accessible', async () => {
  const { container } = render(
    <Card>
      <CardHeader>
        <CardTitle>Accessible Card</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Considerations

- Uses `forwardRef` for proper ref forwarding
- Efficient class name generation
- Minimal re-renders with stable props
- Optimized skeleton loading states

## Browser Support

- Modern browsers with CSS Grid support
- Backdrop blur support (graceful degradation)
- CSS transforms and transitions
- Progressive enhancement approach
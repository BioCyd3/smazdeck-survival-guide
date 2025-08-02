# Button Component

The Button component provides a comprehensive button system with multiple variants, sizes, states, and accessibility features. It includes support for icons, loading states, and responsive design.

## Import

```jsx
import { Button, ButtonGroup, IconButton } from '../components/ui/Button';
```

## Basic Usage

```jsx
// Basic button
<Button>Click me</Button>

// Button with variant
<Button variant="secondary">Secondary Action</Button>

// Button with icon
<Button icon={<PlusIcon />}>Add Item</Button>

// Loading button
<Button loading>Processing...</Button>
```

## Props

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `variant` | `string` | `'primary'` | Button style variant |
| `size` | `string` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `icon` | `ReactNode` | `null` | Icon element |
| `iconPosition` | `string` | `'left'` | Icon position (`'left'` or `'right'`) |
| `fullWidth` | `boolean` | `false` | Full width button |
| `type` | `string` | `'button'` | HTML button type |
| `className` | `string` | `''` | Additional CSS classes |

## Variants

### Primary
Default button style with amber background:
```jsx
<Button variant="primary">Primary Button</Button>
```

### Secondary
Slate background for secondary actions:
```jsx
<Button variant="secondary">Secondary Button</Button>
```

### Ghost
Transparent background with hover effects:
```jsx
<Button variant="ghost">Ghost Button</Button>
```

### Danger
Red background for destructive actions:
```jsx
<Button variant="danger">Delete Item</Button>
```

### Success
Green background for positive actions:
```jsx
<Button variant="success">Save Changes</Button>
```

### Warning
Amber background for warning actions:
```jsx
<Button variant="warning">Warning Action</Button>
```

### Info
Blue background for informational actions:
```jsx
<Button variant="info">Learn More</Button>
```

### Outline
Outlined button with transparent background:
```jsx
<Button variant="outline">Outline Button</Button>
```

## Sizes

Buttons automatically adjust for touch devices:

```jsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

### Touch Device Adjustments
- Touch devices get larger minimum touch targets (44px minimum)
- Desktop devices use more compact sizing
- Automatic detection via `useResponsive()` hook

## States

### Loading State
```jsx
<Button loading>
  Processing...
</Button>
```
- Shows animated spinner
- Disables button interaction
- Maintains button dimensions

### Disabled State
```jsx
<Button disabled>
  Disabled Button
</Button>
```
- Reduces opacity to 50%
- Prevents all interactions
- Removes hover effects

## Icons

### Icon with Text
```jsx
<Button icon={<PlusIcon />}>
  Add Item
</Button>
```

### Icon Position
```jsx
<Button icon={<ArrowRightIcon />} iconPosition="right">
  Continue
</Button>
```

### Icon Sizing
Icons automatically size based on button size:
- `xs`: 12px (w-3 h-3)
- `sm`: 16px (w-4 h-4)
- `md`: 20px (w-5 h-5)
- `lg`: 24px (w-6 h-6)
- `xl`: 28px (w-7 h-7)

## Button Group

Group related buttons together:

```jsx
<ButtonGroup>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

### Vertical Button Group
```jsx
<ButtonGroup orientation="vertical">
  <Button>Top</Button>
  <Button>Middle</Button>
  <Button>Bottom</Button>
</ButtonGroup>
```

### Button Group Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `string` | `'horizontal'` | Group orientation |
| `size` | `string` | `'md'` | Default size for all buttons |
| `variant` | `string` | `'primary'` | Default variant for all buttons |

## Icon Button

For icon-only buttons:

```jsx
<IconButton 
  icon={<SearchIcon />} 
  aria-label="Search"
/>
```

### Icon Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Icon element (required) |
| `aria-label` | `string` | - | Accessibility label (required) |
| `size` | `string` | `'md'` | Button size |
| `variant` | `string` | `'ghost'` | Button variant |

## Accessibility Features

### Keyboard Navigation
- Full keyboard support with Tab navigation
- Enter and Space key activation
- Proper focus indicators with glow effects

### Screen Reader Support
- Semantic button elements
- Proper ARIA attributes
- Loading state announcements
- Icon buttons require `aria-label`

### Focus Management
- Visible focus indicators
- High contrast mode support
- Focus ring with brand colors
- Proper focus order in button groups

## Responsive Behavior

### Mobile Optimizations
- Larger touch targets on mobile devices
- Touch-friendly spacing and sizing
- Optimized for thumb navigation
- Prevents text selection on touch

### Breakpoint Behavior
- Consistent sizing across breakpoints
- Responsive text sizing in larger buttons
- Maintains accessibility standards at all sizes

## Animation and Interactions

### Hover Effects
- Scale transform (1.05x) on hover
- Shadow enhancement
- Smooth color transitions
- Glow effects on focus

### Active States
- Scale down (0.95x) on press
- Immediate visual feedback
- Smooth transitions (200ms)

### Loading Animation
- Spinning icon animation
- Maintains button dimensions
- Smooth opacity transitions

## Examples

### Complete Form Button
```jsx
<Button
  variant="primary"
  size="lg"
  loading={isSubmitting}
  disabled={!isValid}
  icon={<SaveIcon />}
  fullWidth
  type="submit"
>
  Save Changes
</Button>
```

### Action Button Group
```jsx
<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</ButtonGroup>
```

### Icon Button Toolbar
```jsx
<div className="flex gap-2">
  <IconButton icon={<EditIcon />} aria-label="Edit" />
  <IconButton icon={<DeleteIcon />} aria-label="Delete" variant="danger" />
  <IconButton icon={<ShareIcon />} aria-label="Share" />
</div>
```

## Testing

### Unit Tests
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

test('handles click events', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Tests
```jsx
import { axe } from '@axe-core/react';

test('button is accessible', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Performance Considerations

- Uses `forwardRef` for proper ref forwarding
- Minimal re-renders with stable class generation
- Efficient icon cloning and sizing
- Optimized for bundle size with tree shaking

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation without JavaScript
- CSS fallbacks for unsupported features
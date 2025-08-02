# SmazCard Component

The SmazCard component displays Smaz character information in a compact, interactive card format with image loading states, stat visualization, and hover effects.

## Import

```jsx
import SmazCard from '../components/Smaz/SmazCard';
```

## Basic Usage

```jsx
// Basic Smaz card
<SmazCard smaz={smazData} />

// Compact version
<SmazCard smaz={smazData} compact />

// With stats always visible
<SmazCard smaz={smazData} showStats />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `smaz` | `object` | - | Smaz data object (required) |
| `showStats` | `boolean` | `false` | Always show stat bars |
| `compact` | `boolean` | `false` | Use compact layout |

## Smaz Data Structure

The component expects a smaz object with the following structure:

```javascript
{
  id: "smaz-001",
  name: "Smaz Name",
  slug: "smaz-name", // Used for image path
  skills: [
    {
      skill_name: "Skill Name",
      description: "Skill description"
    }
    // ... more skills
  ]
}
```

## Features

### Image Loading States
- **Loading**: Shows spinner while image loads
- **Error Fallback**: Shows placeholder icon if image fails to load
- **Smooth Transitions**: Fade-in effect when image loads successfully

### Interactive Elements
- **Hover Effects**: Scale transform and enhanced shadows
- **Focus States**: Keyboard navigation support with focus indicators
- **Link Navigation**: Navigates to `/smaz/{id}` when clicked

### Visual Indicators
- **Skill Count Badge**: Shows number of skills in top-right corner
- **Rage Skill Indicator**: Lightning bolt icon for rage-type skills
- **Tier-Specific Styling**: Adapts to tier list contexts

### Stat Visualization
- **Dynamic Stats**: Calculated from skill data
- **Progress Bars**: Attack, Defense, and HP visualization
- **Hover Reveal**: Stats appear on hover (unless `showStats` is true)

## Layout Modes

### Default Mode
Full-featured card with all interactive elements:

```jsx
<SmazCard smaz={smazData} />
```

**Features:**
- 64px × 64px image (w-16 h-16)
- Full stat visualization on hover
- Detailed hover information panel
- Skill and type indicators

### Compact Mode
Smaller card for dense layouts:

```jsx
<SmazCard smaz={smazData} compact />
```

**Features:**
- 48px × 48px image (w-12 h-12)
- Smaller text and spacing (p-3 instead of p-4)
- Simplified skill count display
- No stat bars or hover details

### Stats Always Visible
Shows stat bars without requiring hover:

```jsx
<SmazCard smaz={smazData} showStats />
```

**Features:**
- Stat bars always visible
- Useful for comparison views
- Maintains hover interactions

## Stat Calculation

The component calculates display stats from skill data:

```javascript
// Attack stat calculation
const attackStat = baseValue + (hasAttackSkills ? 20 : 0);

// Defense stat calculation  
const defenseStat = baseValue + (hasDefenseSkills ? 20 : 0);

// HP stat calculation
const hpStat = baseValue + (hasHPSkills ? 20 : 0);
```

**Base Value**: `Math.min(skillCount * 20, 100)`

## Image Handling

### Image Path Resolution
Images are loaded from `/images/smazs/{slug}.png`:

```javascript
const imagePath = `/images/smazs/${slug || id}.png`;
```

### Loading States
1. **Initial**: Shows loading spinner
2. **Success**: Fades in image with smooth transition
3. **Error**: Shows fallback user icon

### Fallback Icon
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
```

## Accessibility Features

### Keyboard Navigation
- Full keyboard support with Tab navigation
- Enter key activation for navigation
- Proper focus indicators with amber glow

### Screen Reader Support
- Semantic link structure with descriptive `aria-label`
- Alt text for images with character names
- Hidden decorative elements with `aria-hidden="true"`

### Visual Accessibility
- High contrast mode support
- Sufficient color contrast ratios
- Clear visual hierarchy

## Responsive Behavior

### Mobile Optimizations
- Touch-friendly interactive areas (minimum 44px)
- Appropriate spacing for thumb navigation
- Readable text sizes on small screens

### Grid Integration
Works seamlessly in responsive grids:

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {smazs.map(smaz => (
    <SmazCard key={smaz.id} smaz={smaz} />
  ))}
</div>
```

## Animation and Interactions

### Hover Effects
- **Scale Transform**: `group-hover:scale-[1.02]`
- **Enhanced Shadow**: `group-hover:shadow-xl group-hover:shadow-amber-500/20`
- **Border Glow**: `group-hover:border-amber-400/50`
- **Stat Reveal**: Smooth opacity and transform transitions

### Loading Animations
- **Spinner**: Rotating loading indicator
- **Fade In**: Smooth image appearance
- **Pulse**: Loading state indication

### Transition Timing
- **Duration**: 300ms for most animations
- **Easing**: `ease-out` for natural feel
- **Stagger**: Different elements animate at slightly different times

## Examples

### Basic Grid Display
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {smazs.map(smaz => (
    <SmazCard 
      key={smaz.id} 
      smaz={smaz} 
    />
  ))}
</div>
```

### Comparison View
```jsx
<div className="flex gap-4">
  <SmazCard smaz={smaz1} showStats />
  <SmazCard smaz={smaz2} showStats />
  <SmazCard smaz={smaz3} showStats />
</div>
```

### Compact List
```jsx
<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
  {smazs.map(smaz => (
    <SmazCard 
      key={smaz.id} 
      smaz={smaz} 
      compact 
    />
  ))}
</div>
```

### With Loading States
```jsx
{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    {Array.from({ length: 10 }).map((_, i) => (
      <Card key={i} loading />
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    {smazs.map(smaz => (
      <SmazCard key={smaz.id} smaz={smaz} />
    ))}
  </div>
)}
```

## Testing

### Unit Tests
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SmazCard from './SmazCard';

const mockSmaz = {
  id: 'test-smaz',
  name: 'Test Smaz',
  slug: 'test-smaz',
  skills: [
    { skill_name: 'Test Skill', description: 'Test description' }
  ]
};

test('renders smaz card with name', () => {
  render(
    <BrowserRouter>
      <SmazCard smaz={mockSmaz} />
    </BrowserRouter>
  );
  expect(screen.getByText('Test Smaz')).toBeInTheDocument();
});

test('shows skill count badge', () => {
  render(
    <BrowserRouter>
      <SmazCard smaz={mockSmaz} />
    </BrowserRouter>
  );
  expect(screen.getByText('1')).toBeInTheDocument();
});

test('navigates to smaz profile on click', () => {
  render(
    <BrowserRouter>
      <SmazCard smaz={mockSmaz} />
    </BrowserRouter>
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/smaz/test-smaz');
});
```

### Accessibility Tests
```jsx
import { axe } from '@axe-core/react';

test('smaz card is accessible', async () => {
  const { container } = render(
    <BrowserRouter>
      <SmazCard smaz={mockSmaz} />
    </BrowserRouter>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Image Loading Tests
```jsx
test('handles image loading states', async () => {
  render(
    <BrowserRouter>
      <SmazCard smaz={mockSmaz} />
    </BrowserRouter>
  );
  
  // Should show loading spinner initially
  expect(screen.getByRole('status')).toBeInTheDocument();
  
  // Simulate image load
  const image = screen.getByAltText('Test Smaz portrait');
  fireEvent.load(image);
  
  // Loading spinner should be gone
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
```

## Performance Considerations

- **React.memo**: Prevents unnecessary re-renders
- **Image Optimization**: Lazy loading and error handling
- **Efficient State Management**: Minimal state updates
- **CSS Transforms**: Hardware-accelerated animations

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS transforms and transitions
- Progressive enhancement for older browsers
- Graceful degradation without JavaScript
# Accessibility Guidelines

This document outlines the accessibility features and testing procedures for the Smazdeck Survival Guide application. All components are designed to meet WCAG AA standards and provide an inclusive experience for all users.

## Accessibility Standards

### WCAG AA Compliance
The application meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards:

- **Perceivable**: Information is presentable in ways users can perceive
- **Operable**: Interface components are operable by all users
- **Understandable**: Information and UI operation are understandable
- **Robust**: Content is robust enough for various assistive technologies

## Keyboard Navigation

### Navigation Patterns
All interactive elements support keyboard navigation:

- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward through interactive elements
- **Enter**: Activate buttons and links
- **Space**: Activate buttons and checkboxes
- **Arrow Keys**: Navigate within components (tabs, menus, etc.)
- **Escape**: Close modals and dropdowns

### Focus Management
- **Visible Focus Indicators**: All focusable elements have clear focus rings
- **Focus Trapping**: Modals and dropdowns trap focus appropriately
- **Skip Links**: Available for main content navigation
- **Logical Tab Order**: Focus moves in a logical sequence

### Focus Styles
```css
/* Standard focus ring */
.focus-visible:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: rgb(251 191 36); /* amber-400 */
  ring-offset: 2px;
  ring-offset-color: rgb(15 23 42); /* slate-900 */
}

/* Enhanced focus with glow */
.focus-visible:focus-visible {
  box-shadow: 0 0 0 2px rgb(251 191 36 / 0.5);
}
```

## Screen Reader Support

### Semantic HTML
- **Proper Heading Hierarchy**: h1-h6 elements used correctly
- **Landmark Elements**: header, nav, main, aside, footer
- **List Structures**: ul, ol, li for grouped content
- **Form Labels**: Proper label associations with form controls

### ARIA Attributes
- **aria-label**: Descriptive labels for elements
- **aria-labelledby**: References to labeling elements
- **aria-describedby**: References to descriptive text
- **aria-expanded**: State of collapsible elements
- **aria-hidden**: Hide decorative elements from screen readers
- **role**: Semantic roles for custom components

### Screen Reader Testing
Test with popular screen readers:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

## Color and Contrast

### Color Contrast Ratios
All text meets WCAG AA contrast requirements:

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **UI Components**: Minimum 3:1 contrast ratio for borders and states

### Color Palette Contrast
```css
/* High contrast text combinations */
.text-slate-100 { color: #f1f5f9; } /* 15.8:1 on slate-900 */
.text-slate-200 { color: #e2e8f0; } /* 13.6:1 on slate-900 */
.text-amber-400 { color: #fbbf24; } /* 8.2:1 on slate-900 */
.text-slate-400 { color: #94a3b8; } /* 4.7:1 on slate-900 */
```

### Color Independence
Information is never conveyed through color alone:
- **Icons**: Accompany color-coded information
- **Text Labels**: Provide context for colored elements
- **Patterns**: Use shapes and patterns in addition to color
- **Multiple Indicators**: Combine color with text, icons, or position

## Responsive Design

### Mobile Accessibility
- **Touch Targets**: Minimum 44px × 44px for touch elements
- **Spacing**: Adequate spacing between interactive elements
- **Text Size**: Readable text sizes on small screens
- **Orientation**: Support both portrait and landscape orientations

### Zoom Support
- **Text Scaling**: Functional up to 200% zoom
- **Layout Preservation**: Maintains usability when zoomed
- **Horizontal Scrolling**: Avoided at standard zoom levels
- **Content Reflow**: Text reflows appropriately when zoomed

## Form Accessibility

### Form Labels
```jsx
// Proper label association
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" required />

// Required field indication
<Label htmlFor="password" required>Password</Label>
<Input id="password" type="password" required />
```

### Error Handling
```jsx
// Error message association
<Label htmlFor="username">Username</Label>
<Input 
  id="username" 
  type="text" 
  aria-describedby="username-error"
  aria-invalid={hasError}
/>
{hasError && (
  <div id="username-error" role="alert" className="text-red-400">
    Username is required
  </div>
)}
```

### Form Validation
- **Real-time Validation**: Immediate feedback for form errors
- **Error Announcements**: Screen reader announcements for errors
- **Success Feedback**: Confirmation of successful form submission
- **Clear Instructions**: Helpful text for form requirements

## Component-Specific Guidelines

### Button Accessibility
```jsx
// Icon button with proper label
<IconButton 
  icon={<SearchIcon />} 
  aria-label="Search for Smazs"
/>

// Loading button state
<Button loading aria-describedby="loading-text">
  Save Changes
</Button>
<div id="loading-text" className="sr-only">
  Saving your changes, please wait
</div>
```

### Card Accessibility
```jsx
// Interactive card
<Card 
  interactive 
  role="button"
  tabIndex={0}
  aria-label="View Smaz profile for Warrior"
  onKeyDown={handleKeyDown}
>
  <CardContent>Smaz information</CardContent>
</Card>
```

### Navigation Accessibility
```jsx
// Breadcrumb navigation
<nav aria-label="Breadcrumb">
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/smazs">Smazs</BreadcrumbItem>
    <BreadcrumbItem current>Warrior</BreadcrumbItem>
  </Breadcrumb>
</nav>
```

## Testing Procedures

### Automated Testing
Use axe-core for automated accessibility testing:

```javascript
import { axe } from '@axe-core/react';

// Component accessibility test
test('component is accessible', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] All interactive elements are reachable via keyboard
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] No keyboard traps (except intentional modal traps)
- [ ] All functionality available via keyboard

#### Screen Reader Testing
- [ ] Content is announced in logical order
- [ ] Headings create proper document outline
- [ ] Form labels are properly associated
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced

#### Visual Testing
- [ ] Text has sufficient contrast ratios
- [ ] Focus indicators are visible in high contrast mode
- [ ] Content is readable when zoomed to 200%
- [ ] Information is not conveyed by color alone
- [ ] Text remains readable with custom stylesheets

#### Mobile Testing
- [ ] Touch targets meet minimum size requirements
- [ ] Content is accessible with screen reader on mobile
- [ ] Gestures have keyboard equivalents
- [ ] Orientation changes don't break functionality

### Testing Tools

#### Browser Extensions
- **axe DevTools**: Automated accessibility scanning
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Accessibility audit included
- **Colour Contrast Analyser**: Color contrast checking

#### Screen Readers
- **NVDA**: Free Windows screen reader
- **VoiceOver**: Built-in macOS/iOS screen reader
- **TalkBack**: Built-in Android screen reader

#### Keyboard Testing
- **Tab Navigation**: Test with Tab and Shift+Tab
- **Keyboard Only**: Disconnect mouse and navigate with keyboard only
- **Focus Indicators**: Ensure all focus states are visible

## Common Accessibility Issues

### Issues to Avoid
- **Missing Alt Text**: All images need descriptive alt text
- **Poor Color Contrast**: Ensure sufficient contrast ratios
- **Keyboard Traps**: Don't trap focus unintentionally
- **Missing Labels**: All form inputs need proper labels
- **Unclear Focus**: Focus indicators must be visible
- **Color-Only Information**: Don't rely solely on color

### Quick Fixes
```jsx
// Add alt text to images
<img src="/smaz.png" alt="Warrior Smaz character portrait" />

// Provide proper form labels
<label htmlFor="search">Search Smazs</label>
<input id="search" type="text" />

// Hide decorative elements
<div aria-hidden="true">🎮</div>

// Announce dynamic changes
<div role="status" aria-live="polite">
  {message}
</div>
```

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Testing Tools
- [axe-core](https://github.com/dequelabs/axe-core)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

### Screen Readers
- [NVDA Download](https://www.nvaccess.org/download/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/)
- [TalkBack Help](https://support.google.com/accessibility/android/answer/6283677)

## Implementation Checklist

### For New Components
- [ ] Use semantic HTML elements
- [ ] Provide proper ARIA labels and roles
- [ ] Ensure keyboard navigation support
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Add automated accessibility tests
- [ ] Document accessibility features

### For Existing Components
- [ ] Audit with axe-core
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check color contrast
- [ ] Update documentation
- [ ] Add missing ARIA attributes
- [ ] Fix any identified issues
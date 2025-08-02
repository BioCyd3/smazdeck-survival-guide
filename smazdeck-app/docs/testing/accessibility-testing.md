# Accessibility Testing Procedures

This document outlines comprehensive accessibility testing procedures for the Smazdeck Survival Guide application, including automated testing, manual testing, and continuous monitoring.

## Testing Overview

### Testing Levels
1. **Unit Level**: Individual component accessibility
2. **Integration Level**: Component interaction accessibility
3. **Page Level**: Complete page accessibility
4. **Application Level**: End-to-end user flows

### Testing Types
- **Automated Testing**: axe-core, Lighthouse, ESLint rules
- **Manual Testing**: Keyboard navigation, screen reader testing
- **User Testing**: Testing with actual users with disabilities
- **Continuous Monitoring**: Ongoing accessibility monitoring

## Automated Testing

### axe-core Integration

#### Setup
```javascript
// test/setup.js
import { configureAxe } from '@axe-core/react';

// Configure axe for testing environment
if (process.env.NODE_ENV === 'test') {
  configureAxe({
    rules: {
      // Customize rules as needed
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'focus-management': { enabled: true },
    }
  });
}
```

#### Component Testing
```javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Button>Accessible Button</Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('icon button has proper aria-label', async () => {
    const { container } = render(
      <IconButton 
        icon={<SearchIcon />} 
        aria-label="Search for content"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('disabled button is properly marked', async () => {
    const { container } = render(
      <Button disabled>Disabled Button</Button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### Page-Level Testing
```javascript
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

describe('HomePage Accessibility', () => {
  test('homepage should be accessible', async () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    const results = await axe(container, {
      rules: {
        // Skip rules that don't apply to test environment
        'page-has-heading-one': { enabled: false },
        'landmark-one-main': { enabled: false },
      }
    });
    
    expect(results).toHaveNoViolations();
  });
});
```

### Lighthouse CI Integration

#### Configuration
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### GitHub Actions Integration
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

### ESLint Accessibility Rules

#### Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['jsx-a11y'],
  rules: {
    // Enforce accessibility rules
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
  }
};
```

## Manual Testing

### Keyboard Navigation Testing

#### Testing Checklist
```markdown
## Keyboard Navigation Checklist

### Basic Navigation
- [ ] Tab moves forward through interactive elements
- [ ] Shift+Tab moves backward through interactive elements
- [ ] Tab order is logical and intuitive
- [ ] All interactive elements are reachable via keyboard
- [ ] No keyboard traps (except intentional modal traps)

### Focus Management
- [ ] Focus indicators are clearly visible
- [ ] Focus indicators have sufficient contrast
- [ ] Focus moves logically after actions (form submission, modal close)
- [ ] Focus is trapped in modals and dropdowns
- [ ] Skip links are available and functional

### Element-Specific Testing
- [ ] Buttons activate with Enter and Space
- [ ] Links activate with Enter
- [ ] Checkboxes toggle with Space
- [ ] Radio buttons select with Space and navigate with arrows
- [ ] Dropdowns open with Enter/Space and navigate with arrows
- [ ] Tabs navigate with arrow keys
- [ ] Modals close with Escape
```

#### Testing Script
```javascript
// Automated keyboard navigation testing
describe('Keyboard Navigation', () => {
  test('tab navigation works correctly', () => {
    render(<NavigationComponent />);
    
    const firstButton = screen.getByRole('button', { name: 'First' });
    const secondButton = screen.getByRole('button', { name: 'Second' });
    
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    
    userEvent.tab();
    expect(secondButton).toHaveFocus();
    
    userEvent.tab({ shift: true });
    expect(firstButton).toHaveFocus();
  });

  test('enter key activates buttons', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('escape closes modal', () => {
    const handleClose = jest.fn();
    render(<Modal onClose={handleClose} open />);
    
    userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
```

### Screen Reader Testing

#### Testing with NVDA (Windows)
```markdown
## NVDA Testing Checklist

### Content Structure
- [ ] Headings are announced with correct levels
- [ ] Lists are announced as lists with item counts
- [ ] Tables have proper headers and captions
- [ ] Landmarks are properly identified

### Interactive Elements
- [ ] Buttons are announced as buttons with clear labels
- [ ] Links are announced as links with descriptive text
- [ ] Form controls have proper labels
- [ ] Error messages are announced
- [ ] Loading states are announced

### Dynamic Content
- [ ] Live regions announce changes
- [ ] Modal dialogs are announced when opened
- [ ] Form validation errors are announced
- [ ] Success messages are announced
```

#### Testing with VoiceOver (macOS)
```markdown
## VoiceOver Testing Checklist

### Navigation
- [ ] VO+Right Arrow navigates through content
- [ ] VO+Command+H navigates headings
- [ ] VO+Command+L navigates links
- [ ] VO+Command+J navigates form controls

### Content Reading
- [ ] Content is read in logical order
- [ ] Images have descriptive alt text
- [ ] Complex content is properly structured
- [ ] Tables are navigable and understandable
```

### Color Contrast Testing

#### Manual Testing Tools
```javascript
// Color contrast testing utility
const testColorContrast = (foreground, background) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (rgb) => {
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  
  const fgLum = getLuminance(fg);
  const bgLum = getLuminance(bg);
  
  const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
  
  return {
    ratio: ratio.toFixed(2),
    passAA: ratio >= 4.5,
    passAAA: ratio >= 7,
    passLargeAA: ratio >= 3,
    passLargeAAA: ratio >= 4.5
  };
};

// Test color combinations
describe('Color Contrast', () => {
  test('primary text has sufficient contrast', () => {
    const result = testColorContrast('#f1f5f9', '#0f172a'); // slate-100 on slate-900
    expect(result.passAA).toBe(true);
  });

  test('secondary text has sufficient contrast', () => {
    const result = testColorContrast('#e2e8f0', '#0f172a'); // slate-200 on slate-900
    expect(result.passAA).toBe(true);
  });

  test('muted text has sufficient contrast', () => {
    const result = testColorContrast('#94a3b8', '#0f172a'); // slate-400 on slate-900
    expect(result.passAA).toBe(true);
  });
});
```

### Focus Testing

#### Focus Indicator Testing
```javascript
describe('Focus Indicators', () => {
  test('buttons have visible focus indicators', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');
    
    button.focus();
    
    // Check for focus styles
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-amber-500');
  });

  test('focus indicators have sufficient contrast', async () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button');
    
    button.focus();
    
    // Test focus ring contrast
    const computedStyle = window.getComputedStyle(button, ':focus-visible');
    const ringColor = computedStyle.getPropertyValue('--tw-ring-color');
    
    // Verify contrast ratio meets requirements
    const contrastResult = testColorContrast(ringColor, '#0f172a');
    expect(contrastResult.passAA).toBe(true);
  });
});
```

## Component-Specific Testing

### Form Accessibility Testing
```javascript
describe('Form Accessibility', () => {
  test('form inputs have proper labels', async () => {
    render(
      <form>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" />
      </form>
    );
    
    const input = screen.getByLabelText('Email Address');
    expect(input).toBeInTheDocument();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('form validation errors are announced', () => {
    render(
      <form>
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          type="text" 
          aria-describedby="username-error"
          aria-invalid="true"
        />
        <div id="username-error" role="alert">
          Username is required
        </div>
      </form>
    );
    
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Username is required');
  });

  test('required fields are properly marked', () => {
    render(
      <form>
        <Label htmlFor="password" required>Password</Label>
        <Input id="password" type="password" required />
      </form>
    );
    
    const input = screen.getByLabelText(/password/i);
    expect(input).toBeRequired();
  });
});
```

### Navigation Accessibility Testing
```javascript
describe('Navigation Accessibility', () => {
  test('navigation has proper landmarks', async () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('breadcrumbs have proper structure', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/smazs">Smazs</BreadcrumbItem>
        <BreadcrumbItem current>Warrior</BreadcrumbItem>
      </Breadcrumb>
    );
    
    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(breadcrumb).toBeInTheDocument();
    
    const currentItem = screen.getByText('Warrior');
    expect(currentItem).toHaveAttribute('aria-current', 'page');
  });
});
```

### Modal Accessibility Testing
```javascript
describe('Modal Accessibility', () => {
  test('modal traps focus correctly', () => {
    const handleClose = jest.fn();
    render(
      <Modal open onClose={handleClose}>
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );
    
    const firstButton = screen.getByText('First Button');
    const secondButton = screen.getByText('Second Button');
    
    // Focus should be trapped within modal
    firstButton.focus();
    userEvent.tab();
    expect(secondButton).toHaveFocus();
    
    userEvent.tab();
    expect(firstButton).toHaveFocus(); // Should wrap back to first
  });

  test('modal closes with escape key', () => {
    const handleClose = jest.fn();
    render(<Modal open onClose={handleClose} />);
    
    userEvent.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('modal has proper ARIA attributes', async () => {
    render(
      <Modal open>
        <h2>Modal Title</h2>
        <p>Modal content</p>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Continuous Monitoring

### Automated Monitoring Setup
```javascript
// accessibility-monitor.js
import { configureAxe } from '@axe-core/react';

if (process.env.NODE_ENV === 'development') {
  configureAxe({
    rules: {
      // Enable all accessibility rules in development
    }
  });
  
  // Monitor for accessibility violations in development
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Run axe on new elements
            axe.run(node).then((results) => {
              if (results.violations.length > 0) {
                console.warn('Accessibility violations detected:', results.violations);
              }
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
```

### Performance Monitoring
```javascript
// Monitor accessibility performance impact
const measureAccessibilityPerformance = () => {
  performance.mark('accessibility-start');
  
  return axe.run().then((results) => {
    performance.mark('accessibility-end');
    performance.measure('accessibility-audit', 'accessibility-start', 'accessibility-end');
    
    const measure = performance.getEntriesByName('accessibility-audit')[0];
    console.log(`Accessibility audit took ${measure.duration}ms`);
    
    return results;
  });
};
```

## Testing Documentation

### Test Case Templates
```markdown
## Accessibility Test Case Template

### Test ID: A11Y-001
### Component: Button
### Test Type: Automated + Manual

#### Automated Tests
- [ ] axe-core violations check
- [ ] ESLint jsx-a11y rules pass
- [ ] Color contrast meets WCAG AA

#### Manual Tests
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators are visible
- [ ] High contrast mode works

#### Expected Results
- No accessibility violations
- Proper keyboard interaction
- Clear screen reader announcements
- Visible focus indicators

#### Test Data
```jsx
<Button onClick={handleClick}>
  Test Button
</Button>
```

#### Notes
- Test with multiple screen readers
- Verify across different browsers
- Check mobile accessibility
```

### Accessibility Report Template
```markdown
## Accessibility Audit Report

### Summary
- **Date**: [Date]
- **Scope**: [Pages/Components tested]
- **Tools Used**: axe-core, NVDA, VoiceOver, Lighthouse
- **Overall Score**: [Score/Grade]

### Violations Found
| Severity | Count | Rule | Impact |
|----------|-------|------|--------|
| Critical | 0     | -    | -      |
| Serious  | 2     | color-contrast | Medium |
| Moderate | 1     | label-missing | Low |
| Minor    | 3     | aria-label | Low |

### Detailed Findings
#### 1. Color Contrast Issues
- **Location**: Secondary text on cards
- **Issue**: Contrast ratio 3.2:1 (needs 4.5:1)
- **Fix**: Use slate-300 instead of slate-400
- **Priority**: High

### Recommendations
1. Implement automated accessibility testing in CI/CD
2. Regular manual testing with screen readers
3. User testing with people with disabilities
4. Accessibility training for development team

### Next Steps
- [ ] Fix critical and serious violations
- [ ] Implement automated monitoring
- [ ] Schedule follow-up audit
```

## Best Practices

### Testing Strategy
1. **Shift Left**: Test accessibility early in development
2. **Automate**: Use automated tools for consistent testing
3. **Manual Testing**: Complement automation with manual testing
4. **Real Users**: Include users with disabilities in testing
5. **Continuous**: Monitor accessibility continuously

### Tool Selection
- **axe-core**: Comprehensive automated testing
- **Lighthouse**: Performance and accessibility audits
- **NVDA/VoiceOver**: Screen reader testing
- **Color Oracle**: Color blindness simulation
- **WAVE**: Visual accessibility evaluation

### Documentation
- Document all accessibility testing procedures
- Maintain accessibility test cases
- Track accessibility metrics over time
- Share accessibility knowledge across team
- Create accessibility guidelines and checklists
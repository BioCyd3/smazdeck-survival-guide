# Navigation Components

This document describes the enhanced navigation components implemented for task 6.2 "Improved Navigation Components".

## Components Overview

### 1. Breadcrumb Component (`Breadcrumb.jsx`)

A breadcrumb navigation component with proper hierarchy and accessibility features.

**Features:**
- Automatic home link insertion
- Custom separators and icons
- Truncation for long paths
- Mobile-responsive design
- Full accessibility support

**Usage:**
```jsx
import Breadcrumb from '../components/ui/Breadcrumb';

<Breadcrumb 
  items={[
    { label: 'Smazdex', href: '/smazdex' },
    { label: 'Pikachu', href: '/smazdex/pikachu' },
    { label: 'Profile' }
  ]}
  separator=">"
  maxItems={4}
/>
```

### 2. Tabs Component (`Tabs.jsx`)

A tab navigation component with active state indicators and keyboard navigation.

**Features:**
- Multiple variants (default, pills, minimal)
- Horizontal and vertical orientation
- Icons and badges support
- Keyboard navigation (arrow keys, home, end)
- Lazy loading for tab panels

**Usage:**
```jsx
import Tabs, { TabPanel } from '../components/ui/Tabs';

const [activeTab, setActiveTab] = useState('tab1');

<Tabs
  tabs={[
    { id: 'tab1', label: 'Overview', icon: '📋' },
    { id: 'tab2', label: 'Details', badge: '5' },
    { id: 'tab3', label: 'Settings', disabled: true }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="pills"
/>

<TabPanel id="tab1" activeTab={activeTab}>
  <div>Tab 1 content</div>
</TabPanel>
```

### 3. Pagination Component (`Pagination.jsx`)

A pagination component with page size options and mobile-friendly design.

**Features:**
- Page size selector
- First/last page buttons
- Ellipsis for large page ranges
- Item count display
- Multiple sizes (sm, md, lg)
- Responsive design

**Usage:**
```jsx
import Pagination from '../components/ui/Pagination';

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  pageSize={pageSize}
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  showPageSize={true}
  showInfo={true}
/>
```

### 4. Mobile Navigation Component (`MobileNavigation.jsx`)

A mobile-friendly navigation component with multiple patterns.

**Features:**
- Three variants: drawer, bottom, scroll
- Touch-friendly interactions
- Overlay and focus trapping for drawer
- Icons and badges support
- Keyboard navigation

**Usage:**
```jsx
import MobileNavigation from '../components/ui/MobileNavigation';

// Drawer Navigation
<MobileNavigation
  items={navigationItems}
  variant="drawer"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
/>

// Bottom Navigation
<MobileNavigation
  items={navigationItems}
  variant="bottom"
/>

// Horizontal Scroll Navigation
<MobileNavigation
  items={navigationItems}
  variant="scroll"
/>
```

## Accessibility Features

All components include comprehensive accessibility features:

- **Keyboard Navigation**: Full support for keyboard-only users
- **ARIA Labels**: Proper semantic HTML and ARIA attributes
- **Screen Reader Support**: Compatible with assistive technologies
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Meets WCAG AA standards

## Mobile-Friendly Features

- **Touch Targets**: Appropriately sized for touch interaction
- **Responsive Design**: Adapts to different screen sizes
- **Horizontal Scrolling**: For overflow content on mobile
- **Drawer Navigation**: Space-efficient navigation pattern
- **Bottom Navigation**: Easy thumb access on mobile devices

## Requirements Fulfilled

This implementation addresses the following requirements from the spec:

- **4.3**: Enhanced visual feedback and interactive elements
- **5.1**: Consistent and optimized mobile experience
- **7.3**: Enhanced visual search and filtering capabilities

## Testing

All components include comprehensive test suites covering:

- Rendering and basic functionality
- User interactions (clicks, keyboard navigation)
- Accessibility features
- Edge cases and error states
- Mobile-specific behaviors

Run tests with:
```bash
npm test -- --run Breadcrumb.test.jsx
npm test -- --run Tabs.test.jsx
npm test -- --run Pagination.test.jsx
npm test -- --run MobileNavigation.test.jsx
```

## Integration Examples

See `NavigationExamplePage.jsx` for comprehensive examples of all components in use, including:

- Different variants and configurations
- Integration patterns
- Responsive behavior demonstrations
- Accessibility feature showcases
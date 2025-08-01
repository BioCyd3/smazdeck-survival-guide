import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Tabs, { TabPanel } from './Tabs';

describe('Tabs', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true }
  ];

  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders tabs correctly', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows active tab correctly', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab2" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const activeTab = screen.getByRole('tab', { name: 'Tab 2' });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
    expect(activeTab).toHaveAttribute('tabIndex', '0');
  });

  it('calls onTabChange when tab is clicked', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    fireEvent.click(screen.getByText('Tab 2'));
    expect(mockOnTabChange).toHaveBeenCalledWith('tab2');
  });

  it('does not call onTabChange for disabled tabs', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const disabledTab = screen.getByText('Tab 3');
    fireEvent.click(disabledTab);
    expect(mockOnTabChange).not.toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    
    // Arrow right should focus next tab
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
    
    // Enter should activate the focused tab
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Tab 2' }), { key: 'Enter' });
    expect(mockOnTabChange).toHaveBeenCalledWith('tab2');
  });

  it('renders with icons and badges', () => {
    const tabsWithExtras = [
      { id: 'tab1', label: 'Tab 1', icon: '🏠', badge: '5' },
      { id: 'tab2', label: 'Tab 2' }
    ];

    render(
      <Tabs 
        tabs={tabsWithExtras} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange}
        variant="pills"
      />
    );
    
    // Test pills variant
    expect(screen.getByRole('tablist')).toHaveClass('bg-slate-800');
    
    // Test minimal variant
    rerender(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange}
        variant="minimal"
      />
    );
    
    const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
    expect(activeTab).toHaveClass('bg-slate-800');
  });

  it('handles vertical orientation', () => {
    render(
      <Tabs 
        tabs={mockTabs} 
        activeTab="tab1" 
        onTabChange={mockOnTabChange}
        orientation="vertical"
      />
    );
    
    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders nothing when tabs array is empty', () => {
    const { container } = render(
      <Tabs 
        tabs={[]} 
        activeTab="" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
});

describe('TabPanel', () => {
  it('shows content when active', () => {
    render(
      <TabPanel id="tab1" activeTab="tab1">
        <div>Tab 1 Content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveClass('block');
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
  });

  it('hides content when not active', () => {
    render(
      <TabPanel id="tab1" activeTab="tab2">
        <div>Tab 1 Content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveClass('hidden');
  });

  it('does not render content when lazy and not active', () => {
    render(
      <TabPanel id="tab1" activeTab="tab2" lazy>
        <div>Tab 1 Content</div>
      </TabPanel>
    );
    
    expect(screen.queryByText('Tab 1 Content')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TabPanel id="tab1" activeTab="tab1">
        <div>Content</div>
      </TabPanel>
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('id', 'tabpanel-tab1');
    expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab1');
  });
});
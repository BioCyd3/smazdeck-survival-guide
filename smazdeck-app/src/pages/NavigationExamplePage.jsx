import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/ui/Breadcrumb';
import Tabs, { TabPanel } from '../components/ui/Tabs';
import Pagination from '../components/ui/Pagination';
import MobileNavigation from '../components/ui/MobileNavigation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * Example page demonstrating all navigation components
 * This showcases the enhanced navigation components from task 6.2
 */
const NavigationExamplePage = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('breadcrumbs');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 247;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Mobile navigation state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Sample data for demonstrations
  const breadcrumbItems = [
    { label: 'Components', href: '/components' },
    { label: 'Navigation', href: '/components/navigation' },
    { label: 'Examples' }
  ];

  const tabItems = [
    { id: 'breadcrumbs', label: 'Breadcrumbs', icon: '🍞' },
    { id: 'tabs', label: 'Tabs', icon: '📑', badge: '4' },
    { id: 'pagination', label: 'Pagination', icon: '📄' },
    { id: 'mobile', label: 'Mobile Nav', icon: '📱' }
  ];

  const mobileNavItems = [
    { id: 'home', href: '/', label: 'Home', icon: '🏠' },
    { id: 'smazdex', href: '/smazdex', label: 'Smazdex', icon: '📚' },
    { id: 'tier-lists', href: '/tier-lists', label: 'Tier Lists', icon: '🏆' },
    { id: 'builds', href: '/builds', label: 'Builds', icon: '🔧' },
    { id: 'team-comps', href: '/team-comps', label: 'Team Comps', icon: '👥' }
  ];

  return (
    <>
      <Helmet>
        <title>Navigation Components Examples | Smazdeck Survival Guide</title>
        <meta 
          name="description" 
          content="Examples and demonstrations of enhanced navigation components including breadcrumbs, tabs, pagination, and mobile navigation patterns."
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Page Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Exo_2']">
            Navigation Components
          </h1>
          <p className="text-slate-300 text-lg">
            Enhanced navigation components with accessibility features and mobile-friendly patterns
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-8">
          <Tabs
            tabs={tabItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="default"
            className="mb-6"
          />

          {/* Breadcrumb Examples */}
          <TabPanel id="breadcrumbs" activeTab={activeTab}>
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Basic Breadcrumb</h2>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <Breadcrumb 
                    items={[
                      { label: 'Home', href: '/' },
                      { label: 'Products', href: '/products' },
                      { label: 'Gaming', href: '/products/gaming' },
                      { label: 'Current Item' }
                    ]}
                  />
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Breadcrumb with Icons</h2>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <Breadcrumb 
                    items={[
                      { label: 'Dashboard', href: '/dashboard', icon: '📊' },
                      { label: 'Users', href: '/users', icon: '👥' },
                      { label: 'Profile', icon: '👤' }
                    ]}
                    separator=">"
                  />
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Truncated Breadcrumb</h2>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <Breadcrumb 
                    items={[
                      { label: 'Level 1', href: '/level1' },
                      { label: 'Level 2', href: '/level2' },
                      { label: 'Level 3', href: '/level3' },
                      { label: 'Level 4', href: '/level4' },
                      { label: 'Level 5', href: '/level5' },
                      { label: 'Current Level' }
                    ]}
                    maxItems={4}
                  />
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Tab Examples */}
          <TabPanel id="tabs" activeTab={activeTab}>
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Default Tabs</h2>
                <Tabs
                  tabs={[
                    { id: 'overview', label: 'Overview' },
                    { id: 'details', label: 'Details' },
                    { id: 'reviews', label: 'Reviews', badge: '12' }
                  ]}
                  activeTab="overview"
                  onTabChange={() => {}}
                />
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Pills Variant</h2>
                <Tabs
                  tabs={[
                    { id: 'all', label: 'All Items', icon: '📋' },
                    { id: 'active', label: 'Active', icon: '✅', badge: '5' },
                    { id: 'inactive', label: 'Inactive', icon: '❌' }
                  ]}
                  activeTab="active"
                  onTabChange={() => {}}
                  variant="pills"
                />
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Vertical Tabs</h2>
                <div className="flex gap-4">
                  <Tabs
                    tabs={[
                      { id: 'general', label: 'General Settings', icon: '⚙️' },
                      { id: 'security', label: 'Security', icon: '🔒' },
                      { id: 'notifications', label: 'Notifications', icon: '🔔', badge: '3' },
                      { id: 'advanced', label: 'Advanced', icon: '🔧' }
                    ]}
                    activeTab="security"
                    onTabChange={() => {}}
                    orientation="vertical"
                    variant="minimal"
                    className="w-48"
                  />
                  <div className="flex-1 bg-slate-800 p-4 rounded-lg">
                    <p className="text-slate-300">Tab content would appear here...</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Pagination Examples */}
          <TabPanel id="pagination" activeTab={activeTab}>
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Full Pagination</h2>
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
                  showFirstLast={true}
                />
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Minimal Pagination</h2>
                <Pagination
                  currentPage={5}
                  totalPages={10}
                  onPageChange={() => {}}
                  showPageSize={false}
                  showInfo={false}
                  showFirstLast={false}
                  maxVisiblePages={3}
                />
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Small Size Pagination</h2>
                <Pagination
                  currentPage={2}
                  totalPages={8}
                  totalItems={76}
                  pageSize={10}
                  onPageChange={() => {}}
                  size="sm"
                />
              </Card>
            </div>
          </TabPanel>

          {/* Mobile Navigation Examples */}
          <TabPanel id="mobile" activeTab={activeTab}>
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Mobile Navigation Drawer</h2>
                <div className="space-y-4">
                  <Button 
                    onClick={() => setIsMobileNavOpen(true)}
                    variant="primary"
                  >
                    Open Navigation Drawer
                  </Button>
                  <p className="text-slate-300 text-sm">
                    Click the button above to see the mobile navigation drawer in action.
                  </p>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Bottom Navigation</h2>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <p className="text-slate-300 mb-4">
                    Bottom navigation is fixed to the bottom of the screen on mobile devices.
                  </p>
                  <div className="relative bg-slate-900 rounded-lg p-4 h-32">
                    <div className="absolute bottom-0 left-0 right-0">
                      <MobileNavigation
                        items={mobileNavItems.slice(0, 4)}
                        variant="bottom"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-semibold text-white mb-4">Horizontal Scroll Navigation</h2>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <MobileNavigation
                    items={[
                      ...mobileNavItems,
                      { id: 'extra1', href: '/extra1', label: 'Extra Item 1', icon: '🎮' },
                      { id: 'extra2', href: '/extra2', label: 'Extra Item 2', icon: '🎯' },
                      { id: 'extra3', href: '/extra3', label: 'Extra Item 3', icon: '🎪' }
                    ]}
                    variant="scroll"
                  />
                </div>
              </Card>
            </div>
          </TabPanel>
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileNavigation
          items={mobileNavItems}
          variant="drawer"
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          position="left"
        />

        {/* Usage Information */}
        <Card className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Implementation Notes</h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-medium text-white mb-2">Accessibility Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Full keyboard navigation support</li>
                <li>ARIA labels and semantic HTML structure</li>
                <li>Screen reader compatibility</li>
                <li>Focus management and visual indicators</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Mobile-Friendly Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Touch-friendly interactive elements</li>
                <li>Responsive design with proper breakpoints</li>
                <li>Horizontal scrolling for overflow content</li>
                <li>Drawer navigation with overlay and focus trapping</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default NavigationExamplePage;
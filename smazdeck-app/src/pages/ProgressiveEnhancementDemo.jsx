import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DataComparison, StatComparison } from '../components/ui/DataComparison';
import { OptimizedMedia, OptimizedMediaGallery } from '../components/ui/OptimizedMedia';
import { ProgressiveDisclosure, ExpandableSection } from '../components/ui/ProgressiveDisclosure';
import { ResponsiveTable } from '../components/ui/ResponsiveTable';
import Card from '../components/ui/Card';
import { useResponsive } from '../hooks/useResponsive';

const ProgressiveEnhancementDemo = () => {
  const { isMobile, isTablet } = useResponsive();

  // Sample data for demonstrations
  const sampleData = [
    {
      id: 1,
      name: 'Fluff Static',
      tier: 'S',
      damage: 208,
      skills: 2,
      type: 'Electric',
      image: '/images/smazs/fluff-static.png',
      description: 'Electric-type Smaz with high damage output and excellent ascension scaling',
      details: 'Excellent for DPS roles with strong ascension effects. Works well in both PvP and PvE content.'
    },
    {
      id: 2,
      name: 'Lendanear',
      tier: 'A',
      damage: 325,
      skills: 3,
      type: 'Healing',
      image: '/images/smazs/lendanear.png',
      description: 'Healing-focused Smaz with support abilities and team sustainability',
      details: 'Great for support roles and team sustainability. Essential for difficult content.'
    },
    {
      id: 3,
      name: 'Test Smaz',
      tier: 'B',
      damage: 150,
      skills: 1,
      type: 'Basic',
      image: '/images/smazs/test-smaz.png',
      description: 'Basic Smaz for testing purposes with simple mechanics',
      details: 'Simple abilities suitable for beginners. Good for learning game mechanics.'
    },
    {
      id: 4,
      name: 'Fire Drake',
      tier: 'S',
      damage: 280,
      skills: 4,
      type: 'Fire',
      image: '/images/smazs/fire-drake.png',
      description: 'Fire-type Smaz with area damage and burn effects',
      details: 'Powerful AoE damage dealer with excellent crowd control capabilities.'
    },
    {
      id: 5,
      name: 'Ice Guardian',
      tier: 'A',
      damage: 180,
      skills: 3,
      type: 'Ice',
      image: '/images/smazs/ice-guardian.png',
      description: 'Defensive Ice-type Smaz with crowd control abilities',
      details: 'Tank role specialist with excellent defensive capabilities and CC.'
    }
  ];

  const tableColumns = [
    { key: 'name', header: 'Name', primary: true },
    { key: 'tier', header: 'Tier', showInMobile: true },
    { key: 'damage', header: 'Damage', showInMobile: true },
    { key: 'skills', header: 'Skills', showInMobile: false },
    { key: 'type', header: 'Type', showInMobile: false },
    { key: 'description', header: 'Description', showInMobile: false }
  ];

  const statColumns = [
    { key: 'damage', label: 'Damage', higherIsBetter: true },
    { key: 'skills', label: 'Skills', higherIsBetter: true },
    { key: 'tier', label: 'Tier' }
  ];

  const mediaItems = [
    { id: 1, src: '/images/smazs/fluff-static.png', alt: 'Fluff Static', caption: 'Electric DPS' },
    { id: 2, src: '/images/smazs/lendanear.png', alt: 'Lendanear', caption: 'Healing Support' },
    { id: 3, src: '/images/smazs/fire-drake.png', alt: 'Fire Drake', caption: 'AoE Damage' },
    { id: 4, src: '/images/smazs/ice-guardian.png', alt: 'Ice Guardian', caption: 'Tank/CC' }
  ];

  return (
    <>
      <Helmet>
        <title>Progressive Enhancement Demo | Smazdeck Survival Guide</title>
        <meta name="description" content="Demonstration of progressive enhancement features for complex data presentation" />
      </Helmet>

      <div className="min-h-screen space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 font-['Exo_2']">
            Progressive Enhancement Demo
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            This page demonstrates progressive enhancement features for complex data presentation, 
            including responsive tables, optimized media loading, and mobile-first design patterns.
          </p>
          <div className="mt-4 text-sm text-slate-400">
            Current device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </div>
        </div>

        {/* Data Comparison Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Data Comparison Component</h2>
          <DataComparison
            data={sampleData}
            columns={tableColumns}
            title="Smaz Comparison Table"
            description="Compare different Smazs with responsive layout"
            compareMode={true}
            highlightDifferences={true}
            showImages={true}
            maxMobileItems={3}
          />
        </section>

        {/* Responsive Table Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Responsive Table Component</h2>
          <Card>
            <ResponsiveTable
              data={sampleData}
              columns={tableColumns}
              sortable={true}
              selectable={true}
              variant="striped"
              mobileBreakpoint="md"
            />
          </Card>
        </section>

        {/* Stat Comparison Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Stat Comparison Component</h2>
          <StatComparison
            items={sampleData}
            stats={statColumns}
            title="Performance Statistics"
            highlightBest={true}
            showDifferences={true}
          />
        </section>

        {/* Progressive Disclosure Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Progressive Disclosure</h2>
          <div className="grid gap-4">
            {sampleData.slice(0, 3).map((item) => (
              <ProgressiveDisclosure
                key={item.id}
                title={item.name}
                description={item.description}
                badge={`${item.skills} skills`}
                icon={
                  <OptimizedMedia
                    src={item.image}
                    alt={item.name}
                    className="w-8 h-8 rounded-full"
                    aspectRatio="square"
                    lazy={false}
                    fallback={
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs">
                        {item.name.charAt(0)}
                      </div>
                    }
                  />
                }
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-slate-400">Tier:</span>
                      <span className="ml-2 text-amber-400 font-medium">{item.tier}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400">Damage:</span>
                      <span className="ml-2 text-slate-200">{item.damage}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400">Skills:</span>
                      <span className="ml-2 text-slate-200">{item.skills}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-400">Type:</span>
                      <span className="ml-2 text-slate-200">{item.type}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-400 mb-2">Details</h4>
                    <p className="text-sm text-slate-300">{item.details}</p>
                  </div>
                </div>
              </ProgressiveDisclosure>
            ))}
          </div>
        </section>

        {/* Optimized Media Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Optimized Media Loading</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Single Optimized Image</h3>
              <div className="max-w-md">
                <OptimizedMedia
                  src="/images/smazs/fluff-static.png"
                  alt="Fluff Static - High Quality"
                  aspectRatio="4/3"
                  className="rounded-lg"
                  sizes={{
                    mobile: '/images/smazs/fluff-static.png',
                    tablet: '/images/smazs/fluff-static.png',
                    desktop: '/images/smazs/fluff-static.png'
                  }}
                  progressive={true}
                  lazy={false}
                  fallback={
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400">
                      Image not available
                    </div>
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Media Gallery</h3>
              <OptimizedMediaGallery
                items={mediaItems}
                cols={{ sm: 1, md: 2, lg: 4 }}
                aspectRatio="square"
                gap="md"
                lazy={true}
                progressive={true}
              />
            </div>
          </div>
        </section>

        {/* Expandable Sections Demo */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Expandable Sections</h2>
          <div className="space-y-4">
            <ExpandableSection
              title="Advanced Features"
              count={5}
              defaultExpanded={false}
            >
              <div className="space-y-3">
                <p className="text-slate-300">
                  This section demonstrates expandable content areas that help organize complex information 
                  in a mobile-friendly way.
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Responsive data tables with horizontal scrolling</li>
                  <li>Mobile-optimized card layouts for complex information</li>
                  <li>Progressive disclosure for detailed information</li>
                  <li>Optimized image and media loading</li>
                  <li>Touch-friendly interactive elements</li>
                </ul>
              </div>
            </ExpandableSection>

            <ExpandableSection
              title="Performance Optimizations"
              count={3}
              defaultExpanded={false}
            >
              <div className="space-y-3">
                <p className="text-slate-300">
                  Various performance optimizations are implemented to ensure smooth user experience 
                  across all devices.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium text-amber-400 mb-2">Lazy Loading</h4>
                    <p className="text-sm text-slate-300">
                      Images and heavy components load only when needed
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-amber-400 mb-2">Progressive Enhancement</h4>
                    <p className="text-sm text-slate-300">
                      Features work without JavaScript and enhance with it
                    </p>
                  </Card>
                  <Card className="p-4">
                    <h4 className="font-medium text-amber-400 mb-2">Responsive Images</h4>
                    <p className="text-sm text-slate-300">
                      Different image sizes served based on device capabilities
                    </p>
                  </Card>
                </div>
              </div>
            </ExpandableSection>
          </div>
        </section>

        {/* Mobile-Specific Features */}
        {isMobile && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Mobile-Specific Features</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Touch-friendly interactive elements (44px minimum)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Progressive disclosure for complex data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Optimized image loading for mobile networks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-slate-300">Card-based layouts instead of complex tables</span>
                </div>
              </div>
            </Card>
          </section>
        )}
      </div>
    </>
  );
};

export default ProgressiveEnhancementDemo;
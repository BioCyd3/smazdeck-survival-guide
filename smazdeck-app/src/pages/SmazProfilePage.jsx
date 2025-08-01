import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSmazById } from '../lib/data-helpers';
import SmazSkillCard from '../components/Smaz/SmazSkillCard';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import { OptimizedMedia } from '../components/ui/OptimizedMedia';
import { DataComparison, StatComparison } from '../components/ui/DataComparison';
import { ProgressiveDisclosure, ExpandableSection } from '../components/ui/ProgressiveDisclosure';
import { useResponsive } from '../hooks/useResponsive';

const SmazProfilePage = () => {
  const { id } = useParams();
  const [smaz, setSmaz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const loadSmaz = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const smazData = getSmazById(id);
        
        if (!smazData) {
          setError('Smaz not found');
        } else {
          setSmaz(smazData);
        }
      } catch (err) {
        setError('Failed to load Smaz data');
        console.error('Error loading Smaz:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadSmaz();
    }
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Smazdeck Survival Guide</title>
          <meta name="description" content="Loading Smaz profile..." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-amber-400 text-xl mb-4">⏳ Loading...</div>
            <p className="text-slate-300">Loading Smaz profile...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state - 404 handling
  if (error || !smaz) {
    return (
      <>
        <Helmet>
          <title>Smaz Not Found | Smazdeck Survival Guide</title>
          <meta name="description" content="The requested Smaz could not be found." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-400 text-6xl mb-6">🔍</div>
            <h1 className="text-3xl font-bold text-white mb-4 font-['Exo_2']">
              Smaz Not Found
            </h1>
            <p className="text-slate-300 mb-6">
              The Smaz you're looking for doesn't exist or may have been moved.
            </p>
            <div className="space-y-3">
              <Link
                to="/smazdex"
                className="block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Browse All Smazs
              </Link>
              <Link
                to="/"
                className="block text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const imagePath = `/images/smazs/${smaz.slug || smaz.id}.png`;
  const skillsCount = smaz.skills ? smaz.skills.length : 0;

  return (
    <>
      <Helmet>
        <title>{smaz.name} - Smaz Profile | Smazdeck Survival Guide</title>
        <meta 
          name="description" 
          content={`Detailed profile for ${smaz.name} including ${skillsCount} skills and ascension effects. Complete guide for competitive Smazdeck Survival gameplay.`}
        />
        <meta property="og:title" content={`${smaz.name} - Smaz Profile`} />
        <meta 
          property="og:description" 
          content={`Complete profile and skill breakdown for ${smaz.name}`}
        />
        <meta property="og:type" content="profile" />
        {imagePath && (
          <meta property="og:image" content={`${window.location.origin}${imagePath}`} />
        )}
      </Helmet>

      <div className="min-h-screen">
        {/* Enhanced Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Smazdex', href: '/smazdex' },
            { label: smaz.name }
          ]}
        />

        {/* Main Content */}
        <div className={isMobile ? 'space-y-6' : 'grid lg:grid-cols-3 gap-8'}>
          {/* Smaz Profile Card */}
          <div className="lg:col-span-1">
            <Card className={isMobile ? '' : 'sticky top-4'}>
              <div className="text-center">
                {/* Smaz Image with Optimized Loading */}
                <div className="w-32 h-32 mx-auto mb-6">
                  <OptimizedMedia
                    src={imagePath}
                    alt={`${smaz.name} portrait`}
                    aspectRatio="square"
                    className="rounded-full"
                    sizes={{
                      mobile: imagePath,
                      tablet: imagePath,
                      desktop: imagePath,
                      default: imagePath
                    }}
                    fallback={
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center text-slate-400 text-sm rounded-full">
                        No Image
                      </div>
                    }
                    priority={true}
                  />
                </div>

                {/* Smaz Name */}
                <h1 className="text-3xl font-bold text-white mb-4 font-['Exo_2']">
                  {smaz.name}
                </h1>

                {/* Stats - Progressive Disclosure on Mobile */}
                {isMobile ? (
                  <ProgressiveDisclosure
                    title="Smaz Details"
                    description={`${skillsCount} skills available`}
                    className="mb-4"
                    variant="ghost"
                    size="sm"
                    defaultExpanded={false}
                  >
                    <div className="space-y-2 text-sm text-slate-300">
                      <div className="flex justify-between">
                        <span>Skills:</span>
                        <span className="text-amber-400 font-medium">{skillsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="text-slate-400 font-mono">{smaz.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slug:</span>
                        <span className="text-slate-400 font-mono">{smaz.slug}</span>
                      </div>
                    </div>
                  </ProgressiveDisclosure>
                ) : (
                  <div className="space-y-2 text-sm text-slate-300 mb-6">
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className="text-amber-400 font-medium">{skillsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ID:</span>
                      <span className="text-slate-400 font-mono">{smaz.id}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <Link
                    to="/smazdex"
                    className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    ← Back to Smazdex
                  </Link>
                  <Link
                    to="/tier-lists"
                    className="block w-full border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View in Tier Lists
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Skills Section */}
          <div className="lg:col-span-2">
            {/* Skills Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 font-['Exo_2']">
                Skills & Abilities
              </h2>
              <p className="text-slate-300">
                Detailed breakdown of {smaz.name}'s skills and ascension effects
              </p>
            </div>

            {/* Skills List with Progressive Enhancement */}
            {smaz.skills && smaz.skills.length > 0 ? (
              <div className="space-y-4">
                {/* Skills Overview for Mobile */}
                {isMobile && smaz.skills.length > 3 && (
                  <ExpandableSection
                    title="Skills Overview"
                    count={smaz.skills.length}
                    defaultExpanded={false}
                    className="mb-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {smaz.skills.map((skill, index) => (
                        <div key={index} className="text-center p-3 bg-slate-800 rounded-lg">
                          <div className="text-sm font-medium text-amber-400 mb-1">
                            {skill.skill_name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {skill.ascension_effects?.length || 0} effects
                          </div>
                        </div>
                      ))}
                    </div>
                  </ExpandableSection>
                )}

                {/* Individual Skill Cards */}
                {smaz.skills.map((skill, index) => (
                  <SmazSkillCard 
                    key={index} 
                    skill={skill} 
                    variant={isMobile ? 'outlined' : 'default'}
                  />
                ))}

                {/* Skills Comparison Table for Desktop */}
                {!isMobile && smaz.skills.length > 1 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Skills Comparison
                    </h3>
                    <StatComparison
                      items={smaz.skills.map((skill, index) => ({
                        id: index,
                        name: skill.skill_name,
                        effects: skill.ascension_effects?.length || 0,
                        description_length: skill.description?.length || 0,
                        has_ascension: skill.ascension_effects?.length > 0 ? 'Yes' : 'No'
                      }))}
                      stats={[
                        { key: 'effects', label: 'Ascension Effects', higherIsBetter: true },
                        { key: 'description_length', label: 'Description Length', higherIsBetter: false },
                        { key: 'has_ascension', label: 'Has Ascension' }
                      ]}
                      title="Skill Statistics"
                      highlightBest={true}
                    />
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <div className="text-center py-8">
                  <div className="text-slate-400 text-xl mb-4">📝 No Skills Data</div>
                  <p className="text-slate-300">
                    No skills information available for {smaz.name} yet.
                  </p>
                </div>
              </Card>
            )}

            {/* Additional Information with Progressive Disclosure */}
            <div className="mt-8">
              <ProgressiveDisclosure
                title="💡 Pro Tips & Strategy"
                description="Advanced gameplay tips and strategic insights"
                className="bg-slate-800/50 border border-slate-700"
                variant="ghost"
                defaultExpanded={!isMobile}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-2">Tier List Performance</h4>
                    <p className="text-slate-300 text-sm">
                      Check the tier lists to see how {smaz.name} ranks in different game modes and strategies. 
                      Each skill's ascension effects can significantly impact performance in competitive play.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-2">Skill Synergies</h4>
                    <p className="text-slate-300 text-sm">
                      Consider how {smaz.name}'s skills work together and with other Smazs in your team composition. 
                      Ascension effects often provide multiplicative benefits when properly combined.
                    </p>
                  </div>

                  {skillsCount > 1 && (
                    <div>
                      <h4 className="text-sm font-medium text-amber-400 mb-2">Ascension Priority</h4>
                      <p className="text-slate-300 text-sm">
                        With {skillsCount} skills available, prioritize ascending skills that provide the most 
                        impact for your current game mode and team strategy.
                      </p>
                    </div>
                  )}
                </div>
              </ProgressiveDisclosure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmazProfilePage;

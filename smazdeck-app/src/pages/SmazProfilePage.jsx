import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getSmazById } from '../lib/data-helpers';
import SmazSkillCard from '../components/Smaz/SmazSkillCard';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import Heading from '../components/ui/Heading';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Badge from '../components/ui/Badge';

const SmazProfilePage = () => {
  const { id } = useParams();
  const [smaz, setSmaz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


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

  // Enhanced Loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Smazdeck Survival Guide</title>
          <meta name="description" content="Loading Smaz profile..." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <Heading level={3} variant="subheading" color="accent" className="mb-2">
              Loading Smaz Profile
            </Heading>
            <p className="text-slate-400">Fetching detailed information...</p>
          </div>
        </div>
      </>
    );
  }

  // Enhanced Error state - 404 handling
  if (error || !smaz) {
    return (
      <>
        <Helmet>
          <title>Smaz Not Found | Smazdeck Survival Guide</title>
          <meta name="description" content="The requested Smaz could not be found." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
              <div className="relative text-6xl p-4 bg-slate-800/50 rounded-full border border-red-500/50">
                🔍
              </div>
            </div>
            
            <Heading level={1} variant="heading" color="primary" className="mb-4">
              Smaz Not Found
            </Heading>
            
            <p className="text-slate-300 mb-8 leading-relaxed">
              The Smaz you're looking for doesn't exist or may have been moved. 
              Try browsing our complete Smazdex instead.
            </p>
            
            <div className="space-y-4">
              <Link to="/smazdex">
                <Button variant="primary" size="lg" className="w-full hover-lift">
                  Browse All Smazs
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="md" className="w-full">
                  Return to Home
                </Button>
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

        {/* Enhanced Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Smaz Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5"></div>
              
              <div className="relative text-center p-6">
                {/* Enhanced Smaz Image */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-700 border-2 border-slate-600 hover:border-amber-500/50 transition-colors duration-300">
                    <img
                      src={imagePath}
                      alt={`${smaz.name} portrait`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-full h-full bg-slate-600 items-center justify-center text-slate-400 text-sm hidden"
                      aria-hidden="true"
                    >
                      No Image
                    </div>
                  </div>
                </div>

                {/* Enhanced Smaz Name */}
                <Heading level={1} variant="heading" color="gradient" className="mb-6">
                  {smaz.name}
                </Heading>

                {/* Enhanced Stats with visual indicators */}
                <div className="space-y-4 mb-8">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 font-medium">Skills Available</span>
                      <Badge variant="primary" className="text-lg px-3 py-1">
                        {skillsCount}
                      </Badge>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((skillsCount / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Smaz ID:</span>
                    <code className="text-amber-400 font-mono bg-slate-800/50 px-2 py-1 rounded">
                      {smaz.id}
                    </code>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-3">
                  <Link to="/smazdex">
                    <Button variant="primary" size="md" className="w-full hover-lift">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Smazdex
                    </Button>
                  </Link>
                  
                  <Link to="/tier-lists">
                    <Button variant="outline" size="md" className="w-full">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View in Tier Lists
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Skills Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Heading level={2} variant="heading" color="primary" className="mb-2">
                    Skills & Abilities
                  </Heading>
                  <p className="text-slate-400">
                    Detailed breakdown of {smaz.name}'s skills and ascension effects
                  </p>
                </div>
                
                {skillsCount > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {skillsCount} Skills
                  </Badge>
                )}
              </div>
            </div>

            {/* Enhanced Skills List */}
            {smaz.skills && smaz.skills.length > 0 ? (
              <div className="space-y-6">
                {smaz.skills.map((skill, index) => (
                  <div key={index} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <SmazSkillCard skill={skill} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-slate-500/20 rounded-full blur-xl"></div>
                  <div className="relative text-4xl p-4 bg-slate-800/50 rounded-full border border-slate-700 inline-block">
                    📝
                  </div>
                </div>
                
                <Heading level={3} variant="subheading" color="muted" className="mb-4">
                  No Skills Data Available
                </Heading>
                
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Skills information for {smaz.name} is not yet available. 
                  Check back later for detailed ability breakdowns.
                </p>
                
                <Link to="/smazdex">
                  <Button variant="secondary" size="sm">
                    Browse Other Smazs
                  </Button>
                </Link>
              </Card>
            )}

            {/* Enhanced Additional Information */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {/* Pro Tip Card */}
              <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">💡</div>
                    <Heading level={4} variant="subheading" color="accent">
                      Pro Tip
                    </Heading>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Check the tier lists to see how {smaz.name} ranks in different game modes. 
                    Each skill's ascension effects can significantly impact competitive performance.
                  </p>
                </div>
              </Card>
              
              {/* Quick Actions Card */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">⚡</div>
                    <Heading level={4} variant="subheading" color="secondary">
                      Quick Actions
                    </Heading>
                  </div>
                  <div className="space-y-2">
                    <Link to="/builds" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      → View Build Guides
                    </Link>
                    <Link to="/team-comps" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      → Team Compositions
                    </Link>
                    <Link to="/tier-lists" className="block text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      → Tier Rankings
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmazProfilePage;

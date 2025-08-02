import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';

const HomePage = () => {
  const navigationCards = [
    {
      title: 'Smazdex',
      description: 'Browse all Smazs with detailed profiles, skills, and ascension effects',
      path: '/smazdex',
      icon: '📖'
    },
    {
      title: 'Tier Lists',
      description: 'Explore tier rankings for different game modes and strategies',
      path: '/tier-lists',
      icon: '🏆'
    },
    {
      title: 'Builds',
      description: 'Discover optimal battle builds and equipment recommendations',
      path: '/builds',
      icon: '⚔️'
    },
    {
      title: 'Team Compositions',
      description: 'Learn effective team combinations and synergies',
      path: '/team-comps',
      icon: '👥'
    },
    {
      title: 'Game Mechanics',
      description: 'Master camp upgrades, tech tree buffs, and trait systems',
      path: '/mechanics/camp-upgrades',
      icon: '⚙️'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Smazdeck Survival Guide - Your Ultimate Competitive Resource</title>
        <meta 
          name="description" 
          content="The definitive guide for competitive Smazdeck Survival players. Access tier lists, character profiles, builds, team compositions, and game mechanics." 
        />
        <meta property="og:title" content="Smazdeck Survival Guide" />
        <meta 
          property="og:description" 
          content="Your ultimate resource for competitive Smazdeck Survival gameplay" 
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative text-center py-12 sm:py-16 md:py-24 px-4 safe-top">
            {/* Main heading with enhanced typography */}
            <div className="mb-8 animate-in">
              <Heading 
                level={1} 
                variant="display" 
                color="gradient"
                className="mb-4 animate-in"
                style={{ animationDelay: '0.1s' }}
              >
                Smazdeck Survival Guide
              </Heading>
              
              {/* Subtitle with better spacing */}
              <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-4xl mx-auto leading-relaxed animate-in" style={{ animationDelay: '0.2s' }}>
                Your definitive resource for competitive Smazdeck Survival gameplay
              </p>
              
              {/* Tagline with enhanced styling */}
              <p className="text-lg md:text-xl text-amber-400 font-semibold mb-8 animate-in" style={{ animationDelay: '0.3s' }}>
                Master the meta. Dominate the battlefield.
              </p>
            </div>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/smazdex" className="w-full sm:w-auto">
                <Button 
                  variant="primary"
                  size="lg"
                  className="hover-lift focus-glow w-full sm:min-w-[200px]"
                >
                  Start Exploring
                </Button>
              </Link>
              
              <Link to="/tier-lists" className="w-full sm:w-auto">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="hover-lift w-full sm:min-w-[200px]"
                >
                  View Tier Lists
                </Button>
              </Link>
            </div>
            
            {/* Quick stats or highlights */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto animate-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-amber-500/50 transition-colors duration-300">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">100+</div>
                <div className="text-sm md:text-base text-slate-300">Smazs Documented</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-amber-500/50 transition-colors duration-300">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">50+</div>
                <div className="text-sm md:text-base text-slate-300">Build Guides</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-amber-500/50 transition-colors duration-300">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">24/7</div>
                <div className="text-sm md:text-base text-slate-300">Updated Content</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Navigation Cards Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Heading 
              level={2} 
              variant="heading" 
              color="primary"
              className="mb-4"
            >
              Explore the Guide
            </Heading>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Dive deep into every aspect of Smazdeck Survival with our comprehensive resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => (
              <Link 
                key={index}
                to={card.path}
                className="group block"
              >
                <Card className="h-full hover:border-amber-500 transition-all duration-300 hover-lift group-hover:shadow-glow group-hover:shadow-amber-500/20 relative overflow-hidden">
                  {/* Card background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative text-center p-6">
                    {/* Enhanced icon with animation */}
                    <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                    
                    {/* Enhanced title */}
                    <Heading 
                      level={3} 
                      variant="subheading" 
                      color="primary"
                      className="mb-4 group-hover:text-amber-400 transition-colors duration-300"
                    >
                      {card.title}
                    </Heading>
                    
                    {/* Enhanced description */}
                    <p className="text-slate-300 leading-relaxed mb-4 group-hover:text-slate-200 transition-colors duration-300">
                      {card.description}
                    </p>
                    
                    {/* Call-to-action indicator */}
                    <div className="inline-flex items-center text-amber-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Explore Now
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-slate-900/80 via-slate-800/50 to-slate-900/80 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <Heading 
                level={2} 
                variant="heading" 
                color="primary"
                className="mb-4"
              >
                Why Choose Our Guide?
              </Heading>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                Built by competitive players, for competitive players. Experience the difference quality makes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group text-center">
                {/* Enhanced icon with glow effect */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-all duration-300"></div>
                  <div className="relative text-5xl p-4 bg-slate-800/50 rounded-full border border-slate-700 group-hover:border-amber-500/50 transition-all duration-300">
                    ⚡
                  </div>
                </div>
                
                <Heading 
                  level={3} 
                  variant="subheading" 
                  color="primary"
                  className="mb-4 group-hover:text-amber-400 transition-colors duration-300"
                >
                  Lightning Fast
                </Heading>
                
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Optimized for speed with instant search, responsive design, and blazing-fast load times
                </p>
              </div>
              
              <div className="group text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all duration-300"></div>
                  <div className="relative text-5xl p-4 bg-slate-800/50 rounded-full border border-slate-700 group-hover:border-blue-500/50 transition-all duration-300">
                    📱
                  </div>
                </div>
                
                <Heading 
                  level={3} 
                  variant="subheading" 
                  color="primary"
                  className="mb-4 group-hover:text-blue-400 transition-colors duration-300"
                >
                  Mobile Ready
                </Heading>
                
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Perfect experience on any device, from desktop to mobile, with touch-optimized interactions
                </p>
              </div>
              
              <div className="group text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all duration-300"></div>
                  <div className="relative text-5xl p-4 bg-slate-800/50 rounded-full border border-slate-700 group-hover:border-green-500/50 transition-all duration-300">
                    🎯
                  </div>
                </div>
                
                <Heading 
                  level={3} 
                  variant="subheading" 
                  color="primary"
                  className="mb-4 group-hover:text-green-400 transition-colors duration-300"
                >
                  Always Updated
                </Heading>
                
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  Current meta information and strategies for competitive play, updated in real-time
                </p>
              </div>
            </div>
            
            {/* Additional CTA section */}
            <div className="mt-16 p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <Heading 
                level={3} 
                variant="subheading" 
                color="accent"
                className="mb-4"
              >
                Ready to Elevate Your Game?
              </Heading>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join thousands of competitive players who trust our guide for the latest strategies and insights.
              </p>
              <Link to="/smazdex">
                <Button 
                  variant="primary"
                  size="lg"
                  className="hover-lift focus-glow"
                >
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

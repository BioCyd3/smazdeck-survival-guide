import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from '../components/ui/Card';

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
        {/* Hero Section */}
        <section className="text-center py-12 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Exo_2']">
            Smazdeck Survival Guide
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
            Your definitive resource for competitive Smazdeck Survival gameplay
          </p>
          <p className="text-lg text-amber-400 font-semibold mb-8">
            Master the meta. Dominate the battlefield.
          </p>
          <Link 
            to="/smazdex"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            Start Exploring
          </Link>
        </section>

        {/* Navigation Cards Section */}
        <section className="py-12 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Exo_2']">
            Explore the Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <Link 
                key={index}
                to={card.path}
                className="block transform hover:scale-105 transition-transform duration-200"
              >
                <Card className="h-full hover:border-amber-500 transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3 font-['Exo_2']">
                      {card.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-slate-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8 font-['Exo_2']">
              Why Choose Our Guide?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-300">
                  Optimized for speed with instant search and responsive design
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">Mobile Ready</h3>
                <p className="text-slate-300">
                  Perfect experience on any device, from desktop to mobile
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Always Updated</h3>
                <p className="text-slate-300">
                  Current meta information and strategies for competitive play
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

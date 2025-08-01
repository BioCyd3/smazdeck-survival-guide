import React, { useState } from 'react';
import Card, { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../ui/Card';

const CardExample = () => {
  const [loading, setLoading] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const handleLoadingToggle = () => {
    setLoading(!loading);
  };

  const handleInteractiveToggle = () => {
    setInteractive(!interactive);
  };

  const handleCardClick = () => {
    alert('Card clicked!');
  };

  return (
    <div className="p-8 space-y-8 bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Enhanced Card Component Examples</h1>
        
        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleLoadingToggle}
            className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Toggle Loading: {loading ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleInteractiveToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Toggle Interactive: {interactive ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card 
            variant="default" 
            loading={loading}
            interactive={interactive}
            onClick={interactive ? handleCardClick : undefined}
          >
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with default styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                This is the default card variant with standard background and shadow.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-400">Default variant</span>
            </CardFooter>
          </Card>

          <Card 
            variant="elevated" 
            loading={loading}
            interactive={interactive}
            onClick={interactive ? handleCardClick : undefined}
          >
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with enhanced shadow for prominence</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                This elevated card has a more prominent shadow to make it stand out.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-400">Elevated variant</span>
            </CardFooter>
          </Card>

          <Card 
            variant="outlined" 
            loading={loading}
            interactive={interactive}
            onClick={interactive ? handleCardClick : undefined}
          >
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Transparent card with border emphasis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                This outlined card has a transparent background with a prominent border.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-400">Outlined variant</span>
            </CardFooter>
          </Card>

          <Card 
            variant="glass" 
            loading={loading}
            interactive={interactive}
            onClick={interactive ? handleCardClick : undefined}
          >
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Modern glass morphism effect</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                This glass card features a modern glass morphism effect with backdrop blur.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-slate-400">Glass variant</span>
            </CardFooter>
          </Card>
        </div>

        {/* Size Variants */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Size Variants</h2>
          
          <Card size="sm" variant="elevated">
            <CardHeader>
              <CardTitle>Small Card</CardTitle>
              <CardDescription>Compact card with reduced padding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Small size card (p-3)</p>
            </CardContent>
          </Card>

          <Card size="md" variant="elevated">
            <CardHeader>
              <CardTitle>Medium Card (Default)</CardTitle>
              <CardDescription>Standard card with default padding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Medium size card (p-4) - this is the default</p>
            </CardContent>
          </Card>

          <Card size="lg" variant="elevated">
            <CardHeader>
              <CardTitle>Large Card</CardTitle>
              <CardDescription>Spacious card with increased padding</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Large size card (p-6)</p>
            </CardContent>
          </Card>

          <Card size="xl" variant="elevated">
            <CardHeader>
              <CardTitle>Extra Large Card</CardTitle>
              <CardDescription>Maximum padding for prominent content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">Extra large size card (p-8)</p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-100">Interactive Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card interactive onClick={handleCardClick} variant="elevated">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Click me to see interaction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  This card is interactive with hover and focus effects. 
                  It has proper accessibility attributes and keyboard navigation support.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-amber-400">Clickable</span>
              </CardFooter>
            </Card>

            <Card hover={false} variant="outlined">
              <CardHeader>
                <CardTitle>No Hover Effects</CardTitle>
                <CardDescription>Static card without hover animations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  This card has hover effects disabled for a more static appearance.
                </p>
              </CardContent>
              <CardFooter>
                <span className="text-sm text-slate-400">Static</span>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Usage Instructions</h3>
          <div className="space-y-2 text-slate-300">
            <p><strong>Variants:</strong> default, elevated, outlined, glass</p>
            <p><strong>Sizes:</strong> sm, md (default), lg, xl</p>
            <p><strong>Interactive:</strong> Set interactive=true for clickable cards</p>
            <p><strong>Loading:</strong> Set loading=true to show skeleton state</p>
            <p><strong>Hover:</strong> Set hover=false to disable hover effects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExample;
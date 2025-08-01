import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input, FormField } from '../ui/Input';
import { InteractiveElement, FocusRing, SkipLink } from '../ui/FocusManager';
import { LoadingButton } from '../ui/LoadingState';

const InteractionExample = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 bg-slate-900 min-h-screen">
      <SkipLink />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Enhanced Hover and Focus States
          </h1>
          <p className="text-slate-400">
            Demonstrating improved interactive elements with enhanced hover effects, 
            focus indicators, and accessibility features.
          </p>
        </div>

        {/* Button Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Enhanced Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="success">Success Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          
          <div className="mt-4 space-x-4">
            <LoadingButton 
              loading={loading} 
              onClick={handleLoadingClick}
              loadingText="Processing..."
            >
              Loading Button
            </LoadingButton>
            <Button disabled>Disabled Button</Button>
          </div>
        </section>

        {/* Card Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Interactive Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card interactive className="p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                Interactive Card
              </h3>
              <p className="text-slate-400">
                This card has enhanced hover effects with scale and shadow animations.
                Try hovering and focusing on it.
              </p>
            </Card>
            
            <Card variant="elevated" className="p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                Elevated Card
              </h3>
              <p className="text-slate-400">
                This card has a subtle lift effect on hover with enhanced shadows.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                Glass Card
              </h3>
              <p className="text-slate-400">
                Glass morphism effect with backdrop blur and enhanced interactions.
              </p>
            </Card>
          </div>
        </section>

        {/* Form Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Enhanced Form Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                label="Enhanced Input"
                hint="This input has improved focus states with glow effects"
              >
                <Input
                  placeholder="Type something..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </FormField>
              
              <FormField
                label="Success State"
                success="Great! This looks good."
              >
                <Input
                  placeholder="Valid input"
                  defaultValue="valid@example.com"
                />
              </FormField>
              
              <FormField
                label="Error State"
                error="This field is required"
              >
                <Input
                  placeholder="Required field"
                />
              </FormField>
            </div>
            
            <div className="space-y-4">
              <FormField
                label="Warning State"
                warning="This might need attention"
              >
                <Input
                  placeholder="Check this field"
                />
              </FormField>
              
              <FormField label="Disabled Input">
                <Input
                  placeholder="This is disabled"
                  disabled
                />
              </FormField>
            </div>
          </div>
        </section>

        {/* Interactive Elements */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Custom Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InteractiveElement
              as="button"
              hoverEffect="scale"
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium">Scale Effect</div>
              </div>
            </InteractiveElement>
            
            <InteractiveElement
              as="button"
              hoverEffect="lift"
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">⬆️</div>
                <div className="font-medium">Lift Effect</div>
              </div>
            </InteractiveElement>
            
            <InteractiveElement
              as="button"
              hoverEffect="glow"
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <div className="font-medium">Glow Effect</div>
              </div>
            </InteractiveElement>
            
            <InteractiveElement
              as="button"
              hoverEffect="brightness"
              className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">💡</div>
                <div className="font-medium">Brightness</div>
              </div>
            </InteractiveElement>
          </div>
        </section>

        {/* Focus Ring Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Focus Ring Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FocusRing variant="primary">
              <button className="w-full p-3 bg-amber-500 text-slate-900 rounded-lg font-medium">
                Primary Focus
              </button>
            </FocusRing>
            
            <FocusRing variant="danger">
              <button className="w-full p-3 bg-red-600 text-white rounded-lg font-medium">
                Danger Focus
              </button>
            </FocusRing>
            
            <FocusRing variant="success">
              <button className="w-full p-3 bg-green-600 text-white rounded-lg font-medium">
                Success Focus
              </button>
            </FocusRing>
          </div>
        </section>

        {/* Accessibility Features */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Accessibility Features</h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Keyboard Navigation
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li>• <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Tab</kbd> - Navigate between interactive elements</li>
              <li>• <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Shift + Tab</kbd> - Navigate backwards</li>
              <li>• <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Enter</kbd> or <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Space</kbd> - Activate buttons</li>
              <li>• <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Escape</kbd> - Close modals or cancel actions</li>
            </ul>
            
            <div className="mt-4 p-4 bg-slate-700/50 rounded border-l-4 border-amber-500">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-400">Accessibility Note:</strong> All interactive elements 
                include proper focus indicators, ARIA labels, and keyboard navigation support. 
                Focus rings are visible and meet WCAG contrast requirements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InteractionExample;
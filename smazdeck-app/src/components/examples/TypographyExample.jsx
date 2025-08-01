import React from 'react';
import { Heading, Text, Caption, Label } from '../ui/typography';
import { useFontSizePreference } from '../../hooks/useFontLoading';

/**
 * Example component demonstrating the typography system
 * This component showcases all typography components and font loading features
 */
const TypographyExample = () => {
  const { fontSize, setFontSize, isSmall, isBase, isLarge } = useFontSizePreference();

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Font Size Controls */}
      <div className="bg-slate-800 p-4 rounded-lg">
        <Label className="mb-2">Font Size Preference</Label>
        <div className="flex gap-2 flex-wrap">
          {['sm', 'base', 'lg', 'xl', '2xl'].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                fontSize === size
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <Caption className="mt-2">
          Current: {fontSize} | Small: {isSmall ? 'Yes' : 'No'} | Base: {isBase ? 'Yes' : 'No'} | Large: {isLarge ? 'Yes' : 'No'}
        </Caption>
      </div>

      {/* Heading Examples */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Heading Components</Heading>
        
        <div className="space-y-3">
          <Heading level={1} variant="display" color="gradient">
            Display Heading Level 1
          </Heading>
          <Heading level={2} variant="heading" color="primary">
            Regular Heading Level 2
          </Heading>
          <Heading level={3} variant="subheading" color="secondary">
            Subheading Level 3
          </Heading>
          <Heading level={4} color="muted">
            Muted Heading Level 4
          </Heading>
        </div>
      </section>

      {/* Text Examples */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Text Components</Heading>
        
        <div className="space-y-3">
          <Text size="2xl" weight="bold" color="primary">
            Large bold primary text for important content
          </Text>
          <Text size="lg" weight="medium" color="secondary">
            Large medium secondary text for section introductions
          </Text>
          <Text size="base" weight="normal" color="primary" leading="relaxed">
            This is regular body text with relaxed line height. It demonstrates how the Text component 
            handles longer paragraphs with proper spacing and readability. The text should flow naturally 
            and be easy to read across different screen sizes.
          </Text>
          <Text size="sm" color="muted" align="center">
            Small muted text centered for less important information
          </Text>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Semantic Colors</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Text color="success" weight="medium">✓ Success message text</Text>
          <Text color="warning" weight="medium">⚠ Warning message text</Text>
          <Text color="error" weight="medium">✗ Error message text</Text>
          <Text color="info" weight="medium">ℹ Information message text</Text>
        </div>
      </section>

      {/* Caption Examples */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Caption Components</Heading>
        
        <div className="space-y-3">
          <div className="bg-slate-800 p-4 rounded">
            <Text>Main content goes here</Text>
            <Caption size="sm" color="muted">
              This is a caption explaining the content above
            </Caption>
          </div>
          
          <div className="bg-slate-800 p-4 rounded">
            <Text>Image or media content</Text>
            <Caption as="figcaption" size="xs" color="secondary">
              Figure 1: Example caption for media content
            </Caption>
          </div>
        </div>
      </section>

      {/* Label Examples */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Label Components</Heading>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="example-input" required>
              Required Field Label
            </Label>
            <input
              id="example-input"
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200"
              placeholder="Enter text here"
            />
          </div>
          
          <div>
            <Label htmlFor="disabled-input" disabled>
              Disabled Field Label
            </Label>
            <input
              id="disabled-input"
              type="text"
              disabled
              className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-200 opacity-50"
              placeholder="Disabled input"
            />
          </div>
          
          <div>
            <Label as="legend" size="lg" weight="bold" color="accent">
              Form Section Legend
            </Label>
            <Caption>This demonstrates a label used as a legend element</Caption>
          </div>
        </div>
      </section>

      {/* Monospace Font Example */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Monospace Font (Fira Code)</Heading>
        
        <div className="bg-slate-800 p-4 rounded-lg">
          <Text as="code" className="font-mono font-mono-features text-green-400">
            const example = () => {'{'}
            <br />
            &nbsp;&nbsp;return 'Fira Code with ligatures: != === => <= >=';
            <br />
            {'}'};
          </Text>
          <Caption className="mt-2">
            Fira Code font with programming ligatures enabled
          </Caption>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="space-y-4">
        <Heading level={2} color="accent">Accessibility Features</Heading>
        
        <div className="space-y-3">
          <Text className="text-scalable">
            This text respects user font size preferences and scales accordingly.
          </Text>
          <Caption>
            Font scaling is controlled by the font size preference controls above.
          </Caption>
          
          <div className="bg-slate-800 p-4 rounded">
            <Text weight="medium">High Contrast Support</Text>
            <Caption>
              Colors automatically adjust in high contrast mode for better accessibility.
            </Caption>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographyExample;
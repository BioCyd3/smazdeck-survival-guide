import React, { useState } from 'react';
import Button, { ButtonGroup, IconButton } from '../ui/Button';

// Mock icons for demonstration
const PlusIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const DownloadIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const HeartIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ButtonExample = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLoadingToggle = () => {
    setLoading(!loading);
  };

  const handleDisabledToggle = () => {
    setDisabled(!disabled);
  };

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    alert('Action completed!');
  };

  return (
    <div className="p-8 space-y-8 bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Comprehensive Button System Examples</h1>
        
        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleLoadingToggle}
            className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Toggle Loading: {loading ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleDisabledToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Toggle Disabled: {disabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Button Variants */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Button Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary" loading={loading} disabled={disabled}>
              Primary
            </Button>
            <Button variant="secondary" loading={loading} disabled={disabled}>
              Secondary
            </Button>
            <Button variant="ghost" loading={loading} disabled={disabled}>
              Ghost
            </Button>
            <Button variant="outline" loading={loading} disabled={disabled}>
              Outline
            </Button>
            <Button variant="danger" loading={loading} disabled={disabled}>
              Danger
            </Button>
            <Button variant="success" loading={loading} disabled={disabled}>
              Success
            </Button>
            <Button variant="warning" loading={loading} disabled={disabled}>
              Warning
            </Button>
            <Button variant="info" loading={loading} disabled={disabled}>
              Info
            </Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Button Sizes</h2>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="xs" loading={loading} disabled={disabled}>
              Extra Small
            </Button>
            <Button size="sm" loading={loading} disabled={disabled}>
              Small
            </Button>
            <Button size="md" loading={loading} disabled={disabled}>
              Medium (Default)
            </Button>
            <Button size="lg" loading={loading} disabled={disabled}>
              Large
            </Button>
            <Button size="xl" loading={loading} disabled={disabled}>
              Extra Large
            </Button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Buttons with Icons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              icon={<PlusIcon />} 
              variant="primary"
              loading={loading} 
              disabled={disabled}
            >
              Add Item
            </Button>
            <Button 
              icon={<TrashIcon />} 
              variant="danger"
              loading={loading} 
              disabled={disabled}
            >
              Delete
            </Button>
            <Button 
              icon={<DownloadIcon />} 
              iconPosition="right"
              variant="secondary"
              loading={loading} 
              disabled={disabled}
            >
              Download
            </Button>
            <Button 
              icon={<HeartIcon />} 
              variant="ghost"
              loading={loading} 
              disabled={disabled}
            >
              Like
            </Button>
            <Button 
              icon={<PlusIcon />} 
              variant="outline"
              size="lg"
              loading={loading} 
              disabled={disabled}
            >
              Create New
            </Button>
            <Button 
              icon={<DownloadIcon />} 
              iconPosition="right"
              variant="success"
              size="sm"
              loading={loading} 
              disabled={disabled}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Icon Buttons</h2>
          <div className="flex flex-wrap items-center gap-4">
            <IconButton 
              icon={<PlusIcon />} 
              aria-label="Add item"
              variant="primary"
              loading={loading} 
              disabled={disabled}
            />
            <IconButton 
              icon={<TrashIcon />} 
              aria-label="Delete item"
              variant="danger"
              loading={loading} 
              disabled={disabled}
            />
            <IconButton 
              icon={<DownloadIcon />} 
              aria-label="Download"
              variant="secondary"
              loading={loading} 
              disabled={disabled}
            />
            <IconButton 
              icon={<HeartIcon />} 
              aria-label="Like"
              variant="ghost"
              loading={loading} 
              disabled={disabled}
            />
            <IconButton 
              icon={<PlusIcon />} 
              aria-label="Add item"
              variant="outline"
              size="lg"
              loading={loading} 
              disabled={disabled}
            />
            <IconButton 
              icon={<TrashIcon />} 
              aria-label="Delete item"
              variant="danger"
              size="sm"
              loading={loading} 
              disabled={disabled}
            />
          </div>
        </div>

        {/* Button Groups */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Button Groups</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Horizontal Group</h3>
            <ButtonGroup>
              <Button loading={loading} disabled={disabled}>First</Button>
              <Button loading={loading} disabled={disabled}>Second</Button>
              <Button loading={loading} disabled={disabled}>Third</Button>
            </ButtonGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Vertical Group</h3>
            <ButtonGroup orientation="vertical">
              <Button loading={loading} disabled={disabled}>Top</Button>
              <Button loading={loading} disabled={disabled}>Middle</Button>
              <Button loading={loading} disabled={disabled}>Bottom</Button>
            </ButtonGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Mixed Variants in Group</h3>
            <ButtonGroup variant="secondary" size="sm">
              <Button loading={loading} disabled={disabled}>Default</Button>
              <Button variant="primary" loading={loading} disabled={disabled}>Override</Button>
              <Button loading={loading} disabled={disabled}>Default</Button>
            </ButtonGroup>
          </div>
        </div>

        {/* Full Width Buttons */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Full Width Buttons</h2>
          <div className="space-y-4 max-w-md">
            <Button 
              fullWidth 
              variant="primary"
              loading={loading} 
              disabled={disabled}
            >
              Full Width Primary
            </Button>
            <Button 
              fullWidth 
              variant="outline"
              icon={<PlusIcon />}
              loading={loading} 
              disabled={disabled}
            >
              Full Width with Icon
            </Button>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-100">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200">Async Action Button</h3>
              <Button 
                onClick={handleAsyncAction}
                loading={loading}
                icon={<DownloadIcon />}
                variant="primary"
              >
                {loading ? 'Processing...' : 'Start Async Action'}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-slate-200">Form Buttons</h3>
              <div className="flex gap-2">
                <Button type="submit" variant="primary" disabled={disabled}>
                  Submit
                </Button>
                <Button type="reset" variant="secondary" disabled={disabled}>
                  Reset
                </Button>
                <Button type="button" variant="ghost" disabled={disabled}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Usage Instructions</h3>
          <div className="space-y-2 text-slate-300">
            <p><strong>Variants:</strong> primary, secondary, ghost, outline, danger, success, warning, info</p>
            <p><strong>Sizes:</strong> xs, sm, md (default), lg, xl</p>
            <p><strong>States:</strong> loading, disabled, fullWidth</p>
            <p><strong>Icons:</strong> Support for left/right positioning with proper spacing</p>
            <p><strong>Groups:</strong> Horizontal and vertical button grouping with proper styling</p>
            <p><strong>Icon Buttons:</strong> Square buttons for icon-only actions</p>
            <p><strong>Accessibility:</strong> Full keyboard navigation, ARIA labels, and focus management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;
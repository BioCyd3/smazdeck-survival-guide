import React, { useState } from 'react';
import { Input, Label, FormField, Textarea } from '../ui/Input';
import SearchBar from '../ui/SearchBar';
import Select from '../ui/Select';
import { Checkbox, CheckboxGroup } from '../ui/Checkbox';
import { Radio, RadioGroup } from '../ui/Radio';
import Button from '../ui/Button';

// Mock icons for demonstration
const SearchIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = ({ className, ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const FormExample = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    country: '',
    skills: [],
    experience: '',
    newsletter: false,
    terms: false,
    searchTerm: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock data
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ];

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript', description: 'Frontend and backend development' },
    { value: 'react', label: 'React', description: 'UI library for building interfaces' },
    { value: 'nodejs', label: 'Node.js', description: 'Server-side JavaScript runtime' },
    { value: 'python', label: 'Python', description: 'General-purpose programming language' },
    { value: 'design', label: 'UI/UX Design', description: 'User interface and experience design' },
  ];

  const experienceOptions = [
    { value: 'junior', label: 'Junior (0-2 years)', description: 'Entry level position' },
    { value: 'mid', label: 'Mid-level (2-5 years)', description: 'Some professional experience' },
    { value: 'senior', label: 'Senior (5+ years)', description: 'Extensive professional experience' },
    { value: 'lead', label: 'Lead/Manager', description: 'Leadership and management experience' },
  ];

  const searchSuggestions = [
    { value: 'react components', label: 'React Components', category: 'Frontend' },
    { value: 'node.js api', label: 'Node.js API', category: 'Backend' },
    { value: 'database design', label: 'Database Design', category: 'Database' },
    { value: 'ui design', label: 'UI Design', category: 'Design' },
    { value: 'testing', label: 'Testing', category: 'Quality' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.experience) {
      newErrors.experience = 'Please select your experience level';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    alert('Form submitted successfully!');
    console.log('Form data:', formData);
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
      country: '',
      skills: [],
      experience: '',
      newsletter: false,
      terms: false,
      searchTerm: '',
    });
    setErrors({});
  };

  return (
    <div className="p-8 space-y-8 bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Enhanced Form Controls Examples</h1>
        
        {/* Search Bar Example */}
        <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-100 mb-6">Search Bar Component</h2>
          <div className="space-y-4">
            <SearchBar
              value={formData.searchTerm}
              onChange={(value) => handleInputChange('searchTerm', value)}
              placeholder="Search for skills, technologies, or topics..."
              suggestions={searchSuggestions}
              showSuggestions={true}
              onSuggestionSelect={(suggestion) => {
                console.log('Selected suggestion:', suggestion);
              }}
              clearable
              size="lg"
            />
            <p className="text-sm text-slate-400">
              Current search: <span className="text-amber-400">{formData.searchTerm || 'None'}</span>
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Username"
              error={errors.username}
              required
            >
              <Input
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
                leftIcon={<UserIcon />}
                disabled={loading}
              />
            </FormField>

            <FormField
              label="Email Address"
              error={errors.email}
              success={formData.email && !errors.email ? 'Valid email format' : null}
              required
            >
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                leftIcon={<EmailIcon />}
                disabled={loading}
              />
            </FormField>

            <FormField
              label="Password"
              error={errors.password}
              hint="Must be at least 6 characters long"
              required
            >
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.confirmPassword}
              success={formData.confirmPassword && formData.password === formData.confirmPassword ? 'Passwords match' : null}
              required
            >
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                disabled={loading}
              />
            </FormField>
          </div>

          {/* Textarea */}
          <FormField
            label="Bio"
            hint="Tell us a bit about yourself (optional)"
          >
            <Textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Write a short bio..."
              rows={4}
              disabled={loading}
            />
          </FormField>

          {/* Select Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Country"
              error={errors.country}
              required
            >
              <Select
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                options={countryOptions}
                placeholder="Select your country"
                searchable
                clearable
                disabled={loading}
              />
            </FormField>

            <FormField
              label="Skills"
              hint="Select multiple skills that apply to you"
            >
              <Select
                value={formData.skills}
                onChange={(value) => handleInputChange('skills', value)}
                options={skillOptions}
                placeholder="Select your skills"
                multiple
                searchable
                clearable
                disabled={loading}
              />
            </FormField>
          </div>

          {/* Radio Group */}
          <FormField
            label="Experience Level"
            error={errors.experience}
            required
          >
            <RadioGroup
              value={formData.experience}
              onChange={(value) => handleInputChange('experience', value)}
              options={experienceOptions}
              disabled={loading}
            />
          </FormField>

          {/* Checkbox Group */}
          <FormField
            label="Preferences"
          >
            <div className="space-y-4">
              <Checkbox
                checked={formData.newsletter}
                onChange={(checked) => handleInputChange('newsletter', checked)}
                label="Subscribe to newsletter"
                description="Receive updates about new features and content"
                disabled={loading}
              />
              
              <Checkbox
                checked={formData.terms}
                onChange={(checked) => handleInputChange('terms', checked)}
                label="I accept the terms and conditions"
                description="You must accept our terms to create an account"
                error={errors.terms}
                required
                disabled={loading}
              />
            </div>
          </FormField>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
              className="flex-1 sm:flex-none"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              disabled={loading}
              size="lg"
            >
              Reset Form
            </Button>
          </div>
        </form>

        {/* Form State Display */}
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Form State (Debug)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-slate-200 mb-2">Form Data</h4>
              <pre className="text-sm text-slate-300 bg-slate-900 p-4 rounded overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-medium text-slate-200 mb-2">Validation Errors</h4>
              <pre className="text-sm text-red-400 bg-slate-900 p-4 rounded overflow-auto">
                {JSON.stringify(errors, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">Form Components Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <h4 className="font-medium text-slate-200 mb-2">Input Component</h4>
              <ul className="text-sm space-y-1">
                <li>• Multiple variants (default, error, success, warning)</li>
                <li>• Different sizes (sm, md, lg)</li>
                <li>• Left and right icons with click handlers</li>
                <li>• Full accessibility support</li>
                <li>• Validation state styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-2">SearchBar Component</h4>
              <ul className="text-sm space-y-1">
                <li>• Autocomplete with suggestions</li>
                <li>• Keyboard navigation</li>
                <li>• Debounced search</li>
                <li>• Query highlighting</li>
                <li>• Loading and clear states</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-2">Select Component</h4>
              <ul className="text-sm space-y-1">
                <li>• Single and multiple selection</li>
                <li>• Searchable options</li>
                <li>• Keyboard navigation</li>
                <li>• Custom option rendering</li>
                <li>• Clear functionality</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-200 mb-2">Form Validation</h4>
              <ul className="text-sm space-y-1">
                <li>• Real-time validation feedback</li>
                <li>• Error, success, and warning states</li>
                <li>• Accessible error messaging</li>
                <li>• Form field grouping</li>
                <li>• Required field indicators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormExample;
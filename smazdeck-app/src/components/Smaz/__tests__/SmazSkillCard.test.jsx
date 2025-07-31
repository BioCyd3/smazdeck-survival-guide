import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SmazSkillCard from '../SmazSkillCard';

// Mock the Card and Badge components
vi.mock('../../ui/Card', () => ({
  default: ({ children, className }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock('../../ui/Badge', () => ({
  default: ({ children, variant, className }) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

const mockSkill = {
  skill_name: 'Test Skill',
  description: 'This is a test skill description.',
  ascension_effects: ['Effect 1', 'Effect 2', 'Effect 3'],
};

describe('SmazSkillCard', () => {
  it('renders skill name, description, and ascension effects', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    expect(screen.getByText('Test Skill')).toBeInTheDocument();
    expect(screen.getByText('This is a test skill description.')).toBeInTheDocument();
    expect(screen.getByText('Ascension Effects')).toBeInTheDocument();
    expect(screen.getByText('Effect 1')).toBeInTheDocument();
    expect(screen.getByText('Effect 2')).toBeInTheDocument();
    expect(screen.getByText('Effect 3')).toBeInTheDocument();
  });

  it('applies correct styling to skill name', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    const skillName = screen.getByText('Test Skill');
    expect(skillName).toHaveClass('text-lg', 'font-semibold', 'text-amber-400');
  });

  it('applies correct styling to description', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    const description = screen.getByText('This is a test skill description.');
    expect(description).toHaveClass('text-slate-300', 'leading-relaxed');
  });

  it('renders badges with correct variant for ascension effects', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(3);
    
    badges.forEach(badge => {
      expect(badge).toHaveAttribute('data-variant', 'secondary');
      expect(badge).toHaveClass('text-xs');
    });
  });

  it('handles skill without ascension effects', () => {
    const skillWithoutEffects = {
      skill_name: 'Simple Skill',
      description: 'A skill without ascension effects.',
      ascension_effects: [],
    };
    
    render(<SmazSkillCard skill={skillWithoutEffects} />);
    
    expect(screen.getByText('Simple Skill')).toBeInTheDocument();
    expect(screen.getByText('A skill without ascension effects.')).toBeInTheDocument();
    expect(screen.queryByText('Ascension Effects')).not.toBeInTheDocument();
  });

  it('handles skill with missing ascension_effects property', () => {
    const skillWithoutEffectsProperty = {
      skill_name: 'Basic Skill',
      description: 'A skill with missing ascension_effects property.',
    };
    
    render(<SmazSkillCard skill={skillWithoutEffectsProperty} />);
    
    expect(screen.getByText('Basic Skill')).toBeInTheDocument();
    expect(screen.getByText('A skill with missing ascension_effects property.')).toBeInTheDocument();
    expect(screen.queryByText('Ascension Effects')).not.toBeInTheDocument();
  });

  it('returns null when skill prop is missing', () => {
    const { container } = render(<SmazSkillCard skill={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies Card component with correct styling', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('mb-4');
  });

  it('has proper responsive layout structure', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    // Check for space-y classes that provide responsive spacing
    const container = screen.getByTestId('card').firstChild;
    expect(container).toHaveClass('space-y-3');
  });

  it('renders ascension effects section with proper styling', () => {
    render(<SmazSkillCard skill={mockSkill} />);
    
    const sectionTitle = screen.getByText('Ascension Effects');
    expect(sectionTitle).toHaveClass('text-sm', 'font-medium', 'text-slate-400', 'uppercase', 'tracking-wide');
    
    // Check that badges are wrapped in a flex container
    const badgeContainer = sectionTitle.nextElementSibling;
    expect(badgeContainer).toHaveClass('flex', 'flex-wrap', 'gap-2');
  });
});
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Heading component with multiple variants and semantic levels
 * Provides consistent typography hierarchy across the application
 */
const Heading = ({
  level = 1,
  variant = 'heading',
  color = 'primary',
  className = '',
  children,
  ...props
}) => {
  // Map semantic levels to HTML elements
  const HeadingTag = `h${level}`;
  
  // Base classes for all headings
  const baseClasses = 'font-display font-semibold tracking-tight';
  
  // Variant-specific classes
  const variantClasses = {
    display: {
      1: 'text-5xl md:text-6xl lg:text-7xl',
      2: 'text-4xl md:text-5xl lg:text-6xl',
      3: 'text-3xl md:text-4xl lg:text-5xl',
      4: 'text-2xl md:text-3xl lg:text-4xl',
      5: 'text-xl md:text-2xl lg:text-3xl',
      6: 'text-lg md:text-xl lg:text-2xl'
    },
    heading: {
      1: 'text-4xl md:text-5xl lg:text-6xl',
      2: 'text-3xl md:text-4xl lg:text-5xl',
      3: 'text-2xl md:text-3xl lg:text-4xl',
      4: 'text-xl md:text-2xl lg:text-3xl',
      5: 'text-lg md:text-xl lg:text-2xl',
      6: 'text-base md:text-lg lg:text-xl'
    },
    subheading: {
      1: 'text-3xl md:text-4xl lg:text-5xl font-medium',
      2: 'text-2xl md:text-3xl lg:text-4xl font-medium',
      3: 'text-xl md:text-2xl lg:text-3xl font-medium',
      4: 'text-lg md:text-xl lg:text-2xl font-medium',
      5: 'text-base md:text-lg lg:text-xl font-medium',
      6: 'text-sm md:text-base lg:text-lg font-medium'
    }
  };
  
  // Color classes
  const colorClasses = {
    primary: 'text-slate-200',
    secondary: 'text-slate-300',
    accent: 'text-amber-400',
    muted: 'text-slate-400',
    gradient: 'gradient-text'
  };
  
  // Combine all classes
  const classes = [
    baseClasses,
    variantClasses[variant][level],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <HeadingTag className={classes} {...props}>
      {children}
    </HeadingTag>
  );
};

Heading.propTypes = {
  /** Semantic heading level (1-6) */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Visual variant of the heading */
  variant: PropTypes.oneOf(['display', 'heading', 'subheading']),
  /** Color theme for the heading */
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'muted', 'gradient']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Content to render inside the heading */
  children: PropTypes.node.isRequired
};

export default Heading;
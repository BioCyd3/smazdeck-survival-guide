import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * @param {...(string|object|Array)} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to create variant-based class names
 * @param {Object} variants - Object with variant keys and class values
 * @param {string} defaultVariant - Default variant key
 * @param {string} selectedVariant - Selected variant key
 * @returns {string} Class names for the selected variant
 */
export function createVariant(variants, defaultVariant, selectedVariant) {
  return variants[selectedVariant] || variants[defaultVariant] || '';
}

/**
 * Utility function to conditionally apply classes
 * @param {string} baseClasses - Base classes to always apply
 * @param {Object} conditionalClasses - Object with condition keys and class values
 * @returns {string} Combined class names
 */
export function conditionalClasses(baseClasses, conditionalClasses = {}) {
  const classes = [baseClasses];
  
  Object.entries(conditionalClasses).forEach(([condition, classNames]) => {
    if (condition && classNames) {
      classes.push(classNames);
    }
  });
  
  return cn(...classes);
}

/**
 * Utility function to format class names for better readability in development
 * @param {string} classes - Class names to format
 * @returns {string} Formatted class names
 */
export function formatClasses(classes) {
  if (process.env.NODE_ENV === 'development') {
    return classes.split(' ').sort().join(' ');
  }
  return classes;
}
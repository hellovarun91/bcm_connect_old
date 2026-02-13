/**
 * Typography System for Connected Commerce
 * 
 * This file defines typography constants for consistent font sizing across the application.
 * It provides preset configurations that can be used with Frame, LargeFrame, and other components.
 * 
 * Usage:
 * import { TYPOGRAPHY } from '../constants/typography';
 * 
 * // Use presets directly
 * <Frame typographyPreset="medium" />
 * 
 * // Or use the scale for custom components
 * <CustomComponent style={{ fontSize: TYPOGRAPHY.scale.body.md }} />
 */

/**
 * Typography presets for Frame and LargeFrame components
 * These presets provide consistent font sizing across different component instances
 */
export const TYPOGRAPHY = {
  // Preset configurations for Frame and LargeFrame components
  presets: {
    // Small preset - for compact UI elements
    small: {
      title: '0.875rem',       // 14px
      description: '0.75rem',  // 12px
      rowLabel: '0.6875rem',   // 11px
      rowValue: '0.75rem',     // 12px
      keyPoint: '0.75rem',     // 12px
      button: '0.75rem',       // 12px
    },
    
    // Medium preset - for standard UI elements (default)
    medium: {
      title: '1rem',           // 16px
      description: '0.875rem',  // 14px
      rowLabel: '0.875rem',    // 14px
      rowValue: '0.875rem',    // 14px
      keyPoint: '0.875rem',    // 14px
      button: '0.875rem',      // 14px
    },
    
    // Large preset - for prominent UI elements
    large: {
      title: '1.25rem',        // 20px
      description: '1rem',     // 16px
      rowLabel: '0.875rem',    // 14px
      rowValue: '1rem',        // 16px
      keyPoint: '1rem',        // 16px
      button: '1rem',          // 16px
    },
  },
  
  // Semantic scale for new components and custom elements
  scale: {
    // Title text (headings)
    title: { 
      xs: '0.75rem',    // 12px - Smallest titles
      sm: '0.875rem',   // 14px - Small titles
      md: '1rem',       // 16px - Medium titles
      lg: '1.25rem',    // 20px - Large titles
      xl: '1.5rem',     // 24px - Extra large titles
    },
    
    // Body text (paragraphs)
    body: { 
      xs: '0.625rem',   // 10px - Smallest body text
      sm: '0.75rem',    // 12px - Small body text
      md: '0.875rem',   // 14px - Medium body text
      lg: '1rem',       // 16px - Large body text
    },
    
    // Label text (field labels, captions)
    label: { 
      xs: '0.5625rem',  // 9px - Smallest labels
      sm: '0.625rem',   // 10px - Small labels
      md: '0.75rem',    // 12px - Medium labels
      lg: '0.875rem',   // 14px - Large labels
    },
    
    // Value text (metrics, numbers, data points)
    value: { 
      xs: '0.875rem',   // 14px - Smallest values
      sm: '1rem',       // 16px - Small values
      md: '1.25rem',    // 20px - Medium values
      lg: '1.5rem',     // 24px - Large values
      xl: '2rem',       // 32px - Extra large values
    },
    
    // Button text
    button: { 
      xs: '0.625rem',   // 10px - Smallest buttons
      sm: '0.75rem',    // 12px - Small buttons
      md: '0.875rem',   // 14px - Medium buttons
      lg: '1rem',       // 16px - Large buttons
    },
  },
  
  // Font weights
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

/**
 * Helper function to get typography preset
 * @param {string} preset - The preset name ('small', 'medium', 'large')
 * @returns {Object} The typography preset object
 */
export const getTypographyPreset = (preset = 'medium') => {
  return TYPOGRAPHY.presets[preset] || TYPOGRAPHY.presets.medium;
};

export default TYPOGRAPHY;

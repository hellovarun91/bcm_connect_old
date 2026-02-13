# Typography System

This document outlines the typography system for the Connected Commerce project. The system provides consistent font sizing across the application while maintaining backward compatibility with existing components.

## Overview

The typography system consists of:

1. **Presets**: Pre-defined font size configurations for Frame and LargeFrame components
2. **Scale**: A semantic scale for custom components and elements
3. **Weights**: Standard font weights
4. **Line Heights**: Standard line height values

## Usage

### Using Presets with Frame/LargeFrame

```jsx
import { Frame } from '../components/commons/Frame';

// Using a preset (new way)
<Frame 
  typographyPreset="medium" 
  title="My Title"
  description="My description"
/>

// Using custom styles (still supported)
<Frame 
  title="My Title"
  titleStyle={{ fontSize: '1.2rem' }}
  description="My description"
  descriptionStyle={{ fontSize: '0.9rem' }}
/>

// Mixing presets with overrides (overrides win)
<Frame 
  typographyPreset="medium"
  title="My Title"
  titleStyle={{ fontSize: '1.2rem' }} // This will override the preset
  description="My description"
/>
```

### Using the Scale for Custom Components

```jsx
import { TYPOGRAPHY } from '../constants/typography';

// Using the scale directly
<div style={{ fontSize: TYPOGRAPHY.scale.body.md }}>
  This is medium body text
</div>

// Using with other properties
<h2 style={{ 
  fontSize: TYPOGRAPHY.scale.title.lg,
  fontWeight: TYPOGRAPHY.weight.bold,
  lineHeight: TYPOGRAPHY.lineHeight.tight
}}>
  This is a large title
</h2>
```

## Presets

### Small Preset

```js
{
  title: '0.875rem',      // 14px
  description: '0.75rem', // 12px
  rowLabel: '0.6875rem',  // 11px
  rowValue: '0.75rem',    // 12px
  keyPoint: '0.75rem',    // 12px
  button: '0.75rem',      // 12px
}
```

### Medium Preset (Default)

```js
{
  title: '1rem',          // 16px
  description: '0.875rem', // 14px
  rowLabel: '0.75rem',    // 12px
  rowValue: '0.875rem',   // 14px
  keyPoint: '0.875rem',   // 14px
  button: '0.875rem',     // 14px
}
```

### Large Preset

```js
{
  title: '1.25rem',       // 20px
  description: '1rem',    // 16px
  rowLabel: '0.875rem',   // 14px
  rowValue: '1rem',       // 16px
  keyPoint: '1rem',       // 16px
  button: '1rem',         // 16px
}
```

## Scale

The scale provides semantic font sizes for different types of text:

```js
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
```

## Weights and Line Heights

```js
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
```

## Migration Strategy

The typography system is designed to be adopted gradually:

1. New components should use the typography system from the start
2. Existing components can be migrated as they are updated
3. Components with highly custom styling can continue to use custom styles

## Backward Compatibility

The typography system is fully backward compatible:

- All existing components will continue to work without changes
- Style overrides will always take precedence over presets
- The `typographyPreset` prop is optional

import React from 'react';
import MySvgGraphic from './MySVGGraphic'

const ObjectLabel = ({ text, icon }) => {
  // Map icon names to their corresponding label SVG files
  const iconLabelMap = {
    'Car': 'car-icon',
    'cart': 'cart-icon',
    'coffee': 'coffee-icon',
    'gas': 'gas-icon',
    'Hospital': 'health-icon'
  };
  
  // Override text for specific icons
  const iconTextOverrides = {
    'coffee': 'Everyday Payments',
    'gas': 'Everyday Payments',
    'Hospital': 'Protection & Support'
  };
  
  // Use override text if available, otherwise use the provided text
  const displayText = icon && iconTextOverrides[icon] ? iconTextOverrides[icon] : text;

  const labelSvgName = iconLabelMap[icon] || 'icon-label-connector';

  return (
    <div className="object-label-svg-wrapper" aria-hidden>
      {/* Replaces <img> with your React SVG component */}
      <MySvgGraphic className="object-label-svg" />

      <div className="object-label-text-svg">
        {displayText}
      </div>

      {/* Icon from assets/icon-labels */}
      {icon && (
        <div className="object-label-text-icon">
          <img 
            src={`/assets/icons/${labelSvgName}.svg`} 
            alt={icon} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ObjectLabel;

import React from 'react';
import shoppingData from '../data.json';
import Frame from '../../commons/Frame';

const ProjectedSpend = () => {
  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.ProjectedSpendImpact.title}
      description={shoppingData.ProjectedSpendImpact.description}
      width="30rem"
      height="18rem"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      padding="2rem"
      titleStyle={{ marginBottom: '0.45rem', marginTop: '0.2rem' }}
      descriptionStyle={{ fontWeight: "lighter", marginBottom: '0.8rem' }}
      rowContainerStyle={{ marginBottom: '0rem' }}
      noBackground={true}
    >
      {/* Impact Indicators with Labels - Same Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {shoppingData.ProjectedSpendImpact.keyPoints.map((level, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {/* Circle */}
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 
                  level === 'low' ? '#22c55e' : 
                  level === 'medium' ? '#f59e0b' : 
                  '#ef4444',
                opacity: level === 'low' ? 1 : 0.8, // More opaque
              }}
            />
            {/* Label */}
            <span style={{
              fontSize: '0.875rem',
              color: '#ffffff',
              fontWeight: 500,
              textTransform: 'capitalize',
              opacity: level === 'low' ? 1 : 0.85 // More opaque
            }}>
              {level}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
};

export default ProjectedSpend;
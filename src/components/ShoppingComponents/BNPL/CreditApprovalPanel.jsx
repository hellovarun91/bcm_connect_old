import React from 'react';
import Frame from '../../commons/Frame';
import shoppingData from '../data.json';

const CreditApprovalPanel = () => {
  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.CreditApprovalPanel.title}
      description={shoppingData.CreditApprovalPanel.description}
      width="30rem"
      height="18rem"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      padding="2rem"
      titleStyle={{ marginBottom: '0.45rem', marginTop: '0.2rem' }}
      descriptionStyle={{ fontWeight: 700, marginBottom: '0.6rem' }}
      rowContainerStyle={{ marginBottom: '0rem' }}
      noBackground={true}
    >
      {/* Based on section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem'
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: '#ffffff',
          fontWeight: 100
        }}>
          {shoppingData.CreditApprovalPanel.keyPointsTitle}
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.1rem',
         
        }}>
          {shoppingData.CreditApprovalPanel.keyPoints.map((point, index) => (
            <div
              key={index}
              style={{
                fontSize: '0.875rem',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                marginTop: '0.3rem'
              }}
            >
              <span style={{ color: '#ffffff', marginRight: '4px' }}>►</span>
              {point}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
};

export default CreditApprovalPanel;
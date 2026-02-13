import React from 'react';
import Frame from '../../commons/Frame';
import data from './data.json';

const UnifiedPayment = () => {
  // Transform the arrays data into rows format expected by Frame component
  const rows = data.UnifiedPaymentSummary.arrays.map(item => {
    const iconSrc = item.label === 'Charging'
      ? '/assets/blue.png'
      : item.label === 'Café'
        ? '/assets/orange.png'
        : null;

    return [
      {
        label: item.label,
        value: iconSrc ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <img src={iconSrc} alt="" style={{ width: '0.45rem', height: '0.75rem', objectFit: 'contain' }} />
            <span>{item.value}</span>
          </span>
        ) : item.value,
        // Right-align the specific row value and set font size
        valueStyle: item.label === "Settlement via" 
          ? { textAlign: 'right', fontSize: '0.875rem', fontWeight: 700 } 
          : { fontSize: '0.875rem', fontWeight: 700 }
      }
    ];
  });

  return (
    <Frame
      typographyPreset="medium"
      blackBandWidth="95%"
      blackBandHeight="92%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      width="32rem"
      height="20rem"
      title={data.UnifiedPaymentSummary.title}
      description=""
      rows={rows}
      showRowDividers={false}
      rowStyle={{ padding: '0.1rem' }}
      rowLabelStyle={{ fontWeight: 100 }}
      showButton={false}
      buttonText="View Receipt"
      noBackground={true}
    />
  );
};

export default UnifiedPayment;

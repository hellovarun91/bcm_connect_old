import React from 'react';
import Frame from '../../commons/Frame';
import data from './data.json';

 const Impact = () => {
  // Transform the arrays data into rows format expected by Frame component
  const rows = data.ImpactInsights.arrays.map(item => [
    { 
      label: item.label, 
      value: item.value,
      // Right-align the specific row values and set font size
      valueStyle: (item.label === "Projected CO₂ savings this month" || 
                 item.label === "Sustainable Choice Impact") ? 
                 { textAlign: 'right', fontSize: '0.875rem', fontWeight: 700 } : { fontSize: '0.875rem', fontWeight: 700 }
    }
  ]);

  const keyPoints = (data?.ImpactInsights?.keyPoints || []).map((point, index) =>
    index === 0 ? { text: point } : point
  );

  return (
    <Frame
      typographyPreset="medium"
      blackBandWidth="95%"
      blackBandHeight="88%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      width="32rem"
      height="21rem"
      title={data.ImpactInsights.title}
      titleIconSrc="/assets/ImapctInsightsIcon.png"
      titleIconStyle={{ width: '5.5rem', height: '1.7rem', position: 'relative', left: '13.2rem', top: '0.5rem' }}
      description={data.ImpactInsights.keyTitle}
      rows={rows}
      showRowDividers={false}
      keyPoints={keyPoints}
      rowStyle={{ padding: '0.1rem' }}
      rowLabelStyle={{ fontWeight: 100 }}
      showButton={false}
      buttonText="View Full Impact Report"
      noBackground={true}
      bodyStyle={{transform:"translateY(-1.1rem)"}}
    />
  );
};

export default Impact;

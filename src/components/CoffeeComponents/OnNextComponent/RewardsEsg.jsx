import React from 'react';
import Frame from '../../commons/Frame';
import data from './data.json';

const RewardsEsg = () => {
  // Transform the arrays data into rows format expected by Frame component
  const rows = data.RewardsESGOverview.arrays.map(item => {
    // Special handling for Bank Multiplier value to ensure proper text wrapping
    if (item.label === "Bank Multiplier") {
      return [{
        label: item.label,
        value: (
          <div style={{ 
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <div>+20% (Your bank boosted your</div>
            <div style={{ marginLeft: 0 }}>café rewards)</div>
          </div>
        ),
        valueStyle: { fontSize: '0.875rem', fontWeight: 700 }
      }];
    }
    
    return [{ 
      label: item.label, 
      value: item.value,
      valueStyle: { fontSize: '0.875rem', fontWeight: 700 }
    }];
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
      title={data.RewardsESGOverview.title}
      titleIconSrc="/assets/RewardsIcon.png"
      titleIconStyle={{ width: '3.5rem', height: '1.8rem',position: 'relative',left: '11.8rem' , top: '0.5rem'}}
      description=""
      rows={rows}
      showRowDividers={false}
      rowStyle={{ padding: '0.1rem' }}
      rowLabelStyle={{ fontWeight: 100 }}
      titleStyle={{ margin: '-0.4375rem 0 0.5rem 0' }}
      showButton={false}
      buttonText="View Rewards History"
      noBackground={true}
    />
  );
};

export default RewardsEsg;

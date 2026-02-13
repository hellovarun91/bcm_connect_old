import React from 'react';
import shoppingData from '../data.json';
import SmallFrame from '../../commons/SmallFrame';
import Frame from '../../commons/Frame';

const PriceBreakdown = ({ onProceed }) => {
  return (
    <Frame
      typographyPreset="medium"
      width='22rem'
      height="14rem"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayWidth="96%"
      overlayHeight="91%"
      overlayZIndex={-10}
      overlayBorderRadius="1.3rem"
      contentInset="1.25rem"
      title={shoppingData.PriceBreakDown.title}
      titleStyle={{ marginBottom: '0.5rem' }}
      boldValues={false}
      rowValueStyle={{ fontSize: '0.875rem', fontWeight: 700, textAlign: 'right' }}
      rowLabelStyle={{ fontWeight: 'lighter', fontSize: '0.875rem' }}
      rows={shoppingData.PriceBreakDown.arrays.map(item => [
        { 
          label: item.label, 
          value: item.value,
          valueStyle: { 
            fontSize: '0.875rem', 
            fontWeight: 600 ,
          }
        }
      ])}
      rowStyle={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0rem 0',
        borderBottom: 'none',
        fontWeight: 'lighter',
      }}
      showButton={true}
      buttonText="Select & Proceed"
      onButtonClick={onProceed}
      buttonStyle={{
        marginTop:"1rem",
        height:"1.6rem",
        width:"7rem",
        backgroundColor: '#ffffff',
        color: '#272727',
        padding: '0.25rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        fontSize: '0.75rem',
      }}
    />
  );
};

export default PriceBreakdown;
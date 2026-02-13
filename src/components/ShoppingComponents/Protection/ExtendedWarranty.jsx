import React, { useState } from 'react';
import { motion } from 'framer-motion';
import shoppingData from '../data.json';
import Frame from '../../commons/Frame';

const ExtendedWarranty = () => {
  const data = shoppingData.ExtendedWarranty;
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled(prevState => !prevState);
  };

  return (
    <Frame
      typographyPreset="medium"
      title={data.title}
      keyPoints={data.keyPoints}
      width="30rem"
      height="18rem"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      padding="2rem"
      titleStyle={{ marginTop: '0.2rem', marginBottom: '0.45rem' }}
      keyPointStyle={{ fontWeight: 'lighter', fontSize: '0.875rem' }}
      rowContainerStyle={{ marginBottom: '0rem' }}
      noBackground={true}
    >
      {/* Toggle Switch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.85 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <span style={{
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: "bold"
        }}>
          Enable Extended Warranty
        </span>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSwitch();
          }}
          style={{
            width: '2.25rem',
            height: '1.25rem',
            backgroundColor: isEnabled ? '#22c55e' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: '0.625rem',
            position: 'relative',
            cursor: 'pointer',
            pointerEvents: 'auto',
            appearance: 'none',
            border: '0.0625rem solid rgba(255, 255, 255, 0.2)',
            padding: 0,
            outline: 'none',
            zIndex: 5,
            transition: 'background-color 0.3s ease',
            border: '0.0625rem solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <motion.div
            animate={{
              x: isEnabled ? '1rem' : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              position: 'absolute',
              top: '0.0625rem',
              left: '0.125rem',
              boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)'
            }}
          />
        </button>
      </motion.div>
    </Frame>
  );
};

export default ExtendedWarranty;
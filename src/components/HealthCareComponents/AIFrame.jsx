import React from 'react';
import { motion } from 'framer-motion';
import aiFrameGif from './AIFrame.gif';

const AIFrame = ({ onBegin }) => {
  return (
    <motion.div 
      className="ai-frame-container" 
      style={{ 
        height: '8rem',
        maxWidth: '30rem',
        margin: '0 auto',
        position: 'relative'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.img 
        src={aiFrameGif} 
        alt="AI Frame" 
        className="ai-frame-image"
        style={{ width: '178%', height: '132%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      />

      <div
        style={{
          position: 'absolute',
          top:"3rem",
          left:"9.4rem",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width:"100%",
          color: '#fff',
        }}
      >
        <div style={{ fontSize: '0.8rem', lineHeight: 1.25, fontWeight: 700 }}>
          To ensure long-term health stability, I recommend building a dedicated
          health corpus.
        </div>

        <div style={{ height: '0.35rem' }} />

        <div style={{ fontSize: '0.8rem', lineHeight: 1.25, fontWeight: 700 }}>
          Based on your financial data and current spending, you can start with:
        </div>

        <div style={{ height: '0.35rem' }} />

        <div style={{ fontSize: '0.8rem', lineHeight: 1.25, fontWeight: 700 }}>
          Monthly investment: USD 22,000
        </div>

        <div style={{ flex: 1 }} />
      </div>
    </motion.div>
  );
};

export default AIFrame;
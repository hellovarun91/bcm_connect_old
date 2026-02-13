import React from 'react';
import { motion } from 'framer-motion';
import AIFrame from './AIFrame';

const FlexibleCreditAI = ({ onBegin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      style={{
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        top: '23%',
        // transform: 'translateY(-50%)',
        

      
      }}
    >
      <AIFrame onBegin={onBegin} />
    </motion.div>
  );
};

export default FlexibleCreditAI;

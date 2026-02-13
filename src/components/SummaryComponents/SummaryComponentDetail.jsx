import React from 'react';
import { motion } from 'framer-motion';
import DailyFinancialSnapshot from './DailyFinancialSnapshot';
import AiInsights from './AiInsights';
import Rewards from './Rewards';

const SummaryComponentDetail = ({ isVisible }) => {
  if (!isVisible) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
      }
    }
  };

  const frameVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    show: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '2.4rem',
        margin: '0 auto',
        padding: '7.6rem 0',
        alignItems: 'center',
        width: 'fit-content'
      }}
    >
            <div style={{ display: 'flex',  width: '100%',marginLeft: '2.8rem',transform: 'translateY(3rem)', }}>
        <h1 style={{
          color: '#FFEB3B', 
          textAlign: 'right',
          fontSize: '1rem',
          fontWeight: 'bold',
         
          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)',
        
        }}>
          Summary
        </h1>
      </div>
      {/* First Row - Full Width */}
      <motion.div 
        variants={frameVariants} 
        style={{ transform: 'translate(-1rem,-10rem)',marginTop:"-7rem" }}
      >
        <AiInsights />
      </motion.div>

      {/* Second Row - Side by Side */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        justifyContent: 'center',
        width: '100%',
        transform: 'translate(-15.6rem, -10rem)'
      }}>
        <motion.div variants={frameVariants}>
          <DailyFinancialSnapshot />
        </motion.div>

        <motion.div variants={frameVariants}>
          <Rewards />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SummaryComponentDetail;

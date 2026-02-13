import React from 'react';
import ProjectedSpend from './ProjectedSpend';
import BankIntelligence from './BankIntelligence';
import CreditApprovalPanel from './CreditApprovalPanel';
import PlanSlider from './PlanSlider';
import { motion } from 'framer-motion';

const BNPLDetail = ({ animationCompleted, onProceed }) => {
  if (!animationCompleted) return null;

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each child animation
        delayChildren: 0.2,   // Initial delay before starting animations
      }
    }
  };
  
  // Animation for each individual frame
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
        position: 'fixed',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '87.5rem',
        pointerEvents: 'auto',
        zIndex: 100,
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex',  width: '100%',marginLeft: '0.4rem',transform: 'translateY(1.5rem)'}}>
        <h1 style={{
          color: '#FFEB3B', 
          textAlign: 'right',
          fontSize: '1rem',
          fontWeight: 'bold',
         
          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)',
        
        }}>
          BNPL Plan Options (Flexible Pay-Later Plans)
        </h1>
      </div>
      {/* Grid Layout for Components */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap:"1rem",
        padding: '2rem 0',
        width: '100%'
      }}>
        {/* First Row - 3 Components */}
        <motion.div variants={frameVariants} style={{ gridColumn: '1', gridRow: '1' }}>
          <PlanSlider onProceed={onProceed} />
        </motion.div>
        
        <motion.div variants={frameVariants} style={{ gridColumn: '2', gridRow: '1' }}>
          <ProjectedSpend />
        </motion.div>
        
        <motion.div variants={frameVariants} style={{ gridColumn: '1', gridRow: '2' }}>
          <BankIntelligence />
        </motion.div>

        {/* Second Row - CreditApprovalPanel (Left-aligned) */}
        <motion.div variants={frameVariants} style={{ gridColumn: '2', gridRow: '2' }}>
          <CreditApprovalPanel />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BNPLDetail;
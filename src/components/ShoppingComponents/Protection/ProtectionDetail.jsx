import React from 'react';
import BankOffer from './BankOffer';
import ExtendedWarranty from './ExtendedWarranty';
import DeviceDamageProtection from './DeviceDamageProtection';
import TheftProtection from './TheftProtection';
import { motion } from 'framer-motion';

const ProtectionDetail = ({ animationCompleted }) => {
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
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: '18%',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '87.5rem',
        zIndex: 100,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        {/* Title */}
        <div style={{ 
          alignItems: 'flex-start',
          width: '100%',
          marginLeft: '0.4rem',
          transform: 'translateY(1.5rem)',
        }}>
          <h1 style={{
            color: '#FFEB3B', // Yellow color
            fontSize: '1rem',
            fontWeight: 700,
            textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            Protection & Add-ons (Optional Protection Bundles)
          </h1>
        </div>
        {/* Grid Layout for Components */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap:"1rem",
          width: '100%',
          padding: '2rem 0',
        }}>
          {/* First Row - 3 Components */}
          <motion.div variants={frameVariants} style={{ gridColumn: '1', gridRow: '1' }}>
            <TheftProtection />
          </motion.div>
          
          <motion.div variants={frameVariants} style={{ gridColumn: '2', gridRow: '1' }}>
            <DeviceDamageProtection />
          </motion.div>

          <motion.div variants={frameVariants} style={{ gridColumn: '1', gridRow: '2' }}>
            <ExtendedWarranty />
          </motion.div>

          {/* Second Row - BankOffer (Left-aligned) */}
          <motion.div variants={frameVariants} style={{ gridColumn: '2', gridRow: '2' }}>
            <BankOffer />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProtectionDetail;
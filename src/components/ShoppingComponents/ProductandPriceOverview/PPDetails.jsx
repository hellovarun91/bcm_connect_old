import InventoryAndDelivery from './InventoryAndDelivery';
import PriceBreakdown from './PriceBreakdown';
import ProductShowCase from './ProductShowCase';
import SmartBankSuggestion from './SmartBankSuggestion';
import { motion } from 'framer-motion';

const ShoppingDetails = ({ animationCompleted, onProceed }) => {
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
    position: 'relative',
    left: '51%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '1200px',
    zIndex: 10,
  }}
>
  {/* Title */}
  <div style={{ display: 'flex', width: '100%', marginLeft: '0.4rem', transform: 'translateY(1.5rem)' }}>
    <h1 style={{
      color: '#FFEB3B',
      textAlign: 'right',
      fontSize: '1rem',
      fontWeight: 'bold',
      textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)',
    }}>
      Product & Price Overview
    </h1>
  </div>

  {/* GRID LAYOUT */}
  <motion.div
    variants={containerVariants}
    style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          gap:"1rem",
          padding: '2rem 0',
          width: '100%'
    }}
  >
      <motion.div variants={frameVariants}>
      <PriceBreakdown onProceed={onProceed} />
    </motion.div>

    <motion.div variants={frameVariants}>
      <SmartBankSuggestion />
    </motion.div>

    <motion.div variants={frameVariants}>
      <InventoryAndDelivery />
    </motion.div>

  </motion.div>
</motion.div>

  );
};

export default ShoppingDetails;
// src/components/CoffeeComponents/OnNextComponent/OnNextDetails.jsx
import React from "react";
import { motion } from "framer-motion";
import UnifiedPayment from "./UnifiedPayment";
import RewardsEsg from "./RewardsEsg";
import Impact from "./Impact";

const OnNextDetails = () => {
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
    <div className="on-next-details-wrapper" style={{
      position: 'relative',
      width: 'fit-content',
      margin: '0 auto'
    }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap:"2rem",
          margin: '0 auto',
          justifyItems: 'center',
          position: 'relative',
          width: '100%',
          left:"20%"

        }}
      >
        <motion.div variants={frameVariants} style={{ position: 'relative', gridColumn: '1', gridRow: '1' }}>
          <UnifiedPayment />
        </motion.div>

        <motion.div variants={frameVariants} style={{ position: 'relative', gridColumn: '2', gridRow: '1' }}>
          <RewardsEsg />
        </motion.div>

        <motion.div variants={frameVariants} style={{ position: 'relative', gridColumn: '1', gridRow: '2' }}>
          <Impact />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnNextDetails;

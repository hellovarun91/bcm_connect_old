// src/components/CoffeeComponents/CoffeeDetails.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import OrderSummary from "./OrderSummary";
import PaymentDetails from "./PaymentDetails";
import LoyaltyRewards from "./LoyaltyRewards";
import VisitHistory from "./VisitHistory";
import OnNextDetails from "./OnNextComponent/OnNextDetails";
import { playButtonSound, playFrameSound } from "../../utils/soundUtils";

const CoffeeDetails = () => {
  // State to control showing OnNextDetails
  const [showOnNextDetails, setShowOnNextDetails] = useState(false);
  
  // Handle next button click
  const handleNext = () => {
    // Play button sound and then frame sound when showing OnNextDetails
    playButtonSound(() => {
      playFrameSound(() => setShowOnNextDetails(true));
    });
  };
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Delay between each child animation
        delayChildren: 0.4,   // Initial delay before starting animations
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
    <>
      {/* Show CoffeeDetails when OnNextDetails is not active */}
      {!showOnNextDetails && (
   <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, auto)',
        

        gap:"1rem",

        width: '93.8rem',
        margin: '0 auto',
        padding: '4rem',
        justifyItems: 'center'
      }}
    >
          <motion.div variants={frameVariants}>
            <OrderSummary onButtonClick={handleNext} />
          </motion.div>

          <motion.div variants={frameVariants}>
            <PaymentDetails />
          </motion.div>

          <motion.div variants={frameVariants}>
            <LoyaltyRewards />
          </motion.div>

          {/* <motion.div variants={frameVariants} style={{ gridColumn: '1 / 2' }}>
            <VisitHistory />
          </motion.div> */}
          
        </motion.div>
      )}
      
      {/* Show OnNextDetails when active */}
      {showOnNextDetails && (
           <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, auto)',
        
        gap:"1rem",
        width: '100%',
        margin: '0 auto',
        padding: '4rem',
        justifyItems: 'center'
      }}
    >
          <OnNextDetails />
          
      </motion.div>
      )}
    </>
  );
};

export default CoffeeDetails;

// src/components/PetrolPumpComponents/PetrolPumpDetails.jsx
import React from "react";
import { motion } from "framer-motion";
import ChargingSessionComponent from "./ChargingSessionComponent";
import ChargingHistoryComponent from "./ChargingHistoryComponent";
import CostAndBillingComponent from "./CostAndBillingComponent";
import ESGImpactComponent from "./ESGImpactComponent";
import OfferCoffee from "./OfferCoffee";

const PetrolPumpDetails = ({ onShowCoffee }) => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Increased delay between each child animation
        delayChildren: 0.2,
      }
    }
  };
  
  // Animation for each individual frame
  const frameVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: 1,
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
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, auto)',
        
        rowGap: '1rem',
        width: '90rem',
        margin: '0 auto',
        padding: '4rem',
        justifyItems: 'center'
      }}
    >

      <motion.div variants={frameVariants} className="w-full">
        <CostAndBillingComponent />
      </motion.div>

        <motion.div variants={frameVariants} className="w-full">
        <ESGImpactComponent />
      </motion.div>
      
      
      <motion.div variants={frameVariants} className="w-full">
        <ChargingHistoryComponent />
      </motion.div>
      
      
      <motion.div variants={frameVariants} className="w-full">
        <OfferCoffee onShowCoffee={onShowCoffee} />
      </motion.div>
    </motion.div>
  );
};

export default PetrolPumpDetails;
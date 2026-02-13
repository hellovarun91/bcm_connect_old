// src/components/PetrolPumpComponents/OfferCoffee.jsx
import React, { useContext } from "react";
import SmallFrame from "../commons/SmallFrame";
import { motion } from "framer-motion";
import { useSceneObject } from "../../context/SceneObjectContext";
import { useGlowEffect } from "../../context/GlowEffectContext";

const OfferCoffee = ({ onShowCoffee }) => {
  const { showCoffee } = useSceneObject();
  const { startGlowSequence } = useGlowEffect();

  const handleButtonClick = (e) => {
    e.stopPropagation();
    console.log("View Offer button clicked");
    if (onShowCoffee) {
      onShowCoffee();
    }
    showCoffee();
    
    // Start the sequence of pulse glow effects
    startGlowSequence();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => e.stopPropagation()}
    >
      <SmallFrame
        width="28rem"
        height="18rem"
        padding="2rem"
        position="absolute"
        frameImageHeight="67%"
        overlayTop="33%"
        overlayWidth="96.5%"
        overlayHeight="58%"
        overlayBorderRadius="1.5rem"
        overlayZIndex={1}
        title="You have an offer on coffee"
        description="Your favorite Oat Latte available on offer while you wait"
        keyPoints={[]}
        rowStyle={{ fontSize: '0.7rem' ,fontWeight: 'lighter'}}
      keyPointStyle={{ fontSize: '0.7rem',fontWeight: 'lighter' }}
        titleStyle={{ fontSize: '1rem', marginLeft: '1rem', marginTop: '1rem', color: '#FFD54F' }}
        descriptionStyle={{ fontSize: '0.875rem', fontWeight: 400, margin: '0.375rem 0px 0.75rem', marginLeft: '1rem' }}
        rowLabelStyle={{ fontSize: '0.8rem' }}
        rowValueStyle={{ fontSize: '0.8rem' }}
        showButton={false}
        buttonText="Offer details"
        onButtonClick={handleButtonClick}
        buttonStyle={{
          fontSize: '0.75rem',
          border: 'none',
          cursor: 'not-allowed',
           backgroundColor: '#ece6e6ff',
        color: '#201b1bff',
          borderRadius: '0.125rem',
          textAlign: 'center',
          fontWeight: '400',
          marginTop: '3rem',
          marginLeft: '1rem',
          '&:hover': {
            backgroundColor: '#d9d9dbff'
          }
        }}
      />
    </motion.div>
  );
};

export default OfferCoffee;

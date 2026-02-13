import React, { useState, useEffect } from 'react';
import Frame from '../../commons/Frame';
import shoppingData from '../data.json';
import { motion, AnimatePresence } from 'framer-motion';

const bicycleIcon = "/assets/icons/cycle.svg";

const ProductShowCase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const bicycleVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 10, 
        delay: 0.5 
      } 
    },
    tap: { scale: 0.95, rotate: -3, transition: { duration: 0.1 } }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    filter: [
      'brightness(1)', 
      'brightness(1.1)', 
      'brightness(1)'
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  };

  return (
    <motion.div 
      style={{ position: 'relative' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Frame
        typographyPreset="small"
        title={shoppingData.ProductShowcase.title}
        width="26rem"
        height="16rem"
        padding="3rem"
        boldValues={false}
        overlayTop="49%"
        overlayLeft="49.6%"
        blackBandWidth="95.5%"
        blackBandHeight="94%"
        overlayBorderRadius="2rem"
        titleStyle={{ marginTop: '-1rem', marginLeft: '-0.4rem', width: '100%', fontSize: '1rem', fontWeight: 700 }}
      />
      {/* Bicycle Icon - Positioned absolutely over the frame */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            style={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '37%',
              height: '100%',
            }}
            initial="hidden"
            animate="visible"
            variants={bicycleVariants}
          >
            <img 
              src={bicycleIcon}
              alt="Bicycle"
              style={{
                width: '6rem',
                height: '7rem',
                opacity: 0.9,
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              animate={pulseAnimation}
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', bicycleIcon);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductShowCase;
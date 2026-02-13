import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileHolderAnimation from '../data/animations/MobileHolderUI.json';
import { playButtonSound } from '../utils/soundUtils';
import '../styles/PlaceDevicePage.css';
import { sendLargeScreenRoute } from '../services/largeScreenNav';
import useTuio from '../hooks/useTuio';
import { TUIO_CONFIG } from '../config/tuio';

/**
 * PlaceDevicePage component - Shows mobile frame with "Place Device Here" instruction
 */
const PlaceDevicePage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleTuioPlaced = useCallback(() => {
    console.log('[TUIO] Trigger tag placed — navigating to consent');
    playButtonSound(() => {
      navigate('/consent');
      sendLargeScreenRoute('/largePages/page3', { source: 'tuio-tag-placed' });
    });
  }, [navigate]);

  // Listen for TUIO tag 22 — auto-navigate when placed on the table
  useTuio({
    triggerTagId: TUIO_CONFIG.TRIGGER_TAG_ID,
    onObjectPlaced: handleTuioPlaced,
  });

  useEffect(() => {
    // Delay the button appearance for a better UX
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000); // 1.5 seconds delay

    sendLargeScreenRoute('/largePages/page2', { source: 'place-device' });

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    playButtonSound(() => {
      navigate('/consent');
      
      // Navigate large screen to page3
      sendLargeScreenRoute('/largePages/page3', { source: 'place-device-continue' });
    });
  };

  return (
    <Box className="place-device-page">
      {/* Background */}
      <Box className="place-device-background">
        <img src="/assets/image.png" alt="Green Map Background" />
      </Box>

      {/* Overlay */}
      <Box className="place-device-overlay"></Box>

      {/* Content Container */}
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            position: 'relative',
            zIndex: 2,
            paddingTop: '5rem', // Add padding to the top to move content down
          }}
        >
          {/* Mobile frame with Lottie animation */}
          <motion.div 
            className="place-device-frame-container"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.3
            }}
          >
            <Lottie 
              animationData={MobileHolderAnimation} 
              className="place-device-frame"
              loop={true}
              autoplay={true}
              style={{ 
                transform: 'translateY(15%)' // Move the animation down by 15%
              }}
            />
          </motion.div>
        </Box>
      </Container>
      
      {/* Place Device Here button with Framer Motion - Moved outside Container */}
      <AnimatePresence>
        {showButton && (
          <motion.button 
            className="place-device-button"
            onClick={handleContinue}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: 0.2
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 230, 0, 0.65)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Place device here
          </motion.button>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PlaceDevicePage;

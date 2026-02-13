import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Lottie from 'lottie-react';
import { getAllObjects } from '../services/dataService';
import { preloadImages } from '../utils/imageCache';
import consentIconAnimation from '../data/animations/Consent-icon.json';
import waveAnimation from '../data/animations/wave.json';
import yesButtonGif from '../data/animations/Yes-Button-2026.gif';
import noButtonGif from '../data/animations/NO-Button-2026.gif';
import coffeeGif from '../data/animations/Coffee_ICON.gif';
import petrolGif from '../data/animations/Petrol_ICON.gif';
import '../styles/ConsentPage.css';
import { playButtonSound } from '../utils/soundUtils';
import { sendLargeScreenRoute } from '../services/largeScreenNav';

/**
 * ConsentPage component - Shows waveform with consent question
 */
const ConsentPage = () => {
  const navigate = useNavigate();
  const [consentGranted, setConsentGranted] = useState(false);
  const [consentAnimation, setConsentAnimation] = useState(consentIconAnimation);

  const handleYes = () => {
    // Play button sound
    playButtonSound();
    
    setConsentGranted(true);
    
    // Set the consent device animation
    setConsentAnimation(consentIconAnimation);

    // Navigate large screen to page4
    sendLargeScreenRoute('/largePages/page4', { source: 'consent-yes' });
    
    
    // Preload objects and assets during the loading time
    const preloadAssetsForCanvas = async () => {
      try {
        
        // Load all objects
        const objects = getAllObjects();
        
        // Save objects to sessionStorage for faster access in CanvasApp
        sessionStorage.setItem('canvasObjects', JSON.stringify(objects));
      
        
        // Prepare list of assets to preload
        const assetsToPreload = [
          '/assets/canvasBG.png',
          '/assets/animations/Buttons/TOPUI.json',
          '/assets/image.png',
          '/assets/EY_Logo_Beam_STFWC_Stacked_RGB_White_Yellow_EN 2.svg'
        ];
        
        // Add object icons to preload queue
        if (objects.length > 0) {
          objects.forEach(obj => {
            if (obj.icon) {
              if (obj.icon === 'coffee') {
                assetsToPreload.push(coffeeGif);
                return;
              }
              if (obj.icon === 'gas') {
                assetsToPreload.push(petrolGif);
                return;
              }
              assetsToPreload.push(`/assets/icons/${obj.icon}.svg`);
            }
          });
        }
        
        // Preload images
        await preloadImages(assetsToPreload);
      } catch (error) {
        console.error('Error preloading assets:', error);
      
      }
    };
    
    // Start preloading
    preloadAssetsForCanvas();
    
    // Navigate after a short delay so "Consent granted" is visible briefly
    setTimeout(() => {
      navigate('/menu');
    }, 1000);
    
  };

  const handleNo = () => {
    playButtonSound(() => navigate('/place-device'));
  };

  return (
    <Box className="consent-page">
      {/* Background */}
      <Box className="consent-background">
          <img src="/assets/image.png" alt="Green Map Background" />
      </Box>

      {/* Overlay */}
      <Box className="consent-overlay"></Box>

      {/* Waveform animation */}
      <Box className="waveform-container">
        <Lottie
          animationData={waveAnimation}
          className="waveform"
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

      {/* Connection SVG - shows initially */}
      
        <Box className="connection-svg-container" style={{
          position: 'absolute',
          top: '53%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3
        }}>
        </Box>
      

      {/* Mobile Holder Animation - below wave */}
      {consentAnimation && (
        <Box className="consent-animation-container" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3
        }}>
          <Lottie
            animationData={consentAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '150px',
              height: '150px',
              filter: 'drop-shadow(0 0 10px rgba(232, 233, 227, 0.8))',
              margin: '10px 0'
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Container maxWidth="sm">
        <Box className="consent-content">
          {!consentGranted ? (
            <>
              {/* Question */}
              <h2 className="consent-question">Do you consent?</h2>

              {/* Buttons */}
              <Box className="consent-buttons" style={{ opacity: 1, visibility: 'visible' }}>
                <Box
                  component="img"
                  src={yesButtonGif}
                  alt="YES"
                  className="consent-btn consent-yes"
                  onClick={handleYes}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleYes();
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <Box
                  component="img"
                  src={noButtonGif}
                  alt="NO"
                  className="consent-btn consent-no"
                  onClick={handleNo}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleNo();
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            </>
          ) : (
            <>
              {/* Consent Granted Message */}
              <h3 className="consent-question" >Consent granted</h3>
              
          
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ConsentPage;

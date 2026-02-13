import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';
import { preloadAllVideos } from '../services/videoPreloader';
import { playButtonSound } from '../utils/soundUtils';
import { sendLargeScreenRoute } from '../services/largeScreenNav';

/**
 * HomePage component - Landing page with introduction and CTA button
 */
const HomePage = () => {
  const navigate = useNavigate();

  // Start preloading all videos in background when home page loads
  useEffect(() => {
    // Start background video preloading - don't wait for it
    preloadAllVideos().then(() => {
      console.log('🎬 Background video preloading completed');
    }).catch((error) => {
      console.warn('⚠️ Background video preloading failed:', error);
    });

    sendLargeScreenRoute('/largePages/page1', { source: 'home' });
  }, []);

  // Sound effect is now handled by the utility function

  const handleBeginClick = () => {
    // Play button sound and navigate after sound starts
    
    playButtonSound(() => {
      // Navigate locally
      navigate('/place-device');
      
      // Navigate large screen to page2
      sendLargeScreenRoute('/largePages/page2', { source: 'home-begin' });
    });
  };


  return (
    <div className="home-page">
      {/* Background map image */}
      <div className="home-background">
        <img src="/assets/map-0.svg" alt="Map Background" />
      </div>

      {/* Content container */}
      <div className="home-content-wrapper">
        <div 
          style={{ 
            position: 'absolute', 
            top: -365, 
            left: 320, 
            width: '100%', 
            height: '100%', 
            zIndex: 100
          }} 
          wispDensity={1.2}
          fogIntensity={0.6}
          color="#06b6d4"
        />
        <div className="home-content">
        {/* EY Logo */}
        <div className="home-logo">
          <img src="/assets/EY_Logo_Beam_STFWC_Stacked_RGB_White_Yellow_EN 2.svg" alt="EY Logo" />
        </div>

        {/* Main text content */}
        <div className="home-text">

          <div className='home-tiles'>
            <h1 className="home-title">
            Step into a seamless connected commerce experience where your purchases, preferences, and payments come together effortlessly.

          </h1>
          <h1 className="home-title">
            This interface brings personalized offers, real-time inventory, and frictionless checkout into one unified view—designed for convenience, speed, and delight.

          </h1>
          </div>
        
          
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'left' }}>
          <motion.button
            className="home-button"
            style={{
              fontWeight: 800,
              fontSize: '1.3rem',
            }}
            onClick={handleBeginClick}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 2.5rem rgba(255, 230, 0, 0.85)',
            }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Let’s begin
          </motion.button>

      
        </div>
        </div>
      </div>
      
      {/* Overlay gradient */}
      <div className="home-overlay"></div>
    </div>
  );
};

export default HomePage;

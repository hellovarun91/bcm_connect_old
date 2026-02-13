import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

/**
 * LottieButton Component - Displays Lottie animations as interactive buttons
 * Uses lottie-react library for proper animation rendering
 */
const LottieButton = ({ animationPath, onClick, className = '', alt = '', loop = true }) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) throw new Error('Failed to load animation');
        const data = await response.json();
        setAnimationData(data);
        setError(false);
      } catch (err) {
        console.warn(`Failed to load Lottie animation from ${animationPath}:`, err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
    
    // Cleanup function to prevent memory leaks
    return () => {
      // Cancel any pending operations if component unmounts
    };
  }, [animationPath]);

  if (isLoading) {
    return (
      <button className={className} onClick={onClick} disabled>
        <span style={{ color: '#fff' }}>Loading...</span>
      </button>
    );
  }

  if (error || !animationData) {
    return (
      <button className={className} onClick={onClick}>
        <span style={{ color: '#fff', fontSize: '18px' }}>{alt}</span>
      </button>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={true}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </button>
  );
};

export default LottieButton;

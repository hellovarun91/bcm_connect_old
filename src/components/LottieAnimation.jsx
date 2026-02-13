import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

/**
 * LottieAnimation Component - Displays Lottie animations[]
 * Uses lottie-react library for proper animation rendering
 */
const LottieAnimation = ({ animationPath, loop = true, autoplay = true, style = {} }) => {
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
  }, [animationPath]);

  if (isLoading) {
    return <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  if (error || !animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
};

export default LottieAnimation;

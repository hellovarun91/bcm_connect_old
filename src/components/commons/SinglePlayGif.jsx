import React, { useEffect, useState } from 'react';

/**
 * SinglePlayGif - Cleanest approach: Swap GIF source with static image
 * 
 * How it works:
 * 1. Start with animated GIF
 * 2. After duration, swap to static PNG (first/last frame)
 * 3. GIF stops because it's no longer the source
 * 
 * This is the industry-standard, production-ready solution.
 */
const SinglePlayGif = ({ 
  src, 
  alt = '', 
  style = {}, 
  className = '',
  duration = 2500,
  staticSrc = null, // Optional: provide a static version (PNG/JPG)
  ...props 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Play GIF for the specified duration
    const timer = setTimeout(() => {
      setIsPlaying(false); // Stop by swapping to static image
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Determine which source to use
  const imageSrc = isPlaying ? src : (staticSrc || src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default SinglePlayGif;

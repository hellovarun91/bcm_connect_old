import { useEffect, useRef } from 'react';
import { videoPreloader } from '../services/videoPreloader';

export const usePreloadedVideo = (videoSrc, autoPlay = true) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    // Check if video is preloaded
    const preloadedVideo = videoPreloader.getPreloadedVideo(videoSrc);
    
    if (preloadedVideo) {
      // Use preloaded video - instant playback
      video.src = preloadedVideo.src;
      video.currentTime = 0;
      video.muted = true;
      video.playsInline = true;
      
      if (autoPlay) {
        video.play().catch(console.warn);
      }
    } else {
      // Fallback: load normally if not preloaded
      video.src = videoSrc;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      
      if (autoPlay) {
        video.addEventListener('canplay', () => {
          video.play().catch(console.warn);
        }, { once: true });
      }
    }
  }, [videoSrc, autoPlay]);

  return videoRef;
};

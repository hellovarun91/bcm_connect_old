import { useState, useEffect, useRef } from 'react';
import { videoPreloader } from '../services/videoPreloader';

export const useVideoLoader = (videoSrc, autoPlay = true) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if video is already preloaded
        if (videoPreloader.isVideoPreloaded(videoSrc)) {
          const preloadedVideo = videoPreloader.getPreloadedVideo(videoSrc);
          if (videoRef.current && mounted) {
            // Clone the preloaded video properties
            videoRef.current.src = preloadedVideo.src;
            videoRef.current.currentTime = 0;
            setIsLoading(false);
            setIsReady(true);
            
            if (autoPlay) {
              videoRef.current.play().catch(console.warn);
            }
          }
          return;
        }

        // If not preloaded, load normally with better buffering
        if (videoRef.current && mounted) {
          const video = videoRef.current;
          
          const handleCanPlay = () => {
            if (mounted) {
              setIsLoading(false);
              setIsReady(true);
              if (autoPlay) {
                video.play().catch(console.warn);
              }
            }
          };

          const handleError = (e) => {
            if (mounted) {
              setError(e);
              setIsLoading(false);
            }
          };

          const handleLoadStart = () => {
            if (mounted) {
              setIsLoading(true);
            }
          };

          video.addEventListener('canplay', handleCanPlay);
          video.addEventListener('error', handleError);
          video.addEventListener('loadstart', handleLoadStart);
          
          // Set video properties for better loading
          video.preload = 'auto';
          video.muted = true;
          video.playsInline = true;
          video.src = videoSrc;

          return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('error', handleError);
            video.removeEventListener('loadstart', handleLoadStart);
          };
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      mounted = false;
    };
  }, [videoSrc, autoPlay]);

  return {
    videoRef,
    isLoading,
    isReady,
    error
  };
};

import React, { useEffect, useRef, memo, useMemo } from 'react';
import { preloadImage, getCachedImage } from '../utils/imageCache';

/**
 * MapCanvas component that renders a map background on a canvas
 * @param {Object} props
 * @param {string} props.mapSrc - Source URL for the map image
 */
const MapCanvas = memo(({ mapSrc }) => {
  const canvasRef = useRef(null);
  const mapImageRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const contextLostRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isInitializedRef = useRef(false);
  
  // Load map image once with caching
  useEffect(() => {
    // Try to get cached image first
    let mapImage = getCachedImage(mapSrc);
    
    if (mapImage) {
      mapImageRef.current = mapImage;
      if (canvasRef.current) {
        drawMap(canvasRef.current, mapImage);
      }
      return;
    }

    // Preload image if not cached
    console.log('Loading map image:', mapSrc);
    preloadImage(mapSrc).then(img => {
      console.log('Map image loaded successfully:', mapSrc);
      mapImageRef.current = img;
      if (canvasRef.current) {
        drawMap(canvasRef.current, img);
      }
    }).catch(err => {
      console.error('Failed to preload map image:', mapSrc, err);
    });
    
    return () => {
      // Clean up any pending timeouts
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [mapSrc]);
  
  // Set up canvas and handle resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Handle context loss and restoration
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('Canvas context lost');
      contextLostRef.current = true;
    };
    
    const handleContextRestored = () => {
      console.log('Canvas context restored');
      contextLostRef.current = false;
      // Redraw immediately when context is restored
      if (mapImageRef.current) {
        drawMap(canvas, mapImageRef.current);
      }
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    
    // Function to draw the map on the canvas
    const drawMapOnCanvas = () => {
      if (mapImageRef.current) {
        drawMap(canvas, mapImageRef.current);
      }
    };
    
    // Function to set canvas size based on device pixel ratio for crisp rendering
    const setCanvasSize = () => {
      let width = window.innerWidth;
      let height = window.innerHeight;
      
      // Ensure minimum dimensions for visibility
      width = Math.max(width, 320);
      height = Math.max(height, 568);
      
      // Set canvas size directly without DPR scaling for mobile compatibility
      canvas.width = width;
      canvas.height = height;
      
      // Ensure canvas fills the viewport
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      drawMapOnCanvas();
    };
    
    // Set canvas to full window size with debounced resize
    const handleResize = () => {
      // Clear any pending resize timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Debounce resize to avoid excessive redraws
      resizeTimeoutRef.current = setTimeout(() => {
        setCanvasSize();
        resizeTimeoutRef.current = null;
      }, 100);
    };
    
    // Handle orientation change on mobile
    const handleOrientationChange = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setCanvasSize();
        resizeTimeoutRef.current = null;
      }, 200);
    };
    
    // Initial setup
    setCanvasSize();
    
    // Set up continuous animation loop to prevent disappearing content
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Only redraw if visible and initialized
      if (isVisibleRef.current && isInitializedRef.current && mapImageRef.current) {
        drawMap(canvas, mapImageRef.current);
      }
    };
    
    // Start animation loop
    animate();
    
    // Set up visibility detection
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    visibilityObserver.observe(canvas);
    
    // Handle visibility change at document level
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && mapImageRef.current) {
        // Force redraw when tab becomes visible
        drawMap(canvas, mapImageRef.current);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle window resize
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    window.addEventListener('focus', () => {
      // Redraw when window regains focus
      if (mapImageRef.current) {
        drawMap(canvas, mapImageRef.current);
      }
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('focus', drawMapOnCanvas);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Function to draw the map - extracted for reuse
  const drawMap = (canvas, mapImage) => {
    console.log('Drawing map to canvas', { canvasWidth: canvas.width, canvasHeight: canvas.height, imageWidth: mapImage.width, imageHeight: mapImage.height });
    
    try {
      // Try to get the 2d context
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: false });
      
      if (!ctx) {
        console.error('Failed to get canvas context');
        contextLostRef.current = true;
        return;
      }
      
      contextLostRef.current = false;
      isInitializedRef.current = true;

      // Use image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      // Calculate aspect ratios for responsive scaling
      const canvasAspect = canvas.width / canvas.height;
      const imageAspect = mapImage.width / mapImage.height;

      let drawWidth, drawHeight, drawX, drawY;

      // Cover the entire canvas while maintaining aspect ratio
      if (canvasAspect > imageAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageAspect;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageAspect;
      }

      // Center the image
      drawX = (canvas.width - drawWidth) / 2;
      drawY = (canvas.height - drawHeight) / 2;

      // Draw the map as background, covering the entire canvas
      ctx.globalAlpha = 1.0; // Full opacity
      ctx.drawImage(mapImage, drawX, drawY, drawWidth, drawHeight);
      ctx.globalAlpha = 1.0;
    } catch (error) {
      console.error('Error drawing map:', error);
      contextLostRef.current = true;
      
      // Try to recover by requesting animation frame
      requestAnimationFrame(() => {
        if (mapImageRef.current) {
          try {
            drawMap(canvas, mapImageRef.current);
          } catch (e) {
            console.error('Recovery attempt failed:', e);
          }
        }
      });
    }
  };

  
  return (
    <canvas 
      ref={canvasRef} 
      className="map-canvas"
      style={{ 
        display: 'block', 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        margin: 0,
        padding: 0,
        border: 'none',
        backgroundColor: '#1a202c'
      }}
    />
  );
});

export default MapCanvas;

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import modalAnimation from '../data/animations/modal.json';

/**
 * EcoRewardsModal - Simple modal that only displays the modal.json Lottie animation
 */
const EcoRewardsModal = ({ isOpen, onClose }) => {
  const lottieContainerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !lottieContainerRef.current) return;

    try {
      if (animRef.current) {
        animRef.current.destroy();
      }
      
      // Use the imported animation data directly
      animRef.current = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: modalAnimation
      });
    } catch (err) {
      console.error('Failed to load modal animation:', err);
    }

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000, backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: 'all' }}>
      <div ref={lottieContainerRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', maxWidth: '800px', maxHeight: '800px' }} />
    </div>
  );
};

export default EcoRewardsModal;

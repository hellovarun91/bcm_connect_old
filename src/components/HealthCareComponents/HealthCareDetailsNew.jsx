import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CostCoverage from './CostCoverage';
import LongTermHealthFrame from './LongTermHealthFrame';
import ProjectedHealth from './ProjectedHealth';
import AIFrame from './AIFrame';
import HSA from './HSA';
import Summary from '../CarComponents/Summary';

const HealthCareDetails = ({ onTriggerIntro }) => {
  const [showHSA, setShowHSA] = useState(false);
  const [showSummaryButton, setShowSummaryButton] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlayingAnimations, setIsPlayingAnimations] = useState(false);

  const summaryIntroTimerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSummaryButton(true);
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (summaryIntroTimerRef.current) {
        clearTimeout(summaryIntroTimerRef.current);
        summaryIntroTimerRef.current = null;
      }
    };
  }, []);

  const handleViewSummaryClick = () => {
    if (showSummary || isPlayingAnimations) return;

    // Hide components and trigger all intro animations in parent (MenuPage)
    setIsPlayingAnimations(true);
    
    if (onTriggerIntro) {
      onTriggerIntro();
    }

    if (summaryIntroTimerRef.current) {
      clearTimeout(summaryIntroTimerRef.current);
      summaryIntroTimerRef.current = null;
    }

    // Show summary after animations complete (2.5 seconds)
    summaryIntroTimerRef.current = setTimeout(() => {
      setIsPlayingAnimations(false);
      setShowSummary(true);
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2
      }
    }
  };

  const frameVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', position: 'fixed', left: '50%', top: '58%',transform: 'translate(-50%, -60%)'}}>
      {!showSummary && !isPlayingAnimations ? (
        <>
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              overflow: 'visible',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '2rem',
              width: '100%',
              height: '100%',
              padding: '2rem',
              zIndex: 100
            }}
          >
            {/* Cost Coverage */}
            {/* <motion.div
              layout
              variants={frameVariants}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gridColumn: '1',
                gridRow: '1'
              }}
            >
              <CostCoverage />
            </motion.div> */}

            {/* Center SVG (Frame 1321314706) */}
            <motion.div
              layout
              variants={frameVariants}
              style={{ flex: '0 0 auto' }}
            >
              <img 
                src="/assets/Frame 1321314706.svg" 
                alt="Health Insurance Frame" 
                style={{ width: 'auto', height: '50vh', maxWidth: '60vw' }} 
              />
            </motion.div>

            {/* Right SVG (Frame 581) */}
            <motion.div
              layout
              variants={frameVariants}
              style={{ flex: '0 0 auto' }}
            >
              <img 
                src="/assets/Frame 581.svg" 
                alt="Benefits Summary Frame" 
                style={{ width: 'auto', height: '30vh', maxWidth: '35vw' }} 
              />
            </motion.div>

            {/* HSA (appears after AIFrame triggers onBegin) */}
            {showHSA && (
              <div
                style={{
                  gridColumn: '2',
                  gridRow: '2',
                  display: 'flex',
                  justifyContent: 'center',
                  transform:"translateX(8rem)"
                }}
              >
                <HSA />
              </div>
            )}
          </motion.div>

          {showSummaryButton && (
            <button
              type="button"
              onClick={handleViewSummaryClick}
              style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12rem',
                height: '2rem',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 200,
                cursor: 'pointer',
                zIndex: 1000
              }}
            >
              View Summary
            </button>
          )}
        </>
      ) : null}
      
      {/* Summary Component - shown when View Summary is clicked */}
      {showSummary && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 2000,
          background: 'transparent',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'auto'
        }}>
          <Summary />
        </div>
      )}
    </div>
  );
};

export default HealthCareDetails;

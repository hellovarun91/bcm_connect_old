import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import HealthCostPlanner from './HealthCostPlanner';
import FlexibleCreditAI from './FlexibleCreditAI';
import SummaryComponentDetail from '../SummaryComponents/SummaryComponentDetail';

const HealthCareNewLayout = ({ animationCompleted, onProceed, onTriggerIntro }) => {
  if (!animationCompleted) return null;

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
    console.log("clicked");
    setIsPlayingAnimations(true);

    if (onTriggerIntro) {
      onTriggerIntro();
    }

    if (summaryIntroTimerRef.current) {
      clearTimeout(summaryIntroTimerRef.current);
      summaryIntroTimerRef.current = null;
    }

    summaryIntroTimerRef.current = setTimeout(() => {
      setIsPlayingAnimations(false);
      setShowSummary(true);
    }, 2500);
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  // Animation for each individual component
  const componentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    show: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none'
      }}
    >

      {/* Health Cost Planner - viewport centered */}
      {!showSummary && !isPlayingAnimations && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <motion.div
            variants={componentVariants}
            style={{ pointerEvents: 'auto' }}
          >
            <HealthCostPlanner />
          </motion.div>
        </div>
      )}

      {/* View Summary Button */}
      {showSummaryButton && !showSummary && !isPlayingAnimations && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '80px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100,
            pointerEvents: 'none'
          }}
        >
          <button
            type="button"
            onClick={handleViewSummaryClick}
            style={{
              width: '192px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 200,
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              pointerEvents: 'auto'
            }}
          >
            View Summary
          </button>
        </motion.div>
      )}

      {/* Summary Component Detail - shown when View Summary is clicked */}
      {showSummary && <SummaryComponentDetail isVisible={showSummary} />}
    </motion.div>
  );
};

export default HealthCareNewLayout;

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
        position: 'relative',
        left: '50%',
        top:"4%",
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        zIndex: 10,
        padding: '2rem 0'
      }}
    >


      {/* Two Column Layout - hidden when summary is shown */}
      {!showSummary && !isPlayingAnimations && (
        <motion.div
          variants={containerVariants}
          style={{
            display: 'grid',
            gap: '2rem',
            padding: '2rem 0',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gridTemplateColumns: 'repeat(2, 1fr )',
            height:"100%"
       
          }}
        >
          {/* Left Side - Health Cost Planner */}
          <motion.div variants={componentVariants}>
            <HealthCostPlanner />
          </motion.div>

          {/* Right Side - Flexible Credit AI */}
          <motion.div 
            variants={componentVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height:"100%",
              
            }}
          >
            <FlexibleCreditAI onBegin={onProceed} />
          </motion.div>
        </motion.div>
      )}

      {/* View Summary Button - Fixed at bottom */}
      {showSummaryButton && !showSummary && !isPlayingAnimations && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            position: 'fixed',
            bottom: '2rem',
            left: '45%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 100
          }}
        >
          <button
            type="button"
            onClick={handleViewSummaryClick}
            style={{
              width: '12rem',
              height: '2.5rem',
              background: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#fff',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 200,
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
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

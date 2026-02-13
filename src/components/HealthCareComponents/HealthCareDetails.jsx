import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CostCoverage from './CostCoverage';
import LongTermHealthFrame from './LongTermHealthFrame';
import ProjectedHealth from './ProjectedHealth';
import AIFrame from './AIFrame';
import HSA from './HSA';
import SummaryComponentDetail from '../SummaryComponents/SummaryComponentDetail';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {!showSummary && !isPlayingAnimations ? (
        <>
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              overflow: 'visible',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: 'minmax(18rem, auto)',
              columnGap: '8rem',
              rowGap: '7rem',
              margin: '1 auto',
              padding: '0.25rem',
              justifyItems: 'center',
              alignItems: 'start',
              zIndex: 100,
              transformOrigin: 'top center'
            }}
          >
            {/* Cost Coverage */}
            <motion.div
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
            </motion.div>

            {/* Long Term Health */}
            <motion.div
              layout
              variants={frameVariants}
              style={{ gridColumn: '2', gridRow: '1' }}
            >
              <LongTermHealthFrame />
            </motion.div>

            {/* Projected Health */}
            <motion.div
              layout
              variants={frameVariants}
              style={{ gridColumn: '3', gridRow: '1' }}
            >
              <ProjectedHealth />
            </motion.div>

            {/* AI Frame */}
            <motion.div
              layout
              variants={frameVariants}
              style={{ gridColumn: '1', gridRow: '2' }}
            >
              <AIFrame onBegin={() => setShowHSA(true)} />
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
                marginTop: '1.5rem',
                width: '12rem',
                height: '2rem',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 200,
                cursor: 'pointer'
              }}
            >
              View Summary
            </button>
          )}
        </>
      ) : null}
      
      {/* Summary Component Detail - shown when View Summary is clicked */}
      <SummaryComponentDetail isVisible={showSummary} />
    </div>
  );
};

export default HealthCareDetails;

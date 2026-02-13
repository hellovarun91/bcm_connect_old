import React from 'react';
import { motion } from 'framer-motion';
import LargeHorizontalFrame from '../commons/LargeHorizontalFrame';

const Summary = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const frameVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: '0',
        paddingTop: '3rem',
      }}
    >

      {/* Large Horizontal Frame - AI Insights & Long-Term Wellness */}
      <motion.div variants={frameVariants} style={{ position: 'relative' }}>
        <LargeHorizontalFrame
          width="68.5rem"
          height="32.8rem"
          contentPadding="0"
        >
          {/* Black Band Overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            height: '85%',
            background: 'rgba(0,0,0,0.65)',
            borderRadius: '0.75rem',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Content Container */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.4rem',
            width: '100%',
            height: '100%',
            padding: '2.5rem 3rem',
            position: 'relative',
            zIndex: 1,
          }}>
            {/* Title */}
            <h2 style={{
              fontFamily: 'EYInterstate',
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: '1.2rem',
              color: '#FFE600',
              margin: 0,
            }}>
              AI Insights & Long-Term Wellness
            </h2>

            {/* Main Content Row */}
            <div style={{ 
              display: 'flex',
              gap: '1.2rem',
              flex: 1,
            }}>
              {/* Column 1 - Chart */}
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
              }}>
                {/* Chart Container */}
                <div style={{
                  width: '100%',
                  height: '6.5rem',
                  position: 'relative',
                }}>
                  {/* Chart SVG - Simplified gradient area */}
                  <svg width="100%" height="100%" viewBox="0 0 552 172" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="8.69%" stopColor="#00C85D" stopOpacity="1" />
                        <stop offset="100%" stopColor="#00129C" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    {/* Chart area */}
                    <path
                      d="M 2 140 L 2 60 L 140 50 L 280 40 L 420 20 L 550 2 L 550 140 Z"
                      fill="url(#chartGradient)"
                      stroke="#00C85D"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                {/* X-axis labels */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 0.2rem',
                }}>
                  {['Year 1', 'Year 5', 'Year 10', 'Year 20'].map((label, i) => (
                    <span key={i} style={{
                      fontFamily: 'EYInterstate',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      lineHeight: '0.85rem',
                      color: '#FFFFFF',
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* Status Section */}
                <div style={{ marginTop: '0.4rem' }}>
                  <h4 style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: '1rem',
                    color: '#FFFFFF',
                    margin: '0 0 0.3rem 0',
                  }}>
                    Status
                  </h4>
                  <p style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    lineHeight: '0.95rem',
                    color: '#FFFFFF',
                    margin: 0,
                  }}>
                    You are on track to build financial stability for the future. Insurance + savings + disciplined spending are aligned with your life goals.
                  </p>
                </div>
              </div>

              {/* Column 2 - Smart Advice */}
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div>
                  <h4 style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: '1rem',
                    color: '#FFFFFF',
                    margin: '0 0 0.4rem 0',
                  }}>
                    Smart Advice Given Today
                  </h4>
                  <div style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    lineHeight: '0.95rem',
                    color: '#FFFFFF',
                  }}>
                    <p style={{ margin: '0 0 0.4rem 0' }}>
                      <strong>Safe Driving Insight:</strong> Your safe driving behaviour may reduce your next auto insurance premium by 4%.
                    </p>
                    <p style={{ margin: '0 0 0.4rem 0' }}>
                      <strong>Retail Credit Insight:</strong> Your BNPL plan was matched to your current cash-flow stability — no impact to your credit health.
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Healthcare Planning Insight:</strong> We recommend starting a dedicated Health Corpus with a monthly investment of $350 to support long-term health stability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3 - Long-Term Projection */}
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div>
                  <h4 style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    lineHeight: '1rem',
                    color: '#FFFFFF',
                    margin: '0 0 0.4rem 0',
                  }}>
                    Long-Term Projection Snapshot
                  </h4>
                  <div style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    lineHeight: '0.95rem',
                    color: '#FFFFFF',
                    marginBottom: '0.4rem',
                  }}>
                    <p style={{ margin: '0 0 0.35rem 0' }}>
                      <strong>Predicted Healthcare Expense (20 years):</strong> $280,000
                    </p>
                    <p style={{ margin: '0 0 0.35rem 0' }}>
                      <strong>Current Health Insurance Coverage:</strong> $180,000
                    </p>
                    <p style={{ margin: '0 0 0.35rem 0' }}>
                      <strong>Projected Coverage Gap:</strong> $100,000
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Suggested Monthly Savings to Close the Gap:</strong> $350/ month
                    </p>
                  </div>
                  <p style={{
                    fontFamily: 'EYInterstate',
                    fontWeight: 300,
                    fontSize: '0.7rem',
                    lineHeight: '0.9rem',
                    color: '#FFFFFF',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    (Based on your income patterns, spending behavior, insurance profile, and inflation-adjusted healthcare costs.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </LargeHorizontalFrame>
      </motion.div>
    </motion.div>
  );
};

export default Summary;

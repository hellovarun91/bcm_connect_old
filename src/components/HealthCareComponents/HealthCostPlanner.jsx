import React from 'react';
import { motion } from 'framer-motion';
import MediumHorizontalFrame from '../commons/MediumHorizontalFrame';

const HealthCostPlanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ width: '100%' }}
    >
      <MediumHorizontalFrame
        typographyPreset="medium"
        width="66rem"
        height="80vh"
        overlayTop="48.4%"
        overlayLeft="49.2%"
        overlayWidth="92.4%"
        overlayHeight="58%"
        overlayBorderRadius="2.8rem"
        contentPadding="2rem"
      >
        {/* Main Title - Center Aligned */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height:"22%"
        }}>
          <h2 style={{
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Helvetica Neue',
            fontSize: '1rem',
            fontWeight: 700,
            fontStyle: 'normal',
            lineHeight: '1.5rem',
            letterSpacing: '0.4em',
            margin: 0,
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
            Long-Term Health Cost Planner
          </h2>
          <div style={{
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Helvetica Neue',
            fontSize: '0.76rem',
            fontWeight: 700,
            fontStyle: 'normal',
            lineHeight: '1.5rem',
            marginTop: '0.35rem',
            letterSpacing: '0.4em',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
            20-Year Forecast
          </div>
        </div>

        {/* Three Sections Container */}
        <div style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          position:"absolute",
          left:"50%",
          top:"50%",
          transform:'translate(-51%, -52%)',
          width: '84%'
        }}>
          
          {/* Column 1: Estimated Cost Breakdown + Insurance Coverage + Payment Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(26, 26, 36, 0.4)',
              padding: '1rem',
              borderRadius: '0.8rem',
              height: '88%'
            }}
          >
            {/* Estimated Cost Breakdown */}
            <h3 style={{
              color: '#FFE600',
              fontFamily: 'Helvetica Neue',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.75rem'
            }}>
              Estimated Cost Breakdown
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>Blood Test</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '400' }}>$&nbsp;&nbsp;&nbsp;40</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>Lipid Panel</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '400' }}>$&nbsp;&nbsp;&nbsp;65</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>Thyroid Panel</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '400' }}>$&nbsp;&nbsp;&nbsp;55</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.7rem', fontWeight: '700' }}>Total Estimated Cost</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '700' }}>$&nbsp;240</span>
              </div>
            </div>

            {/* Insurance Coverage Preview */}
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.6rem',
            }}>
              Insurance Coverage Preview
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>Insurance covers</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '400' }}>$&nbsp;120</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>Out-of-pocket</span>
                <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '400' }}>$&nbsp;150</span>
              </div>
            </div>

            {/* Deductible notice */}
            <div style={{
              padding: '0.4rem 0.6rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '1.2rem',
              marginBottom: '0.5rem',
              marginTop: '0.7rem',
              display: 'flex',
              width: 'fit-content',
              justifyContent:"center",
              alignItems:"center",
              width:"90%",
              backgroundColor:"rgba(250, 245, 248, 1)",
              color:"rgba(46, 46, 56, 1)"
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '500', flex: 9 }}>
                You've met 68% of your annual deductible.
              </span>
            </div>

            {/* Payment Mode */}
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.6rem',
            }}>
              Payment Mode
            </h3>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem',width:"100%",justifyContent:"space-around",alignItems:"center" }}>
              <button 
                disabled
                style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.25rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.65rem',
                fontWeight: '400',
                flex: 8,
                cursor: 'not-allowed'
              }}>
                Bank Wallet
              </button>
              <button style={{
                padding: '0.35rem 0.75rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '0.25rem',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: '400',
                flex: 8,
                cursor: 'pointer'
              }}>
                Split payment
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem',width:"100%",justifyContent:"space-around",alignItems:"center" }}>
              <span style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.6rem', fontWeight: '300', flex: 8, textAlign: 'center' }}>
                Earn 1.5x reward points
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.6rem', fontWeight: '300', flex: 8, textAlign: 'center' }}>
                Over 30 days interest-free
              </span>
            </div>
          </motion.div>

          {/* Column 2: Predicted Cost of Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(26, 26, 36, 0.4)',
             padding: '0.8rem 1rem',
              borderRadius: '0.5rem',
              height: '88%'
            }}
          >
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
            }}>
              Predicted Cost of Health
            </h3>

            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                Your predicted healthcare expenses over<br />the next 20 years:
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                $ 410,000
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.6rem', fontWeight: '300', lineHeight: 1.3 }}>
                (uses inflation + history + projected utilization)
              </div>
            </div>

            {/* Current Health Insurance Coverage */}
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginTop: '0.75rem',
              marginBottom: '0.5rem',
            }}>
              Current Health Insurance Coverage
            </h3>

            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300', marginBottom: '0.4rem' }}>
                Your Current Health Insurance Coverage
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                $ 300,000
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300' }}>
                Co-pay: 6%
              </div>
            </div>

            {/* Warning box */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.6rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '2rem',
              marginTop: '0.5rem',
              backgroundColor:"rgba(255, 255, 255, 1)"
            }}>
              <span style={{ color: 'rgba(0,0,0, 1)', fontSize: '0.8rem', fontWeight: '700' }}>⚠</span>
              <div style={{ color: 'rgba(0,0,0, 1)', fontSize: '0.6rem', fontWeight: '300', lineHeight: 1.3 }}>
                Projected coverage gap in future years:<br />
                <span style={{ fontWeight: '700' }}>USD 110,000</span>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Projected Health Corpus Value Planning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(26, 26, 36, 0.4)',
              padding: '0.8rem 1rem',
              borderRadius: '0.5rem',
              height: '88%'
            }}
          >
            {/* First Section */}
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.75rem',
            }}>
              Projected Health Corpus Value<br />Planning
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300', marginBottom: '0.4rem' }}>
                Projected Health Corpus Value:
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                $ 120,000
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 1)', fontSize: '0.6rem', fontWeight: '300', lineHeight: 1.3 }}>
                (uses inflation + history + projected utilization)
              </div>
            </div>

            {/* Second Section */}
            <h3 style={{
              color: '#FFE600',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
            }}>
              Projected Health Corpus Value<br />Planning
            </h3>

            <div>
              <div style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: '300', marginBottom: '0.4rem' }}>
                Projected Health Corpus Value:
              </div>
              <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                $ 120,000 in 20 years
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.6rem', fontWeight: '300', lineHeight: 1.4 }}>
                Projected return rate: 6.2% annually<br />
                Inflation-adjusted value(@2.5%): $200,000
              </div>
            </div>
          </motion.div>
        </div>
      </MediumHorizontalFrame>
    </motion.div>
  );
};

export default HealthCostPlanner;

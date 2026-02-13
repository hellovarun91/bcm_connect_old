import React from 'react';
import { motion } from 'framer-motion';
import LargeFrame from '../commons/LargeFrame';
import data from './data.json';

const HSA = () => {
  // Data points for the graph
  const graphData = [10, 15, 22, 30, 42, 55, 70];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
    <LargeFrame
      typographyPreset="small"
      width="31rem"
      height="18rem"
      overlayTop="68.6%"
      overlayLeft="50%"
      overlayWidth="98%"
      overlayHeight="128%"
      blackBandHeight="128%"
      blackBandWidth="98%"
      overlayBorderRadius="2rem"
      overlayZIndex={-10}
      title="HSA (Health Savings Account) Eligibility & Benefits"
      titleStyle={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 0.25rem 0', padding: 0, lineHeight: 1.2 }}
      description=""
      contentPadding="2rem"
      compact={true}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column',padding: '0.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '0.75rem', flex: 1, padding: '0.25rem 0.5rem 0.5rem 0.5rem', minHeight: 0 }}>
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', minHeight: 0 }}>
            <motion.div
              style={{
                padding: '0.7rem 0.9rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 235, 59, 0.28)',
                background: 'linear-gradient(90deg, rgba(255, 235, 59, 0.12), rgba(255, 193, 7, 0.10))',
                boxShadow: '0 0 0.75rem rgba(255, 235, 59, 0.10)',
                marginBottom: 0
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ color: '#FFE600', fontSize: '0.8rem', fontWeight: 700 }}>
                You qualify for an HSA.
              </div>
            </motion.div>

            <div style={{ marginBottom: 0 }}>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem', lineHeight: 1.5 }}>
                Contribution suggestion:
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.6rem', lineHeight: 1.5, fontWeight: 400 }}>
                Add <span style={{ color: '#ffffff', fontWeight: 700 }}>$100/month</span> to reduce taxable income.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '5.25rem', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: '1px', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.10)' }} />
                  ))}
                </div>

                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="hsaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFEB3B" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#FFEB3B" stopOpacity="0.10" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d={`M0,100 ${graphData.map((point, i) => `L${i * (100 / (graphData.length - 1))},${100 - point}`).join(' ')} L100,100 Z`}
                    fill="url(#hsaGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  <motion.path
                    d={`M0,${100 - graphData[0]} ${graphData.map((point, i) => `L${i * (100 / (graphData.length - 1))},${100 - point}`).join(' ')}`}
                    fill="none"
                    stroke="#FFEB3B"
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0 0 0.25rem rgba(255, 235, 59, 0.55))' }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                  />
                </svg>

                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-0.15rem', display: 'flex', justifyContent: 'space-between', padding: '0 0.35rem', pointerEvents: 'none' }}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ width: '1px', height: '0.35rem', backgroundColor: 'rgba(255,255,255,0.35)' }} />
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '0.2rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                HSA Balance
              </div>
            </div>
          </div>

          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', minHeight: 0 }}>
            <div>
              <div style={{ color: '#FFE600', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', lineHeight:1.5 }}>
                FSA (Flexible Spending Account) Options
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.6rem', marginBottom: '0.1rem', fontWeight: 400, lineHeight: 1.5 }}>
                Current FSA balance: <span style={{ fontWeight: 700 }}>$320</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.6rem', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5 }}>
                Use by end of year to avoid loss
              </div>
            </div>

            <div>
              <div style={{ color: '#FFE600', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                Health-Linked Savings Goals
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.6rem', marginBottom: '0.1rem', fontWeight: 400, lineHeight: 1.5 }}>
                Annual Wellness Budget: You are <span style={{ fontWeight: 700 }}>22%</span> under budget this year.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.6rem', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5 }}>
                Use by end of year to avoid loss
              </div>
            </div>

            <div style={{
              marginTop: 'auto',
              borderRadius: '0.85rem',
              backgroundImage: 'url(/assets/HSACard.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: '0.55rem 0.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 0.6rem 1.2rem rgba(0,0,0,0.35)'
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '0.85rem',
                background: 'rgba(0,0,0,0.25)',
                pointerEvents: 'none'
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                <div style={{
                  width: '2.1rem',
                  height: '2.1rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img src="/assets/icons/publicCard.svg" alt="Goal" style={{ width: '1.35rem', height: '1.35rem' }} />
                </div>
                <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.43rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', position: 'relative' }}>
                  Preventive Care Savings Goal
                </div>
              </div>
              <button
                type="button"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  borderRadius: '0.65rem',
                  padding: '0.35rem 0.6rem',
                  fontSize: '0.4rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </LargeFrame>
    </motion.div>
  );
};

export default HSA;
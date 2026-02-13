import React from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as FrameSvg } from './healthcare-frame.svg';

const HealthCostPlanner = () => {
  // ═══ MANUAL ADJUSTMENTS ═══
  // Dark bg inset — increase to shrink bg away from frame edges
  const bgTop = 10;       // px from top
  const bgRight = 0;     // px from right
  const bgBottom = 20;    // px from bottom
  const bgLeft = 0;      // px from left

  // Clip-path matching the SVG frame's angular corners
  // Derived from frame SVG viewBox 1690×804 corner coordinates
  // Adjust these % values to fine-tune corner taper
  const clipTL = 6.7;   // top-left horizontal %
  const clipTR = 93.3;  // top-right horizontal %
  const clipR = 97.5;  // right vertical start %
  const clipB = 90;    // bottom vertical %
  const clipBR = 91;  // bottom-right horizontal %
  const clipBL = 9;   // bottom-left horizontal %
  const clipL = 2.5;   // left vertical start %
  const clipT = 10;    // top vertical %

  const frameClip = `polygon(${clipTL}% 0%, ${clipTR}% 0%, ${clipR}% ${clipT}%, ${clipR}% ${clipB}%, ${clipBR}% 100%, ${clipBL}% 100%, ${clipL}% ${clipB}%, ${clipL}% ${clipT}%)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: 'relative',
        width: '1100px',
        height: '560px',
      }}
    >
      {/* SVG Frame — stretches to fill container exactly, sits on top */}
      <FrameSvg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        preserveAspectRatio="none"
      />

      {/* Clipped inner container — clips dark bg + content to match angular frame corners */}
      <div style={{
        position: 'absolute',
        inset: 0,
        clipPath: frameClip,
        WebkitClipPath: frameClip,
        zIndex: 1,
      }}>
        {/* Dark background — adjust bgTop/bgRight/bgBottom/bgLeft above */}
        <div style={{
          position: 'absolute',
          top: `${bgTop}px`,
          right: `${bgRight}px`,
          bottom: `${bgBottom}px`,
          left: `${bgLeft}px`,
          background: 'rgba(0, 0, 0, 0.7)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '24px 80px',
          overflow: 'hidden',
        }}>
          {/* Main Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '12px',
            flexShrink: 0,
          }}>
            <h2 style={{
              color: '#fff',
              fontFamily: 'Helvetica Neue',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: '24px',
              letterSpacing: '0.4em',
              margin: 0,
              textTransform: 'uppercase',
            }}>
              Long-Term Health Cost Planner
            </h2>
            <div style={{
              color: '#fff',
              fontFamily: 'Helvetica Neue',
              fontSize: '12px',
              fontWeight: 700,
              lineHeight: '24px',
              marginTop: '4px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}>
              20-Year Forecast
            </div>
          </div>

          {/* Three Sections — all columns match height of tallest (column 1) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            alignItems: 'stretch',
          }}>

            {/* Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(26, 26, 36, 0.5)',
                padding: '16px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
                Estimated Cost Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
                {[['Blood Test', '40'], ['Lipid Panel', '65'], ['Thyroid Panel', '55']].map(([name, cost]) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 300 }}>{name}</span>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 400 }}>$&nbsp;&nbsp;&nbsp;{cost}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>Total Estimated Cost</span>
                  <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>$&nbsp;240</span>
                </div>
              </div>

              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                Insurance Coverage Preview
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                {[['Insurance covers', '120'], ['Out-of-pocket', '150']].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 300 }}>{label}</span>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 400 }}>$&nbsp;{val}</span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '6px 10px', border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '19px', margin: '8px 0', width: '90%',
                backgroundColor: 'rgba(250, 245, 248, 1)', color: 'rgba(46, 46, 56, 1)',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 500 }}>
                  You've met 68% of your annual deductible.
                </span>
              </div>

              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                Payment Mode
              </h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                <button disabled style={{
                  padding: '6px 12px', backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px',
                  color: 'rgba(255,255,255,0.5)', fontSize: '10px', flex: 1, cursor: 'not-allowed',
                }}>Bank Wallet</button>
                <button style={{
                  padding: '6px 12px', backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.4)', borderRadius: '4px',
                  color: '#fff', fontSize: '10px', flex: 1, cursor: 'pointer',
                }}>Split payment</button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: 300, flex: 1, textAlign: 'center' }}>
                  Earn 1.5x reward points
                </span>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: 300, flex: 1, textAlign: 'center' }}>
                  Over 30 days interest-free
                </span>
              </div>
            </motion.div>

            {/* Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(26, 26, 36, 0.5)',
                padding: '16px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
                Predicted Cost of Health
              </h3>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, marginBottom: '8px', lineHeight: 1.4 }}>
                  Your predicted healthcare expenses over<br />the next 20 years:
                </div>
                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>$ 410,000</div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, lineHeight: 1.3 }}>
                  (uses inflation + history + projected utilization)
                </div>
              </div>

              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginTop: '12px', marginBottom: '8px' }}>
                Current Health Insurance Coverage
              </h3>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, marginBottom: '6px' }}>
                  Your Current Health Insurance Coverage
                </div>
                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>$ 300,000</div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300 }}>Co-pay: 6%</div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 10px', border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '32px', marginTop: '8px', backgroundColor: '#fff',
              }}>
                <span style={{ color: '#000', fontSize: '13px', fontWeight: 700 }}>&#9888;</span>
                <div style={{ color: '#000', fontSize: '10px', fontWeight: 300, lineHeight: 1.3 }}>
                  Projected coverage gap in future years:<br />
                  <span style={{ fontWeight: 700 }}>USD 110,000</span>
                </div>
              </div>
            </motion.div>

            {/* Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(26, 26, 36, 0.5)',
                padding: '16px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
                Projected Health Corpus Value<br />Planning
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, marginBottom: '6px' }}>
                  Projected Health Corpus Value:
                </div>
                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>$ 120,000</div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, lineHeight: 1.3 }}>
                  (uses inflation + history + projected utilization)
                </div>
              </div>

              <h3 style={{ color: '#FFE600', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                Projected Health Corpus Value<br />Planning
              </h3>
              <div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, marginBottom: '6px' }}>
                  Projected Health Corpus Value:
                </div>
                <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
                  $ 120,000 in 20 years
                </div>
                <div style={{ color: '#fff', fontSize: '10px', fontWeight: 300, lineHeight: 1.4 }}>
                  Projected return rate: 6.2% annually<br />
                  Inflation-adjusted value(@2.5%): $200,000
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCostPlanner;

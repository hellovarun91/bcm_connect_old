import React from 'react';
import Frame from '../../commons/Frame';
import shoppingData from '../data.json';

const BankIntelligence = () => {
  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.BankIntelligentInsights.title}
      width="30rem"
      height="18rem"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      padding="2rem"
      titleStyle={{ marginTop: '0.2rem', marginBottom: '0.45rem' }}
      rowContainerStyle={{ marginBottom: '0rem' }}
      noBackground={true}
    >
   
      {/* Intelligence Blocks - 3 Columns */}
      <div style={{
        display: 'flex',
        gap: '0.2rem',
        marginTop: '0.1rem',
        justifyContent: 'space-between'
      }}>
        {shoppingData.BankIntelligentInsights.blocks.map((block, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                marginTop:"0.4rem",
                backgroundColor: '#00000033',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: 100,
                padding: '0.3rem',
                color: '#e2e8f0',
                lineHeight: 1.2,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                flex: 1,
                textAlign: 'left',
                minHeight: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: '0.25rem'
              }}
            >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <img src="/assets/sparks-solid.png" alt="" style={{ height: '0.9rem', objectFit: 'contain' }} />
              </div>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {(() => {
                  const text = String(block ?? '');
                  const match = text.match(/^(.*?)(\s+saves you\s+)(\$[0-9,.]+)(.*)$/i);

                  if (match) {
                    const headline = match[1].trim();
                    const prefix = (match[2] || '').trim();
                    const amount = match[3];
                    const suffix = (match[4] || '').trim();

                    return (
                      <>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{headline}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {prefix}{' '}
                          <span style={{ fontWeight: 700, color: '#ffffff' }}>{amount}</span>
                          {suffix ? ` ${suffix}` : ''}
                        </div>
                      </>
                    );
                  }

                  return <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{text}</div>;
                })()}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Frame>
  );
};

export default BankIntelligence;
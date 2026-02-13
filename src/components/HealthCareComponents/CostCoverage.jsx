import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import data from './data.json';
import Frame from '../commons/Frame';
import LargeFrame from '../commons/LargeFrame';

const CostCoverage = ({ onDataLoaded }) => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Credit Card');
  
  // Add error handling for missing data
  if (!data || !data.CostCoverage) {
    console.error('CostCoverage data is missing');
    return (
      <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
        <h2 style={{ color: '#00FFFF' }}>Error Loading Data</h2>
        <p>Unable to load healthcare cost and coverage information.</p>
      </div>
    );
  }
  
  const costCoverageData = data.CostCoverage;
  
  // Calculate total cost with error handling
  const totalCost = costCoverageData.data1 ? costCoverageData.data1.reduce((sum, item) => {
    return sum + parseFloat((item.value || '0').replace('$', ''));
  }, 0) : 0;
  
  // Calculate insurance coverage and out of pocket with error handling
  const insuranceCoverage = costCoverageData.data2 && costCoverageData.data2[0] ? 
    parseFloat((costCoverageData.data2[0].value || '0').replace('$', '')) : 0;
    
  const outOfPocket = costCoverageData.data2 && costCoverageData.data2[1] ? 
    parseFloat((costCoverageData.data2[1].value || '0').replace('$', '')) : 0;
  
  // Calculate deductible percentage with error handling
  const deductibleText = costCoverageData.summary2 || 'Deductible Progress Bar: 0% of your annual deductible.';
  const deductibleMatch = deductibleText.match(/\d+/);
  const deductiblePercentage = deductibleMatch ? parseInt(deductibleMatch[0]) : 0;
  
  // Use payment modes from data if available, otherwise use defaults
  const paymentModes = costCoverageData["Payment Mode"] && Array.isArray(costCoverageData["Payment Mode"]) ? 
    costCoverageData["Payment Mode"] : 
    ['BankWallet', 'Split Payment'];

  const isDisabledPaymentMode = (mode) => {
    const normalized = String(mode || '').toLowerCase();
    return normalized === 'split payment' || normalized === 'bankwallet' || normalized === 'bank wallet';
  };
    
  // Set default selected payment mode to first item in the list
  useEffect(() => {
    if (paymentModes && paymentModes.length > 0) {
      const firstEnabled = paymentModes.find((m) => !isDisabledPaymentMode(m));
      setSelectedPaymentMode(firstEnabled ?? paymentModes[0]);
    }
  }, [paymentModes]);

  // Notify parent component when data is loaded
  useEffect(() => {
    if (onDataLoaded && costCoverageData) {
      onDataLoaded(costCoverageData);
    }
  }, [costCoverageData, onDataLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: '24rem' }}
    >
      <LargeFrame
        typographyPreset="small"
        width="31rem"
        blackBandHeight="128%"
        blackBandWidth="98%"
        overlayWidth="107.7%"
        overlayHeight="118%"
        overlayBorderRadius="2rem"
        height="18rem"
        overlayTop="69%"
        overlayLeft="50%"
        padding="2.5rem"
        title=""
        description=""
      >
      <div className="cost-coverage-container" style={{  height: '100%', overflow: 'hidden', borderRadius: '0.75rem' }}>
        {/* Top Section - Two Columns */}
        <div className="top-section" style={{ display: 'flex', flexDirection: 'row',  marginBottom: '0.5rem',inset: '0.5rem' }}>
          {/* Left Column - Estimated Cost Breakdown */}
          <motion.div 
            className="column" 
            style={{ flex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ 
              fontSize: '0.8rem', 
              color: '#FFEB3B', 
              fontWeight: 700 
            }}>
              {costCoverageData.Column1 || "Estimated Cost Breakdown"}
            </h3>
              
            <div className="cost-items" style={{ marginBottom: '0.25rem' }}>
              {costCoverageData.data1 ? costCoverageData.data1.map((item, index) => (
                <motion.div 
                  key={index}
                  className="cost-item" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '0.1rem 0rem',
                    marginBottom: '0.3rem'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span style={{ color: '#ffffff', marginRight: '0.1rem', fontSize: '0.875rem', fontWeight: 400 }}>►</span>
                  <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 400 }}>{item.label}: {item.value}</span>
                </motion.div>
              )) : <p style={{ color: '#ffffff' }}>No cost data available</p>}
            </div>
            
            <motion.div 
              className="total"
              style={{ 
                display: 'flex', 
                justifyContent: 'flex-start',
                padding: '0.25rem 0',
                marginTop: '0.5rem'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <motion.span 
                style={{ color: '#ffffff', fontWeight: 400, fontSize: '0.875rem' }}
                initial={{ color: '#ffffff' }}
                animate={{ color: '#FFEB3B' }}
                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
              >
                {costCoverageData.summary1 || "Total Estimated Cost:"} ${totalCost.toFixed(2)}
              </motion.span>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Insurance Coverage Preview */}
          <motion.div 
            className="column" 
            style={{ flex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 style={{ 
              fontSize: '0.8rem',
              color: '#FFEB3B',
              fontWeight: 700 
            }}>
              {costCoverageData.Column2 || "Insurance Coverage Preview"}
            </h3>
            
            <div className="coverage-items" style={{ marginBottom: '0.75rem' }}>
              {costCoverageData.data2 ? costCoverageData.data2.map((item, index) => (
                <motion.div 
                  key={index}
                  className="coverage-item" 
                  style={{ 
                    display: 'flex', 
                    padding: '0.1rem 0',
                    marginBottom: '0.2rem',
                    gap: '0.2rem',
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span style={{ 
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 400
                  }}>
                    {item.label} {item.value}
                  </span>
                </motion.div>
              )) : <p style={{ color: '#ffffff' }}>No coverage data available</p>}
            </div>
            
            {/* Deductible Progress Bar */}
            <motion.div 
              className="deductible"
              style={{ marginTop: '1rem' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <div style={{ 
                color: '#ffffff',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontWeight: 300,
                lineHeight: 1.5
              }}>
                {costCoverageData.summary2 || 'Deductible Progress Bar: You\'ve met 0% of your annual deductible.'}
              </div>
              
            </motion.div>
          </motion.div>
        </div>
        
        {/* Payment Mode Section */}
        <motion.div 
          className="payment-mode"
          style={{ 
            marginTop: '0.3rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 style={{ 
            fontSize: '0.7rem', 
            color: '#FFEB3B', 
            marginBottom: '0.5rem',
            fontWeight: 600,
            alignSelf: 'center',
            textAlign: 'center'
          }}>
            {costCoverageData.buttonHead || "Payment Mode"}
          </h3>
          
          <motion.div 
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', width: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
          >
            {paymentModes.map((mode, index) => (
              <motion.div 
                key={index} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + (index * 0.2) }}
              >
                {(() => {
                  const disabled = isDisabledPaymentMode(mode);
                  const normalized = String(mode || '').toLowerCase();
                  const isBankWallet = normalized === 'bankwallet' || normalized === 'bank wallet';
                  const isSplitPayment = normalized === 'split payment';
                  return (
                <motion.button
                  key={mode}
                  onClick={() => !disabled && setSelectedPaymentMode(mode)}
                  disabled={disabled}
                  whileHover={!disabled ? { scale: 1.05 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                  style={{
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.1rem',
                    textAlign: 'center',
                    border: disabled
                      ? (isSplitPayment ? '2px solid rgba(255, 255, 255, 0.65)' : '2px solid rgba(255, 255, 255, 0.12)')
                      : (selectedPaymentMode === mode ? '2px solid #FFEB3B' : '2px solid rgba(255, 255, 255, 0.2)'),
                    backgroundColor: disabled
                      ? (isSplitPayment ? 'transparent' : (isBankWallet ? '#666666d3' : 'rgba(0, 0, 0, 0.35)'))
                      : (selectedPaymentMode === mode ? 'rgba(92, 92, 91, 0.42)' : 'rgba(0, 0, 0, 0.2)'),
                    color: disabled ? 'rgba(255, 255, 255, 0.45)' : '#ffffff',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.7 : 1,
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {mode}
                </motion.button>
                );
                })()}
                <motion.div 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    fontSize: '0.6rem',
                    textAlign: 'center',
                    lineHeight: 1.5
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 + (index * 0.2) }}
                >
                  {index === 0 ? 'Earn 1.5× reward points' : 'Over 30 days interest-free'}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      </LargeFrame>
    </motion.div>
  );
};

export default CostCoverage;

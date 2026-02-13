import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import LargeFrame from '../commons/LargeFrame';
import data from './data.json';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Custom slider component
const Slider = ({ label, value, min, max, onChange, displayValue }) => {
  const sliderRef = useRef(null);
  
  // Use useCallback to prevent recreating these functions on each render
  const handleMouseDown = useCallback((e) => {
    // Ensure slider ref exists
    if (!sliderRef.current) return;
    
    // Prevent default to avoid text selection during drag
    e.preventDefault();
    
    const updateValue = (clientX) => {
      // Safety check to ensure slider ref still exists
      if (!sliderRef.current) return;
      
      try {
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const newValue = Math.round(min + percentage * (max - min));
        onChange(newValue);
      } catch (err) {
        console.error('Error updating slider:', err);
      }
    };
    
    // Initial update
    updateValue(e.clientX);
    
    // Define handlers
    const handleMouseMove = (e) => {
      if (!sliderRef.current) return;
      e.preventDefault(); // Prevent text selection
      updateValue(e.clientX);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [min, max, onChange]);
  
  return (
    <div style={{ marginBottom: '0.3rem' }}>
      <div style={{ color: '#ffffff', fontSize: '0.7rem', marginBottom: '0.2rem', fontWeight: 400 }}>
        {label}
      </div>
      <div 
        ref={sliderRef}
        style={{ position: 'relative', height: '1rem', cursor: 'pointer' }}
        onMouseDown={handleMouseDown}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '0.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '0.125rem',
        }}></div>
        <div style={{
          position: 'absolute',
          left: `${((value - min) / (max - min)) * 100}%`,
          top: '16%',
          width: '0.75rem',
          height: '0.75rem',
          borderRadius: '50%',
          background: '#333',
          border: '1px solid #FFEB3B',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        }}></div>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        color: 'rgba(255, 255, 255, 0.7)', 
        fontSize: '0.7rem',
        marginTop: '0.25rem'
      }}>
        <span>{displayValue || value}</span>
      </div>
    </div>
  );
};

const ProjectedHealth = () => {
  // Get data from data.json
  const projectedData = data.ProjectedHealth;
  
  // State variables
  const [age, setAge] = useState(35);
  const [healthScore, setHealthScore] = useState(85);
  const [lifeExpectancy, setLifeExpectancy] = useState(82);
  const [monthlyContribution, setMonthlyContribution] = useState(700);
  const [duration, setDuration] = useState(20);
  const [planType, setPlanType] = useState('Balanced'); // Conservative, Balanced, Aggressive
  const [planTypeIndex, setPlanTypeIndex] = useState(1); // 0: Conservative, 1: Balanced, 2: Aggressive
  
  // Calculate projected value based on inputs
  const calculateProjectedValue = () => {
    // Different return rates based on plan type
    const returnRate = planType === 'Conservative' ? 0.04 : 
                      planType === 'Balanced' ? 0.062 : 0.08;
    
    // Monthly to annual contribution
    const annualContribution = monthlyContribution * 12;
    
    // Compound interest formula: FV = P(1+r)^t + PMT * ((1+r)^t - 1) / r
    // Where FV = Future Value, P = Principal, r = rate, t = time, PMT = payment
    const futureValue = annualContribution * ((Math.pow(1 + returnRate, duration) - 1) / returnRate);
    
    return Math.round(futureValue).toLocaleString();
  };
  
  // Calculate inflation-adjusted value
  const calculateInflationAdjustedValue = () => {
    const inflationRate = 0.025; // 2.5%
    const projectedValue = calculateProjectedValue().replace(/,/g, '');
    const adjustedValue = projectedValue / Math.pow(1 + inflationRate, duration);
    return Math.round(adjustedValue).toLocaleString();
  };
  
  // Generate chart data
  const generateChartData = () => {
    const returnRate = planType === 'Conservative' ? 0.04 : 
                      planType === 'Balanced' ? 0.062 : 0.08;
    
    const annualContribution = monthlyContribution * 12;
    const years = [1, 5, 10, 20];
    const values = years.map(year => {
      const value = annualContribution * ((Math.pow(1 + returnRate, year) - 1) / returnRate);
      return Math.round(value);
    });
    
    return {
      labels: years.map(year => `Year ${year}`),
      datasets: [
        {
          fill: true,
          label: 'Projected Value',
          data: values,
          borderColor: '#FFEB3B',
          borderWidth: 3,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 160);
            gradient.addColorStop(0, 'rgba(255, 235, 59, 0.28)');
            gradient.addColorStop(1, 'rgba(255, 235, 59, 0.08)');
            return gradient;
          },
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `USD ${context.parsed.y.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          display: false, // Hide x-axis labels since we're showing them separately
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      style={{ width: '24rem' }}
    >
      <LargeFrame
        typographyPreset="small"
        width="31rem"
        height="18rem"
        title=""
        top="4rem"
        overlayTop="69%"
        overlayLeft="50%"
        overlayWidth="98%"
        overlayHeight="128%"
        overlayBorderRadius="2rem"
        overlayZIndex={-10}
        description=""
        contentPadding="0.75rem"
        compact={true}
      >
      <div className="projected-health-container" style={{ 
        padding: '1rem',
        overflow: 'hidden',
        top: '1rem'
      }}>
        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '1rem',
            color: '#FFEB3B',
            textAlign: 'left',
            marginTop: '0rem',
            marginBottom: '0.1rem',
            fontWeight: 700,
            lineHeight: 1.2
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, staggerChildren: 0.1 }}
          >
            {projectedData.title}
          </motion.span>
        </motion.h2>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '4%', marginTop: '0.8rem' }}>
          {/* Left Column - All Sliders and Controls */}
          <motion.div
            className="column"
            style={{ flex: 1.2 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Monthly Contribution Slider */}
            <Slider
              label="Monthly Contribution"
              value={monthlyContribution}
              min={0}
              max={1000}
              onChange={setMonthlyContribution}
              displayValue={`$${monthlyContribution}`}
            />
            
            {/* Duration Slider */}
            <Slider
              label="Duration (Years)"
              value={duration}
              min={5}
              max={40}
              onChange={setDuration}
              displayValue={`${duration} years`}
            />
            
            {/* PlanType Slider */}
            <Slider
              label="Plan Type"
              value={planTypeIndex}
              min={0}
              max={2}
              onChange={(value) => {
                const types = ['Conservative', 'Balanced', 'Aggressive'];
                setPlanType(types[value]);
                setPlanTypeIndex(value);
              }}
              displayValue={planType}
            />
            
            {/* Projection Summary */}
            <motion.div
              style={{ marginTop: '0.4rem' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                style={{
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  marginBottom: '0.15rem',
                  maxWidth: '95%',
                  wordWrap: 'break-word',
                  lineHeight: 1.5
                }}
              >
                {projectedData.projectionSummary ? `${projectedData.projectionSummary}:` : 'Projected Health Corpus Value:'}
              </motion.div>

              <motion.div
                style={{
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '0.15rem',
                  maxWidth: '95%',
                  wordWrap: 'break-word'
                }}
              >
                {projectedData.projectionValue ? `USD ${String(projectedData.projectionValue).replace(/^\$/, '')}` : 'USD 320,000 in 20 years'}
              </motion.div>

              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.6rem', marginBottom:"0.2rem", fontWeight: 300, lineHeight: 2, marginTop:1 }}>
                Projected return rate:{' '}
                <span style={{ color: '#ffffff', fontWeight: 400 }}>
                  {planType === 'Conservative' ? '4.0%' : planType === 'Balanced' ? '6.2%' : '8.0%'} annually
                </span>
              </div>

              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.6rem', fontWeight: 300, lineHeight: 2 }}>
                Inflation-adjusted value (@2.5%):{' '}
                <span style={{ color: '#ffffff', fontWeight: 400 }}>
                  USD {calculateInflationAdjustedValue()}
                </span>
              </div>

              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.6rem', fontWeight: 300, lineHeight: 2.4 }}>
                Coverage gap closed:{' '}
                <span style={{ color: '#ffffff', fontWeight: 400 }}>
                  ✔
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Chart */}
          <motion.div
            className="column"
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div style={{
              color: '#FFEB3B',
              fontSize: '0.7rem',
              marginBottom: '0.2rem',
              fontWeight: 700,
              textAlign: 'center'
            }}>
              Projected Growth Over Time
            </div>

            <motion.div
              style={{
                height: '6.25rem',
                width: '100%',
                borderRadius: '0.25rem',
                padding: '0.1rem',
                marginBottom: '0.2rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                overflow: 'hidden'
              }}
            >
              <Line data={generateChartData()} options={chartOptions} height={128} />
            </motion.div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.05rem',
              paddingLeft: '2%',
              paddingRight: '2%',
              width: '100%'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.5rem', fontWeight: 300 }}>Y1</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.5rem', fontWeight: 300 }}>Y5</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.5rem', fontWeight: 300 }}>Y10</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.5rem', fontWeight: 300 }}>Y20</span>
            </div>
          </motion.div>
        </div>
      </div>
      </LargeFrame>
    </motion.div>
  );
};

export default ProjectedHealth;
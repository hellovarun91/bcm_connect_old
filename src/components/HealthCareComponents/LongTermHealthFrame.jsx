import React from 'react';
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
import Frame from '../commons/Frame';

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

const LongTermHealthFrame = () => {
  // State variables for interactive controls
  const [viewMode, setViewMode] = React.useState('predicted'); // 'predicted' or 'current'
  const [timeframe, setTimeframe] = React.useState(20); // years
  const [includeInflation, setIncludeInflation] = React.useState(true);
  
  // Get data from data.json
  const longTermData = data.LongTermHealth;
  
  // Chart data for predicted cost
  const predictedCostChartData = {
    labels: ['Year 1', 'Year 5', 'Year 10', 'Year 20'],
    datasets: [
      {
        fill: true,
        label: 'Predicted Cost',
        data: [5000, 8000, 14000, 22000],
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
  
  // Chart data for current coverage
  const currentCoverageChartData = {
    labels: ['Year 1', 'Year 5', 'Year 10', 'Year 20'],
    datasets: [
      {
        fill: true,
        label: 'Current Coverage',
        data: [4000, 6000, 9000, 12000],
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: '24rem' }}
    >
      <LargeFrame
        typographyPreset="small"
        title={data.LongTermHealth.title}
        titleStyle={{ color: 'rgb(255, 230, 0)', margin: '-0.2rem 0px -0.5rem -0.5rem', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2, padding: '1rem' }}
        width="31rem"
        top="10rem"
        height="18rem"
        overlayTop="69%"
        overlayLeft="50%"
        overlayWidth="98%"
        overlayHeight="128%"
        overlayBorderRadius="2rem"
        overlayZIndex={-10}
        description=""
        contentPadding="1rem"
        compact={true}
      >
      <div className="long-term-health-container" style={{ 
        padding: '0rem 0.2rem 0.2rem 0.2rem', 
        marginTop: '-0.5rem',
        height: '100%', 
        overflow: 'hidden', 
        borderRadius: '0.75rem'
      }}>
      

        {/* Two Column Layout */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '3%', marginBottom: '0.3rem',padding: '0.4rem' }}>
          {/* Left Column - Predicted Cost */}
          <motion.div
            className="column"
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h3 
              style={{
                fontSize: '0.8rem',
                color: '#FFEB3B',
                marginBottom: '0.25rem',
                fontWeight: 700
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.05, color: '#FFFFFF' }}
            >
              {longTermData.sections[0].title}
            </motion.h3>

            {/* Chart visualization using Chart.js */}
            <motion.div 
              style={{
                width: '85%',
                height: '3.5rem',
                borderRadius: '0.25rem',
                marginBottom: '0.4rem',
                padding: '0.25rem',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <Line data={predictedCostChartData} options={chartOptions} height={128} />
            </motion.div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.8rem',
              paddingLeft: '3%',
              paddingRight: '3%'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y1</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y5</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y10</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y20</span>
            </div>

            <motion.div 
              style={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 400,
                marginBottom: '0.35rem',
                lineHeight: 1.5
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {longTermData.sections[0].subtitle}
              {longTermData.sections[0].subtitle2 && (
                <motion.div
                  style={{ fontWeight: 400 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  {longTermData.sections[0].subtitle2}
                </motion.div>
              )}
            </motion.div>

            {longTermData.sections[0].value && (
              <motion.div
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.75 }}
              >
                {longTermData.sections[0].value}
              </motion.div>
            )}

            <motion.div 
              style={{
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 400,
                marginBottom: '0.3rem'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              {longTermData.sections[0].trendLabel}
            </motion.div>
            {longTermData.sections[0].details && longTermData.sections[0].details.map((detail, index) => (
              <motion.div 
                key={index} 
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.6rem',
                  fontWeight: 300,
                  fontStyle: String(detail || '').trim().startsWith('(') ? 'italic' : 'normal',
                  marginBottom: index === longTermData.sections[0].details.length - 1 ? '0.3rem' : '0.2rem'
                }}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
              >
                {detail}
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Current Coverage */}
          <motion.div
            className="column"
            style={{ flex: 1 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h3 
              style={{
                fontSize: '0.8rem',
                color: '#FFEB3B',
                marginBottom: '0.25rem',
                fontWeight: 700
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {longTermData.sections[1].title}
            </motion.h3>

            {/* Chart visualization using Chart.js */}
            <motion.div 
              style={{
                width: '85%',
                height: '3.5rem',
                borderRadius: '0.25rem',
                marginBottom: '0.4rem',
                padding: '0.25rem',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              <Line data={currentCoverageChartData} options={chartOptions} height={128} />
            </motion.div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.8rem',
              paddingLeft: '3%',
              paddingRight: '3%'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y1</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y5</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y10</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.4rem', fontWeight: 300 }}>Y20</span>
            </div>

            <motion.div 
              style={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 400,
                marginBottom: '0.35rem',
                lineHeight: 1.5
              }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              {longTermData.sections[1].subtitle}
            </motion.div>

            {longTermData.sections[1].value && (
              <motion.div
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.75 }}
              >
                {longTermData.sections[1].value}
              </motion.div>
            )}

            <motion.div 
              style={{
                color: '#ffffff',
                fontSize: '0.5rem',
                fontWeight: 400,
                marginBottom: '0.3rem'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              {longTermData.sections[1].trendLabel}
            </motion.div>
            {longTermData.sections[1].details && longTermData.sections[1].details.map((detail, index) => (
              <motion.div 
                key={index} 
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.6rem',
                  fontWeight: 300,
                  marginBottom: '0.25rem',
                  lineHeight: 1.5
                }}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
              >
                {(() => {
                  const idx = typeof detail === 'string' ? detail.indexOf(':') : -1;
                  if (idx === -1) return detail;
                  const label = detail.slice(0, idx + 1);
                  const value = detail.slice(idx + 1);
                  return (
                    <>
                      {label}
                      <span style={{ color: '#ffffff', fontWeight: 300 }}>{value}</span>
                    </>
                  );
                })()}
              </motion.div>
            ))}

            {/* Warning/Alert Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginTop: '0.7rem'
              }}
            >
              <img
                src="/assets/warning-triangle.png"
                alt=""
                style={{ width: '0.8rem', height: '0.8rem', marginRight: '0.5rem' }}
              />
              <div style={{ color: '#e00808ff', fontSize: '0.6rem', fontWeight: 300 }}>
                {longTermData.warning.text}{' '}<span style={{ fontWeight: 300, color: '#e00808ff' }}>{longTermData.warning.value}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </LargeFrame>
    </motion.div>
  );
};

export default LongTermHealthFrame;

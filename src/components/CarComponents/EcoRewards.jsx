import React, { useRef, useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const EcoRewardsContainer = styled(motion.div)`
  background-color: rgba(5, 2, 10, 0.7);
  color: #ffffff;
  padding: 1.25rem;
  border-radius: 0.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 48rem;
  height: 26rem;
  margin: 0;
  position: relative;
  overflow: hidden;
`;

const Column = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.75rem;
  border-radius: 0.5rem;
  min-height: 280px;
  position: relative;
`;

const DetailItem = styled(motion.div)`
  margin-bottom: 0.4rem;
`;

const Title = styled(motion.h3)`
  font-size: 0.7rem;
  color: #f0e5e5ffff;
  margin-top: 0rem;
  font-weight: bold;
`;

const Value = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #04BB65;
`;

const SubValue = styled(motion.p)`
  font-size: 0.56rem;
  color: #ebe5e5ff;
  font-weight:bold;
  margin: 0.15rem 0 0 0;
`;

const MapContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 226px;
  width: 100%;
`;

const ChartContainer = styled(motion.div)`
  position: relative;
  width: 240px;
  height: 180px;
  margin: 0 auto;
`;

const ChartPercentage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 700;
  color: #04BB65;
`;

// Donut Gauge Chart Component
const DonutGauge = ({ value }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Animate the fill
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <ChartContainer >
      <div style={{ width: '100%', position: 'relative', height: '180px' }}>
        <ResponsiveContainer width="100%" height="100%" aspect={1.4}>
          <PieChart>
            {/* Background Circle */}
            <Pie
              data={[{ value: 100 }]}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={55}
              outerRadius={75}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              fill="#e0e0e0"
            />
            
            {/* Fill Arc */}
            <Pie
              data={[{ value: animatedPercentage }, { value: 100 - animatedPercentage }]}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={55}
              outerRadius={75}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
              animationBegin={300}
              animationEasing="ease-out"
            >
              <Cell key="filled" fill="#FACC15" strokeWidth={0} />
              <Cell key="empty" fill="transparent" strokeWidth={0} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

const Button = styled(motion.button)`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  cursor: not-allowed;
  font-weight:500;
  font-size: 0.7rem;
  opacity: 0.7;
`;

const AlertWrapper = styled(motion.div)`
  position: absolute;
  bottom: 20rem;
  left: 10rem;
  right: 10rem;
  display: flex;
  justify-content: center;
  z-index: 10;
  pointer-events: auto;
`;

const MapImage = styled(motion.img)`
  width: 100%;
  object-fit: cover;
  max-height: 272px;
`;

const EcoRewards = () => {
  const [showAlert, setShowAlert] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: 'easeOut', delay: 0.4 }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 1.2,
        delay: 0.5
      }
    }
  };
  
  const handleConvertClick = () => {
    setShowAlert(true);
  };
  return (
    <EcoRewardsContainer style={{ border: '2px solid #FACC15'}}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Column 1: CO2 Saved Meter */}
      <Column style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem 0.5rem' }}>
        <Title variants={itemVariants}>CO<sub>2</sub> Saved Meter</Title>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: 1, paddingTop: '10px', width: '100%' }}>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DetailItem variants={chartVariants} style={{ margin: '0' }}>
              <DonutGauge value={40} />
            </DetailItem>
            
            <DetailItem 
              variants={itemVariants}
              style={{ textAlign: 'center', position: 'absolute', bottom: '32px', width: '100%', padding: '0' }}
            >
              <Value variants={itemVariants} style={{ color: '#f9fcfbff', fontSize: '1rem' }}>You saved 82 kg CO<sub>2</sub></Value>
              <Value variants={itemVariants} style={{ color: '#f9fcfbff', fontSize: '1rem' }}>this month.</Value>
            </DetailItem>
          </div>
        </div>
      </Column>
      
      {/* Column 2: Green Credits Balance */}
      <Column variants={columnVariants}>
        <Title variants={itemVariants}>Green Credits Balance</Title>
      
        <div style={{ display: 'flex', flexDirection: 'column', height: '40%' }}>
          <DetailItem variants={itemVariants}>
            <SubValue variants={itemVariants}>Balance</SubValue>
            <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>2 Green Credits</Value>
            <Value variants={itemVariants} style={{ color: '#04BB65', marginTop: '0.15rem' }}>available</Value>
          </DetailItem>
          
          <DetailItem variants={itemVariants}>
            <SubValue variants={itemVariants}>Convert credits → $ in green savings account</SubValue>
            <motion.div 
              variants={itemVariants}
              style={{ marginTop: '0.8rem' }}
            >
              <Button 
                disabled={true}
                style={{ pointerEvents: 'none' }}
              >
                Convert Credits
              </Button>
            </motion.div>
          </DetailItem>
        </div>
        
        <div style={{ height: '60%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <AnimatePresence>
            {showAlert && (
              <AlertWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAlert(false);
                }}
              >
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '90%', maxWidth: '22rem' }}
                >
                </motion.div>
              </AlertWrapper>
            )}
          </AnimatePresence>
        </div>
      </Column>
      
      {/* Column 3: Impact Map */}
      <Column variants={columnVariants}>
        <Title variants={itemVariants}>Impact Map</Title>
        
        <DetailItem 
          variants={itemVariants}
          style={{ height: 'calc(100% - 92px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <MapContainer variants={mapVariants}>
            <MapImage 
              src="/assets/charts/earth-map.svg" 
              alt="Earth Impact Map" 
              style={{ borderRadius: '8px' }} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </MapContainer>
        </DetailItem>
      </Column>
    </EcoRewardsContainer>
  );
};

export default EcoRewards;

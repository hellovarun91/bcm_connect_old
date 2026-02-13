import styled from '@emotion/styled';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import data from '../../data/components/data.json';
import { useState, useEffect } from 'react';
import DrivingCostChart from './Charts/DrivingCostChart';

const InsightsContainer = styled(motion.div)`
  background-color: rgba(26, 26, 26, 0.75);
  color: #ffffff;
  padding: 1.25rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: grid;
  grid-template-columns: 1.9fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  width: 48rem;
  height: 26rem;
  margin: 0;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.67rem;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.67rem;
`;

const ChartContainer = styled.div`
  background-color: rgb(26, 26, 36);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.75rem;
`;

const MapContainer = styled.div`
  background-color: rgb(26, 26, 36);
  padding: 0.17rem;
  border-radius: 0.25rem;
  display: flex;
  gap: 0.34rem;
  overflow: hidden;
`;

const DataTile = styled.div`
  background-color: rgb(26, 26, 36);
  padding: 0.17rem;
  border-radius: 0.25rem;
  text-align: center;
  overflow: hidden;
`;

const Title = styled(motion.h3)`
  font-size: 0.7rem;
  color: #f3efefe0;
  margin-bottom: 0rem;
  font-weight: bold;
  text-align: left;
`;

const Value = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${props => props.color || 'inherit'};
`;

const SubValue = styled(motion.p)`
  font-size: 0.45rem;
  color: #eae6e6ff;
  margin: 0.15rem 0 0 0;
`;

const { monthlyDrivingCost, routeHeatmap, energyEfficiency, ecoScore } = data.drivingInsights;

const DrivingInsights = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  const maskVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'circOut' }
    }
  };
  
  // Set fill to 50% for the gauge
  const percentage = 50;
  
  // State for animated fill percentage - starts at 0
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Animate the fill smoothly after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Data for outer gauge (background)
  const gaugeBackground = [
    { value: 100, color: "#222222" }
  ];

  // Data for gauge fill
  const gaugeFill = [
    { value: percentage, color: "#FACC15" },
    { value: 100 - percentage, color: "transparent" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ 
        width: '100%', height: '100%' ,
      }}
    >
    <InsightsContainer style={{ border: '2px solid #FACC15'}} >
      <ChartContainer style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
        <DrivingCostChart />
      </ChartContainer>
      
  <MapContainer style={{ padding: '1rem', marginTop: '-0.4rem', gridColumn: '1 / 2', gridRow: '2 / 3', display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
  {/* Left Column - Map Visualization */}
  <div style={{ 
    flex: 0.75, 
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
   
  }}>
    <Title variants={itemVariants} style={{ margin: '0rem', marginBottom: '1rem', opacity: 1, transform: 'none' }}>{routeHeatmap.title}</Title>
    <div style={{ 
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    }}>
      <motion.img 
        variants={chartVariants}
        src="/assets/charts/heatmap.svg" 
        alt="Route Heatmap Visualization" 
        style={{ 
          height: '100%', 
          maxHeight: '100%',
          width: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
          borderRadius: '0.25rem'
        }} 
      />
    </div>
  </div>
  
  {/* Right Column - Stats */}
  <div style={{ 
    flex: 0.3, // 40% width
    marginTop: '-1rem',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
   <div style={{ marginLeft: '0.3rem' }}>
      <motion.div variants={itemVariants} style={{ marginTop: '3rem' }}>
         <SubValue style={{ fontSize: '0.7rem' }} variants={itemVariants}>Spend per route</SubValue>
        <Value variants={itemVariants} style={{ marginTop: '0.25rem' }} color='#04BB65'>{routeHeatmap.spendPerRoute}</Value>
       
      </motion.div>
      <motion.div variants={itemVariants}  style={{ marginTop: '1rem' }}>
         <SubValue style={{ fontSize: '0.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} variants={itemVariants}>Saves vs gas-powered equivalent</SubValue>
        <Value variants={itemVariants} style={{ marginTop: '0.25rem' }} color='#04BB65'>{routeHeatmap.savingsVsGas}</Value>
       
      </motion.div>
    </div>
  </div>
</MapContainer>
      
      <DataTile style={{ gridColumn: '2 / 3', gridRow: '1 / 2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
<Title variants={itemVariants} style={{ marginLeft: '1rem', fontWeight: 'bold', textAlign: 'left' }}>Energy Efficiency Meter</Title>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          
          {/* Circular Donut Chart */}
          <div style={{ width: '130%', position: 'relative', height: '9.5rem', marginTop: '0.25rem', marginBottom: '0' }}>
            <ResponsiveContainer width="100%" height="140%">
               <PieChart>
                        {/* Background Circle */}
                        <Pie
                          data={[{ value: 100 }]}
                          cx="50%"
                          cy="50%"
                          startAngle={180}
                          endAngle={0}
                          innerRadius={62}
                          outerRadius={88}
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
                          innerRadius={62}
                          outerRadius={88}
                          paddingAngle={0}
                          dataKey="value"
                          stroke="none"
                          animationDuration={2000}
                          animationBegin={400}
                          animationEasing="ease-in-out"
                          isAnimationActive={true}
                        >
                          <Cell key="filled" fill="#FACC15" strokeWidth={0} />
                          <Cell key="empty" fill="transparent" strokeWidth={0} />
                        </Pie>
                      </PieChart>
            </ResponsiveContainer>
            
            {/* Gauge labels */}
            <div style={{ 
              position: 'absolute',
           
              width: '100%',
              justifyContent: 'space-between',
              fontSize: '0.6rem',
              color: '#888888',
              padding: '0 15%'
            }}>
            </div>
            
            {/* Center values */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.1rem' }}>3.9 mi/kWh</div>
              <div style={{ fontSize: '0.6rem', color: '#ffffffff', fontWeight: 'bold'}}>Above average</div>
            </div>
          </div>
        </div>

        </DataTile>
      
      <DataTile style={{ padding: '1rem', marginTop: '-0.4rem', gridColumn: '2 / 3', gridRow: '2 / 3'}}>
        <Title variants={itemVariants} style={{ margin: '0rem', marginBottom: '1rem', opacity: 1, transform: 'none' }}>{ecoScore.title}</Title>
          <motion.div 
            variants={itemVariants}
            style={{ textAlign: 'left'}}
          >
          <Title style={{ fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'left', marginTop: '0rem' }} variants={itemVariants}>Eco Score</Title>

            <Value variants={itemVariants} style={{ marginTop: '0.25rem' }} color='#04BB65'>{ecoScore.score}</Value>

             
            <SubValue variants={itemVariants} style={{ fontSize: '0.85rem', marginTop: '0.3rem',fontWeight: 'lighter', marginTop: "1rem" }}>{ecoScore.subValue}</SubValue>
          </motion.div>
        </DataTile>
    </InsightsContainer>
    </motion.div>
  );
}

export default DrivingInsights;
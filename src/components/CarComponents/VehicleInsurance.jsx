import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import data from '../../data/components/data.json';

const InsuranceContainer = styled(motion.div)`
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
  gap: 0.75rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const Title = styled(motion.h3)`
  font-size: 0.7rem;
  color: #f0e5e5ffff;
  margin-bottom: 0.5rem;
  font-weight: bold;
  margin: 0;
`;

const DetailItem = styled(motion.div)`
  margin-bottom: 0.75rem;
`;

const Value = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  color: #04BB65;
`;

const SubValue = styled(motion.p)`
  font-size: 0.75rem;
  color: #ebe5e5ff;
  margin: 0.15rem 0 0 0;
`;

const CheckIcon = styled(motion.span)`
  color: #04BB65;
  font-size: 1.5rem;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const ArrowIcon = styled(motion.span)`
  color: #04BB65;
  font-size: 0.7rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const VehicleInsurance = () => {
  const { coverageBreakdown, stateCompliance, telematics } = data.vehicleInsurance;

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

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
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

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 450,
        damping: 18,
        delay: 0.3
      }
    }
  };

  return (
    <InsuranceContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ border: '2px solid #FACC15'}}
    >
      {/* Column 1: Coverage Breakdown */}
      <Column variants={columnVariants}>
        <Title variants={itemVariants}>{coverageBreakdown.title}</Title>
        
        <DetailItem custom={0} variants={itemVariants}>
          <SubValue variants={itemVariants}>{coverageBreakdown.liability.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{coverageBreakdown.liability.value}</Value>
        </DetailItem>
        
        <DetailItem custom={1} variants={itemVariants}>
          <SubValue variants={itemVariants}>{coverageBreakdown.collision.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{coverageBreakdown.collision.value}</Value>
        </DetailItem>
        
        <DetailItem custom={2} variants={itemVariants}>
          <SubValue variants={itemVariants}>{coverageBreakdown.comprehensive.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{coverageBreakdown.comprehensive.value}</Value>
        </DetailItem>
        
        <DetailItem custom={3} variants={itemVariants}>
          <SubValue variants={itemVariants}>{coverageBreakdown.personalInjury.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{coverageBreakdown.personalInjury.value}</Value>
        </DetailItem>
        
        <DetailItem custom={4} variants={itemVariants}>
          <SubValue variants={itemVariants}>{coverageBreakdown.deductibles.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{coverageBreakdown.deductibles.value}</Value>
        </DetailItem>
      </Column>
      
      {/* Column 2: State Compliance */}
      <Column variants={columnVariants}>
        <Title variants={itemVariants}>{stateCompliance.title}</Title>
        
        <DetailItem custom={0} variants={itemVariants}>
          <SubValue variants={itemVariants}>{stateCompliance.minimumRequirements}</SubValue>
          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <CheckIcon 
              variants={iconVariants} 
              style={{ fontWeight: 900 }}
            >✓</CheckIcon>
            <Value 
              variants={itemVariants} 
              style={{ fontWeight: 900, textShadow: '0px 0px 1px rgba(255,255,255,0.5)' }}
            >{stateCompliance.status}</Value>
          </motion.div>
        </DetailItem>
      
      </Column>
      
      {/* Column 3: Pay-Per-Mile & Telematics */}
      <Column variants={columnVariants}>
        <Title variants={itemVariants}>{telematics.title}</Title>
        
        <DetailItem custom={0} variants={itemVariants}>
          <SubValue variants={itemVariants}>{telematics.liveRate.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{telematics.liveRate.value}</Value>
        </DetailItem>
        
        <DetailItem custom={1} variants={itemVariants}>
          <SubValue variants={itemVariants}>{telematics.mileage.label}</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{telematics.mileage.value}</Value>
        </DetailItem>
        
        <DetailItem custom={2} variants={itemVariants}>
          <SubValue variants={itemVariants}>{telematics.safetyScore.label}</SubValue>
           <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{telematics.safetyScore.value}</Value>
        </DetailItem>
      </Column>
    </InsuranceContainer>
  );
};

export default VehicleInsurance;

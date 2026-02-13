import React, { useRef, useEffect, useState } from 'react';
import data from '../../data/components/data.json';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const OverviewContainer = styled(motion.div)`
  background-color: rgba(5, 2, 10, 0.7);
  color: #ffffff;
  padding: 1.25rem;
  width: 48rem;
  height: 26rem;
  border-radius: 0.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  position: relative;
  overflow: hidden;
`;

const Column = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  padding:0rem 0.75rem;
  border-radius: 0.5rem;
`;

const Title = styled(motion.h3)`
  font-size: 0.7rem;
  color: #f4eeeeff;
  font-weight: bold;
`;

const Value = styled(motion.p)`
  font-size: 1.0rem;
  font-weight: 700;
  margin: 0;
  color: #04BB65;
`;

const SubValue = styled(motion.p)`
  font-size: 0.75rem;
  color: #f1ececff;
  margin: 0.15rem 0 0 0;
`;

const SnapshotItem = styled(motion.div)`
  margin-bottom: 0.75rem;
`;

const CircularProgressContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  flex: 1;
`;

const ChartPercentage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 700;
  color: #04BB65;
`;

const DonutChart = ({ percentage }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Animate the percentage from 0 to the target percentage
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '220px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Background Circle - Full 360 degrees */}
          <Pie
            data={[{ value: 100 }]}
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            innerRadius={50}
            outerRadius={65}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            fill="#333333"
          />
          
          {/* Fill Arc - Full 360 degrees */}
          <Pie
            data={[{ value: animatedPercentage }, { value: 100 - animatedPercentage }]}
            cx="50%"
            cy="50%"
            startAngle={0}
            endAngle={360}
            innerRadius={50}
            outerRadius={65}
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
      <ChartPercentage>{animatedPercentage}%</ChartPercentage>
    </div>
  );
};

const SubscriptionItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
`;

const SubscriptionLabel = styled(motion.span)`
  font-size: 0.9rem;
  color: #04BB65;
  font-weight: 700;
`;

// Simple toggle switch component without using component selectors
const Toggle = ({ checked, onChange }) => {
  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '1.8rem',
    height: '1rem'
  };
  
  const inputStyle = {
    opacity: 0,
    width: 0,
    height: 0
  };
  
  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: checked ? '#04BB65' : '#444',
    transition: '.4s',
    borderRadius: '1rem'
  };
  
  const sliderBefore = {
    position: 'absolute',
    content: '""',
    height: '0.7rem',
    width: '0.7rem',
    left: checked ? '0.9rem' : '0.15rem',  // Move right when checked
    bottom: '0.15rem',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%'
  };
  
  return (
    <label style={switchStyle}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        style={inputStyle} 
      />
      <span style={sliderStyle}>
        <span style={sliderBefore}></span>
      </span>
    </label>
  );
};

const VehicleFinanceOverview = () => {
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 }
    }
  };

  const subscriptionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5
      }
    })
  };
  const { autoLoanSnapshot, loanTimeline, subscriptionsPanel } = data.vehicleFinanceOverview;
  const [subscriptions, setSubscriptions] = React.useState(subscriptionsPanel.subscriptions);
  return (
    <OverviewContainer style={{ border: '2px solid #FACC15'}}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Column 1: Auto Loan Snapshot */}
      <Column>
        <Title variants={itemVariants}>{autoLoanSnapshot.title}</Title>
        <SnapshotItem variants={itemVariants}>
          <SubValue variants={itemVariants}>Balance</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{autoLoanSnapshot.balance}</Value>
        </SnapshotItem>
        <SnapshotItem variants={itemVariants}>
          <SubValue variants={itemVariants}>EMI</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{autoLoanSnapshot.emi}</Value>
        </SnapshotItem>
        <SnapshotItem variants={itemVariants}>
          <SubValue variants={itemVariants}>Interest rate</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{autoLoanSnapshot.interestRate}</Value>
        </SnapshotItem>
        <SnapshotItem variants={itemVariants}>
          <SubValue variants={itemVariants}>Next payment</SubValue>
          <Value variants={itemVariants} style={{ marginTop: '0.25rem' }}>{autoLoanSnapshot.nextPayment}</Value>
        </SnapshotItem>
      </Column>

      {/* Column 2: Loan Timeline */}
      <Column 
        variants={columnVariants}
        style={{ alignItems: 'flex-start' }}
      >
        <Title variants={itemVariants} style={{ textAlign: 'left' }}>{loanTimeline.title}</Title>
        <CircularProgressContainer variants={itemVariants}>
          <SubValue variants={itemVariants} style={{ alignSelf: 'flex-start', marginBottom: '0.1rem' }}>Projected payoff date</SubValue>
          <Value variants={itemVariants} style={{ fontSize: '1.0rem', textAlign: 'left', marginBottom: '0rem', marginTop: '0.25rem' }}>{loanTimeline.projectedPayoffDate}</Value>
          <motion.div 
            variants={chartVariants}
            style={{ position: 'relative', width: '100%', height: '18rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-0.5rem' }}
          >
            <DonutChart percentage={loanTimeline.percentage} />
          </motion.div>
        </CircularProgressContainer>
      </Column>

      {/* Column 3: Subscriptions Panel */}
      <Column>
        <Title variants={itemVariants}>{subscriptionsPanel.title}</Title>
        <div style={{ marginTop: '-0.5rem' }}>
          {subscriptions.map((sub, index) => (
            <SubscriptionItem 
              key={index} 
              custom={index}
              variants={subscriptionVariants}
            >
              <SubscriptionLabel variants={itemVariants}>{sub.label}</SubscriptionLabel>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                }}
              >
                <SubValue style={{ fontWeight: 'lighter' }} variants={itemVariants}>Action</SubValue>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Toggle 
                    checked={sub.checked} 
                    onChange={() => {
                      const newSubscriptions = [...subscriptions];
                      newSubscriptions[index].checked = !newSubscriptions[index].checked;
                      setSubscriptions(newSubscriptions);
                    }} 
                  />
                </motion.div>
              </div>
            </SubscriptionItem>
          ))}
        </div>
      </Column>
    </OverviewContainer>
  );
};

export default VehicleFinanceOverview;

import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../../data/components/data.json';

const PredictiveContainer = styled(motion.div)`
   background-color: rgba(5, 2, 10, 0.7);
  color: #ffffff;
  padding: 1.25rem;
  border-radius: 0.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  width: 48rem;
  margin: 0;
  height: 26rem;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h3)`
   font-size: 0.7rem;
   width:20rem;
  color: #f4eeeeff;
  font-weight: bold;
`;

const SubTitle = styled(motion.p)`
   font-size: 0.65rem;
  color: #f1ececff;
  margin: 0.15rem 0 0 0;
  font-weight: 600;
`;

const Button = styled(motion.button)`
  background-color: #333;
  color: #aaa;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: not-allowed;
  width: 100%;
  max-width: 128px;
  margin: 0;
  text-align: left;
  opacity: 0.7;
  
  &:hover {
    background-color: #333;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #333;
  }

  &:disabled:hover {
    background-color: #333;
  }
`;

const ExpandableItem = styled(motion.div)`
  margin: 0.5rem 0;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  line-height: 1.3;
`;

const ExpandIcon = styled(motion.span)`
  display: inline-block;
  margin-right: 0.75rem;
  color: white;
  font-size: 0.8rem;
`;

const ExpandContent = styled(motion.div)`
  margin-left: 1rem;
  margin-top: 0.4rem;
  font-size: 0.7rem;
  color: white;
`;



const PredictiveFinance = () => {
  const [expanded, setExpanded] = React.useState(false);

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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.3 }
    },
    hover: { scale: 1.05, backgroundColor: '#555' },
    tap: { scale: 0.95 }
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <PredictiveContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ border: '2px solid #FACC15' }}
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '0rem 1rem', borderRadius: '0.75rem', flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <motion.div variants={itemVariants}>
        <SectionTitle variants={itemVariants}>Coverage Breakdown</SectionTitle>
        
        <SubTitle variants={itemVariants} style={{ margin: '1rem 0 1rem 0', fontWeight: '500' }}>You saved $42 this month.</SubTitle>
        
        <Button 
          variants={buttonVariants}
          disabled
        >
          Add to green savings
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
        <SubTitle variants={itemVariants} style={{ margin: '0 0 1rem 0', fontWeight: '400' }}>
          Your charging costs will increase next week.
        </SubTitle>
        
        <Button style={{width:"42%"}}
          variants={buttonVariants}
          disabled
        >
          Adjust budget
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
        <SectionTitle variants={itemVariants} style={{ marginBottom: '0.7rem' }}>General</SectionTitle>
        
        <ExpandableItem 
          onClick={toggleExpand}
          variants={itemVariants}
        >
          <ExpandIcon
            initial={{ rotate: 0 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: '0rem', fontSize: '0.6rem' }}
          >
            ▶
          </ExpandIcon>
          <motion.span variants={itemVariants} style={{ fontSize: '0.8rem', fontWeight: '200', lineHeight: '1.2' }}>You're on track to save for your next EV upgrade.</motion.span>
          
          <AnimatePresence>
            {expanded && (
              <ExpandContent
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={expandVariants}
              >
                Based on your current savings rate of $42/month, you'll reach your goal of $5,000 in approximately 10 months.
              </ExpandContent>
            )}
          </AnimatePresence>
        </ExpandableItem>
      </motion.div>
      
      </div>
    </PredictiveContainer>
  );
};

export default PredictiveFinance;

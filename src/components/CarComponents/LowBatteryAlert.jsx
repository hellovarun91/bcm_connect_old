import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const AlertContainer = styled(motion.div)`
  background-color: #61040299;
  color: #ffffff;
  padding: 0.75rem;
  width: 14rem;
  max-width: 90%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
`;

const IconContainer = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border: 0.0625rem solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const ExclamationMark = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExclamationLine = styled.div`
  width: 0.125rem;
  height: 0.875rem;
  background-color: white;
  border-radius: 0.0625rem;
`;

const ExclamationDot = styled.div`
  width: 0.1875rem;
  height: 0.1875rem;
  background-color: white;
  border-radius: 50%;
  margin-top: 0.1875rem;
`;

const Title = styled.h2`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.375rem 0;
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  margin: 0 0 0.5rem 0;
  font-weight: 400;
  width: 90%;
`;

const TimeRemainingBadge = styled.div`
  background-color: #c13030;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
  width: fit-content;
`;



const LowBatteryAlert = ({ distance = 10, timeRemaining = 30 }) => {
  return (
    <AnimatePresence>
      <AlertContainer
      style={{ height: '9rem' }}
        initial={{ opacity: 0, y: 70, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 22,
          duration: 0.8
        }}
      >
        <IconContainer
          as={motion.div}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ExclamationMark
            animate={{
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 0.8,
              repeat: 3,
              repeatDelay: 3.5,
              ease: "easeInOut"
            }}
          >
            <ExclamationLine
              as={motion.div}
              initial={{ height: 0 }}
              animate={{ height: '0.875rem' }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <ExclamationDot
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1]
              }}
              transition={{
                delay: 0.9,
                duration: 1.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </ExclamationMark>
        </IconContainer>

        <Title
          as={motion.h2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          You have been running on low charge.
        </Title>

        <Subtitle style={{ width: '90%' ,fontSize: '0.6rem',fontWeight: 200}}
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Nearest charging station is 10 miles away.
        </Subtitle>

        <TimeRemainingBadge
          style={{ width: '20%' ,fontSize: '0.5rem',fontWeight: 200}}
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          30 min left
        </TimeRemainingBadge>
      </AlertContainer>
    </AnimatePresence>
  );
};

export default LowBatteryAlert;
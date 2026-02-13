import React from 'react';
import { motion } from 'framer-motion';
import data from './data.json';
import Frame from '../commons/Frame';

const Rewards = () => {
  // Get data from data.json
  const rewardsData = data.Rewards;
  
  return (
    <Frame
      typographyPreset="medium"
      title={rewardsData.title}
      description={""}
      details={[]}
      keyPoints={[]}
      rows={(rewardsData.details || []).map((d) => [
        {
          label: d.label,
          value: d.value,
        },
      ])}
      titleStyle={{ color: '#FFE600', fontFamily: 'Interstate', fontWeight: 700 }}
      rowLabelStyle={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, fontFamily: 'Interstate' }}
      rowValueStyle={{ color: '#ffffff', fontWeight: 400, fontFamily: 'Interstate' }}
      boldValues={false}
      width="28rem"
      padding="5rem 2.5rem 2.5rem 2.5rem"
      marginTop="2rem"
      height="24rem"
      overlayTop="49%"
      overlayLeft="49.5%"
      blackBandWidth="95.7%"
      blackBandHeight="67.5%"
      overlayBorderRadius="2rem"
      showButton={false}
    >
      
    </Frame>
  );
};

export default Rewards;
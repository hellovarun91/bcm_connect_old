import React from 'react';
import shoppingData from '../data.json';
import SmallFrame from '../../commons/SmallFrame';
import Frame from '../../commons/Frame';

const SmartBankSuggestion = () => {
  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.SmartBankSuggestion.title}
      keyPoints={shoppingData.SmartBankSuggestion.keyPoints}
      width="22rem"
      height="14rem"
      overlayTop="49%"
      overlayLeft="49.8%"
      overlayWidth="95.8%"
      overlayHeight="90.5%"
      overlayZIndex={-10}
      overlayBorderRadius="1.5rem"
      contentInset="1.25rem"
      boldValues={false}
    />
  );
};

export default SmartBankSuggestion;
import React from 'react';
import shoppingData from '../data.json';
import SmallFrame from '../../commons/SmallFrame';
import Frame from '../../commons/Frame';

const InventoryAndDelivery = () => {
  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.InventoryAndDelivery.title}
      description={shoppingData.InventoryAndDelivery.description}
      details={shoppingData.InventoryAndDelivery.details}
      keyPoints={shoppingData.InventoryAndDelivery.keyPoints}
      width="22rem"
      height="14rem"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayWidth="95.3%"
      overlayHeight="91.5%"
      overlayZIndex={-10}
      overlayBorderRadius="1.3rem"
      contentInset="1.25rem"
      boldValues={false}
    />
  );
};

export default InventoryAndDelivery;

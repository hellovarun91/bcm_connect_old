import React from "react";
import data from "./data.json";
import Frame from "../commons/Frame";
import { useState } from "react";
import DetailedModal from "../DetailedModal.jsx";

const LoyaltyRewards = () => {
  // Transform arrays to rows format (each item becomes a row)
  const rows = data.LoyaltyRewards.arrays ? 
    data.LoyaltyRewards.arrays.map(item => [
      {
        ...item,
        // Right-align the specific row value and set font size
        valueStyle: item.label === "Bank-linked reward boost" 
          ? { textAlign: 'right', fontSize: '0.875rem', fontWeight: 700 } 
          : { fontSize: '0.875rem', fontWeight: 700 }
      }
    ]) : 
    [];
    
  return (
    <Frame
      typographyPreset="medium"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      width="30rem"
      height="18rem"
      padding="2rem"
      title={data.LoyaltyRewards.title}
      description={data.LoyaltyRewards.description}
      rows={rows}
      showRowDividers={false}
      keyPointsTitleStyle={{ fontWeight: 'lighter' }}
      rowContainerStyle={{ marginBottom: 0 }}
      showButton={false}
      noBackground={true}
    />
  );
};

export default LoyaltyRewards;

import React from "react";
import Frame from "../commons/Frame";
import data from "./data.json";

const CostAndBillingComponent = () => {
  // Add arrow symbols to keyPoints if they don't already have them and make them bold
  const rawKeyPoints = data.costAndBilling.keyPoints || [];
  const titleText = data.costAndBilling.keyPointsTitle;
  const filteredKeyPoints = titleText ? rawKeyPoints.filter((p) => p !== titleText) : rawKeyPoints;
  const formattedKeyPoints = filteredKeyPoints.map(point => ({
    text: point.startsWith("►") ? point : `► ${point}`,
    style: { fontWeight: 700 } // Make key points bold
  }));
  

    
  return (
    <Frame
      typographyPreset="medium"
      width="28rem"
      height="18rem"
      padding="2rem"
      overlayTop="49.2%"
      blackBandWidth="96%"
      blackBandHeight="90%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      title={data.costAndBilling.title}
      description={data.costAndBilling.description}
      keyPointsTitle={data.costAndBilling.keyPointsTitle}
      keyPointsTitleStyle={{ fontWeight: 'lighter' }}
      keyPoints={formattedKeyPoints}
      rowContainerStyle={{ marginBottom: 0 }}
      showButton={false}
      noBackground={true}
    />
  );
};

export default CostAndBillingComponent;

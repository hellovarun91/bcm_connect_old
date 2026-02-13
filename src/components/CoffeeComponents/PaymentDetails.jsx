import React from "react";
import Frame from "../commons/Frame";
import data from "./data.json";

const PaymentDetails = () => {
  // Add arrow symbols to keyPoints if they don't already have them
  const formattedKeyPoints = data.PaymentDetails.keyPoints ? 
    data.PaymentDetails.keyPoints.map(point => 
      point.startsWith("►") ? point : `► ${point}`
    ) : [];
  
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
      title={data.PaymentDetails.title}
      description={data.PaymentDetails.description}
      keyPoints={formattedKeyPoints}
      rowContainerStyle={{ marginBottom: '0rem' }}
      showButton={false}
      noBackground={true}
      keyPointStyle={{ fontWeight: 700 }}
    />
  );
};

export default PaymentDetails;

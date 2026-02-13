import React from "react";
import Frame from "../commons/Frame";
import data from "./data.json";

const VisitHistory = () => {
  // Add arrow symbols to keyPoints if they don't already have them
  const formattedKeyPoints = data.VisitHistory.keyPoints ? 
    data.VisitHistory.keyPoints.map(point => 
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
      title={data.VisitHistory.title}
      description={data.VisitHistory.description}
      keyPoints={formattedKeyPoints}
      rowContainerStyle={{ marginBottom: '0rem' }}
      buttonStyle={{ 
        marginTop: "3rem",
        color:"#b3adadff"
      }}
      showButton={true}
      buttonText="See order breakdown"
      noBackground={true}
      buttonDisabled={true}
      keyPointStyle={{ fontWeight: 700 }}
    />
  );
};

export default VisitHistory;

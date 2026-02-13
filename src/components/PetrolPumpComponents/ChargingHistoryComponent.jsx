import React from "react";
import Frame from "../commons/Frame";
import data from "./data.json";

const ChargingHistoryComponent = () => {
  // Add arrow symbols to keyPoints if they don't already have them
  const formattedKeyPoints = data.chargingHistory.keyPoints ? 
    data.chargingHistory.keyPoints.map(point => ({
      text: point.startsWith("►") ? point : `► ${point}`,
      style: { fontWeight: 700 }
    })) : [];
    
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
      title={data.chargingHistory.title}
      description={data.chargingHistory.description}
      keyPoints={formattedKeyPoints}
      rowContainerStyle={{ marginBottom: '0rem' }}
      buttonText="View location & pricing details"
      showButton={false}
      buttonStyle={{
        color:"#b3adadff",
        marginTop: "2rem"
      }}
      buttonDisabled={true}
      noBackground={true}
    />
  );
};

export default ChargingHistoryComponent;

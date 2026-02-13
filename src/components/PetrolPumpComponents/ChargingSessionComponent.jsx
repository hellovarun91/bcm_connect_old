import React from "react";
import data from "./data.json";
import Frame from "../commons/Frame";
import { motion } from "framer-motion";
// Use public path for assets to ensure they're found in all environments
const chargingSessionIcon = "/assets/icons/charging-session.svg";

const ChargingSessionComponent = () => {
  // Transform arrays to rows format (each item becomes a row)
  const rows = data.chargingSession.arrays ? 
    data.chargingSession.arrays.map(item => [
      {
        ...item,
        valueStyle: {
          fontSize: '0.875rem',
          fontWeight: (item.label === "Current Speed" || 
                     item.label === "Time Remaining" || 
                     item.label === "Session Cost So Far") ? 600 : 400
        }
      }
    ]) : 
    [];
    
  return (
    <>
    <div style={{ position: "relative" }}>
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
        title={data.chargingSession.title}
        description={data.chargingSession.description}
        rows={rows}
        rowContainerStyle={{ marginBottom: 0 }}
        showButton={false}
        noBackground={true}
      />
      <motion.img 
        src={chargingSessionIcon} 
        alt="Charging Session" 
        style={{ 
          position: "absolute", 
          top: "13rem", 
          right: "4rem", 
          width: "22rem", 
          zIndex: 10 
        }}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: "easeOut"
        }}
      />
    </div>
    </>
    
  );
};

export default ChargingSessionComponent;

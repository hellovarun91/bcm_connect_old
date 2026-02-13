import React from "react";
import Frame from "../commons/Frame";
import data from "./data.json";
import { motion } from "framer-motion";
// Use public path for assets to ensure they're found in all environments
const carbonImpactIcon = "/assets/icons/esg-carbonImpact.svg";
// Use the correct path for Vector.svg
const vectorIcon = "/assets/Vector.svg";

const ESGImpactComponent = () => {
  // Create custom rows with icon for Green Score
  const rows = data.esgImpact.flowSteps ? 
    data.esgImpact.flowSteps.map(step => {
      if (step.label === "Charging Green Score") {
        return [{
          label: step.label,
          value: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={vectorIcon} 
                alt="Green Score" 
                style={{ 
                  height: '24px', 
                  width: '24px',  
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  marginRight: '6px'
                }} 
              />
              <span style={{ verticalAlign: 'middle', fontSize: '0.875rem'}}>{step.type}</span>
            </div>
          )
        }];
      }
      return [{ 
        label: step.label, 
        value: step.type,
        valueStyle: { fontSize: '0.875rem', fontWeight: 700 } // Bold weight for value
      }];
    }) : [];
    
  return (
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
        title={data.esgImpact.title}
        description={data.esgImpact.description}
        rows={rows}
        rowLabelStyle={{ fontWeight: 200 }} // Normal weight for labels
        rowContainerStyle={{ marginBottom: 0 }}
        showButton={false}
        buttonText="View Details"
        noBackground={false}
      />
      <motion.img 
        src={carbonImpactIcon} 
        alt="Carbon Impact" 
        style={{ 
          position: "absolute", 
          top: "12rem", 
          right: "5rem", 
          width: "19rem", 
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
  );
};

export default ESGImpactComponent;

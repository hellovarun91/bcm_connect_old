import React from "react";
import data from "./data.json";
import Frame from "../commons/Frame";
import { motion } from "framer-motion";
import coffeeIcon from "../../assets/coffee.png";
// Use public path for assets to ensure they're found in all environments
const starbucksIcon = "/assets/starbucks.png";

const OrderSummary = ({ onButtonClick }) => {
  // Transform arrays to rows format (each item becomes a row)
  const rows = data.OrderSummary.arrays ? 
    data.OrderSummary.arrays.map(item => [
      {
        ...item,
        valueStyle: { fontSize: '0.875rem', fontWeight: 700 }
      }
    ]) : 
    [];
  
  // Custom row style to add more space between key and value
  const customRowStyle = {
    fontSize: '0.875rem',
  };
    
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
          title={data.OrderSummary.title}
          description={data.OrderSummary.description}
          rows={rows}
          showRowDividers={false}
          rowContainerStyle={{ marginBottom: '0rem' }}
          titleStyle={{ margin: '-0.4rem 0 0.5rem 0' }}
          showButton={true}
          buttonText="Ready for pickup"
          noBackground={true}
          onButtonClick={onButtonClick}
          buttonStyle={{
            borderRadius: '0.3rem',
            fontSize: '0.8rem',
            zIndex:"100",
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #e0e0e0',
            position: 'relative',
            top: '0.4rem',
            '&:hover': {
              backgroundColor: '#f0f0f0'
            }
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '0.25rem' }}>
            <img src={starbucksIcon} alt="" style={{ height: '1.2rem', objectFit: 'contain' }} />
          </div>
          
          {/* Coffee icon in white circle */}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'flex-start', 
            marginTop: '-1.5rem',
            marginBottom: '0.5rem',
          }}>
            <div style={{
              height:'100%',
    
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem'
            }}>
              <img 
                src={coffeeIcon} 
                alt="Coffee" 
                style={{ 

                  width: '2rem', 
                  height: '2rem', 
                  objectFit: 'contain' ,
                  transform: 'translateY(-0.2rem)',
                }} 
              />
            </div>
          </div>
        </Frame>
      
  );
};

export default OrderSummary;

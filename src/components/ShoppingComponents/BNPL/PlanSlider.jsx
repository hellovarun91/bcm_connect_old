import React, { useState } from 'react';
import { motion } from 'framer-motion';
import shoppingData from '../data.json';
import Frame from '../../commons/Frame';

const PlanSlider = ({ onProceed }) => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to 12 months (index 1)
  const sliderData = shoppingData.PlanSelectorSlider.slider;

  // Calculate dynamic monthly payment based on total amount and months
  const totalAmount = 2120; // From price breakdown
  const calculateMonthlyPayment = (months) => {
    const basePayment = totalAmount / months;
    const interestRate = months <= 6 ? 0.05 : months <= 12 ? 0.03 : months <= 18 ? 0.02 : 0.015;
    const withInterest = basePayment * (1 + interestRate);
    return Math.round(withInterest);
  };

  const handleSliderChange = (event) => {
    setSelectedPlan(parseInt(event.target.value));
  };

  const currentPlan = sliderData[selectedPlan];
  const months = parseInt(currentPlan.label.split(' ')[0]);
  const dynamicPayment = calculateMonthlyPayment(months);

  return (
    <Frame
      typographyPreset="medium"
      title={shoppingData.PlanSelectorSlider.title}
      description={shoppingData.PlanSelectorSlider.description}
      width="30rem"
      height="18rem"
      blackBandWidth="94%"
      blackBandHeight="95%"
      overlayTop="49%"
      overlayLeft="49.5%"
      overlayBorderRadius="2rem"
      padding="2rem"
      titleStyle={{ marginBottom: '0.45rem', marginTop: '0.2rem' }}
      descriptionStyle={{ fontWeight: "lighter", marginBottom: '0.6rem' }}
      rowContainerStyle={{ marginBottom: '0rem' }}
      noBackground={true}
    >
      {/* Slider Container */}
      <div style={{
        marginTop: '0.2rem',
        display: 'flex',
        flexDirection: 'column',
      
      }}>
        {/* React Range Slider */}
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="range"
            min="0"
            max={sliderData.length - 1}
            value={selectedPlan}
            onChange={handleSliderChange}
            style={{
              height: '0.4rem',
              borderRadius: '0.25rem',
              background: `linear-gradient(to right, #ffffff 0%, #ffffff ${(selectedPlan / (sliderData.length - 1)) * 100}%, rgba(255, 255, 255, 0.3) ${(selectedPlan / (sliderData.length - 1)) * 100}%, rgba(255, 255, 255, 0.3) 100%)`,
              outline: 'none',
              cursor: 'pointer',
              WebkitAppearance: 'none',
              MozAppearance: 'none'
            }}
          />
          
          {/* Custom slider thumb styling */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #2d3748;
              cursor: pointer;
              border: 3px solid #ffffff;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #2d3748;
              cursor: pointer;
              border: 3px solid #ffffff;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
          `}</style>
          
          {/* Centered Slider Label */}
          <div style={{
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '0.75rem',
              color: '#ffffff',
              fontWeight: 500
            }}>
              {currentPlan.label}
            </div>
          </div>
        </div>

        {/* Payment Display - Left Aligned and Moved Up */}
        <div style={{
          textAlign: 'left',
          marginTop: '-0.25rem'
        }}>
          <div style={{
            fontSize: '1rem',
            color: '#ffffff',
            fontWeight: 700
          }}>
            ${dynamicPayment}/month
          </div>
        </div>
      </div>
      
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onProceed?.();
          }}
          style={{
            position: 'absolute',
            backgroundColor: '#ffffff',
            color: '#272727',
            padding: '0.2rem 0.4rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            zIndex: 2000,
            pointerEvents: 'auto',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginTop: "5rem"
          }}
          whileHover={{
            scale: 1.02,
            backgroundColor: '#f0f0f0'
          }}
          whileTap={{ scale: 0.98 }}
        >
          Select & Proceed
        </motion.button>
    
    </Frame>
  );
};

export default PlanSlider;
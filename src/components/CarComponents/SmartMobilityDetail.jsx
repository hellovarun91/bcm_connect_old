import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ObjectDetailPage.css';
import DrivingInsights from './DrivingInsights';
import EcoRewards from './EcoRewards';
import PredictiveFinance from './PredictiveFinance';
import VehicleFinanceOverview from './VehicleFinanceOverview';
import VehicleInsurance from './VehicleInsurance';
import SinglePlayGif from '../commons/SinglePlayGif';
import carGif from '../../data/animations/CAR__ICON.gif';
import carStatic from '../../data/animations/static/CAR__ICON-static.png';
import { sendLargeScreenRoute } from '../../services/largeScreenNav';
import useTuioRotation from '../../hooks/useTuioRotation';
import { TUIO_CONFIG } from '../../config/tuio';

const SmartMobilityDetail = ({ object, onOptionSelect, defaultShowOptions = true, onClose, onIconClick, isActive = true, disableIconClick = false }) => {
  // Animation controls
  const [showOptions, setShowOptions] = useState(defaultShowOptions);
  const [iconRotation, setIconRotation] = useState(180);
  const [hoveredOptionLabel, setHoveredOptionLabel] = useState(null);
  const [selectedOptionLabel, setSelectedOptionLabel] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const isInitializedRef = useRef(false);

  // TUIO rotation tracking — physical tags (simulator: 2, InteractiveScape: 23)
  const { isObjectPresent: tuioPresent, angle: tuioAngle } = useTuioRotation({
    triggerTagIds: TUIO_CONFIG.SMART_MOBILITY_TAG_IDS,
  });

  // Map TUIO rotation angle to highlighted option AND auto-select after dwell
  const options = object?.options || [];
  const tuioSelectTimerRef = useRef(null);

  useEffect(() => {
    if (!tuioPresent || !showOptions || options.length === 0) return;
    // Map 0–2π to option index
    const normalizedAngle = ((tuioAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const segmentSize = (2 * Math.PI) / options.length;
    const idx = Math.floor(normalizedAngle / segmentSize);
    const label = options[Math.min(idx, options.length - 1)]?.label;
    if (label && label !== hoveredOptionLabel) {
      setHoveredOptionLabel(label);

      // Auto-select badge after 500ms dwell on the same option
      if (tuioSelectTimerRef.current) clearTimeout(tuioSelectTimerRef.current);
      tuioSelectTimerRef.current = setTimeout(() => {
        console.log(`[TUIO] Auto-selecting badge: ${label}`);
        handleOptionClick(label);
      }, 500);
    }
  }, [tuioPresent, tuioAngle, showOptions, options, hoveredOptionLabel]);

  // Cleanup dwell timer
  useEffect(() => {
    return () => {
      if (tuioSelectTimerRef.current) clearTimeout(tuioSelectTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // Ensure proper initialization on mount
    if (!isInitializedRef.current) {
      setShowOptions(defaultShowOptions);
      isInitializedRef.current = true;
    } else {
      setShowOptions(defaultShowOptions);
      
      // Reset active component when menu closes
      if (!defaultShowOptions) {
        setActiveComponent(null);
        setSelectedOptionLabel(null);
      }
    }
  }, [defaultShowOptions]);

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (disableIconClick) return;
    
    // Navigate large screen to page5
    sendLargeScreenRoute('/largePages/page5', { source: 'smart-mobility-icon' });
    
    // Always trigger parent handler if provided
    // Parent will control menu state and handle click counting
    if (onIconClick) {
      onIconClick();
      return;
    }
    
    // If no parent handler, do nothing
    return;
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleOptionClick = (optionLabel) => {
    if (disableIconClick) return;
    setSelectedOptionLabel(optionLabel);

    switch(optionLabel) {
      case 'Driving Insights':
        setActiveComponent('DrivingInsights');
        break;
      case 'Vehicle Finance Overview':
        setActiveComponent('VehicleFinanceOverview');
        break;
      case 'Eco Rewards Dashboard':
        setActiveComponent('EcoRewards');
        break;
      case 'Predictive Finance AI':
        setActiveComponent('PredictiveFinance');
        break;
      case 'Vehicle Insurance':
        setActiveComponent('VehicleInsurance');
        break;
      default:
        setActiveComponent(null);
    }

    if (onOptionSelect) {
      onOptionSelect(object.id, { label: optionLabel });
    }

    // NOTE: intentionally DO NOT call setShowOptions(false) here so the car + badges remain visible
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: 'easeOut'
      }
    })
  };

  // Column animation variants — simple fade for the active component panel
  const columnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const renderActiveComponent = () => {
    switch(activeComponent) {
      case 'DrivingInsights':
        return <DrivingInsights />;
      case 'VehicleFinanceOverview':
        return <VehicleFinanceOverview />;
      case 'EcoRewards':
        return <EcoRewards />;
      case 'PredictiveFinance':
        return <PredictiveFinance />;
      case 'VehicleInsurance':
        return <VehicleInsurance />;
      default:
        return null;
    }
  };

  if (!object) return null;

  return (
    <div
      className="object-detail-container smartmobility-object-detail-container"
      style={{
        left: '59.5%',
        top: '82%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        width: '100%',
        height: '80%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      onClick={handleContainerClick}
    >
   

      {/* CAR ICON */}
      <div className="object-detail-wrapper" style={{
        position: 'relative',
        width: 'auto',
        height: 'auto',
        flex: '0 0 auto',
        marginLeft: '4.4%'
      }}>
        <div
          className={`object-detail-icon smartmobility-object-detail-icon`}
          onClick={handleIconClick}
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) rotate(${iconRotation}deg)`,
            transition: 'transform 0.3s ease',
            zIndex: 40, // raised so icon stays above the active panel
            width: '10rem', // Increased to match the image width
            height: '10rem', // Set equal to width to maintain aspect ratio
            cursor: disableIconClick ? 'not-allowed' : 'pointer',
            pointerEvents: disableIconClick ? 'none' : 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
      <SinglePlayGif
        src={carGif}
        staticSrc={carStatic}
        alt="Car Icon"
        duration={2500}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: isActive ? 1 : 0.6,
          filter: isActive 
            ? 'brightness(1.15) drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 12px rgba(255,255,255,0.5))' 
            : 'brightness(0.85) saturate(0.9) drop-shadow(0 0 4px rgba(255,255,255,0.25))'
        }}
      />
        </div>

        {/* OPTIONS CIRCLE */}
        {showOptions && object.options && object.options.length > 0 && (
          <div
            className={`object-detail-options-circle visible`}
            style={{ zIndex: 35 }} // make sure badges appear above the active panel
          >
            {object.options.map((option, index) => {
              const total = object.options.length;
              const angle = -90 + (index / (total - 1)) * 180;
              const radius = 210; // Increased from 150 to 180
              const x = Math.cos((angle * Math.PI) / 210) * radius;
              const y = Math.sin((angle * Math.PI) / 210) * radius;

              const isSelected = selectedOptionLabel === option.label;
              const isHovered = hoveredOptionLabel === option.label;

              return (
                <div
                  key={index}
                  className="object-detail-option-badge"
                  style={{
                    height: '94px', // Increased from 70px to 85px// Increased from 70px to 85px
                    width: '90px', // Increased from 70px to 85px// Increased from 70px to 85px
                    borderRadius: '50%',
                    aspectRatio: '1 / 1', // Force perfect circle
                    transform: `translateX(${x}px) translateY(${y}px) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
                    background: (isHovered || isSelected)
                      ? 'rgba(234, 179, 8, 0.35)'
                      : 'rgba(120, 120, 120, 0.7)',
                    borderColor: (isHovered || isSelected)
                      ? '#FDE047'
                      : 'rgba(250, 204, 21, 0.5)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    transition: 'all 0.3s ease',
                    cursor: disableIconClick ? 'not-allowed' : 'pointer',
                    pointerEvents: disableIconClick ? 'none' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => handleOptionClick(option.label)}
                  onMouseEnter={() => setHoveredOptionLabel(option.label)}
                  onMouseLeave={() => setHoveredOptionLabel(null)}
                >
                  <div className="object-detail-option-content" style={{ 
                    width: '100%', 
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem'
                  }}>
                    <motion.span
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      variants={textVariants}
                      className="object-detail-option-label"
                      style={{
                        color: '#fff',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        hyphens: 'auto'
                      }}
                    >
                      {option.label}
                    </motion.span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ACTIVE COMPONENT PANEL */}
      <AnimatePresence>
        {activeComponent && (
          <motion.div
            className="active-component-container"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={columnVariants}
            style={{
              maxHeight: '80vh',
              zIndex: 30,
              overflow: 'hidden',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
            {renderActiveComponent()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartMobilityDetail;

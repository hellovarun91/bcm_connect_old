// src/components/ObjectDetailView.jsx
import { useState, useContext } from 'react';
import '../styles/CategoryPage.css';
import PetrolPumpDetails from './PetrolPumpComponents/PetrolPumpDetails';
import CoffeeDetails from './CoffeeComponents/CoffeeDetails';
import PPDetails from './ShoppingComponents/ProductandPriceOverview/PPDetails';
import HealthCareDetails from './HealthCareComponents/HealthCareDetails';
import { playFrameSound } from '../utils/soundUtils';
import { GlowEffectContext } from '../context/GlowEffectContext';
import SinglePlayGif from './commons/SinglePlayGif';
import coffeeGif from '../data/animations/Coffee_ICON.gif';
import petrolGif from '../data/animations/Petrol_ICON.gif';
import healthCareGif from '../data/animations/HealthCareICON.gif';
import shoppingGif from '../data/animations/Shopping_ICON 2026.gif';
import coffeeStatic from '../data/animations/static/Coffee_ICON-static.png';
import petrolStatic from '../data/animations/static/Petrol_ICON-static.png';
import healthCareStatic from '../data/animations/static/HealthCareICON-static.png';
import shoppingStatic from '../data/animations/static/Shopping_ICON 2026-static.png';

// animation style omitted for brevity — keep as you had it
const popUpAnimation = {
  animation: 'popUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
  transform: 'scale(0)',
};
const animationStyle = `
@keyframes popUp {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
`;

const ObjectDetailView = ({
  object,
  onNext,
  onOptionSelect,
  onIconClick,
  isActive = true,
  isUnlocked = true,
  disableIconClick = false,
  shouldBlink = false,
  containerClassName,
  containerStyle,
  iconClassName,
  x = '50%',
  y = '60%',
  showNextButton = true,
  // NEW props from parent:
  activePopupId,
  setActivePopupId,
  // Add pageType prop to differentiate between pages
  pageType = 'default',
  // Add yOffset to adjust vertical position
  yOffset = 0,
  // Add prop for petrol pump glow effect
  propPetrolPumpGlow = false,
  iconSize,
  cartIconSize
}) => {
  // keep icon rotation local if you want
  const [iconRotation, setIconRotation] = useState(0);
  const { 
    coffeeGlow, 
    shoppingCartGlow, 
    healthcareGlow, 
    petrolPumpGlow,
    turnOffGlowByIcon 
  } = useContext(GlowEffectContext);

  if (!object) return null;

  // determine if this object's popup should be open
  const isOpen = activePopupId === object.id;

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (disableIconClick) return;
    if (!isUnlocked) return;
    setIconRotation(prev => prev + 90);
    
    // Log object data when icon is clicked
    console.log('Icon clicked - Object data:', object);
    console.log('Icon type:', object.icon);
    console.log('Is active:', isActive);

    // Turn off pulse glow effect when object is clicked
    turnOffGlowByIcon(object.icon);

    if (onIconClick) {
      onIconClick(object);
      return;
    }
    
    // toggle: if already open close it, otherwise set this id as active
    if (activePopupId === object.id) {
      setActivePopupId(null);
    } else {
      // Play frame sound when opening any popup content
      // No need for button sound here, just frame sound
      playFrameSound(() => {
        setActivePopupId(object.id);
      });
    }
  };

  const renderPopupContent = () => {
    const baseStyle = {
      width: '37.5rem',
      height: '18.75rem',
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };

    switch (object.icon) {
      case 'coffee':
        return (
          <div style={{
            ...baseStyle,
            zIndex: 50
          }}>
            <div style={{ overflow: 'auto', borderRadius: '8px', ...popUpAnimation }}>
              <CoffeeDetails />
            </div>
          </div>
        );

      case 'gas':
        return (
          <div style={{
            ...baseStyle,
            zIndex: 50
          }}>
            <div style={{ overflow: 'auto', borderRadius: '8px', ...popUpAnimation }}>
              <PetrolPumpDetails />
            </div>
          </div>
        );
        
      case 'cart':
        return (
          <div style={{
            ...baseStyle,
            zIndex: 50
          }}>
            <div style={{ overflow: 'auto', borderRadius: '8px', ...popUpAnimation }}>
              <PPDetails animationCompleted={true} />
            </div>
          </div>
        );
        
      case 'Hospital':
        return (
          <div style={{
            position: 'fixed',
            overflow: 'visible',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            ...popUpAnimation,
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <HealthCareDetails />
          </div>
        );

      default:
        return <img src="/statics/last.svg" alt="Final" style={baseStyle} />;
    }
  };

  return (
    <>
      <style>{animationStyle}</style>

      <div
        className={`object-detail-container${containerClassName ? ` ${containerClassName}` : ''}`}
        style={{
          left:
            object.icon === 'coffee'
              ? '48%'
              : object.icon === 'gas'
                ? `53%`
                : object.icon === 'Hospital'
                  ? '17%'
                  : `${object.x * 100}%`,
          top: 
            object.icon === 'coffee' 
              ? '75%' 
              : object.icon === 'Hospital'
                ? '42%'
                : `${object.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          position: 'absolute',
          width: 'auto',
          pointerEvents: 'none',
          ...(containerStyle || {})
        }}
      >
        <div className="object-detail-wrapper" style={{ pointerEvents: 'auto' }}>
          <div
            className="object-detail-icon"
            onClick={handleIconClick}
            style={{
              position: 'relative',
              left: 'auto',
              top: 'auto',
              transform: `rotate(${iconRotation}deg)`,
              transition: 'transform 0.3s ease',
              cursor: (!disableIconClick && isUnlocked) ? 'pointer' : 'not-allowed',
              pointerEvents: disableIconClick ? 'none' : 'auto',
              width:
                object.icon === 'cart'
                  ? (cartIconSize || '7rem')
                  : object.icon === 'coffee' || object.icon === 'gas' || object.icon === 'Hospital'
                    ? (iconSize || '6rem')
                    : undefined,
              height:
                object.icon === 'cart'
                  ? (cartIconSize || '7rem')
                  : object.icon === 'coffee' || object.icon === 'gas' || object.icon === 'Hospital'
                    ? (iconSize || '6rem')
                    : undefined,
            }}
          >
            {object.icon ? (
              (object.icon === 'coffee' || object.icon === 'gas' || object.icon === 'cart' || object.icon === 'Hospital') ? (
                <SinglePlayGif
                  src={
                    object.icon === 'coffee'
                      ? coffeeGif
                      : object.icon === 'gas'
                        ? petrolGif
                        : object.icon === 'cart'
                          ? shoppingGif
                          : healthCareGif
                  }
                  staticSrc={
                    object.icon === 'coffee'
                      ? coffeeStatic
                      : object.icon === 'gas'
                        ? petrolStatic
                        : object.icon === 'cart'
                          ? shoppingStatic
                          : healthCareStatic
                  }
                  alt={object.name}
                  duration={2500}
                  className={`object-detail-image${iconClassName ? ` ${iconClassName}` : ''}${shouldBlink ? ' menu-blink' : ''} ${
                    // Apply pulse-glow class based on object type and glow state
                    (object.icon === 'coffee' && coffeeGlow) ||
                    (object.icon === 'gas' && (petrolPumpGlow || propPetrolPumpGlow)) ||
                    (object.icon === 'cart' && shoppingCartGlow) ||
                    (object.icon === 'Hospital' && healthcareGlow)
                      ? 'pulse-glow'
                      : ''
                  }`}
                  style={{
                    width: '10rem',
                    objectFit: 'contain',
                    opacity: isActive ? 1 : 0.6,
                    filter:
                      isActive
                        ? 'brightness(1.15) drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 24px rgba(255,255,255,0.6))'
                        : 'brightness(0.85) saturate(0.9) drop-shadow(0 0 8px rgba(255,255,255,0.25))'
                  }}
                />
              ) : (
                <img
                  src={`/assets/icons/${object.icon}.svg`}
                  alt={object.name}
                  className={`object-detail-image${iconClassName ? ` ${iconClassName}` : ''}${shouldBlink ? ' menu-blink' : ''}`}
                  style={{
                    width: '10rem',
                    objectFit: 'contain',
                    opacity: isActive ? 1 : 0.6,
                    filter:
                      isActive
                        ? 'brightness(1.15) drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 24px rgba(255,255,255,0.6))'
                        : 'brightness(0.85) saturate(0.9) drop-shadow(0 0 8px rgba(255,255,255,0.25))'
                  }}
                />
              )
            ) : (
              <span className="object-detail-text">{object.name.charAt(0)}</span>
            )}
          </div>

          {/* Render popup only when this object's id is active */}
          {isOpen && renderPopupContent()}
        </div>
      </div>

    </>
  );
};

export default ObjectDetailView;

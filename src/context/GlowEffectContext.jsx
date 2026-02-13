// src/context/GlowEffectContext.jsx
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { sendLargeScreenRoute } from '../services/largeScreenNav';

// Define the State interface and concrete states using the State design pattern
class IconState {
  constructor(context) {
    this.context = context;
  }
  
  enter() {}
  exit() {}
  handleIconClick(icon) {}
}

class InitialState extends IconState {
  enter() {
    console.log('Entering Initial State');
    // Reset all glows
    this.context.setCoffeeGlow(false);
    this.context.setShoppingCartGlow(false);
    this.context.setHealthcareGlow(false);
    this.context.setPetrolPumpGlow(false);
    this.context.setShowLowBatteryAlert(false);
    this.context.setActiveIcon(null);
    this.context.setIsChargingUnlocked(false);
    this.context.setIsCafeUnlocked(false);
    this.context.setIsShoppingUnlocked(false);
    this.context.setIsHealthCareUnlocked(false);
  }
  
  handleIconClick(icon) {
    if (icon === 'Car') {
      console.log('Car icon clicked, transitioning to LowBatteryState');
      // Car becomes highlighted immediately on click
      this.context.setActiveIcon('car');
      // When car icon is clicked, transition to LowBatteryState after 20 seconds
      this.context.scheduleStateTransition(() => {
        this.context.transitionTo(new LowBatteryState(this.context));
      }, 20000);
    }
  }
}

class LowBatteryState extends IconState {
  enter() {
    console.log('Entering Low Battery State');
    // Reset other glows and make gas icon pulse
    this.context.setCoffeeGlow(false);
    this.context.setShoppingCartGlow(false);
    this.context.setHealthcareGlow(false);
    this.context.setShowLowBatteryAlert(true);
    this.context.setPetrolPumpGlow(true);
    this.context.schedulePulseAutoStop('gas');
    // Previous icon goes back to default dim
    this.context.setActiveIcon(null);
    this.context.setIsChargingUnlocked(true);
    this.context.setIsCafeUnlocked(false);
    this.context.setIsShoppingUnlocked(false);
    this.context.setIsHealthCareUnlocked(false);
  }
  
  handleIconClick(icon) {
    if (icon === 'gas') {
      console.log('Gas icon clicked, transitioning to CoffeeState');
      // When gas icon is clicked, keep it highlighted but stop pulsing
      this.context.setPetrolPumpGlow(false);
      this.context.setActiveIcon('gas');
      
      // Transition to CoffeeState after 20 seconds
      this.context.scheduleStateTransition(() => {
        this.context.transitionTo(new CoffeeState(this.context));
      }, 20000);
    }
  }
  
  exit() {
    // Clear low battery alert when leaving this state
    this.context.setShowLowBatteryAlert(false);
  }
}

class CoffeeState extends IconState {
  enter() {
    console.log('Entering Coffee State');
    // Reset other glows and make coffee icon pulse
    this.context.setPetrolPumpGlow(false);
    this.context.setShoppingCartGlow(false);
    this.context.setHealthcareGlow(false);
    this.context.setCoffeeGlow(true);
    this.context.schedulePulseAutoStop('coffee');
    // Previous step should go back to default dim
    this.context.setActiveIcon(null);
    this.context.setIsChargingUnlocked(false);
    this.context.setIsCafeUnlocked(true);
    this.context.setIsShoppingUnlocked(false);
    this.context.setIsHealthCareUnlocked(false);
  }
  
  handleIconClick(icon) {
    if (icon === 'coffee') {
      console.log('Coffee icon clicked, transitioning to ShoppingState');
      // When coffee icon is clicked, keep it highlighted but stop pulsing
      this.context.setCoffeeGlow(false);
      this.context.setActiveIcon('coffee');
      
      // Transition to ShoppingState after 20 seconds
      this.context.scheduleStateTransition(() => {
        this.context.transitionTo(new ShoppingState(this.context));
      }, 20000);
    }
  }
}

class ShoppingState extends IconState {
  enter() {
    console.log('Entering Shopping State');
    // Reset other glows and make shopping cart icon pulse
    this.context.setPetrolPumpGlow(false);
    this.context.setCoffeeGlow(false);
    this.context.setHealthcareGlow(false);
    this.context.setShoppingCartGlow(true);
    this.context.schedulePulseAutoStop('cart');
    // Previous step should go back to default dim
    this.context.setActiveIcon(null);
    this.context.setIsChargingUnlocked(false);
    this.context.setIsCafeUnlocked(false);
    this.context.setIsShoppingUnlocked(true);
    this.context.setIsHealthCareUnlocked(false);
  }
  
  handleIconClick(icon) {
    if (icon === 'cart') {
      console.log('Shopping icon clicked, transitioning to HealthcareState');
      // When shopping icon is clicked, keep it highlighted but stop pulsing
      this.context.setShoppingCartGlow(false);
      this.context.setActiveIcon('cart');
      
      // Transition to HealthcareState after 20 seconds
      this.context.scheduleStateTransition(() => {
        this.context.transitionTo(new HealthcareState(this.context));
      }, 20000);
    }
  }
}

class HealthcareState extends IconState {
  enter() {
    console.log('Entering Healthcare State');
    // Reset other glows and make healthcare icon pulse
    this.context.setPetrolPumpGlow(false);
    this.context.setCoffeeGlow(false);
    this.context.setShoppingCartGlow(false);
    this.context.setHealthcareGlow(true);
    this.context.schedulePulseAutoStop('Hospital');
    // Previous step should go back to default dim
    this.context.setActiveIcon(null);
    this.context.setIsChargingUnlocked(false);
    this.context.setIsCafeUnlocked(false);
    this.context.setIsShoppingUnlocked(false);
    this.context.setIsHealthCareUnlocked(true);
  }
  
  handleIconClick(icon) {
    if (icon === 'Hospital') {
      console.log('Healthcare icon clicked, completing the flow');
      // When healthcare icon is clicked, keep it highlighted but stop pulsing
      this.context.setHealthcareGlow(false);
      this.context.setActiveIcon('Hospital');
      
      // Flow is complete, can reset or stay in final state
    }
  }
}

const GlowEffectContext = createContext(null);

export const GlowEffectProvider = ({ children }) => {
  const [coffeeGlow, setCoffeeGlow] = useState(false);
  const [shoppingCartGlow, setShoppingCartGlow] = useState(false);
  const [healthcareGlow, setHealthcareGlow] = useState(false);
  const [petrolPumpGlow, setPetrolPumpGlow] = useState(false);
  const [showLowBatteryAlert, setShowLowBatteryAlert] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isChargingUnlocked, setIsChargingUnlocked] = useState(false);
  const [isCafeUnlocked, setIsCafeUnlocked] = useState(false);
  const [isShoppingUnlocked, setIsShoppingUnlocked] = useState(false);
  const [isHealthCareUnlocked, setIsHealthCareUnlocked] = useState(false);

  const pulseAutoStopTimerRef = useRef(null);
  const stateTransitionTimerRef = useRef(null);

  const clearPulseAutoStopTimer = () => {
    if (pulseAutoStopTimerRef.current) {
      clearTimeout(pulseAutoStopTimerRef.current);
      pulseAutoStopTimerRef.current = null;
    }
  };

  const clearStateTransitionTimer = () => {
    if (stateTransitionTimerRef.current) {
      clearTimeout(stateTransitionTimerRef.current);
      stateTransitionTimerRef.current = null;
    }
  };

  const scheduleStateTransition = (fn, delayMs) => {
    clearStateTransitionTimer();
    stateTransitionTimerRef.current = setTimeout(fn, delayMs);
  };

  const schedulePulseAutoStop = (icon, delayMs = null) => {
    clearPulseAutoStopTimer();
    if (delayMs == null) return;
    pulseAutoStopTimerRef.current = setTimeout(() => {
      if (icon === 'gas') setPetrolPumpGlow(false);
      if (icon === 'coffee') setCoffeeGlow(false);
      if (icon === 'cart') setShoppingCartGlow(false);
      if (icon === 'Hospital') setHealthcareGlow(false);
    }, delayMs);
  };
  
  // State pattern implementation
  const [currentState, setCurrentState] = useState(null);
  const stateRef = useRef(null);
  
  // Function to transition between states
  const transitionTo = (newState) => {
    if (stateRef.current) {
      stateRef.current.exit();
    }
    clearPulseAutoStopTimer();
    clearStateTransitionTimer();
    stateRef.current = newState;
    setCurrentState(newState);
    newState.enter();
  };
  
  // Initialize state on component mount
  useEffect(() => {
    const initialState = new InitialState({
      setCoffeeGlow,
      setShoppingCartGlow,
      setHealthcareGlow,
      setPetrolPumpGlow,
      setShowLowBatteryAlert,
      setActiveIcon,
      setIsChargingUnlocked,
      setIsCafeUnlocked,
      setIsShoppingUnlocked,
      setIsHealthCareUnlocked,
      schedulePulseAutoStop,
      scheduleStateTransition,
      transitionTo
    });
    transitionTo(initialState);
    
    return () => {
      clearPulseAutoStopTimer();
      clearStateTransitionTimer();
    };
  }, []);

  // Functions to turn off specific glow effects when objects are clicked
  const turnOffCoffeeGlow = () => setCoffeeGlow(false);
  const turnOffShoppingCartGlow = () => setShoppingCartGlow(false);
  const turnOffHealthcareGlow = () => setHealthcareGlow(false);
  const turnOffPetrolPumpGlow = () => setPetrolPumpGlow(false);

  // Function to turn off glow effect based on object icon
  const turnOffGlowByIcon = (icon) => {
    // Send navigation to large screen based on which glow is active
    if (icon === 'coffee' && coffeeGlow) {
      sendLargeScreenRoute('/largePages/page5', { source: 'coffee-glow-click' });
    } else if (icon === 'cart' && shoppingCartGlow) {
      sendLargeScreenRoute('/largePages/page6', { source: 'shopping-glow-click' });
    } else if (icon === 'Hospital' && healthcareGlow) {
      sendLargeScreenRoute('/largePages/page7', { source: 'healthcare-glow-click' });
    } else if (icon === 'gas' && petrolPumpGlow) {
      sendLargeScreenRoute('/largePages/page8', { source: 'petrol-glow-click' });
    } else {
      // Icon clicked without glow (normal click)
      sendLargeScreenRoute('/largePages/page9', { source: 'icon-click-no-glow' });
    }
    
    // Turn off the glow effect
    if (icon === 'coffee') {
      setCoffeeGlow(false);
    } else if (icon === 'cart') {
      setShoppingCartGlow(false);
    } else if (icon === 'Hospital') {
      setHealthcareGlow(false);
    } else if (icon === 'gas') {
      setPetrolPumpGlow(false);
    }
    
    // Handle state transitions when an icon is clicked
    if (stateRef.current) {
      stateRef.current.handleIconClick(icon);
    }
  };
  
  // Start the flow sequence from car icon click
  const startFlowFromCarClick = () => {
    if (stateRef.current) {
      stateRef.current.handleIconClick('Car');
    }
  };

  // Backwards-compatible alias used by some components
  const startGlowSequence = () => {
    startFlowFromCarClick();
  };

  const dismissLowBatteryAlert = () => setShowLowBatteryAlert(false);

  // Reset function to reinitialize the entire state machine
  const resetGlowEffectState = () => {
    clearPulseAutoStopTimer();
    clearStateTransitionTimer();
    
    // Reset to initial state
    const initialState = new InitialState({
      setCoffeeGlow,
      setShoppingCartGlow,
      setHealthcareGlow,
      setPetrolPumpGlow,
      setShowLowBatteryAlert,
      setActiveIcon,
      setIsChargingUnlocked,
      setIsCafeUnlocked,
      setIsShoppingUnlocked,
      setIsHealthCareUnlocked,
      schedulePulseAutoStop,
      scheduleStateTransition,
      transitionTo
    });
    transitionTo(initialState);
  };

  return (
    <GlowEffectContext.Provider
      value={{
        coffeeGlow,
        shoppingCartGlow,
        healthcareGlow,
        petrolPumpGlow,
        showLowBatteryAlert,
        activeIcon,
        isChargingUnlocked,
        isCafeUnlocked,
        isShoppingUnlocked,
        isHealthCareUnlocked,
        startGlowSequence,
        startFlowFromCarClick,
        dismissLowBatteryAlert,
        turnOffCoffeeGlow,
        turnOffShoppingCartGlow,
        turnOffHealthcareGlow,
        turnOffPetrolPumpGlow,
        turnOffGlowByIcon,
        setActiveIcon,
        resetGlowEffectState
      }}
    >
      {children}
    </GlowEffectContext.Provider>
  );
};

export const useGlowEffect = () => {
  const context = useContext(GlowEffectContext);
  if (!context) {
    throw new Error(
      "useGlowEffect must be used within GlowEffectProvider"
    );
  }
  return context;
};

export { GlowEffectContext };

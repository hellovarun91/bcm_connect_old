import React, { useEffect, useRef, useState, useContext } from 'react';
import { GlowEffectContext } from '../context/GlowEffectContext';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getAllObjects } from '../services/dataService';
import { videoPreloader, preloadAllVideos } from '../services/videoPreloader';
import SmartMobilityDetail from '../components/CarComponents/SmartMobilityDetail';
import LowBatteryAlert from '../components/CarComponents/LowBatteryAlert';
import ObjectDetailView from '../components/ObjectDetailView';
import PetrolPumpDetails from '../components/PetrolPumpComponents/PetrolPumpDetails';
import CoffeeDetails from '../components/CoffeeComponents/CoffeeDetails';
import DetailedModal from '../components/DetailedModal';
import ShoppingDetails from '../components/ShoppingComponents/ProductandPriceOverview/PPDetails';
import BNPLDetail from '../components/ShoppingComponents/BNPL/BNPLDetail';
import ProtectionDetail from '../components/ShoppingComponents/Protection/ProtectionDetail';
import HealthCareDetails from '../components/HealthCareComponents/HealthCareNewLayout';
import SummaryComponentDetail from '../components/SummaryComponents/SummaryComponentDetail';
import part1Video from '../Videos/PART-1.mp4';
import part2Video from '../Videos/PART-2.mp4';
import part3Video from '../Videos/PART-3.mp4';
import '../styles/MenuPage.css';
import topUiGif from '../data/animations/TOPUI.gif';
import carLinesGif from '../data/animations/CAR Lines-2026.gif';
import evLinesGif from '../data/animations/EV Lines-2026.gif';
import cafeLinesGif from '../data/animations/CAFE-Line-2026.gif';
import shopLinesGif from '../data/animations/SHOP-Line-2026.gif';
import hospitalLinesGif from '../data/animations/HOPSITAL-Line-2026.gif';
// import topUiAnimation from '../data/animations/TOPUI.json';
import { playButtonSound, playFrameSound } from '../utils/soundUtils';
import navigationService from '../services/NavigationService';
import SinglePlayGif from '../components/commons/SinglePlayGif';
import useTuio from '../hooks/useTuio';
import { TUIO_CONFIG } from '../config/tuio';

// GIF sources
const carLabel = '/assets/iconlabels/car-label.gif';
const coffeeLabel = '/assets/iconlabels/coffee-label.gif';
const petrolLabel = '/assets/iconlabels/newLabels/petrol-label.gif';
const shoppingLabel = '/assets/iconlabels/newLabels/shopping-label.gif';
const healthCareLabel = '/assets/iconlabels/healthcare-label.gif';

// Static PNG versions
const carLabelStatic = '/assets/iconlabels/static/car-label-static.png';
const coffeeLabelStatic = '/assets/iconlabels/static/coffee-label-static.png';
const petrolLabelStatic = '/assets/iconlabels/static/petrolLabel-static.png';
const shoppingLabelStatic = '/assets/iconlabels/static/shopping-label-static.png';
const healthCareLabelStatic = '/assets/iconlabels/static/healthcare-label-static.png';

const MenuPage = () => {
  const navigate = useNavigate();
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const userTriggeredVideoPlayRef = useRef(false);
  const carIntroTimerRef = useRef(null);
  const evIntroTimerRef = useRef(null);
  const cafeIntroTimerRef = useRef(null);
  const shopIntroTimerRef = useRef(null);
  const hospitalIntroTimerRef = useRef(null);
  const [showCarPanel] = useState(true);
  const [activeVideoKey, setActiveVideoKey] = useState('A');
  const [videoSrcA, setVideoSrcA] = useState(part1Video);
  const [videoSrcB, setVideoSrcB] = useState(part2Video);
  const [objects, setObjects] = useState([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [detailClosed, setDetailClosed] = useState(false);
  const [showDetailComponent, setShowDetailComponent] = useState(false);
  const [petrolPumpObject, setPetrolPumpObject] = useState(null);
  const [coffeeObject, setCoffeeObject] = useState(null);
  const [shoppingObject, setShoppingObject] = useState(null);
  const [healthCareObject, setHealthCareObject] = useState(null);
  const [isCoffeeUnlocked, setIsCoffeeUnlocked] = useState(false);
  const [pendingPopupObjectId, setPendingPopupObjectId] = useState(null);
  const [pendingPopupObjectIcon, setPendingPopupObjectIcon] = useState(null);
  const [hasPlayedPetrolCoffeeVideo, setHasPlayedPetrolCoffeeVideo] = useState(false);
  const [activePetrolCoffeeDetail, setActivePetrolCoffeeDetail] = useState(null);
  const [hasStartedFlow, setHasStartedFlow] = useState(false);

  const [journeyStage, setJourneyStage] = useState('car');
  const [isChargingUnlocked, setIsChargingUnlocked] = useState(false);
  const [isCafeUnlocked, setIsCafeUnlocked] = useState(false);
  const [isShoppingMode, setIsShoppingMode] = useState(false);
  
  // Get glow states from context
  const { 
    petrolPumpGlow, 
    coffeeGlow, 
    shoppingCartGlow, 
    healthcareGlow,
    showLowBatteryAlert: contextLowBatteryAlert,
    activeIcon: contextActiveIcon,
    isChargingUnlocked: contextIsChargingUnlocked,
    isCafeUnlocked: contextIsCafeUnlocked,
    isShoppingUnlocked: contextIsShoppingUnlocked,
    isHealthCareUnlocked: contextIsHealthCareUnlocked,
    startFlowFromCarClick,
    setActiveIcon: setContextActiveIcon,
    dismissLowBatteryAlert,
    turnOffGlowByIcon,
    resetGlowEffectState
  } = useContext(GlowEffectContext);

  // Context is the single source of truth for icon highlighting
  const activeIcon = contextActiveIcon;

  const [hasPlayedShoppingVideo, setHasPlayedShoppingVideo] = useState(false);
  const [isPlayingShoppingVideo, setIsPlayingShoppingVideo] = useState(false);
  
  // HealthCare states
  const [isHealthCareUnlocked, setIsHealthCareUnlocked] = useState(false);
  const [isHealthCareMode, setIsHealthCareMode] = useState(false);
  const [showHealthCareComponents, setShowHealthCareComponents] = useState(false);
  const [hasPlayedHealthCareVideo, setHasPlayedHealthCareVideo] = useState(false);
  const [isPlayingHealthCareVideo, setIsPlayingHealthCareVideo] = useState(false);

  const [shoppingActivePopupId, setShoppingActivePopupId] = useState(null);
  const [showShoppingComponents, setShowShoppingComponents] = useState(false);
  const [showBNPL, setShowBNPL] = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [showShoppingDetailedModal, setShowShoppingDetailedModal] = useState(false);
  const [shoppingModalData, setShoppingModalData] = useState(null);

  const [visitedCharging, setVisitedCharging] = useState(false);
  const [visitedCafe, setVisitedCafe] = useState(false);
  const [visitedShopping, setVisitedShopping] = useState(false);
  const [visitedHealthCare, setVisitedHealthCare] = useState(false);
  
  // Track if intro animations have been played
  const [hasPlayedCarIntro, setHasPlayedCarIntro] = useState(false);

  // Label visibility states
  const [showCarLabel, setShowCarLabel] = useState(true);
  const [showPetrolLabel, setShowPetrolLabel] = useState(true);
  const [showCoffeeLabel, setShowCoffeeLabel] = useState(true);
  const [showShoppingLabel, setShowShoppingLabel] = useState(true);
  const [showHealthCareLabel, setShowHealthCareLabel] = useState(true);
  const [showSummaryComponents, setShowSummaryComponents] = useState(false);

  // ========== NEW CLEAN IMPLEMENTATION ==========
  // Track which icons/labels are visible
  const [visibleIcons, setVisibleIcons] = useState({
    car: true,
    petrol: true,
    coffee: true,
    shopping: true,
    healthcare: true
  });
  
  // Track click count for each icon (0, 1, or 2)
  const [iconClickCounts, setIconClickCounts] = useState({
    car: 0,
    petrol: 0,
    coffee: 0,
    shopping: 0,
    healthcare: 0
  });
  
  // Track which icon is currently active (clicked once)
  const [activeFlowIcon, setActiveFlowIcon] = useState(null);
  
  // Track which icon should be enabled after timer
  const [enabledIcon, setEnabledIcon] = useState(null);
  
  // Timer reference
  const flowTimerRef = useRef(null);
  
  // Icon flow order
  const ICON_FLOW = ['car', 'petrol', 'coffee', 'shopping', 'healthcare'];
  
  // ========== END NEW IMPLEMENTATION ==========

  const [showCarIntro, setShowCarIntro] = useState(false);
  const [showEvIntro, setShowEvIntro] = useState(false);
  const [showCafeIntro, setShowCafeIntro] = useState(false);
  const [showShopIntro, setShowShopIntro] = useState(false);
  const [showHospitalIntro, setShowHospitalIntro] = useState(false);

  const closeAllPanels = () => {
    setActivePetrolCoffeeDetail(null);
    setShowDetailComponent(false);
    setShowShoppingComponents(false);
    setShowBNPL(false);
    setShowProtection(false);
    setShowShoppingDetailedModal(false);
    setShowHealthCareComponents(false);
    setShowSummaryComponents(false);
    setIsPlayingShoppingVideo(false);
    setIsPlayingHealthCareVideo(false);
  };

  // ========== NEW HELPER FUNCTIONS ==========
  
  // Clear the flow timer
  const clearFlowTimer = () => {
    if (flowTimerRef.current) {
      clearTimeout(flowTimerRef.current);
      flowTimerRef.current = null;
    }
  };
  
  // Start timer to enable next icon after 20 seconds
  const startNextIconTimer = (currentIconKey) => {
    clearFlowTimer();
    
    const currentIndex = ICON_FLOW.indexOf(currentIconKey);
    const nextIconKey = ICON_FLOW[currentIndex + 1];
    
    if (!nextIconKey) {
      console.log('No next icon - end of flow');
      return;
    }
    
    console.log(`Starting 20s timer to enable ${nextIconKey} after ${currentIconKey}`);
    
    flowTimerRef.current = setTimeout(() => {
      console.log(`20 seconds passed - enabling ${nextIconKey}`);
      setEnabledIcon(nextIconKey);
      
      // Make next icon visible
      setVisibleIcons(prev => ({ ...prev, [nextIconKey]: true }));
    }, 20000);
  };
  
  // Hide all icons and labels except the specified one
  const hideOtherIcons = (keepIconKey) => {
    const newVisibility = {
      car: false,
      petrol: false,
      coffee: false,
      shopping: false,
      healthcare: false
    };
    newVisibility[keepIconKey] = true;
    
    setVisibleIcons(newVisibility);
    
    // Hide ALL labels (including the active one)
    setShowCarLabel(false);
    setShowPetrolLabel(false);
    setShowCoffeeLabel(false);
    setShowShoppingLabel(false);
    setShowHealthCareLabel(false);
  };
  
  // Show all icons and labels
  const showAllIcons = () => {
    setVisibleIcons({
      car: true,
      petrol: true,
      coffee: true,
      shopping: true,
      healthcare: true
    });
    
    setShowCarLabel(true);
    setShowPetrolLabel(true);
    setShowCoffeeLabel(true);
    setShowShoppingLabel(true);
    setShowHealthCareLabel(true);
  };
  
  // Main click handler for all icons
  const handleIconClick = (iconKey, onFirstClick, onSecondClick) => {
    const currentClickCount = iconClickCounts[iconKey];
    
    console.log(`\n========== ${iconKey.toUpperCase()} CLICKED ==========`);
    console.log(`Current click count: ${currentClickCount}`);
    console.log(`Active flow icon: ${activeFlowIcon}`);
    console.log(`Enabled icon: ${enabledIcon}`);
    
    // Check if icon is clickable
    const isContextUnlocked = 
      (iconKey === 'car') ||
      (iconKey === 'petrol' && (contextIsChargingUnlocked || visitedCharging)) ||
      (iconKey === 'coffee' && (contextIsCafeUnlocked || visitedCafe)) ||
      (iconKey === 'shopping' && (contextIsShoppingUnlocked || visitedShopping)) ||
      (iconKey === 'healthcare' && (contextIsHealthCareUnlocked || visitedHealthCare));
    
    const isEnabledByTimer = enabledIcon === iconKey;
    
    if (!isContextUnlocked && !isEnabledByTimer) {
      console.log(`${iconKey} is locked - not clickable`);
      return;
    }
    
    // FIRST CLICK
    if (currentClickCount === 0) {
      console.log(`✓ FIRST CLICK on ${iconKey}`);
      
      // Update click count
      setIconClickCounts(prev => ({ ...prev, [iconKey]: 1 }));
      
      // Set as active flow icon
      setActiveFlowIcon(iconKey);
      
      // Clear enabled icon state
      setEnabledIcon(null);
      
      // Hide all other icons and ALL labels
      hideOtherIcons(iconKey);
      
      // Start timer for next icon
      startNextIconTimer(iconKey);
      
      // Execute first click callback
      if (onFirstClick) {
        onFirstClick();
      }
      
      return;
    }
    
    // SECOND CLICK (re-click)
    if (currentClickCount === 1 && activeFlowIcon === iconKey) {
      console.log(`✓ SECOND CLICK on ${iconKey}`);
      
      // Update click count
      setIconClickCounts(prev => ({ ...prev, [iconKey]: 2 }));
      
      // Clear active flow icon
      setActiveFlowIcon(null);
      
      // Clear enabled icon
      setEnabledIcon(null);
      
      // Show all icons and labels
      showAllIcons();
      
      // Close all content
      closeAllPanels();
      setDetailClosed(true);
      
      // Reset timer and restart for next icon
      startNextIconTimer(iconKey);
      
      // Execute second click callback
      if (onSecondClick) {
        onSecondClick();
      }
      
      return;
    }
    
    // Already clicked twice - do nothing
    if (currentClickCount >= 2) {
      console.log(`${iconKey} already clicked twice - ignoring`);
      return;
    }
    
    console.log(`Unexpected state for ${iconKey} - ignoring click`);
  };
  
  // ========== END HELPER FUNCTIONS ==========

  const resetJourneyState = () => {
    // Reset all journey states to initial values
    setJourneyStage('car');
    setIsShoppingMode(false);
    setIsHealthCareMode(false);
    setDetailClosed(true);
    setHasStartedFlow(false);
    
    // Reset context active icon
    if (setContextActiveIcon) {
      setContextActiveIcon(null);
    }
    
    closeAllPanels();
    
    // Reset all label visibility
    setShowCarLabel(true);
    setShowPetrolLabel(true);
    setShowCoffeeLabel(true);
    setShowShoppingLabel(true);
    setShowHealthCareLabel(true);
  };

  // Callback to trigger all intro animations simultaneously from child components
  const triggerHospitalIntro = () => {
    // Prevent duplicate triggers
    if (showHospitalIntro || showCarIntro || showEvIntro || showCafeIntro || showShopIntro) return;

    // Show all 5 icons and labels
    showAllIcons();

    // Show all intro animations simultaneously
    setShowCarIntro(true);
    setShowEvIntro(true);
    setShowCafeIntro(true);
    setShowShopIntro(true);
    setShowHospitalIntro(true);

    // Clear any existing timers
    if (carIntroTimerRef.current) {
      clearTimeout(carIntroTimerRef.current);
      carIntroTimerRef.current = null;
    }
    if (evIntroTimerRef.current) {
      clearTimeout(evIntroTimerRef.current);
      evIntroTimerRef.current = null;
    }
    if (cafeIntroTimerRef.current) {
      clearTimeout(cafeIntroTimerRef.current);
      cafeIntroTimerRef.current = null;
    }
    if (shopIntroTimerRef.current) {
      clearTimeout(shopIntroTimerRef.current);
      shopIntroTimerRef.current = null;
    }
    if (hospitalIntroTimerRef.current) {
      clearTimeout(hospitalIntroTimerRef.current);
      hospitalIntroTimerRef.current = null;
    }

    // Hide all animations and icons after 2.5 seconds
    const hideAllIntros = () => {
      setShowCarIntro(false);
      setShowEvIntro(false);
      setShowCafeIntro(false);
      setShowShopIntro(false);
      setShowHospitalIntro(false);
      
      // Hide all icons after animations complete
      setVisibleIcons({
        car: false,
        petrol: false,
        coffee: false,
        shopping: false,
        healthcare: false
      });
      
      // Hide all labels after animations complete
      setShowCarLabel(false);
      setShowPetrolLabel(false);
      setShowCoffeeLabel(false);
      setShowShoppingLabel(false);
      setShowHealthCareLabel(false);
    };

    // Set a single timer to hide all animations, icons, and labels after 2.5 seconds
    const hideTimer = setTimeout(hideAllIntros, 2500);
    
    // Store the timer in all refs for cleanup purposes
    carIntroTimerRef.current = hideTimer;
    evIntroTimerRef.current = hideTimer;
    cafeIntroTimerRef.current = hideTimer;
    shopIntroTimerRef.current = hideTimer;
    hospitalIntroTimerRef.current = hideTimer;
  };

  const getActiveVideoEl = () => {
    return activeVideoKey === 'A' ? videoARef.current : videoBRef.current;
  };

  const getInactiveVideoEl = () => {
    return activeVideoKey === 'A' ? videoBRef.current : videoARef.current;
  };

  const getInactiveVideoKey = () => {
    return activeVideoKey === 'A' ? 'B' : 'A';
  };

  const getVideoSrcForPart = (partName) => {
    if (partName === 'shopping') return part2Video;
    if (partName === 'healthcare') return part3Video;
    if (partName === 'petrol' || partName === 'gas') return part1Video;
    return null;
  };

  const getNextVideoSrc = (currentSrc) => {
    if (currentSrc === part1Video) return part2Video;
    if (currentSrc === part2Video) return part3Video;
    if (currentSrc === part3Video) return part1Video;
    return part2Video;
  };

  const setInactiveBufferSrc = (inactiveKey, src) => {
    if (!src) return;

    if (inactiveKey === 'A') {
      setVideoSrcA(src);
      if (videoARef.current) {
        try {
          videoARef.current.pause();
          videoARef.current.currentTime = 0;
          videoARef.current.src = src;
          const el = videoARef.current;
          const onLoadedData = () => {
            el.removeEventListener('loadeddata', onLoadedData);
            try {
              if (!Number.isNaN(el.duration) && el.duration > 0.2) {
                el.currentTime = 0.01;
              }
            } catch (_) {
            }
          };
          el.addEventListener('loadeddata', onLoadedData);
          el.load();
        } catch (_) {
        }
      }
      return;
    }

    setVideoSrcB(src);
    if (videoBRef.current) {
      try {
        videoBRef.current.pause();
        videoBRef.current.currentTime = 0;
        videoBRef.current.src = src;
        const el = videoBRef.current;
        const onLoadedData = () => {
          el.removeEventListener('loadeddata', onLoadedData);
          try {
            if (!Number.isNaN(el.duration) && el.duration > 0.2) {
              el.currentTime = 0.01;
            }
          } catch (_) {
          }
        };
        el.addEventListener('loadeddata', onLoadedData);
        el.load();
      } catch (_) {
      }
    }
  };

  const handleCarIconClick = () => {
    // If intro is currently playing, do nothing
    if (showCarIntro) return;
    
    handleIconClick('car',
      // First click callback
      () => {
        setContextActiveIcon('car');
        setHasStartedFlow(true);
        setDetailClosed(true);

        // Removed navigation to page2 on car click as per requirements

        // Only play intro if not already played
        if (!hasPlayedCarIntro) {
          setShowCarIntro(true);
          if (carIntroTimerRef.current) {
            clearTimeout(carIntroTimerRef.current);
            carIntroTimerRef.current = null;
          }

          // Open menu after car lines GIF finishes (2.5 seconds)
          carIntroTimerRef.current = setTimeout(() => {
            setShowCarIntro(false);
            setDetailClosed(false);
            setHasPlayedCarIntro(true);
            startFlowFromCarClick();
          }, 2500);
        } else {
          // If intro already played, just open the menu
          setDetailClosed(false);
        }
      },
      // Second click callback
      () => {
        console.log('Car second click - closing menus and showing all icons');
        // Reset car-specific states
        setHasPlayedCarIntro(false);
        setHasStartedFlow(false);
        setContextActiveIcon(null);
        setJourneyStage('car');
        
        // Make sure detail is closed (this closes the car menu)
        setDetailClosed(true);
      }
    );
  };

  // TUIO: tag 2 placed → open car sub menu, tag 2 removed → close & reset
  const handleTuioCarPlaced = React.useCallback(() => {
    console.log('[TUIO] Tag 2 placed — opening SmartMobility sub menu');
    if (iconClickCounts.car === 0) {
      handleCarIconClick();
    }
  }, [iconClickCounts.car]);

  const handleTuioCarRemoved = React.useCallback(() => {
    console.log('[TUIO] Tag 2 removed — closing & resetting SmartMobility');
    // Close menu and fully reset so next placement reopens it
    if (activeFlowIcon === 'car') {
      // Reset click count so placing again will reopen
      setIconClickCounts(prev => ({ ...prev, car: 0 }));
      setActiveFlowIcon(null);
      setEnabledIcon(null);
      showAllIcons();
      closeAllPanels();
      setDetailClosed(true);
      setHasPlayedCarIntro(false);
      setHasStartedFlow(false);
      setContextActiveIcon(null);
      setJourneyStage('car');
      clearFlowTimer();
    }
  }, [activeFlowIcon]);

  useTuio({
    triggerTagId: TUIO_CONFIG.SMART_MOBILITY_TAG_ID,
    onObjectPlaced: handleTuioCarPlaced,
    onObjectRemoved: handleTuioCarRemoved,
  });

  const warmUpVideo = async (src) => {
    try {
      const v = document.createElement('video');
      v.preload = 'auto';
      v.muted = true;
      v.playsInline = true;
      v.src = src;
      await new Promise((resolve, reject) => {
        const onLoadedData = () => {
          v.removeEventListener('loadeddata', onLoadedData);
          v.removeEventListener('error', onError);
          resolve();
        };
        const onError = (e) => {
          v.removeEventListener('loadeddata', onLoadedData);
          v.removeEventListener('error', onError);
          reject(e);
        };
        v.addEventListener('loadeddata', onLoadedData);
        v.addEventListener('error', onError);
        v.load();
      });

      try {
        const playPromise = v.play();
        if (playPromise && typeof playPromise.then === 'function') {
          await playPromise;
        }
      } catch (_) {
      }

      try {
        v.pause();
      } catch (_) {
      }
    } catch (_) {
    }
  };

  const seekAndPlay = (video, timeInSeconds) => {
    if (!video || typeof timeInSeconds !== 'number') {
      console.log('seekAndPlay: Invalid video or time', { video: !!video, timeInSeconds });
      return;
    }

    console.log('seekAndPlay called:', { 
      targetTime: timeInSeconds, 
      currentTime: video.currentTime,
      readyState: video.readyState,
      paused: video.paused,
      src: video.src
    });

    const tryPlay = () => {
      console.log('tryPlay: Attempting to play from', video.currentTime);
      try {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise
            .then(() => console.log('Video playing successfully from', video.currentTime))
            .catch((err) => console.log('Play failed:', err));
        }
      } catch (err) {
        console.log('Play exception:', err);
      }
    };

    const doSeek = () => {
      console.log('doSeek: Current time before seek:', video.currentTime);
      
      if (Math.abs((video.currentTime || 0) - timeInSeconds) < 0.05) {
        console.log('Already at target time, playing immediately');
        tryPlay();
        return;
      }

      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked);
        console.log('Seeked event fired, now at:', video.currentTime);
        tryPlay();
      };

      video.addEventListener('seeked', onSeeked);

      try {
        console.log('Setting currentTime to:', timeInSeconds);
        video.currentTime = timeInSeconds;
        console.log('currentTime set, actual value:', video.currentTime);
      } catch (err) {
        console.log('Seek exception:', err);
        video.removeEventListener('seeked', onSeeked);
        tryPlay();
      }
    };

    try {
      video.pause();
      console.log('Video paused');
    } catch (err) {
      console.log('Pause exception:', err);
    }

    if (video.readyState >= 1) {
      console.log('Video ready, seeking immediately');
      setTimeout(() => doSeek(), 50);
      return;
    }

    console.log('Video not ready, waiting for metadata');
    const onLoadedMetadata = () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      console.log('Metadata loaded, readyState:', video.readyState);
      doSeek();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
  };


  // Function to play a specific video part
  const playVideoPart = (partName, directId = null, directIcon = null) => {
    const targetVideo = getInactiveVideoEl();
    const currentVideo = getActiveVideoEl();
    const targetKey = getInactiveVideoKey();
    if (!targetVideo || !currentVideo) {
      console.error('Video refs not available');
      return;
    }
    
    console.log(`Playing video part: ${partName}`);
    console.log(`Direct values passed to playVideoPart: id=${directId}, icon=${directIcon}`);

    // Determine which video to play based on the part name
    const videoSrc = getVideoSrcForPart(partName);
    let onEndCallback;

    if (videoSrc === part1Video) {
      onEndCallback = () => {
        console.log('PART-1 video ended');
        // Use direct values if provided, otherwise fall back to state
        if (directId && directIcon) {
          console.log(`Using direct values for finishBackgroundVideo: id=${directId}, icon=${directIcon}`);
          finishBackgroundVideoWithValues(directId, directIcon);
        } else {
          finishBackgroundVideo();
        }
      };
    } else if (videoSrc === part2Video) {
      onEndCallback = () => {
        console.log('PART-2 video ended');
        setIsPlayingShoppingVideo(false);
        setHasPlayedShoppingVideo(true);
        setShowShopIntro(true);
        if (shopIntroTimerRef.current) {
          clearTimeout(shopIntroTimerRef.current);
          shopIntroTimerRef.current = null;
        }

        shopIntroTimerRef.current = setTimeout(() => {
          setShowShopIntro(false);
          playFrameSound(() => {
            setShowShoppingComponents(true);
          });
        }, 2500);
      };
    } else if (videoSrc === part3Video) {
      onEndCallback = () => {
        console.log('PART-3 video ended');
        setIsPlayingHealthCareVideo(false);
        setHasPlayedHealthCareVideo(true);
        setShowHospitalIntro(true);
        if (hospitalIntroTimerRef.current) {
          clearTimeout(hospitalIntroTimerRef.current);
          hospitalIntroTimerRef.current = null;
        }

        hospitalIntroTimerRef.current = setTimeout(() => {
          setShowHospitalIntro(false);
          playFrameSound(() => {
            setShowHealthCareComponents(true);
          });
        }, 2500);
      };
    }
    
    if (!videoSrc) {
      console.error(`No video source found for part: ${partName}`);
      return;
    }

    // Store the callback for the onEnded handler
    targetVideo._currentEndCallback = onEndCallback;

    const swapToTarget = () => {
      setActiveVideoKey(targetKey);
      try {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      } catch (e) {
        console.error('Error pausing previous video:', e);
      }

      // Option B: keep the OTHER buffer always preloaded with the next likely video
      const nextSrc = getNextVideoSrc(videoSrc);
      const nextInactiveKey = targetKey === 'A' ? 'B' : 'A';
      setTimeout(() => {
        setInactiveBufferSrc(nextInactiveKey, nextSrc);
      }, 0);
    };

    const startAndSwapWhenReady = () => {
      const playPromise = targetVideo.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (typeof targetVideo.requestVideoFrameCallback === 'function') {
              targetVideo.requestVideoFrameCallback(() => {
                swapToTarget();
              });
              return;
            }

            const onTimeUpdate = () => {
              targetVideo.removeEventListener('timeupdate', onTimeUpdate);
              swapToTarget();
            };

            targetVideo.addEventListener('timeupdate', onTimeUpdate);
            setTimeout(() => {
              targetVideo.removeEventListener('timeupdate', onTimeUpdate);
              swapToTarget();
            }, 200);
          })
          .catch((error) => {
            console.error(`Error playing ${partName} video:`, error);
          });
        return;
      }

      const onTimeUpdate = () => {
        targetVideo.removeEventListener('timeupdate', onTimeUpdate);
        swapToTarget();
      };

      targetVideo.addEventListener('timeupdate', onTimeUpdate);
      setTimeout(() => {
        targetVideo.removeEventListener('timeupdate', onTimeUpdate);
        swapToTarget();
      }, 200);
    };

    const handleLoadedData = () => {
      targetVideo.removeEventListener('loadeddata', handleLoadedData);
      targetVideo.removeEventListener('canplay', handleLoadedData);

      try {
        if (!Number.isNaN(targetVideo.duration) && targetVideo.duration > 0.2) {
          targetVideo.currentTime = 0.01;
        }
      } catch (_) {
      }

      startAndSwapWhenReady();
    };

    // Prepare the target video off-screen, then crossfade once it has a frame.
    // IMPORTANT: Attach listeners BEFORE calling load() to avoid missing fast events.
    try {
      targetVideo.pause();
      targetVideo.currentTime = 0;
      targetVideo.addEventListener('loadeddata', handleLoadedData);
      targetVideo.addEventListener('canplay', handleLoadedData);
      // If the inactive buffer already has the right src, reuse it (smoothest)
      const hasSameSrc = (targetVideo.getAttribute('src') || targetVideo.src || '').includes(videoSrc);
      if (!hasSameSrc) {
        if (targetKey === 'A') setVideoSrcA(videoSrc);
        else setVideoSrcB(videoSrc);
        targetVideo.src = videoSrc;
        targetVideo.load();
      } else if (targetVideo.readyState < 2) {
        // Same src but not actually loaded yet
        targetVideo.load();
      }

      if (targetVideo.readyState >= 2) {
        setTimeout(() => {
          handleLoadedData();
        }, 0);
      }
    } catch (e) {
      console.error('Error preparing target video:', e);
    }
  };
  
  // Reset journey state when component mounts (user navigates to /menu)
  useEffect(() => {
    console.log('MenuPage mounted - resetting all states');
    
    // SOLID FIX: Reset context state machine first (resets activeIcon, unlocked states, glows)
    if (resetGlowEffectState) {
      resetGlowEffectState();
      console.log('Context state machine reset');
    }
    
    // Reset all local journey states to initial values
    setJourneyStage('car');
    setIsShoppingMode(false);
    setIsHealthCareMode(false);
    setDetailClosed(true);
    setHasStartedFlow(false);
    
    // Reset intro played flags
    setHasPlayedCarIntro(false);
    
    // Reset visited flags
    setVisitedCharging(false);
    setVisitedCafe(false);
    setVisitedShopping(false);
    setVisitedHealthCare(false);
    
    // Close all panels
    closeAllPanels();
    
    // Reset all label visibility
    setShowCarLabel(true);
    setShowPetrolLabel(true);
    setShowCoffeeLabel(true);
    setShowShoppingLabel(true);
    setShowHealthCareLabel(true);
    
    
    // Cleanup on unmount - reset context state when leaving page
    return () => {
      if (resetGlowEffectState) {
        resetGlowEffectState();
      }
    };
  }, []);

  // TEMP: Press 'H' to toggle healthcare frame for quick testing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'h' || e.key === 'H') {
        setShowHealthCareComponents(prev => !prev);
        console.log('[DEV] Toggled healthcare frame');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Preload all split videos when component mounts
  useEffect(() => {
    console.log('Preloading split videos to prevent black screens...');
    Promise.all([
      videoPreloader.preloadVideo(part1Video),
      videoPreloader.preloadVideo(part2Video),
      videoPreloader.preloadVideo(part3Video)
    ]).then(() => {
      console.log('All split videos preloaded successfully!');

      warmUpVideo(part1Video);
      warmUpVideo(part2Video);
      warmUpVideo(part3Video);
    }).catch(err => {
      console.error('Failed to preload split videos:', err);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (carIntroTimerRef.current) {
        clearTimeout(carIntroTimerRef.current);
        carIntroTimerRef.current = null;
      }
      if (evIntroTimerRef.current) {
        clearTimeout(evIntroTimerRef.current);
        evIntroTimerRef.current = null;
      }
      if (cafeIntroTimerRef.current) {
        clearTimeout(cafeIntroTimerRef.current);
        cafeIntroTimerRef.current = null;
      }
      if (shopIntroTimerRef.current) {
        clearTimeout(shopIntroTimerRef.current);
        shopIntroTimerRef.current = null;
      }
      if (hospitalIntroTimerRef.current) {
        clearTimeout(hospitalIntroTimerRef.current);
        hospitalIntroTimerRef.current = null;
      }
      if (flowTimerRef.current) {
        clearTimeout(flowTimerRef.current);
        flowTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!showCarPanel) return;

    const loadedObjects = getAllObjects();
    setObjects(loadedObjects);
    console.log('Loaded objects:', loadedObjects);

    const petrol = loadedObjects.find(
      (o) =>
        o.icon === 'gas' ||
        o?.name?.toLowerCase?.().includes('petrol') ||
        o?.name?.toLowerCase?.().includes('fuel')
    );

    const coffee = loadedObjects.find(
      (o) => o.icon === 'coffee' || o?.name?.toLowerCase?.().includes('coffee')
    );

    setPetrolPumpObject(petrol ? { ...petrol, x: 0.40, y: 0.85 } : null);
    setCoffeeObject(coffee ? { ...coffee, x: 0.30, y: 0.60 } : null);

    const shopping =
      loadedObjects.find(
        (o) =>
          o?.icon === 'cart' ||
          o?.name?.toLowerCase?.().includes('cart') ||
          o?.name?.toLowerCase?.().includes('shopping')
      ) ||
      (loadedObjects.length > 2 ? loadedObjects[2] : null);

    setShoppingObject(shopping ? { ...shopping, x: 0.82, y: 0.48 } : null);
    
    // Create a default healthcare object if none exists in loadedObjects
    let healthcare =
      loadedObjects.find(
        (o) =>
          o?.icon === 'Hospital' ||
          o?.name?.toLowerCase?.().includes('health') ||
          o?.name?.toLowerCase?.().includes('healthcare') ||
          o?.name?.toLowerCase?.().includes('hospital')
      ) ||
      (loadedObjects.length > 4 ? loadedObjects[4] : null);
    
    // If no healthcare object found, create a default one
    if (!healthcare) {
      healthcare = {
        id: 'healthcare-default',
        name: 'Healthcare',
        icon: 'Hospital',
        description: 'Healthcare services'
      };
    }
    
    // Ensure the icon is set to 'Hospital' for proper rendering
    healthcare = { ...healthcare, icon: 'Hospital' };
    
    console.log('Found/created healthcare object:', healthcare);
    // Position the healthcare icon on the left side of the screen
    setHealthCareObject({ ...healthcare, x: 0.10, y: 0.40 });
    console.log('Set healthCareObject state');

    setAnimationCompleted(true);
    setDetailClosed(true);
    setShowDetailComponent(false);

    return () => {};
  }, [showCarPanel]);

  const handleOptionSelect = (objectId, option) => {
    console.log(`Selected ${option.label} for object ${objectId}`);
    setShowDetailComponent(true);
  };

  const generateShoppingModalData = (option) => {
    const defaultMetrics = {
      'Inventory Management': [
        { name: 'Stock Accuracy', value: '94%', color: '#70CDDD' },
        { name: 'Turnover Rate', value: '78%', color: '#157B66' },
        { name: 'Reorder Efficiency', value: '86%', color: '#00ABDA' },
        { name: 'Shrinkage Control', value: '91%', color: '#467C94' },
        { name: 'Overall Rating', value: '87%', color: '#04BB65' }
      ],
      'Customer Insights': [
        { name: 'Purchase Patterns', value: '82%', color: '#70CDDD' },
        { name: 'Demographic Analysis', value: '76%', color: '#157B66' },
        { name: 'Loyalty Metrics', value: '89%', color: '#00ABDA' },
        { name: 'Feedback Score', value: '84%', color: '#467C94' },
        { name: 'Retention Rate', value: '79%', color: '#04BB65' }
      ],
      'Payment Solutions': [
        { name: 'Transaction Speed', value: '95%', color: '#70CDDD' },
        { name: 'Security Level', value: '98%', color: '#157B66' },
        { name: 'Fee Structure', value: '87%', color: '#00ABDA' },
        { name: 'Integration', value: '92%', color: '#467C94' },
        { name: 'User Experience', value: '90%', color: '#04BB65' }
      ],
      'Loyalty Programs': [
        { name: 'Enrollment Rate', value: '73%', color: '#70CDDD' },
        { name: 'Redemption Rate', value: '68%', color: '#157B66' },
        { name: 'Customer Retention', value: '85%', color: '#00ABDA' },
        { name: 'Program ROI', value: '79%', color: '#467C94' },
        { name: 'User Satisfaction', value: '82%', color: '#04BB65' }
      ]
    };

    const metrics = defaultMetrics[option.label] || [
      { name: 'Performance', value: '75%', color: '#70CDDD' },
      { name: 'Efficiency', value: '60%', color: '#157B66' },
      { name: 'Reliability', value: '85%', color: '#00ABDA' },
      { name: 'Cost', value: '45%', color: '#467C94' },
      { name: 'Overall', value: '72%', color: '#04BB65' }
    ];

    return {
      title: option.label,
      subtitle: option.description || 'Detailed information for Shopping',
      badgeTitle: 'Shopping Elite',
      badgeValue: '2700 pts',
      metrics,
      alert: {
        title: 'Special discount available!',
        subtitle: 'Save 15% on your next purchase.',
        timeLeft: 'Expires in 48 hrs'
      },
      tabs: ['Overall', 'Inventory', 'Customers', 'Payments', 'Loyalty', 'Analytics']
    };
  };

  const handleShoppingOptionSelect = (objectId, option) => {
    console.log(`Selected ${option.label} for object ${objectId}`);
    
    // Check if Summary button is clicked
    if (option.label === 'Summary' || option.id === 'summary') {
      playFrameSound(() => {
        setShowSummaryComponents(true);
      });
      return;
    }
    
    const data = generateShoppingModalData(option);
    playFrameSound(() => {
      setShoppingModalData(data);
      setShowShoppingDetailedModal(true);
    });
  };

  const handleShoppingObjectClick = (objectId) => {
    handleIconClick('shopping',
      // First click callback
      () => {
        setActivePetrolCoffeeDetail(null);
        setShowDetailComponent(false);
        if (dismissLowBatteryAlert) dismissLowBatteryAlert();
        setDetailClosed(true);

        setContextActiveIcon('cart');
        setJourneyStage('shopping');
        setIsShoppingMode(true);
        setVisitedShopping(true);

        navigationService.navigateToLargeScreen('/largePages/page6', {
          source: 'shopping-click',
          icon: 'cart'
        }).catch(err => console.error('Failed to send navigation event:', err));

        turnOffGlowByIcon?.('cart');
        console.log('Playing PART-2 video for shopping');
        playVideoPart('shopping');
        setIsPlayingShoppingVideo(true);
      },
      // Second click callback
      () => {
        setVisitedShopping(false);
        setIsShoppingMode(false);
        setContextActiveIcon(null);
        setJourneyStage('car');
      }
    );
  };
  
  const handleHealthCareObjectClick = (objectId) => {
    console.log('Healthcare object clicked:', objectId);
    console.log('Healthcare object data:', healthCareObject);
    console.log('Is healthcare unlocked:', contextIsHealthCareUnlocked);
    
    handleIconClick('healthcare',
      // First click callback
      () => {
        setActivePetrolCoffeeDetail(null);
        setShowDetailComponent(false);
        if (dismissLowBatteryAlert) dismissLowBatteryAlert();
        setDetailClosed(true);
        
        setShowShoppingComponents(false);
        setShowBNPL(false);
        setShowProtection(false);
        setShowShoppingDetailedModal(false);
        
        console.log('Setting active icon to hospital');
        setContextActiveIcon('Hospital');
        setJourneyStage('healthcare');
        setIsHealthCareMode(true);
        setVisitedHealthCare(true);

        navigationService.navigateToLargeScreen('/largePages/page7', {
          source: 'healthcare-click',
          icon: 'Hospital'
        }).catch(err => console.error('Failed to send navigation event:', err));

        turnOffGlowByIcon?.('Hospital');
        
        console.log('Playing PART-3 video for healthcare');
        playVideoPart('healthcare');
        setIsPlayingHealthCareVideo(true);
      },
      // Second click callback
      () => {
        setVisitedHealthCare(false);
        setIsHealthCareMode(false);
        setContextActiveIcon(null);
        setJourneyStage('car');
      }
    );
  };


  const handlePetrolCoffeeOptionSelect = (objectId) => {
    setShowDetailComponent(true);
  };

  const handlePetrolCoffeeIconClick = (obj) => {
    if (!obj?.id) return;

    // While shopping is active, keep other icons dull/inactive
    if (activeIcon === 'cart') return;

    // Handle petrol icon
    if (obj.icon === 'gas' || obj.icon === 'petrol') {
      handleIconClick('petrol',
        // First click callback
        () => {
          setDetailClosed(true);
          if (dismissLowBatteryAlert) dismissLowBatteryAlert();
          setJourneyStage('charging');
          setContextActiveIcon('gas');
          setVisitedCharging(true);
          
          navigationService.navigateToLargeScreen('/largePages/page8', {
            source: 'petrol-click',
            icon: 'gas'
          }).catch(err => console.error('Failed to send navigation event:', err));
          
          // Play PART-1 video to show car movement
          // EV intro animation will be triggered AFTER video ends (in video onEndCallback)
          console.log('Playing PART-1 video for petrol');
          playVideoPart('petrol', obj.id, obj.icon);
        },
        // Second click callback
        () => {
          setVisitedCharging(false);
          setContextActiveIcon(null);
          setJourneyStage('car');
          setActivePetrolCoffeeDetail(null);
          setShowDetailComponent(false);
        }
      );
      return;
    }

    // Handle coffee icon
    if (obj.icon === 'coffee') {
      handleIconClick('coffee',
        // First click callback
        () => {
          setActivePetrolCoffeeDetail(null);
          setShowDetailComponent(false);
          setJourneyStage('cafe');
          setContextActiveIcon('coffee');
          setVisitedCafe(true);
          
          navigationService.navigateToLargeScreen('/largePages/page5', {
            source: 'coffee-click',
            icon: 'coffee'
          }).catch(err => console.error('Failed to send navigation event:', err));
          
          // Show cafe intro
          setShowCafeIntro(true);
          if (cafeIntroTimerRef.current) {
            clearTimeout(cafeIntroTimerRef.current);
            cafeIntroTimerRef.current = null;
          }

          cafeIntroTimerRef.current = setTimeout(() => {
            setShowCafeIntro(false);
            turnOffGlowByIcon?.('coffee');
            setIsCoffeeUnlocked(true);
            setHasPlayedPetrolCoffeeVideo(true);
            playFrameSound(() => {
              setActivePetrolCoffeeDetail('coffee');
              setShowDetailComponent(true);
            });
          }, 2500);
        },
        // Second click callback
        () => {
          setVisitedCafe(false);
          setContextActiveIcon(null);
          setJourneyStage('car');
          setActivePetrolCoffeeDetail(null);
          setShowDetailComponent(false);
        }
      );
      return;
    }
  };

  // Remove old complex logic below - keeping only what's needed
  const OLD_handlePetrolCoffeeIconClick_BACKUP = (obj) => {
    if (!obj?.id) return;
    if (activeIcon === 'cart') return;
    if ((obj.icon === 'gas' || obj.icon === 'petrol') && !contextIsChargingUnlocked) return;
    if (obj.icon === 'coffee' && !contextIsCafeUnlocked) return;
    console.log('Petrol/Coffee icon clicked:', obj.icon, obj.id);
    if (obj.icon === 'gas' || obj.icon === 'petrol') {
      // Store these values in variables to use directly
      const iconToUse = obj.icon;
      const idToUse = obj.id;
      
      // Set these values before playing the video
      console.log(`Setting pending popup values - id: ${idToUse}, icon: ${iconToUse}`);
      setPendingPopupObjectId(idToUse);
      setPendingPopupObjectIcon(iconToUse);
      
      // Use a timeout to ensure state is updated before playing the video
      setTimeout(() => {
        try {
          userTriggeredVideoPlayRef.current = true;
          
          // Directly set these values on window to ensure they're available
          window._pendingPopupObjectId = idToUse;
          window._pendingPopupObjectIcon = iconToUse;
          
          // Play PART-1 video for petrol only
          console.log(`Playing ${iconToUse} video (PART-1)`);
          console.log(`Current pending values before play: id=${pendingPopupObjectId}, icon=${pendingPopupObjectIcon}`);
          playVideoPart(iconToUse, idToUse, iconToUse); // Pass the values directly
        } catch (err) {
          console.error(`Background video play error for ${iconToUse}:`, err);
        }
      }, 100); // Small delay to ensure state updates
      
      return;
    }
  };

  // New function that takes direct values instead of relying on state
  const finishBackgroundVideoWithValues = (id, icon) => {
    console.log(`finishBackgroundVideoWithValues called with icon: ${icon}, id: ${id}`);
    
    if (!id || !icon) {
      console.log('No popup object ID or icon provided to finishBackgroundVideoWithValues, returning');
      return;
    }
    
    // Clear any pending values in state
    setPendingPopupObjectId(null);
    setPendingPopupObjectIcon(null);
    
    // Clear any window values
    window._pendingPopupObjectId = null;
    window._pendingPopupObjectIcon = null;
    
    setHasPlayedPetrolCoffeeVideo(true);

    const openDetailsAfterVideo = () => {
      // IMPORTANT: Force this to run outside the current execution context
      // to ensure React state updates have time to propagate
      setTimeout(() => {
        console.log(`DELAYED: Showing ${icon} components after video pause`);

        // Clear other components first
        setShowShoppingComponents(false);
        setShowHealthCareComponents(false);
        setShowBNPL(false);
        setShowProtection(false);
        setShowShoppingDetailedModal(false);

        if (icon === 'coffee') {
          setIsCoffeeUnlocked(true);
        }

        // CRITICAL: Set these states in the correct order
        if (icon === 'gas' || icon === 'petrol') {
          console.log('Setting gas/petrol states');
          setJourneyStage('charging');
          setContextActiveIcon('gas');
          
          navigationService.navigateToLargeScreen('/largePages/page8', {
            source: 'petrol-video-pause',
            icon: 'gas'
          }).catch(err => console.error('Failed to send navigation event:', err));
          // Force these to happen last to ensure they take precedence
          setTimeout(() => {
            console.log('FINAL: Setting activePetrolCoffeeDetail to gas');
            setShowDetailComponent(true);
            setActivePetrolCoffeeDetail('gas');
          }, 50);
          return;
        }

        if (icon === 'coffee') {
          console.log('Setting coffee states');
          setJourneyStage('cafe');
          setContextActiveIcon('coffee');
          
          navigationService.navigateToLargeScreen('/largePages/page5', {
            source: 'coffee-video-pause',
            icon: 'coffee'
          }).catch(err => console.error('Failed to send navigation event:', err));
          
          // Force these to happen last to ensure they take precedence
          setTimeout(() => {
            console.log('FINAL: Setting activePetrolCoffeeDetail to coffee');
            setShowDetailComponent(true);
            setActivePetrolCoffeeDetail('coffee');
          }, 50);
        }
      }, 100);
    };

    if (icon === 'gas' || icon === 'petrol') {
      setShowEvIntro(true);
      if (evIntroTimerRef.current) {
        clearTimeout(evIntroTimerRef.current);
        evIntroTimerRef.current = null;
      }

      evIntroTimerRef.current = setTimeout(() => {
        setShowEvIntro(false);
        openDetailsAfterVideo();
      }, 2500);
      return;
    }

    openDetailsAfterVideo();
  };
  
  // Keep the original function for backward compatibility
  const finishBackgroundVideo = () => {
    const id = pendingPopupObjectId || window._pendingPopupObjectId;
    const icon = pendingPopupObjectIcon || window._pendingPopupObjectIcon;
    console.log(`finishBackgroundVideo called with icon: ${icon}, id: ${id}`);
    
    // Don't clear these values until we've used them
    if (!id || !icon) {
      console.log('No pending popup object ID or icon, returning');
      return;
    }
    
    // Now that we have the values, call the function that takes direct values
    finishBackgroundVideoWithValues(id, icon);
  };

  const closePetrolCoffeeDetail = () => {
    setActivePetrolCoffeeDetail(null);
    setShowDetailComponent(false);
    if (journeyStage === 'car') setContextActiveIcon(null);
    else if (journeyStage === 'charging') setContextActiveIcon('gas');
    else if (journeyStage === 'cafe') setContextActiveIcon('coffee');
    else if (journeyStage === 'shopping') setContextActiveIcon('cart');
    else if (journeyStage === 'healthcare') setContextActiveIcon('Hospital');
    else setContextActiveIcon(null);
  };

  const handleShowCoffeeFromOffer = () => {
    setIsCoffeeUnlocked(true);
    setActivePetrolCoffeeDetail(null);
    setShowDetailComponent(false);
    setContextActiveIcon('gas');
  };

  // Handle video section completion based on current timestamp
  const handleVideoSectionComplete = (e) => {
    const video = e?.currentTarget;
    if (!video) return;

    console.log('Video playback completed');

    if (video._currentEndCallback) {
      console.log('Calling stored end callback');
      const cb = video._currentEndCallback;
      video._currentEndCallback = null;
      cb();
    }
  };

  return (
    <Box className="menu-page">
      {showCarIntro && (
        <img
          src={carLinesGif}
          alt="Car Intro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 100,
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
      )}
      {showEvIntro && (
        <img
          src={evLinesGif}
          alt="EV Intro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 101,
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
      )}
      {showCafeIntro && (
        <img
          src={cafeLinesGif}
          alt="Cafe Intro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 102,
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
      )}
      {showShopIntro && (
        <img
          src={shopLinesGif}
          alt="Shop Intro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 103,
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
      )}
      {showHospitalIntro && (
        <img
          src={hospitalLinesGif}
          alt="Hospital Intro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 104,
            mixBlendMode: 'screen',
            opacity: 0.9,
          }}
        />
      )}
        <video
        ref={videoARef}
        className="menu-bg-video"
        src={videoSrcA}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoSectionComplete}
        style={{
          opacity: activeVideoKey === 'A' ? 1 : 0,
          transition: 'none',
          backgroundColor: 'transparent',
          willChange: 'opacity',
        }}
      />
        <video
        ref={videoBRef}
        className="menu-bg-video"
        src={videoSrcB}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoSectionComplete}
        style={{
          opacity: activeVideoKey === 'B' ? 1 : 0,
          transition: 'none',
          backgroundColor: 'transparent',
          willChange: 'opacity',
        }}
      />


      <img
        src={topUiGif}
        alt="Top UI"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          maxHeight: '21rem',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />

      {contextLowBatteryAlert && showCarPanel && activePetrolCoffeeDetail !== 'gas' && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            transform: 'none',
            zIndex: 50,
            animation: 'pulse-attention 2s infinite',
          }}
        >
          <LowBatteryAlert
            distance={8}
            timeRemaining={25}
          />
        </div>
      )}

      {contextLowBatteryAlert && journeyStage === 'car' && (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          
        </svg>
      )}

      {!activePetrolCoffeeDetail && showShoppingComponents && !showBNPL && !showProtection && (
        <div
          style={{
            position: 'fixed',
            // left: '5%',
            top: '20%',
            width: '100%',
            zIndex: 60,
            overflow: 'visible',
          }}
          onClick={(e) => e.stopPropagation()}
        >
        <ShoppingDetails
          animationCompleted={animationCompleted}
          onProceed={() => {
            playButtonSound(() => {
              playFrameSound(() => setShowBNPL(true));
            });
          }}
        />
        </div>
      )}

      {!activePetrolCoffeeDetail && showBNPL && !showProtection && (
          <div
          style={{
            position: 'fixed',
            // left: '5%',
            top: '20%',
            width: '100%',
            zIndex: 60,
            overflow: 'visible',
          }}
          onClick={(e) => e.stopPropagation()}
        >
        <BNPLDetail
          animationCompleted={animationCompleted}
          onProceed={() => {
            playButtonSound(() => {
              playFrameSound(() => {
                setShowBNPL(false);
                setShowProtection(true);
              });
            });
          }}
        />
        </div>
      )}

      {!activePetrolCoffeeDetail && showProtection && (
        <div
          style={{
            position: 'fixed',
            // left: '5%',
            top: '20%',
            width: '100%',
            zIndex: 60,
            overflow: 'visible',
          }}
          onClick={(e) => e.stopPropagation()}
        >
        <ProtectionDetail animationCompleted={animationCompleted} />
        </div>
      )}
      
      {/* Healthcare Details */}
      {showHealthCareComponents && (
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            zIndex: 60,
            overflow: 'visible',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <HealthCareDetails 
            animationCompleted={true} 
            onProceed={() => console.log('Healthcare proceed clicked')} 
            onTriggerIntro={triggerHospitalIntro} 
          />
        </div>
      )}
    

      <DetailedModal
        isOpen={showShoppingDetailedModal}
        onClose={() => setShowShoppingDetailedModal(false)}
        data={shoppingModalData}
      />

      {showCarPanel && objects[0] && animationCompleted && visibleIcons.car && (

        <SmartMobilityDetail
          key={`smart-${journeyStage}`}
          object={objects[0]}
          onOptionSelect={handleOptionSelect}
          defaultShowOptions={journeyStage === 'car' ? !detailClosed : false}
          onClose={() => setDetailClosed(true)}
          onIconClick={!isShoppingMode && journeyStage === 'car'
            ? handleCarIconClick
            : undefined}
          isActive={activeIcon === 'car'}
          disableIconClick={journeyStage === 'charging' || journeyStage === 'cafe' || journeyStage === 'shopping' || journeyStage === 'healthcare'}
        />
      
      )}

      {/* Petrol/Coffee Details - Explicitly check for 'gas' or 'coffee' */}
      {(activePetrolCoffeeDetail === 'gas' || activePetrolCoffeeDetail === 'coffee') && (
        <div
          className="petrol-coffee-detail-modal"
          style={{
            position: 'fixed',
            // left: '5%',
            top: '20%',
            width: '100%',
            overflow: 'auto',
          
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {activePetrolCoffeeDetail === 'gas' ? (
            <>
              <PetrolPumpDetails onShowCoffee={handleShowCoffeeFromOffer} />
            </>
          ) : (
            <>
              <CoffeeDetails />
            </>
          )}
        </div>
      )}

      {showCarPanel && petrolPumpObject && animationCompleted && visibleIcons.petrol && (
        <ObjectDetailView
          object={petrolPumpObject}
          onOptionSelect={handlePetrolCoffeeOptionSelect}
          onIconClick={handlePetrolCoffeeIconClick}
          isActive={activeIcon === 'gas'}
          isUnlocked={contextIsChargingUnlocked || visitedCharging}
          disableIconClick={journeyStage === 'cafe' || journeyStage === 'shopping' || journeyStage === 'healthcare'}
          iconSize="6.75rem"
          cartIconSize="7.75rem"
          shouldBlink={false}
          petrolPumpGlow={petrolPumpGlow}
        />
      )}

      {showCarPanel && coffeeObject && animationCompleted && visibleIcons.coffee && (
        <ObjectDetailView
          object={coffeeObject}
          onOptionSelect={handlePetrolCoffeeOptionSelect}
          onIconClick={handlePetrolCoffeeIconClick}
          isActive={activeIcon === 'coffee'}
          isUnlocked={contextIsCafeUnlocked || visitedCafe}
          disableIconClick={journeyStage === 'shopping' || journeyStage === 'healthcare'}
          iconSize="6.75rem"
          cartIconSize="7.75rem"
          containerStyle={{ left: '58%', top: '88%' }}
          shouldBlink={false}
          petrolPumpGlow={false}
        />
      )}

      {showCarPanel && shoppingObject && animationCompleted && visibleIcons.shopping && (
        <ObjectDetailView
          object={shoppingObject}
          onOptionSelect={handleShoppingOptionSelect}
          onIconClick={handleShoppingObjectClick}
          isActive={activeIcon === 'cart'}
          isUnlocked={contextIsShoppingUnlocked || visitedShopping}
          disableIconClick={journeyStage === 'healthcare'}
          iconSize="6.75rem"
          cartIconSize="7.75rem"
          petrolPumpGlow={false}
          shouldBlink={false}
        />
      )}
      
      {showCarPanel && healthCareObject && animationCompleted && visibleIcons.healthcare && (
        <ObjectDetailView
          object={healthCareObject}
          onOptionSelect={handleShoppingOptionSelect}
          onIconClick={handleHealthCareObjectClick}
          isActive={activeIcon === 'Hospital'}
          petrolPumpGlow={false}
          isUnlocked={contextIsHealthCareUnlocked || visitedHealthCare}
          iconSize="6.75rem"
          cartIconSize="7.75rem"
          shouldBlink={false}
        />
      )}

      {/* SVG Labels for Icons */}
      {showCarPanel && animationCompleted && (
        <>
          {/* Car Label with updated position */}
          {objects[0] && showCarLabel && (
            <SinglePlayGif
              src={carLabel}
              staticSrc={carLabelStatic}
              alt="Car Label"
              duration={2500}
              style={{
                position: 'absolute',
                left: '13.1%',
                top: '64.5%',
                transform: 'translate(-50%, 3rem)',
                width: '14rem',
                height: 'auto',
                pointerEvents: 'none',
                cursor: 'default',
                zIndex: 2,
                opacity: (journeyStage === 'car' && !detailClosed) ? 0.3 : (activeIcon === 'car' ? 1 : 0.6),
                transition: 'opacity 0.3s ease'
              }}
            />
          )}
          
          {/* Petrol Label */}
          {petrolPumpObject && showPetrolLabel && (
            <SinglePlayGif
              src={petrolLabel}
              staticSrc={petrolLabelStatic}
              alt="Petrol Label"
              duration={2500}
              style={{
                position: 'absolute',
                left: '52%',
                top: '75%',
                transform: 'translate(0, 0)',
                width: '18rem',
                height: 'auto',
                pointerEvents: 'none',
                cursor: 'default',
                zIndex: 2,
                opacity: (contextIsChargingUnlocked || visitedCharging) ? ((journeyStage === 'charging' && activePetrolCoffeeDetail) ? 0.3 : (activeIcon === 'gas' ? 1 : 0.6)) : 0.3,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}
          
          {/* Coffee Label */}
          {coffeeObject && showCoffeeLabel && (
            <SinglePlayGif
              src={coffeeLabel}
              staticSrc={coffeeLabelStatic}
              alt="Coffee Label"
              duration={2500}
              style={{
                position: 'absolute',
                left: '64%',
                top: '76%',
                transform: 'translate(-50%, 5rem)',
                width: '19.4rem',
                height: 'auto',
                pointerEvents: 'none',
                cursor: 'default',
                zIndex: 2,
                opacity: (contextIsCafeUnlocked || visitedCafe) ? ((journeyStage === 'cafe' && activePetrolCoffeeDetail) ? 0.3 : (activeIcon === 'coffee' ? 1 : 0.6)) : 0.3,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}

          {shoppingObject && showShoppingLabel && (
            <SinglePlayGif
              src={shoppingLabel}
              staticSrc={shoppingLabelStatic}
              alt="Shopping Label"
              duration={2500}
              style={{
                position: 'absolute',
                left: '82%',
                top: '39%',
                transform: 'translate(0, 0)',
                width: '17rem',
                height: 'auto',
                pointerEvents: 'none',
                cursor: 'default',
                zIndex: 2,
                opacity: (contextIsShoppingUnlocked || visitedShopping) ? ((isShoppingMode && showShoppingComponents) ? 0.3 : (activeIcon === 'cart' ? 1 : 0.6)) : 0.3,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}

          {healthCareObject && showHealthCareLabel && (
            <SinglePlayGif
              src={healthCareLabel}
              staticSrc={healthCareLabelStatic}
              alt="Healthcare Label"
              duration={2500}
              style={{
                position: 'absolute',
                left: '17%',
                top: '24%',
                transform: 'translate(-50%, 3rem)',
                width: '14rem',
                height: 'auto',
                pointerEvents: 'none',
                cursor: 'default',
                zIndex: 2,
                opacity: (contextIsHealthCareUnlocked || visitedHealthCare) ? ((isHealthCareMode && showHealthCareComponents) ? 0.3 : (activeIcon === 'Hospital' ? 1 : 0.6)) : 0.3,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}

          {/* Summary Components Detail - shown when summary button is clicked */}
                  <div
          className="petrol-coffee-detail-modal"
          style={{
            position: 'fixed',
            // left: '5%',
            top: '20%',
            width: '100%',
            overflow: 'auto',
          
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SummaryComponentDetail isVisible={showSummaryComponents && animationCompleted} />
          </div>
          {/* EY Logo - bottom right, redirects to homepage */}
          <img
            src="/assets/EY_Logo_Beam_STFWC_Stacked_RGB_White_Yellow_EN 2.svg"
            alt="EY Logo"
            onClick={() => playButtonSound(() => navigate('/'))}
            style={{
              position: 'fixed',
              right: '2rem',
              bottom: '2rem',
              width: '5rem',
              height: 'auto',
              cursor: 'pointer',
              zIndex: 100,
              opacity: 0.9,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.9}
          />
        </>
      )}

    </Box>
  );
};

export default MenuPage;

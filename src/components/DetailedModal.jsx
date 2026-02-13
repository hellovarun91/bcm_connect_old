import React, { useState, useRef, useEffect } from 'react';

// MUI components
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { playFrameSound } from '../utils/soundUtils';

import './DetailedModal.css';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: '16px',
    overflow: 'hidden',
    maxWidth: '1500px',
    width: '100%',
    position: 'absolute', // Enable positioning for dragging
    cursor: 'move',
  },
  '& .MuiDialogContent-root': {
    borderRadius: '16px',
    padding: '40px',
    color: '#FCFCFC',
    height: 'auto',
    overflow: 'auto',
    [theme.breakpoints.down('lg')]: {
      padding: '30px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'EYInterstate, sans-serif',
  fontWeight: 700,
  fontSize: '34px',
  lineHeight: '42px',
  letterSpacing: '-0.02em',
  color: '#FCFCFC',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '36px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '30px',
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'EYInterstate, sans-serif',
  fontWeight: 300,
  fontSize: '28px',
  lineHeight: '36px',
  color: '#FCFCFC',
  [theme.breakpoints.down('md')]: {
    fontSize: '22px',
    lineHeight: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '24px',
  },
}));

const BadgeIcon = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '60.91px',
  backgroundColor: '#FFB800',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
    fontSize: '20px',
  },
}));

const MetricNameStyled = styled(Typography)(({ theme }) => ({
  fontFamily: 'EYInterstate, sans-serif',
  fontWeight: 300,
  fontSize: '28px',
  lineHeight: '36px',
  color: '#FCFCFC',
  [theme.breakpoints.down('md')]: {
    fontSize: '22px',
    lineHeight: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'EYInterstate, sans-serif',
  fontWeight: 700,
  fontSize: '28px',
  lineHeight: '36px',
  textAlign: 'right',
  color: '#FCFCFC',
  [theme.breakpoints.down('md')]: {
    fontSize: '22px',
    lineHeight: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

/**
 * DetailedModal component that displays detailed information based on the Figma design
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.data - Data to display in the modal
 */
const DetailedModal = ({ isOpen, onClose, data, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const initialPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isDragging]);

  useEffect(() => {
    if (data && isOpen) {
      // useful debug log; remove in production if noisy
      // eslint-disable-next-line no-console
      console.log(`DetailedModal data loaded: ${data.title || 'no title'}`);
      
      // Play frame sound when modal is opened
      // The sound coordination system will handle any overlapping sounds
      playFrameSound();
    }
  }, [data, isOpen]);

  const handleMouseDown = (e) => {
    // Only start drag if clicking inside draggable paper (dragRef)
    if (dragRef.current && dragRef.current.contains(e.target)) {
      setIsDragging(true);
      initialPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - initialPos.current.x,
        y: e.clientY - initialPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Tab item component (kept local)
  const TabItem = ({ label, isActive, onClick, index }) => (
    <Box
      onClick={() => onClick(index)}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      sx={{
        padding: 0,
        gap: '6px',
        isolation: 'isolate',
        width: '337px',
        minWidth: '240px',
        maxWidth: '520px',
        height: '80px',
        borderRadius: '8px',
        position: 'relative',
        mb: 1,
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          opacity: 0.9,
        },
        [theme => theme.breakpoints.down('md')]: {
          width: '100%',
          height: '70px',
        },
        [theme => theme.breakpoints.down('sm')]: {
          height: '60px',
          minWidth: '200px',
        }
      }}
    >
      {/* Background */}
      <Box sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#0B696B',
        opacity: isActive ? 0.6 : (hoveredIndex === index ? 0.45 : 0.3),
        borderRadius: '8px',
      }} />

      {/* Content */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        gap: '12px',
        position: 'absolute',
        width: '237px',
        minWidth: '184px',
        height: '30px',
        left: '24.6px',
        top: 'calc(50% - 15px)',
        [theme => theme.breakpoints.down('sm')]: {
          left: '15px',
          width: '160px',
        }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          width: '184px',
          height: '30px',
        }}>
          <Typography
            sx={{
              width: '184px',
              height: '30px',
              fontFamily: 'EYInterstate, sans-serif',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30px',
              color: '#F6F6FA',
              [theme => theme.breakpoints.down('md')]: {
                fontSize: '18px',
                lineHeight: '24px',
              },
              [theme => theme.breakpoints.down('sm')]: {
                fontSize: '16px',
                lineHeight: '20px',
              },
            }}
          >
            {label}
          </Typography>
        </Box>
      </Box>

      {/* Icon circle on the right */}
      <Box sx={{
        position: 'absolute',
        width: '53px',
        height: '53px',
        left: '268px',
        top: '14px',
        [theme => theme.breakpoints.down('md')]: {
          left: 'calc(100% - 69px)',
        },
        [theme => theme.breakpoints.down('sm')]: {
          width: '40px',
          height: '40px',
          top: '10px',
          left: 'calc(100% - 55px)',
        }
      }}>
        <Box sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#1D8583',
          borderRadius: '50%',
        }} />

        <Box sx={{
          position: 'absolute',
          left: '18.87%',
          right: '18.24%',
          top: '16.98%',
          bottom: '20.13%',
          borderRadius: '200px',
        }}>
          <Box sx={{
            position: 'absolute',
            left: '29.87%',
            right: '29.25%',
            top: '27.98%',
            bottom: '31.13%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
          }} />

          {isActive && (
            <Box sx={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              left: 'calc(50% - 24px/2 + 0.5px)',
              top: 'calc(50% - 24px/2 + 0.5px)',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              [theme => theme.breakpoints.down('sm')]: {
                width: '18px',
                height: '18px',
              }
            }} />
          )}
        </Box>
      </Box>
    </Box>
  );

  // Default modal data if none provided
  const modalData = {
    title: 'Carbon Footprint',
    subtitle: 'Total Emissions - 0.08 kg CO2',
    badgeTitle: 'Green Champion',
    badgeValue: '3000 pts',
    metrics: [
      { name: 'Electricity Quality', value: '30%', color: '#70CDDD' },
      { name: 'Effective Acceleration', value: '45%', color: '#157B66' },
      { name: 'Slow charging', value: '22%', color: '#00ABDA' },
      { name: 'Braking Regeneration', value: '17%', color: '#467C94' },
      { name: 'Speeding', value: '68%', color: '#04BB65' }
    ],
    alert: {
      title: 'You have been running on low charge.',
      subtitle: 'Nearest charging station is 10 miles away.',
      timeLeft: '30 min left'
    },
    tabs: [
      'Overall',
      'Speeding',
      'Braking',
      'Slow Charging',
      'Effective Acceleration',
      'Electricity Quality'
    ]
  };

  const effectiveData = data || modalData;
  const tabs = effectiveData.tabs || modalData.tabs;
  const metrics = effectiveData.metrics || modalData.metrics;

  // If no data provided at all, render children (same behavior you had)
  if (!data && children) {
    return (
      <StyledDialog
        open={isOpen}
        onClose={onClose}
        fullWidth
      >
        <DialogContent>{children}</DialogContent>
      </StyledDialog>
    );
  }

  const handleTabChange = (index) => {
    // eslint-disable-next-line no-console
    console.log(`DetailedModal: Tab changed to ${index}`);
    setActiveTab(index);
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={() => {
        // eslint-disable-next-line no-console
        console.log('DetailedModal: Modal closed');
        onClose();
      }}
      fullWidth
      PaperProps={{
        ref: dragRef,
        onMouseDown: handleMouseDown,
        style: {
          backgroundColor: 'rgba(5, 2, 10, 0.55)',
          transform: `translate(${position.x}px, ${position.y}px)`,
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ position: 'relative', width: '100%', mb: 3, px: 3 }}>
          <Box sx={{ maxWidth: '100%' }}>
            <HeaderTitle variant="h1">{effectiveData.title}</HeaderTitle>
            <HeaderSubtitle variant="h2">{effectiveData.subtitle}</HeaderSubtitle>
          </Box>

          <Box sx={{
            position: 'absolute',
            right: 40,
            top: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 3
          }}>
            <BadgeIcon>🏆</BadgeIcon>
            <Box>
              <HeaderTitle variant="h1">{effectiveData.badgeTitle || modalData.badgeTitle}</HeaderTitle>
              <HeaderSubtitle variant="h2">{effectiveData.badgeValue || modalData.badgeValue}</HeaderSubtitle>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: '#1D8583', my: 3, width: '100%' }} />

        {/* Main content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: isMobile ? 'row' : 'column',
                overflowX: isMobile ? 'auto' : 'visible',
                overflowY: isMobile ? 'visible' : 'auto',
                gap: 1,
                width: '100%',
                pb: isMobile ? 2 : 0,
                '&::-webkit-scrollbar': {
                  width: '0.25rem',
                  height: '0.25rem',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#1D8583',
                  borderRadius: '0.25rem',
                },
              }}
            >
              {tabs.map((tab, index) => (
                <TabItem
                  key={index}
                  label={tab}
                  isActive={activeTab === index}
                  onClick={handleTabChange}
                  index={index}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ position: 'relative', height: isTablet ? 'auto' : '36.03125rem', width: '100%' }}>
              {/* Chart (static svg) */}
              <Box sx={{
                position: isTablet ? 'relative' : 'absolute',
                width: isTablet ? '100%' : '25.65625rem',
                height: isTablet ? '25.65625rem' : '25.65625rem',
                left: isTablet ? 'auto' : '17.9375rem',
                top: isTablet ? 'auto' : '8.34375rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: isTablet ? 4 : 0,
                border: process.env.NODE_ENV === 'development' ? '0.0625rem dashed rgba(255,255,255,0.2)' : 'none',
                '& canvas': {
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '25.6875rem !important',
                  height: '25.6875rem !important'
                }
              }}>
                <svg width="411" height="411" viewBox="0 0 411 411" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M347.911 57.6851C378.622 87.3753 399.304 125.907 407.075 167.91L306.163 186.58C302.277 165.579 291.936 146.313 276.581 131.468L347.911 57.6851Z" fill="#00ABDA"/>
                  <path d="M407.065 167.859C412.159 195.348 411.582 223.588 405.371 250.847L305.311 228.048C308.416 214.419 308.704 200.299 306.158 186.554L407.065 167.859Z" fill="#467C94"/>
                  <path d="M405.061 252.187C394.859 295.619 370.782 334.545 336.477 363.069C302.173 391.594 259.508 408.164 214.943 410.271C170.378 412.378 126.34 399.907 89.4969 374.746C52.6541 349.585 25.0127 313.104 10.7581 270.828L108.004 238.039C115.131 259.177 128.952 277.417 147.373 289.998C165.795 302.578 187.814 308.814 210.096 307.76C232.379 306.707 253.711 298.422 270.864 284.16C288.016 269.897 300.054 250.435 305.156 228.718L405.061 252.187Z" fill="#04BB65"/>
                  <path d="M10.9804 271.483C-6.09188 221.409 -3.16913 166.676 19.1388 118.704C41.4468 70.7324 81.4168 33.2272 130.71 14.0138L167.98 109.632C143.333 119.239 123.348 137.991 112.194 161.977C101.04 185.963 99.5791 213.329 108.115 238.367L10.9804 271.483Z" fill="#157B66"/>
                  <path d="M130.307 14.1711C166.905 -0.182796 206.855 -3.72466 245.407 3.96666C283.959 11.658 319.491 30.2589 347.779 57.5577L276.515 131.404C262.371 117.754 244.605 108.454 225.328 104.608C206.052 100.763 186.077 102.534 167.779 109.711L130.307 14.1711Z" fill="#70CDDD"/>
                </svg>
              </Box>

              {/* Metrics & connectors */}
              <Box sx={{
                position: 'relative',
                width: '100%',
                height: isTablet ? 'auto' : '36.03125rem',
                display: isTablet ? 'flex' : 'block',
                flexDirection: 'column',
                gap: 2
              }}>
                {/* SVG connector lines only for non-tablet/desktop (kept from your design) */}
                {!isTablet && (
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                    {/* connectors (same as before) */}
                    <svg width="333" height="139" viewBox="0 0 333 139" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '6.25rem',
                        left: '28.125rem',
                        transformOrigin: 'left center',
                      }}>
                      <path d="M3 136L67.5475 3H330" stroke="#70CDDD" strokeWidth="0.375rem" strokeLinecap="round" />
                    </svg>

                    <svg width="380" height="139" viewBox="0 0 380 139" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '13.75rem',
                        left: '0rem',
                        transformOrigin: 'right center',
                      }}>
                      <path d="M377 136L303.175 3H3.00002" stroke="#157B66" strokeWidth="0.375rem" strokeLinecap="round" />
                    </svg>

                    <svg width="427" height="81" viewBox="0 0 427 81" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '13.5rem',
                        left: '39rem',
                        transformOrigin: 'left center',
                      }}>
                      <path d="M3 3L94 78H424" stroke="#00ABDA" strokeWidth="0.375rem" strokeLinecap="round" />
                    </svg>

                    <svg width="428" height="76" viewBox="0 0 428 76" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '20rem',
                        left: '39rem',
                        transformOrigin: 'left center',
                      }}>
                      <path d="M3 3L86.2998 73H425" stroke="#467C94" strokeWidth="0.375rem" strokeLinecap="round" />
                    </svg>

                    <svg width="428" height="72" viewBox="0 0 428 72" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        top: '30.5625rem',
                        left: '0rem',
                        transformOrigin: 'right center',
                      }}>
                      <path d="M425 3L341.7 69H3" stroke="#04BB65" strokeWidth="0.375rem" strokeLinecap="round" />
                    </svg>
                  </Box>
                )}

                {metrics.map((metric, index) => {
                  // positioning rules same as original (kept)
                  const metricStyles = {
                    0: {
                      position: isTablet ? 'relative' : 'absolute',
                      left: isTablet ? 'auto' : '43.75rem',
                      top: isTablet ? 'auto' : '1.5rem',
                      width: '12.5rem',
                      zIndex: 2,
                    },
                    1: {
                      position: isTablet ? 'relative' : 'absolute',
                      left: isTablet ? 'auto' : '0rem',
                      top: isTablet ? 'auto' : '15.625rem',
                      width: '12.5rem',
                      zIndex: 2,
                    },
                    2: {
                      position: isTablet ? 'relative' : 'absolute',
                      left: isTablet ? 'auto' : '50rem',
                      top: isTablet ? 'auto' : '12.5rem',
                      width: '12.5rem',
                      zIndex: 2,
                    },
                    3: {
                      position: isTablet ? 'relative' : 'absolute',
                      left: isTablet ? 'auto' : '50rem',
                      top: isTablet ? 'auto' : '18.75rem',
                      width: '12.5rem',
                      zIndex: 2,
                    },
                    4: {
                      position: isTablet ? 'relative' : 'absolute',
                      left: isTablet ? 'auto' : '0rem',
                      top: isTablet ? 'auto' : '30rem',
                      width: '12.5rem',
                      zIndex: 2,
                    },
                  };

                  return (
                    <Box key={index} sx={metricStyles[index] || { position: 'relative', width: '100%', zIndex: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <MetricNameStyled>{metric.name}</MetricNameStyled>
                        <MetricValue>{metric.value}</MetricValue>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Alert */}
        {effectiveData.alert && (
          <Alert
            severity="error"
            icon={<span style={{ fontSize: 18 }}>⚠️</span>}
            sx={{
              mt: 3,
              backgroundColor: '#610402',
              border: '0.0625rem solid #EA011D',
              color: '#FF735E',
              borderRadius: '0.5rem',
              '& .MuiAlert-message': {
                width: '100%',
              }
            }}
            action={
              <Chip
                label={effectiveData.alert.timeLeft || modalData.alert.timeLeft}
                sx={{
                  backgroundColor: '#B20B00',
                  color: '#DEDEE2',
                  fontFamily: 'EYInterstate, sans-serif',
                  fontSize: isMobile ? '1rem' : '1.375rem',
                  height: isMobile ? '1.75rem' : '2.125rem',
                  borderRadius: '1rem',
                }}
              />
            }
          >
            <AlertTitle sx={{
              fontFamily: 'EYInterstate, sans-serif',
              fontWeight: 400,
              fontSize: isMobile ? '1.25rem' : '2.125rem',
              lineHeight: isMobile ? '1.625rem' : '2.625rem',
              letterSpacing: '-0.02em',
              color: '#FF735E',
            }}>
              {effectiveData.alert.title}
            </AlertTitle>
            <Typography sx={{
              fontFamily: 'EYInterstate, sans-serif',
              fontWeight: 300,
              fontSize: isMobile ? '1rem' : '1.624875rem',
              lineHeight: isMobile ? '1.375rem' : '2rem',
              color: '#FF735E',
            }}>
              {effectiveData.alert.subtitle}
            </Typography>
          </Alert>
        )}
      </DialogContent>
    </StyledDialog>
  );
};

export default DetailedModal;

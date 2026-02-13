import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

/**
 * ResourceAlert Component - Shows an alert about resource availability
 */
const ResourceAlert = ({ resourceName = 'Energy', percentage = 35, onClose }) => {
  return (
    <Box
      sx={{
        width: '280px',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
        border: '2px solid #ef4444',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          color: '#ef4444',
          padding: '4px',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </IconButton>

      {/* Alert icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </Box>
        <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 600, fontSize: '1rem' }}>
          Low {resourceName} Alert
        </Typography>
      </Box>

      {/* Alert content */}
      <Box sx={{ marginLeft: '52px' }}>
        <Typography variant="body2" sx={{ color: '#ef4444', marginBottom: '8px', fontSize: '0.875rem' }}>
          {resourceName} level is critically low:
        </Typography>
        
        {/* Progress bar */}
        <Box sx={{ position: 'relative', height: '8px', backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '4px', marginBottom: '8px' }}>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: '#ef4444',
              borderRadius: '4px',
            }}
          />
        </Box>
        
        <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 600, fontSize: '0.875rem' }}>
          {percentage}% remaining
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#ef4444', marginTop: '8px', fontSize: '0.75rem' }}>
          Please find a charging station soon to avoid service interruption.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResourceAlert;

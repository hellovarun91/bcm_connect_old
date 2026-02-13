import React from 'react';

const VideoLoadingPlaceholder = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'opacity 0.3s ease-out'
    }}>
      {/* Animated loading indicator */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {/* Spinning loader */}
        <div style={{
          width: '60px',
          height: '60px',
          border: '3px solid rgba(6, 182, 212, 0.3)',
          borderTop: '3px solid #06b6d4',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        
        {/* Loading text */}
        <div style={{
          color: '#06b6d4',
          fontSize: '1.1rem',
          fontWeight: '600',
          fontFamily: 'Interstate, sans-serif',
          letterSpacing: '0.5px'
        }}>
          Loading Experience...
        </div>
        
        {/* Progress dots */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#06b6d4',
                animation: `pulse-dot 1.5s ease-in-out ${i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-dot {
          0%, 80%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          40% { 
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoLoadingPlaceholder;

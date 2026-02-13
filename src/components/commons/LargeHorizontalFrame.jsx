import React from "react";
import largeHorizontalFrameIcon from "../../assets/HUD-summary-2026.webp";
import SinglePlayGif from "./SinglePlayGif";
import PropTypes from 'prop-types';
import { getTypographyPreset } from '../../constants/typography';

/**
 * LargeHorizontalFrame component for displaying content in a large horizontal styled container
 * 
 * @param {Object} props - Component props
 * @param {string} [props.typographyPreset] - Optional preset for consistent typography ('small', 'medium', 'large')
 */
const LargeHorizontalFrame = ({
  typographyPreset,
  width = "77rem",
  height = "18rem",
  title,
  titleStyle = {},
  description,
  details = [],
  keyPoints = [],
  rows = [],
  rowStyle = {},
  keyPointStyle = {},
  buttonText,
  showButton = false,
  overlayTop = "50%",
  overlayLeft = "50%",
  overlayWidth = "95%",
  overlayHeight = "85%",
  overlayZIndex = 1,
  overlayBorderRadius = 12,
  blackBandWidth,
  blackBandHeight,
  contentPadding = '2rem',
  compact = true,
  children,
}) => {
  const parsedWidth = parseInt(width, 10);
  
  // Get typography preset if specified, otherwise use null
  const typography = typographyPreset ? getTypographyPreset(typographyPreset) : null;
  
  // Calculate font sizes based on preset or existing logic
  const defaultTitleSize = '1.1rem';
  const defaultDescSize = '0.9rem';
  const defaultDetailSize = '0.875rem';
  const defaultKeyPointSize = '0.875rem';
  const defaultButtonSize = '0.75rem';
  
  // Use preset values if available, otherwise use defaults
  const finalTitleSize = typography?.title || defaultTitleSize;
  const finalDescSize = typography?.description || defaultDescSize;
  const finalDetailSize = typography?.rowLabel || defaultDetailSize;
  const finalKeyPointSize = typography?.keyPoint || defaultKeyPointSize;
  const finalButtonSize = typography?.button || defaultButtonSize;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 12,
        overflow: "visible",
      }}
    >
      <SinglePlayGif
        src={largeHorizontalFrameIcon}
        staticSrc={largeHorizontalFrameIcon}
        alt="frame"
        duration={2500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: overlayTop,
          left: overlayLeft,
          transform: "translate(-50%, -50%)",
          width: blackBandWidth || overlayWidth,
          height: blackBandHeight || overlayHeight,
          background: "rgba(0,0,0,0.65)",
          borderRadius: overlayBorderRadius,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          padding: contentPadding,
          position: 'relative',
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          zIndex: 2,
          height: "100%",
        }}
      >
        {/* Title */}
        {title && (
          <h3
            style={{ 
              color: "#FFE600", 
              margin: "0 0 1rem 0", 
              fontSize: finalTitleSize, 
              fontWeight: 700,
              lineHeight: 1.2,
              ...titleStyle,
            }}
          >
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p
            style={{
              color: "#ffffff",
              margin: "0 0 1rem 0",
              fontSize: finalDescSize,
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        )}

        {/* Details */}
        {details.length > 0 && (
          <div style={{ marginBottom: "1rem", width: "100%" }}>
            {details.map((detail, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  fontSize: finalDetailSize,
                }}
              >
                <span style={{ color: "#ffffff", fontWeight: 400 }}>
                  {detail.label}
                </span>
                <span style={{ color: "#ffffff", fontWeight: 600 }}>
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Rows */}
        {rows.length > 0 && (
          <div style={{ marginBottom: "1rem", width: "100%" }}>
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  width: "100%",
                  marginBottom: 5,
                  ...rowStyle,
                }}
              >
                {row.map((item, colIndex) => (
                  <div
                    key={colIndex}
                    style={{
                      display: "flex",
                      width: "100%",
                      padding: "5px 0",
                      borderBottom: rowIndex < rows.length - 1 ? "1px solid rgba(6, 182, 212, 0.2)" : "none",
                    }}
                  >
                    <div style={{ color: "#ffffff", fontWeight: 400, fontSize: finalDetailSize, flex: 1 }}>
                      {item.label}
                    </div>
                    <div style={{ color: "#ffffff", fontWeight: 600, fontSize: finalDetailSize }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div style={{ marginBottom: showButton ? "1rem" : "0", width: "100%" }}>
            {keyPoints.map((point, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                  fontSize: finalKeyPointSize,
                  color: "#ffffff",
                  lineHeight: 1.6,
                  ...keyPointStyle,
                }}
              >
                <span>
                  <span style={{ color: "#06b6d4", marginRight: "8px" }}>●</span>
                  {point}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Custom Children Content */}
        {children && (
          <div style={{ width: "100%", flex: 1 }}>
            {children}
          </div>
        )}
      </div>

      {/* Button */}
      {showButton && (
        <button
          style={{
            position: "absolute",
            bottom: compact ? "1.5rem" : "2rem",
            left: compact ? "2rem" : "2.5rem",
            right: compact ? "2rem" : "2.5rem",
            background: "rgba(6, 182, 212, 0.1)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            borderRadius: 8,
            color: "#06b6d4",
            padding: "0.75rem 1.5rem",
            fontSize: finalButtonSize,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            zIndex: 3,
          }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default LargeHorizontalFrame;

LargeHorizontalFrame.propTypes = {
  typographyPreset: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  description: PropTypes.string,
  details: PropTypes.array,
  keyPoints: PropTypes.array,
  rows: PropTypes.array,
  rowStyle: PropTypes.object,
  keyPointStyle: PropTypes.object,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  overlayTop: PropTypes.string,
  overlayLeft: PropTypes.string,
  overlayWidth: PropTypes.string,
  overlayHeight: PropTypes.string,
  overlayZIndex: PropTypes.number,
  overlayBorderRadius: PropTypes.number,
  blackBandWidth: PropTypes.string,
  blackBandHeight: PropTypes.string,
  contentPadding: PropTypes.string,
  compact: PropTypes.bool,
  children: PropTypes.node,
};

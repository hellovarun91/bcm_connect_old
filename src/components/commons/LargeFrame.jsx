import React from "react";
import largeFrameIcon from "./large-frame.gif";
import largeFrameStatic from "./large-frame-static.png";
import SinglePlayGif from "./SinglePlayGif";
import PropTypes from 'prop-types';
// Import typography constants
import { TYPOGRAPHY, getTypographyPreset } from '../../constants/typography';

/**
 * LargeFrame component for displaying content in a larger styled container
 * 
 * @param {Object} props - Component props
 * @param {string} [props.typographyPreset] - Optional preset for consistent typography ('small', 'medium', 'large')
 * @param {string} [props.width='30rem'] - Width of the frame
 * @param {string} [props.height='20rem'] - Height of the frame
 * @param {string} [props.title] - Title text
 * @param {Object} [props.titleStyle] - Custom styles for title (overrides preset)
 * @param {string} [props.description] - Description text
 * @param {Array} [props.details=[]] - Details to display
 * @param {Array} [props.keyPoints=[]] - Key points to display
 * @param {Array} [props.rows=[]] - Rows of data to display
 * @param {Object} [props.rowStyle] - Custom styles for rows
 * @param {Object} [props.keyPointStyle] - Custom styles for key points
 */
const LargeFrame = ({
  // New prop for typography preset
  typographyPreset,
  width = "30rem",
  height = "20rem",
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
  contentPadding = '1.5rem',
  compact = true,
  children,
}) => {
  const parsedWidth = parseInt(width, 10);
  
  // Get typography preset if specified, otherwise use null
  const typography = typographyPreset ? getTypographyPreset(typographyPreset) : null;
  
  // Calculate font sizes based on preset or existing logic
  const defaultTitleSize = parsedWidth < 18 ? '0.85rem' : '1rem';
  const defaultDescSize = parsedWidth < 18 ? '0.75rem' : '0.875rem';
  const defaultDetailSize = parsedWidth < 18 ? '0.75rem' : '0.875rem';
  const defaultKeyPointSize = parsedWidth < 18 ? '0.75rem' : '0.875rem';
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
      {/* Background Frame SVG */}
      <SinglePlayGif
        src={largeFrameIcon}
        staticSrc={largeFrameStatic}
        alt="frame"
        duration={2500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
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
        }}
      >
        {/* Title */}
        {title && (
          <h3
            style={{ 
              color: "#FFE600", 
              margin: "0 0 0.5rem 0", 
              fontSize: finalTitleSize, 
              fontWeight: 700,
              lineHeight: 1.2,
              padding: "1rem",
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
              margin: "0 0 0.75rem 0",
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
          <div style={{ marginBottom: "0.75rem", width: "100%" }}>
            {details.map((detail, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
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
          <div style={{ marginBottom: "0.75rem", width: "100%" }}>
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  width: "100%",
                  marginBottom: 3,
                  ...rowStyle,
                }}
              >
                {row.map((item, colIndex) => (
                  <div
                    key={colIndex}
                    style={{
                      display: "flex",
                      width: "100%",
                      padding: "3px 0",
                      borderBottom: rowIndex < rows.length - 1 ? "1px solid rgba(6, 182, 212, 0.2)" : "none",
                    }}
                  >
                    <div style={{ color: "#ffffff", fontWeight: 400, fontSize: 11, flex: 1 }}>
                      {item.label}
                    </div>
                    <div style={{ color: "#ffffff", fontWeight: 600, fontSize: 11 }}>
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
          <div style={{ marginBottom: showButton ? "0.75rem" : "0", width: "100%" }}>
            {keyPoints.map((point, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                  fontSize: finalKeyPointSize,
                  color: "#ffffff",
                  lineHeight: 1.6,
                  ...keyPointStyle,
                }}
              >
                <span>
                  <span style={{ color: "#e6eff0ff", marginRight: "4px" }}>►</span>
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
            bottom: compact ? "1rem" : "1.5rem",
            left: compact ? "1rem" : "1.5rem",
            right: compact ? "1rem" : "1.5rem",
            background: "rgba(6, 182, 212, 0.1)",
            border: "1px solid rgba(6, 182, 212, 0.3)",
            
            color: "#06b6d4",
            padding: "0.5rem 1rem",
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

export default LargeFrame;

LargeFrame.propTypes = {
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
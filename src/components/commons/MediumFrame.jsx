import React from "react";
import FrameSVG from "./frame-1.webp";
import FrameStatic from "./frame-1-static.png";
import SinglePlayGif from "./SinglePlayGif";
import PropTypes from 'prop-types';
import { getTypographyPreset } from '../../constants/typography';

/**
 * MediumFrame component for displaying content in a medium-sized styled container
 * 
 * @param {Object} props - Component props
 * @param {string} [props.typographyPreset] - Optional preset for consistent typography ('small', 'medium', 'large')
 */
const MediumFrame = ({
  typographyPreset,
  width = "20rem",
  height = "12rem",
  title,
  description,
  details = [],
  keyPoints = [],
  rows = [],
  rowStyle = {},
  keyPointStyle = {},
  buttonText,
  showButton = false,
  compact = true,
  children,
}) => {
  const parsedWidth = parseInt(width, 10);
  
  // Get typography preset if specified, otherwise use null
  const typography = typographyPreset ? getTypographyPreset(typographyPreset) : null;
  
  // Calculate font sizes based on preset or existing logic
  const defaultTitleSize = parsedWidth < 18 ? '0.875rem' : '1rem';
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
        src={FrameSVG}
        staticSrc={FrameStatic}
        alt="frame"
        duration={2500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: compact ? '1.5rem' : '2rem',
          left: compact ? '1.5rem' : '2rem',
          right: compact ? '1.5rem' : '2rem',
          bottom: showButton ? (compact ? '3.5rem' : '4rem') : (compact ? '1.5rem' : '2rem'),
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          zIndex: 2,
          overflow: 'auto',
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
            left: compact ? "1.5rem" : "2rem",
            right: compact ? "1.5rem" : "2rem",
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

export default MediumFrame;

MediumFrame.propTypes = {
  typographyPreset: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  details: PropTypes.array,
  keyPoints: PropTypes.array,
  rows: PropTypes.array,
  rowStyle: PropTypes.object,
  keyPointStyle: PropTypes.object,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  compact: PropTypes.bool,
  children: PropTypes.node,
};
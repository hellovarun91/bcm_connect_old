// src/components/commons/Frame.jsx
import React from "react";
import FrameSVG from "./frame-1.gif";
import FrameStatic from "./frame-1-static.png";
import SinglePlayGif from "./SinglePlayGif";
// Import MagicBento CSS for styles
import "./MagicBento.css";
import PropTypes from 'prop-types';
// Import typography constants
import { TYPOGRAPHY, getTypographyPreset } from '../../constants/typography';

/**
 * Frame component for displaying content in a styled container
 * 
 * @param {Object} props - Component props
 * @param {string} [props.typographyPreset] - Optional preset for consistent typography ('small', 'medium', 'large')
 * @param {string} [props.width='24rem'] - Width of the frame
 * @param {string} [props.height='26rem'] - Height of the frame
 * @param {string} [props.title] - Title text
 * @param {Object} [props.titleStyle] - Custom styles for title (overrides preset)
 * @param {string} [props.description] - Description text
 * @param {Object} [props.descriptionStyle] - Custom styles for description (overrides preset)
 * @param {Array} [props.details=[]] - Details to display
 * @param {Array} [props.rows=[]] - Rows of data to display
 * @param {Object} [props.rowStyle] - Custom styles for rows
 * @param {Object} [props.rowLabelStyle] - Custom styles for row labels
 * @param {Object} [props.rowValueStyle] - Custom styles for row values
 * @param {Array} [props.keyPoints=[]] - Key points to display
 * @param {Object} [props.keyPointStyle] - Custom styles for key points
 */
const Frame = ({  
  // New prop for typography preset
  typographyPreset,
  width = "24rem",
  height = "26rem",
  title,
  titleIconSrc,
  titleIconStyle = {},
  titleStyle = {},
  padding,
  margin,
  description,
  descriptionStyle = {},
  details = [],
  keyPointsTitle,
  keyPointsTitleStyle = {},
  keyPoints = [],
  rows = [],
  rowStyle = {},
  rowContainerStyle = {},
  rowLabelStyle = {},
  rowValueStyle = {},
  keyPointStyle = {},
  buttonText,
  showButton = false,
  onButtonClick,

  noBackground = false,
  buttonStyle = {},
  buttonDisabled = false,
  blackBandWidth = "93%",
  blackBandHeight = "87%",
  overlayTop = "49%",
  overlayLeft = "50%",
  overlayWidth,
  overlayHeight,
  overlayZIndex = 0,
  overlayBorderRadius = 12,
  boldValues = true,
  children,
  bodyStyle={}
}) => {
  const parsedWidth = parseInt(width, 10);
  
  // Get typography preset if specified, otherwise use null
  const typography = typographyPreset ? getTypographyPreset(typographyPreset) : null;
  
  // Calculate font sizes based on preset or existing logic
  const defaultTitleSize = parsedWidth < 12 ? '0.875rem' : '1.25rem';
  const defaultDescSize = '0.75rem';
  const defaultRowLabelSize = '14px';
  const defaultKeyPointSize = '13px';
  const defaultButtonSize = '14px';
  
  // Use preset values if available, otherwise use defaults
  const finalTitleSize = typography?.title || defaultTitleSize;
  const finalDescSize = typography?.description || defaultDescSize;
  const finalRowLabelSize = typography?.rowLabel || defaultRowLabelSize;
  const finalRowValueSize = typography?.rowValue || defaultRowLabelSize;
  const finalKeyPointSize = typography?.keyPoint || defaultKeyPointSize;
  const finalButtonSize = typography?.button || defaultButtonSize;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >

      {/* Background Frame with Diagonal Wipe */}
      <div style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden"
      
      }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: overlayTop,

              left: overlayLeft,
              transform: "translate(-50%, -50%)",
              width: overlayWidth || blackBandWidth,
              height: overlayHeight || blackBandHeight,
              background: "rgba(0,0,0,0.65)",
              borderRadius: overlayBorderRadius,
              pointerEvents: "none",
              zIndex: overlayZIndex,
            }}
          />
          <SinglePlayGif
            src={FrameSVG}
            staticSrc={FrameStatic}
            alt="frame"
            duration={2500}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 1,
              zIndex: 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          margin,
          position: "absolute",
          inset: padding ?? '2.5rem',
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          textAlign: "left",
          zIndex: 2,
          ...bodyStyle
        }}
      >
        <div 
        style={
          {width:"100%"}
        }>
          {(title || titleIconSrc) && (
            <h3 
              style={{ 
                color: "#FFD54F", 
                margin: "0 0 0.5rem 0", 
                fontSize: finalTitleSize, 
                fontWeight: 700,
                width: '100%',
                textAlign: 'left',
                ...titleStyle
              }}
            >
              {title}
              {titleIconSrc && (
                <img
                  src={titleIconSrc}
                  alt=""
                  style={{ width: '1.25rem', height: '1.25rem', objectFit: 'contain', ...(titleIconStyle || {}) }}
                />
              )}
            </h3>
          )}
          {description && (
            <p style={{ color: "#fff", fontSize: finalDescSize, margin: "0.375rem 0 0.75rem", ...descriptionStyle }}>
              {description}
            </p>
          )}

          {details.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: '0.5rem',
                marginBottom: '0.625rem',
                flexWrap: "wrap",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {details.slice(0, 2).map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    padding: "0.375rem 0.5rem",
                    borderRadius: '0.5rem',
                    flex: 1,
                  }}
                >
                  <div style={{ fontSize: finalRowLabelSize, color: "#ccc", ...rowLabelStyle }}>
                    {d.label}
                  </div>
                  <div
                    style={{
                      color: "#FFD54F",
                      fontWeight: boldValues ? 700 : 400,
                      textAlign: 'left',
                      ...rowValueStyle,
                    }}
                  >
                    {d.value}
                  </div>
                </div>
              ))}
            </div>  

          )}
          
          {rows.length > 0 && (
            <div style={{ width: "100%", marginBottom: 10 }}>
              {rows.map((row, rowIndex) => (
                <div 
                  key={rowIndex}
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 4,
                    ...rowContainerStyle,
                  }}
                >
                  {row.map((item, colIndex) => (
                    <div 
                      key={colIndex}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "4px 0",
                        borderBottom: "none",
                        ...(item.label === 'Battery Status' ? { marginTop: '12px' } : {}), 
                        ...rowStyle,
                      }}
                    >
                      <div style={{ fontSize: finalRowLabelSize, color: "#fff", ...rowLabelStyle, ...(item.label === 'Battery Status' ? { fontWeight: "bold" } : {}) }}>
                        {item.label}
                      </div>
                      <div style={{ 
                          color: "#FFD54F", 
                          fontWeight: boldValues ? (
                            // Apply font-weight 700 to specific values
                            (item.label === "Current Speed" || 
                             item.label === "Time Remaining" || 
                             item.label === "Session Cost So Far" || 
                             item.label === "CO₂ Saved This Session" || 
                             item.label === "Charging Green Score") ? 700 : 600
                          ) : 400,
                          marginLeft: "0.5rem",
                          textAlign: 'left',
                          ...rowValueStyle,
                          ...(item.valueStyle || {}),
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {keyPointsTitle && (
            <div style={{ color: "#fff", fontSize: finalKeyPointSize, fontWeight: 300, marginBottom: 4, ...keyPointsTitleStyle }}>
              {keyPointsTitle}
            </div>
          )}
          {keyPoints.length > 0 && (
            <div style={{ width: "100%", textAlign: "left", marginBottom: 10 }}>
              {keyPoints.map((point, index) => {
                const pointText = typeof point === 'string' ? point : (point?.text || '');
                const pointExtraStyle = typeof point === 'string' ? {} : (point?.style || {});
                const normalizedText = (pointText || '').replace(/^[►▶]\s*/, '');
                return (
                  <div 
                    key={index}
                    style={{
                      color: "#fff",
                      fontSize: finalKeyPointSize,
                      fontWeight: 300,
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 6,
                      lineHeight: 1.6,
                      ...keyPointStyle,
                      ...pointExtraStyle,
                    }}
                  >
                    <span>
                      ► {normalizedText}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          {children}
          {showButton && (
            <button
              disabled={buttonDisabled}
              onClick={(e) => {
                if (buttonDisabled || typeof onButtonClick !== 'function') return;
                e.stopPropagation();
                onButtonClick(e);
              }}
              style={{
                padding: "8px 16px",
                cursor: !buttonDisabled && typeof onButtonClick === 'function' ? "pointer" : "default",
                pointerEvents: !buttonDisabled && typeof onButtonClick === 'function' ? "auto" : "none",
                fontWeight: boldValues ? 600 : 400,
                fontSize: finalButtonSize,
                color: "#ffffff",
                transition: 'all 0.2s ease',
                opacity: 1,
                ...(buttonStyle || {})
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Frame;

Frame.propTypes = {
  typographyPreset: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  titleIconSrc: PropTypes.string,
  titleIconStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  padding: PropTypes.string,
  margin: PropTypes.string,
  description: PropTypes.string,
  descriptionStyle: PropTypes.object,
  details: PropTypes.array,
  keyPointsTitle: PropTypes.string,
  keyPointsTitleStyle: PropTypes.object,
  keyPoints: PropTypes.array,
  rows: PropTypes.array,
  rowStyle: PropTypes.object,
  rowContainerStyle: PropTypes.object,
  rowLabelStyle: PropTypes.object,
  rowValueStyle: PropTypes.object,
  keyPointStyle: PropTypes.object,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  onButtonClick: PropTypes.func,
  noBackground: PropTypes.bool,
  buttonStyle: PropTypes.object,
  buttonDisabled: PropTypes.bool,
  blackBandWidth: PropTypes.string,
  blackBandHeight: PropTypes.string,
  overlayTop: PropTypes.string,
  overlayLeft: PropTypes.string,
  overlayBorderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

Frame.defaultProps = {
  width: "24rem",
  height: "26rem",
  details: [],
  keyPointsTitle: undefined,
  keyPointsTitleStyle: {},
  keyPoints: [],
  rows: [],
  rowStyle: {},
  rowContainerStyle: {},
  rowLabelStyle: {},
  rowValueStyle: {},
  keyPointStyle: {},
  descriptionStyle: {},
  showButton: false,
  onButtonClick: () => {},
  noBackground: false,
  buttonStyle: {},
  buttonDisabled: false,
  blackBandWidth: "93%",
  blackBandHeight: "87%",
  overlayTop: "49%",
  overlayLeft: "50%",
  overlayBorderRadius: 12,
  titleIconSrc: undefined,
  titleIconStyle: {},
  titleStyle: {},
  children: undefined,
};
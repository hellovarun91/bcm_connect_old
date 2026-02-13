import React from "react";
import SmallFrameSVG from "./small-frame.gif";
import SmallFrameStatic from "./small-frame-static.png";
import SinglePlayGif from "./SinglePlayGif";
import PropTypes from 'prop-types';
import { getTypographyPreset } from '../../constants/typography';

/**
 * SmallFrame component for displaying content in a compact styled container
 * 
 * @param {Object} props - Component props
 * @param {string} [props.typographyPreset] - Optional preset for consistent typography ('small', 'medium', 'large')
 */
const SmallFrame = ({
  typographyPreset,
  width = "16rem",
  height = "8rem",
  title,
  description,
  details = [],
  keyPoints = [],
  rows = [],
  rowStyle = { fontSize: '0.8rem' },
  keyPointStyle = { fontSize: '0.8rem' },
  titleStyle = { fontSize: '1rem' },
  descriptionStyle = { fontSize: '1rem' },
  rowLabelStyle = { fontSize: '0.8rem' },
  rowValueStyle = { fontSize: '1.4rem' },
  buttonStyle = { fontSize: '0.8rem' },
  buttonText,
  showButton = false,
  onButtonClick,
  disabled = false,
  boldValues = true,
  overlayTop = "34%",
  overlayWidth = "95%",
  overlayHeight = "60%",
  overlayZIndex = 1,
  overlayBorderRadius = 12,
  contentInset,
  compact = true,
  frameImageHeight,
  children,
  noFullHeight = false,
}) => {
  const parsedWidth = parseInt(width, 10);
  
  // Get typography preset if specified, otherwise use null
  const typography = typographyPreset ? getTypographyPreset(typographyPreset) : null;
  
  // Calculate font sizes based on preset or existing logic
  const defaultTitleSize = parsedWidth < 14 ? '0.75rem' : '0.875rem';
  const defaultDescSize = '1rem';
  const defaultRowLabelSize = '0.8rem';
  const defaultRowValueSize = '1.4rem';
  const defaultKeyPointSize = '0.8rem';
  const defaultButtonSize = '9px';
  
  // Use preset values if available, otherwise use defaults
  const finalTitleSize = typography?.title || defaultTitleSize;
  const finalDescSize = typography?.description || defaultDescSize;
  const finalRowLabelSize = typography?.rowLabel || defaultRowLabelSize;
  const finalRowValueSize = typography?.rowValue || defaultRowValueSize;
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
        src={SmallFrameSVG}
        staticSrc={SmallFrameStatic}
        alt="frame"
        duration={2500}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: frameImageHeight ?? (noFullHeight ? "auto" : "100%"),
          objectFit: "contain",
          zIndex: overlayZIndex + 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: overlayTop,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: overlayWidth,
          height: overlayHeight,
          background: "rgba(0,0,0,0.65)",
          borderRadius: overlayBorderRadius,
          pointerEvents: "none",
          zIndex: overlayZIndex,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: contentInset ?? (compact ? '1rem' : '1.5rem'),
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          zIndex: overlayZIndex + 2,
        }}
      >
        <div style={{ width: "100%" }}>
          <h3 
            style={{ 
              color: "rgb(255, 213, 79)", 
              margin: "0 0 0.125rem 0", 
              fontSize: finalTitleSize, 
              fontWeight: 700,
              width: '100%',
              textAlign: 'left',
              lineHeight: 1.2,
              ...titleStyle,
            }}
          >
            {title}
          </h3>
          
          {description && (
            <p 
              style={{ 
                color: "#ffffff", 
                fontSize: finalDescSize,
                margin: "0.125rem 0 0.25rem",
                lineHeight: 1.3,
                ...descriptionStyle,
              }}
            >
              {description}
            </p>
          )}

          {details.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: '0.375rem',
                marginBottom: "0.125rem",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {details.slice(0, 2).map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    padding: "0.25rem 0.375rem",
                    borderRadius: '0.375rem',
                    flex: 1,
                    minWidth: "0",
                  }}
                >
                  <div style={{ fontSize: finalRowLabelSize, color: "#94a3b8", marginBottom: "1px", ...rowLabelStyle }}>
                    {d.label}
                  </div>
                  <div 
                    style={{ 
                      color: "#ffffff", 
                      fontSize: finalRowValueSize,
                      fontWeight: boldValues ? 700 : 400,
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
            <div style={{ width: "100%", marginBottom: 8 }}>
              {rows.map((row, rowIndex) => (
                <div 
                  key={rowIndex}
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: 2,
                  }}
                >
                  {row.map((item, colIndex) => (
                    <div 
                      key={colIndex}
                      style={{
                        display: "flex",
                        width: "100%",
                        padding: "2px 0",
                        borderBottom: rowIndex < rows.length - 1 ? "1px solid rgba(6, 182, 212, 0.2)" : "none",
                        ...rowStyle,
                      }}
                    >
                      <div style={{ fontSize: finalRowLabelSize, color: "#ffffff", ...rowLabelStyle }}>
                        {item.label}
                      </div>
                      <div style={{ color: "#ffffff", fontSize: finalRowValueSize, fontWeight: boldValues ? 600 : 400, ...rowValueStyle }}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          
          {keyPoints.length > 0 && (
            <div style={{ width: "100%", textAlign: "left", marginBottom: 4 }}>
              {keyPoints.map((point, index) => (
                <div 
                  key={index}
                  style={{
                    color: "#ffffff",
                    fontSize: finalKeyPointSize,
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                    lineHeight: 1.6,
                    ...keyPointStyle,
                  }}
                >
                  <span>
                    <span style={{ color: "#ffffff", marginRight: "4px" }}>►</span>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Children Content */}
        {children && (
          <div style={{ width: "100%", position: "relative", zIndex: 10 }}>
            {children}
          </div>
        )}

        {showButton && (
          <button
            onClick={disabled ? undefined : onButtonClick}
            disabled={disabled}
            style={{
              background: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.5)",
              padding: "4px 10px",
              cursor: disabled ? "not-allowed" : "pointer",
              fontWeight: boldValues ? 700 : 400,
              fontSize: finalButtonSize,
              color: "#06b6d4",
              alignSelf: "flex-start",
              opacity: disabled ? 0.5 : 1,
              pointerEvents: disabled ? "none" : "auto",
              ...(buttonStyle || {}),
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default SmallFrame;

SmallFrame.propTypes = {
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
  titleStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  rowLabelStyle: PropTypes.object,
  rowValueStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  onButtonClick: PropTypes.func,
  disabled: PropTypes.bool,
  boldValues: PropTypes.bool,
  overlayTop: PropTypes.string,
  overlayWidth: PropTypes.string,
  overlayHeight: PropTypes.string,
  overlayZIndex: PropTypes.number,
  overlayBorderRadius: PropTypes.number,
  contentInset: PropTypes.string,
  compact: PropTypes.bool,
  frameImageHeight: PropTypes.string,
  children: PropTypes.node,
  noFullHeight: PropTypes.bool,
};

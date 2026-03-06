const svgStyle = {
    preserveAspectRatio: "xMidYMid meet",
    display: "block", 
    width: "100%",
    height: "auto",
    cursor: "pointer", 
    transition: "transform 0.2s ease, filter 0.2s ease",
    "&:hover": {
    transform: "translateY(-6px) scale(1.05)",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35))",
  },
};

const svgStyleNoInteraction = {
    preserveAspectRatio: "xMidYMid meet",
    display: "block", 
    width: "100%",
    height: "auto",
    cursor: "default", 
};

const textStyle = {
    fontFamily: "var(--font-family-token)",
    pointerEvents: "none",
    userSelect: "none",
};

const numberTokenStyle = {
  ...textStyle,
  fontSize: 21,
  letterSpacing: 2,
};

const textTokenStyle = {
  ...textStyle,
  fontSize: 10,
  letterSpacing: 1,
};

export { textStyle, svgStyle, numberTokenStyle, textTokenStyle, svgStyleNoInteraction };
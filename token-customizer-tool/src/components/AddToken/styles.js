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

const boxStyle = {
    margin: 0,
    padding: 0,
    maxWidth: "130px",
    maxHeight: "130px",
};

const amountTextStyle= {
    margin: 0,
    padding: 0,
    textAlign: "right",
    opacity: 0
};


export { svgStyle, boxStyle, amountTextStyle };
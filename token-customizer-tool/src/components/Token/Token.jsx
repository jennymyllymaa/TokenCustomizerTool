import Box from "@mui/material/Box";

//Style
import { textStyle, svgStyle, numberTokenStyle, textTokenStyle, svgStyleNoInteraction } from "./styles";

export default function Token({text, color, borderColor, isNumberToken, onClick, interactable=true}) {
  return (
    <Box component="svg" viewBox=" 8 20 84 61" sx={interactable ? svgStyle : svgStyleNoInteraction} onClick={onClick}>
      <polygon points="50 20 92 37 92 81 50 68 8 81 8 37" fill={borderColor}/>
      <polygon points="50 25 88 40 88 76 50 64 12 76 12 40" fill={color}/>
      <text x="50" y="53" textAnchor="middle" dominantBaseline="middle" fill={borderColor} style={isNumberToken ? numberTokenStyle : textTokenStyle}>
        {text}
      </text>
    </Box>
  );
}

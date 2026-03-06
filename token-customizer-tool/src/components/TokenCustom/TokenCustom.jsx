import Typography from "@mui/material/Typography"
import Token from "../Token/Token"
import Box from "@mui/material/Box"
import { boxStyle, amountTextStyle } from "./styles"

export default function TokenCustom({text, baseColor, borderColor, isNumberToken, amount, onClick}) {

    return (
        <Box sx={boxStyle}>
            <Typography sx={amountTextStyle}>x {amount}</Typography>
            <Token text={text} color={baseColor} borderColor={borderColor} isNumberToken={isNumberToken} onClick={onClick}></Token>
        </Box>
    )
};
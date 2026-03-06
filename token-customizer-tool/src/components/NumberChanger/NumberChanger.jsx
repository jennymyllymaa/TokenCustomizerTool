import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NumberChanger({amount, changeAmount}) {

    const changeNumber = (change) => {
        changeAmount(change);
    }
    
    return (
        <Box>
            <svg viewBox="0 0 100 100" height="50">
                <polygon points="50,10 80,90 20,90 " fill="black" onClick={() => changeNumber(1)} style={{ cursor: "pointer" }}></polygon>
            </svg>
            <Typography>{amount}</Typography>
            <svg viewBox="0 0 100 100" height="50">
                <polygon points="50,90 80,10 20,10 " fill="black" onClick={() => changeNumber(-1)} style={{ cursor: "pointer" }}></polygon>
            </svg>
        </Box>
    );
};
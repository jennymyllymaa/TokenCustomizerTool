import Card from "@mui/material/Card";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

//Style
import { holderCardStyle, radioButtonStyle } from "./styles";

export default function HolderCard({id, name, imagePath, alt}) {

    return (
        <Card sx={holderCardStyle}>
            <p>{name}</p>
            <img src={imagePath} alt={alt}></img>
            <FormControlLabel value={id} sx={radioButtonStyle} control={<Radio/>}/>
        </Card>
    );
};
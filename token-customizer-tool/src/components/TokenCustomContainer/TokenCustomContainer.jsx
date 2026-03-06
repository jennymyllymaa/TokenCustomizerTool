import TokenCustom from "../TokenCustom/TokenCustom";
import Card from "@mui/material/Card";
import AddToken from "../../components/AddToken/AddToken";
import Box from "@mui/material/Box";

export default function TokenCustomContainer({tokens, onTokenClick, onNewTokenClick}) {

    return (
        <Card>
            <Box sx={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 5, justifyItems: "start", padding: "2em"}}>
                {tokens.map(token => (
                    <TokenCustom key={`${token.text}-${token.baseColor}-${token.borderColor}`} text={token.text} baseColor={token.baseColorCode} borderColor={token.borderColorCode} isNumberToken={token.isNumberToken} amount={token.amount} onClick={() => onTokenClick(token)}  />
                ))}
                <AddToken onClick={onNewTokenClick}/>
            </Box>
        </Card>
    );
};
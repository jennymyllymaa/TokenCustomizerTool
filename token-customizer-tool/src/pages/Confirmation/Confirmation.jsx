import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { pageStyle, textCardStyle } from "./styles";
import { TokensContext } from "../../contexts/TokensContext";
import Collapse from "@mui/material/Collapse";

export default function Confirmation() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenData, setTokenData] = useState([]);
    const [openHolders, setOpenHolders] = useState([]);
    const [openSetDeletion, setOpenSetDeletion] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState();
    const [copyTooltipOpen, setCopyTooltipOpen] = useState(false);

    const formatTokenData = () => {
        setTokenData(tokenSet.map(set => ({
            holderSize: set.holderSize,
            holder: set.holder.name,
            ...(set.lid !== undefined && { lid: set.lid.name }),
            tokens: set.tokens.map(token => ({
                amount: token.amount,
                text: token.text,
                base: token.baseColor,
                border: token.borderColor
            }))
        })));
    };

    useEffect(() => {formatTokenData()},[tokenSet]);

    const handleEditHolder = (holderIndex) => {
        if (holderIndex!=0) {
            let newHolders = [...tokenSet];
            const holderToEdit = tokenSet[holderIndex];
            newHolders.splice(holderIndex, 1);
            newHolders.splice(0, 0, holderToEdit);
            setTokenSet(newHolders);
        }
        navigate("/customization");
    };

    const handleAddHolder = () => {
        navigate("/");
    };

    const handleDeleteHolderConfirmation = () => {
        setOpenSetDeletion(false);
        setTokenSet(prev => prev.filter((holder, i) => i != indexToDelete));
    };

    const handleDeleteButton = (index) => {
        setIndexToDelete(index);
        setOpenSetDeletion(true);
    };

    const copyToClipboard = () => {
        const json = JSON.stringify(tokenData, null, 2);
        navigator.clipboard.writeText(json);
        setCopyTooltipOpen(true);
        setTimeout(() => setCopyTooltipOpen(false), 1000);
    };

    return (
        <Container sx={pageStyle}>
            <Stack spacing={4}>
                {tokenData.map((holder, index) => 
                    <Card key={index} sx={{position: "relative"}}>
                        <IconButton sx={{position: "absolute", top: 8, right: 20,}} onClick={() => setOpenHolders(prev => prev.includes(index)? prev.filter(i => i !== index): [...prev, index])}>
                            {openHolders.includes(index) ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                        </IconButton>
                        <IconButton disabled={!(tokenSet.length>1)} sx={{position: "absolute", top: 8, right: 60,}} onClick={() => {handleDeleteButton(index)}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton sx={{position: "absolute", top: 8, right: 100,}} onClick={() => {handleEditHolder(index)}}>
                            <EditIcon />
                        </IconButton>
                        <p><strong>Holder size:</strong> {holder.holderSize}</p>
                        <Collapse in={openHolders.includes(index)}>
                            <Card sx={textCardStyle}>
                                <p>Holder color: {holder.holder}</p>
                                {holder.lid && (<p>Lid color: {holder.lid}</p>)}
                                {holder.tokens.map((token, index) =>
                                    <p key={index}>{token.amount}x {token.text} ({token.base} / {token.border})</p>
                                )}
                            </Card>
                        </Collapse>
                    </Card>
                )}

                {/* Tokenset deletion dialog */}
                <Dialog
                    open={openSetDeletion}
                    onClose={() => {setOpenSetDeletion(false)}}
                    aria-labelledby="set-deletion-dialog-title"
                    aria-describedby="set-deletion-dialog"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete set completely?"}
                    </DialogTitle>
                    <Stack direction="row" sx={{justifyContent: "space-around", padding: "1em"}}>
                        <Button onClick={() => {setOpenSetDeletion(false)}}>Cancel</Button>
                        <Button onClick={handleDeleteHolderConfirmation} autoFocus>Delete</Button>
                    </Stack>
                </Dialog>

                <Stack direction="row" spacing={15} sx={{justifyContent: "center"}}>
                    <Button variant="contained" onClick={handleAddHolder}>
                        Add new holder
                    </Button>
                    <Tooltip title="Copied!" open={copyTooltipOpen} disableFocusListener disableHoverListener disableTouchListener arrow>
                        <Button variant="contained" onClick={copyToClipboard}>
                            Copy details <ContentCopyIcon sx={{ ml: 1 }} />
                        </Button>
                    </Tooltip>
                </Stack>
                <Stack direction="row" sx={{justifyContent: "flex-start"}}>
                    <Button variant="contained" onClick={() => navigate("/customization")}>
                        Back
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};
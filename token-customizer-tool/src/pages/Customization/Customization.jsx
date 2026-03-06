import Token from "../../components/Token/Token";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import NumberSpinner from "../../components/NumberSpinner/NumberSpinner";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import { pageStyle, textCardStyle } from "./styles";
import { useState, useContext, useEffect } from "react";
import { TokensContext } from "../../contexts/TokensContext";
import { useNavigate } from "react-router";
import TokenCustomContainer from "../../components/TokenCustomContainer/TokenCustomContainer";
import NumberChanger from "../../components/NumberChanger/NumberChanger";
import tokenColors from "../../../../store-inventory/token-colors.json";
import holderColors from "../../../../store-inventory/holder-colors.json";

export default function Customization() {
    const navigate = useNavigate();
    const { tokenSet, setTokenSet } = useContext(TokensContext);
    const [tokenState, setTokenState] = useState();

    const holderSize = tokenSet[0].holderSize;
    const [tokenAmount, setTokenAmount] = useState(holderSize);
    const [tokenAmountCorrect, setTokenAmountCorrect] = useState(true);

    const [selectedToken, setSelectedToken] = useState(null);
    const [updatedSelectedToken, setUpdatedSelectedToken] = useState(null);
    const [selectedTokenNumbers, setSelectedTokenNumbers] = useState([1,1]);
    const [availableTokenColors, setAvailableTokenColors] = useState(tokenColors.colors.filter(color => color.available == true));
    const [addingNewToken, setAddingNewToken] = useState(false);

    const [availableHolderColors, setAvailableHolderColors] = useState(holderColors.colors.filter(color => color.available == true));
    const [holderColor, setHolderColor] = useState({name: availableHolderColors[0].name, colorCode: availableHolderColors[0].colorCode});
    const [lidColor, setLidColor] = useState({name: availableHolderColors[0].name, colorCode: availableHolderColors[0].colorCode});

    const [openTokenDeletion, setOpenTokenDeletion] = useState(false);
    const [tokenIndexToDelete, setTokenIndexToDele] = useState();

    useEffect(() => {
        setTokenState(tokenSet[0].tokens.map(
            token => ({...token, isNumberToken: /\d/.test(token.text) ? true : false})
        ));
        if (tokenSet[0].holder != undefined) {
            setHolderColor({name: tokenSet[0].holder.name, colorCode: tokenSet[0].holder.colorCode});
            if (tokenSet[0].lid != undefined) {
                setLidColor({name: tokenSet[0].lid.name, colorCode: tokenSet[0].lid.colorCode});
            }
        }
    }, []);

    const handleConfirmClick = () => {
        let holderColorData = {};
        if (holderColor.name == lidColor.name) {
            holderColorData = {holder: holderColor, lid: undefined};
        } else {
            holderColorData = {holder: holderColor, lid: lidColor};
        }
        setTokenSet(prev => {
            const updatedSet = [...prev];
            updatedSet[0] = {...prev[0], ...holderColorData, tokens: tokenState}
            return updatedSet;
        });
        navigate("/confirmation");
    };

    const handleTokenClick = (token) => {
        setSelectedToken(token);
    };

    useEffect(() => {
        setUpdatedSelectedToken(selectedToken);
        if (selectedToken != null) {
            if (selectedToken.isNumberToken) {
                const tokenNumbers = selectedToken.text.match(/-?\d+/g);
                setSelectedTokenNumbers([Number(tokenNumbers[0]), Number(tokenNumbers[1])]);
            } else {
                setSelectedTokenNumbers([1,1]);
            }
        } else {
            setAddingNewToken(false);
        }
    }, [selectedToken]);

    const updateAmount = (change) => {
        if (!(updatedSelectedToken.amount == 0 && change < 0)) {
            setUpdatedSelectedToken({...updatedSelectedToken, amount: updatedSelectedToken.amount + change});
        }
    };

    const updateBaseColor = (event) => {
        const selectedColorCode = event.target.value;
        const selectedColorName = availableTokenColors.find(col => col.colorCode == selectedColorCode).name;
        setUpdatedSelectedToken({...updatedSelectedToken, baseColorCode: event.target.value, baseColor: selectedColorName});
    };

    const updateBorderColor = (event) => {
        const selectedColorCode = event.target.value;
        const selectedColorName = availableTokenColors.find(col => col.colorCode == selectedColorCode).name;
        setUpdatedSelectedToken({...updatedSelectedToken, borderColorCode: event.target.value, borderColor: selectedColorName});
    };

    const updateTokenType = () => {
        if (updatedSelectedToken.isNumberToken) {
            if (selectedToken.isNumberToken) {
                setUpdatedSelectedToken({...updatedSelectedToken, text: "", isNumberToken: false});
            } else {
                setUpdatedSelectedToken({...updatedSelectedToken, text: selectedToken.text, isNumberToken: false});
            }
        } else {
            setUpdatedSelectedToken({...updatedSelectedToken, text: "+1+1", isNumberToken: true});
        }
    };

    const selectedTokenNumbersToText = () => {
        let str = "";
        selectedTokenNumbers.forEach((number) => {
            if (number >= 0) {
                str = str.concat("+", number.toString())
            } else {
                str = str.concat(number.toString())
            }
        });
        return str;
    };

    const updateTokenNumberPower = (newValue) => {
        const tokenNumbers = updatedSelectedToken.text.match(/\d+/g);
        setSelectedTokenNumbers(prev => ([newValue, prev[1]]));
    };

    const updateTokenNumberToughness = (newValue) => {
        const tokenNumbers = updatedSelectedToken.text.match(/\d+/g);
        setSelectedTokenNumbers(prev => ([prev[0], newValue]));
    };

    useEffect(() => {
        const numbersAsString = selectedTokenNumbersToText();
        if (updatedSelectedToken) {
            if (updatedSelectedToken.isNumberToken) {
                setUpdatedSelectedToken({...updatedSelectedToken, text: numbersAsString});
            }
        }
    }, [selectedTokenNumbers]);

    // Kokonaan uusi tokeni
    const addNewToken = () => {
        setSelectedToken({text: '', amount: 1, baseColor: 'Black', baseColorCode: '#000000', borderColor: "Red", borderColorCode: "#ea140e", isNumberToken: false});
        setAddingNewToken(true);
    };

    const saveUpdates = () => {
        // Muutoksia
        if (selectedToken != updatedSelectedToken) {

            //Lisätty uuden tokenin napista
            if (addingNewToken) {

                // Samanlainen tokeni kun jo olemassa oleva
                    if (tokenState.some(token =>
                        token.text == updatedSelectedToken.text && 
                        token.baseColor == updatedSelectedToken.baseColor && 
                        token.borderColor == updatedSelectedToken.borderColor 
                    )) {

                        const matchingToken = tokenState.filter(token =>
                            token.text == updatedSelectedToken.text && 
                            token.baseColor == updatedSelectedToken.baseColor && 
                            token.borderColor == updatedSelectedToken.borderColor);

                        const a = matchingToken[0].amount + updatedSelectedToken.amount;

                        setTokenState(prev => 
                            prev.map(token => 
                                token.text == updatedSelectedToken.text && 
                                token.baseColor == updatedSelectedToken.baseColor && 
                                token.borderColor == updatedSelectedToken.borderColor 
                                ? {...updatedSelectedToken, amount: a} : token
                            ).filter(token => 
                                !(token.text == selectedToken.text && 
                                token.baseColor == selectedToken.baseColor && 
                                token.borderColor == selectedToken.borderColor) 
                            )
                        );
                    } else {
                        //Uusi uniikki tokeni
                        setTokenState(prev => [...prev, updatedSelectedToken]);
                    }

            } else {
                // Vain määrä muutos
                if (selectedToken.text == updatedSelectedToken.text && selectedToken.baseColor == updatedSelectedToken.baseColor && selectedToken.borderColor == updatedSelectedToken.borderColor) {
                    //Nollattu
                    if (updatedSelectedToken.amount < 1) {
                        setTokenState(prev => 
                            prev.filter(token => 
                                !(token.text == updatedSelectedToken.text && 
                                token.baseColor == updatedSelectedToken.baseColor && 
                                token.borderColor == updatedSelectedToken.borderColor) 
                            )
                        );
                    } else {
                        //Ei nollattu
                        setTokenState(prev => 
                            prev.map(token => 
                                token.text == selectedToken.text && 
                                token.baseColor == selectedToken.baseColor && 
                                token.borderColor == selectedToken.borderColor 
                                ? updatedSelectedToken : token
                            )
                        );
                    }
                } else {

                    // Samanlainen tokeni kun jo olemassa oleva
                    if (tokenState.some(token =>
                        token.text == updatedSelectedToken.text && 
                        token.baseColor == updatedSelectedToken.baseColor && 
                        token.borderColor == updatedSelectedToken.borderColor 
                    )) {
                        const matchingToken = tokenState.filter(token =>
                            token.text == updatedSelectedToken.text && 
                            token.baseColor == updatedSelectedToken.baseColor && 
                            token.borderColor == updatedSelectedToken.borderColor);

                        const a = matchingToken[0].amount + updatedSelectedToken.amount;

                        setTokenState(prev => 
                            prev.map(token => 
                                token.text == updatedSelectedToken.text && 
                                token.baseColor == updatedSelectedToken.baseColor && 
                                token.borderColor == updatedSelectedToken.borderColor 
                                ? {...updatedSelectedToken, amount: a} : token
                            ).filter(token => 
                                !(token.text == selectedToken.text && 
                                token.baseColor == selectedToken.baseColor && 
                                token.borderColor == selectedToken.borderColor) 
                            )
                        );

                    // Muita muutoksia
                    } else {
                        setTokenState(prev => 
                            prev.map(token => 
                                token.text == selectedToken.text && 
                                token.baseColor == selectedToken.baseColor && 
                                token.borderColor == selectedToken.borderColor 
                                ? updatedSelectedToken : token
                            )
                        );
                    }
                }
            }
        } else {
            //Uusi tokeni ilman muutoksia (esim. tyhjä)
            if (addingNewToken) {
                // Samanlainen tokeni kun jo olemassa oleva
                if (tokenState.some(token =>
                    token.text == updatedSelectedToken.text && 
                    token.baseColor == updatedSelectedToken.baseColor && 
                    token.borderColor == updatedSelectedToken.borderColor 
                )) {

                    const matchingToken = tokenState.filter(token =>
                        token.text == updatedSelectedToken.text && 
                        token.baseColor == updatedSelectedToken.baseColor && 
                        token.borderColor == updatedSelectedToken.borderColor);

                    const a = matchingToken[0].amount + updatedSelectedToken.amount;

                    const tokensWithoutEmpty = tokenState.filter(token => 
                        !(token.text == selectedToken.text && 
                        token.baseColor == selectedToken.baseColor && 
                        token.borderColor == selectedToken.borderColor) 
                        )

                    setTokenState(prev => [...tokensWithoutEmpty, {...updatedSelectedToken, amount: a}]);
                } else {
                    //Uusi uniikki tokeni
                    setTokenState(prev => [...prev, updatedSelectedToken]);
                }
            }   
        }

        setSelectedToken(null)
    };

    const handleTokenDeletion = () => {
        setTokenState(prev => 
            prev.filter(token => 
                !(token.text == selectedToken.text && 
                token.baseColor == selectedToken.baseColor && 
                token.borderColor == selectedToken.borderColor) 
            )
        );
        setSelectedToken(null);
        setOpenTokenDeletion(false);
    };

    useEffect(() => {
        if (tokenState) {
            let newTokenAmount = 0;
            tokenState.forEach(token => newTokenAmount += token.amount);
            setTokenAmount(newTokenAmount);
        }
    }, [tokenState]);

    useEffect(() => {
        if (tokenAmount == holderSize) {
            setTokenAmountCorrect(true);
        } else {
            setTokenAmountCorrect(false);
        }
    }, [tokenAmount]);

    //Holder värit
    const updateHolderColor = (event) => {
        const selectedColorName = availableHolderColors.find(col => col.colorCode == event.target.value).name;
        setHolderColor({name: selectedColorName, colorCode: event.target.value});
    };

    const updateLidColor = (event) => {
        const selectedColorName = availableHolderColors.find(col => col.colorCode == event.target.value).name;
        setLidColor({name: selectedColorName, colorCode: event.target.value});
    };

    return (
        <Container sx={pageStyle}>
            {tokenState && (
                <Stack spacing={4}>
                    {/* <Card sx={{justifyContent: "center"}}>
                        <p>Customize your tokens.</p>
                    </Card> */}
                    <Box>
                        <Box>
                            <TokenCustomContainer tokens={tokenState} onTokenClick={handleTokenClick} onNewTokenClick={addNewToken}/>
                        </Box>
                    </Box>
                    <Stack direction="row" spacing={5} sx={{justifyContent: "space-between"}}>
                        <Card>
                            <p>Holder color</p>
                            <Stack sx={{padding: "1em 2em"}} direction="row" spacing={3} justifyContent="center" divider={<Divider orientation="vertical" flexItem />}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="holdercolor-select-label">Holder color</InputLabel>
                                            <Select
                                            labelId="holdercolor-select-label"
                                            id="holdercolor-select"
                                            value={holderColor.colorCode}
                                            onChange={updateHolderColor}
                                            >
                                                {availableHolderColors.map(col => 
                                                <MenuItem value={col.colorCode}>
                                                    <Stack direction="row">
                                                        <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                        </Box>
                                                        {col.name}
                                                    </Stack>
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="lidcolor-select-label">Lid color</InputLabel>
                                            <Select
                                            labelId="lidcolor-select-label"
                                            id="lidcolor-select"
                                            value={lidColor.colorCode}
                                            onChange={updateLidColor}
                                            >
                                                {availableHolderColors.map(col => 
                                                <MenuItem value={col.colorCode}>
                                                    <Stack direction="row" >
                                                        <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                        </Box>
                                                        {col.name}
                                                    </Stack>
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Stack>
                        </Card>
                        <Stack spacing={5} sx={{flex: 1}}>
                            {tokenAmountCorrect && (
                            <Card>
                                <p>You have <strong>{tokenAmount}</strong> amount of tokens in your holder!</p>
                                <p>Your holdersize is <strong>{holderSize}</strong> tokens.</p>
                            </Card>
                            )}
                            {!tokenAmountCorrect && (tokenAmount>holderSize) && (
                                <Card>
                                    <p>You have <strong>{tokenAmount}</strong> amount of tokens in your set. </p>
                                    <p>That exceed your holdersize of <strong>{holderSize}</strong> by <strong>{tokenAmount-holderSize}</strong>. Please remove the extra.</p>
                                </Card>
                            )}
                            {!tokenAmountCorrect && (tokenAmount<holderSize) && (
                                <Card>
                                    <p>You have <strong>{tokenAmount}</strong> amount of tokens in your set. </p>
                                    <p>You can still add <strong>{holderSize-tokenAmount}</strong> to your holder of <strong>{holderSize}</strong> tokens..</p>
                                </Card>
                            )}
                            <Stack direction="row" sx={{justifyContent: "space-between"}}>
                                <Box>
                                    <Button variant="contained" onClick={() => navigate("/")}>
                                        Back
                                    </Button>
                                </Box>
                                <Box>
                                    <Button variant="contained" disabled={!tokenAmountCorrect} onClick={handleConfirmClick}>
                                        Confirm
                                    </Button>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Token customization dialog */}
                    {selectedToken && updatedSelectedToken && (
                        <Dialog open onClose={() => setSelectedToken(null)}>
                            <DialogTitle>Token customization</DialogTitle>
                            <IconButton sx={{position: "absolute", top: 20, left: 20,}} onClick={() => {setOpenTokenDeletion(true)}}>
                                <DeleteIcon />
                            </IconButton>

                            {/* Token deletion dialog */}
                            <Dialog
                                open={openTokenDeletion}
                                onClose={() => {setOpenTokenDeletion(false)}}
                                aria-labelledby="token-deletion-dialog-title"
                                aria-describedby="token-deletion-dialog"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Delete token completely?"}
                                </DialogTitle>
                                <Stack direction="row" sx={{justifyContent: "space-around", padding: "1em"}}>
                                    <Button onClick={() => {setOpenTokenDeletion(false)}}>Cancel</Button>
                                    <Button onClick={handleTokenDeletion} autoFocus>Delete</Button>
                                </Stack>
                            </Dialog>

                            <Stack spacing={2} sx={{padding:"20px", textAlign: 'center', alignItems: "center",}}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={updatedSelectedToken.isNumberToken}
                                    exclusive
                                    onChange={updateTokenType}
                                    aria-label="Token-type"
                                    >
                                    <ToggleButton value={true}>Numeric</ToggleButton>
                                    <ToggleButton value={false}>Keyword</ToggleButton>
                                </ToggleButtonGroup>
                                {!updatedSelectedToken.isNumberToken && (
                                    <TextField id="keyword-input" variant="outlined" value={updatedSelectedToken.text} onChange={(event) => {setUpdatedSelectedToken(prev => ({...prev, text: event.target.value.toUpperCase()}))}}/>
                                )}
                                {updatedSelectedToken.isNumberToken && (
                                    <Stack direction="row">
                                        <NumberSpinner min={-99} max={99} value={selectedTokenNumbers[0]} onValueChange={(newValue) => {updateTokenNumberPower(newValue)}} size="small"/>
                                        <NumberSpinner min={-99} max={99} value={selectedTokenNumbers[1]} onValueChange={(newValue) => {{updateTokenNumberToughness(newValue)}}} size="small"/>
                                    </Stack>
                                )}
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                    <Token text={updatedSelectedToken.text} color={updatedSelectedToken.baseColorCode} borderColor={updatedSelectedToken.borderColorCode} isNumberToken={updatedSelectedToken.isNumberToken} interactable={false}></Token>
                                    <NumberChanger amount={updatedSelectedToken.amount} changeAmount={updateAmount} />
                                </Stack>
                                <Stack direction="row" spacing={3} justifyContent="center" divider={<Divider orientation="vertical" flexItem />}>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="basecolor-select-label">Base color</InputLabel>
                                            <Select
                                            labelId="basecolor-select-label"
                                            id="basecolor-select"
                                            value={updatedSelectedToken.baseColorCode}
                                            onChange={updateBaseColor}
                                            >
                                                {availableTokenColors.map(col => 
                                                <MenuItem value={col.colorCode}>
                                                    <Stack direction="row">
                                                        <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                        </Box>
                                                        {col.name}
                                                    </Stack>
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="bordercolor-select-label">Border color</InputLabel>
                                            <Select
                                            labelId="bordercolor-select-label"
                                            id="bordercolor-select"
                                            value={updatedSelectedToken.borderColorCode}
                                            onChange={updateBorderColor}
                                            >
                                                {availableTokenColors.map(col => 
                                                <MenuItem value={col.colorCode}>
                                                    <Stack direction="row" >
                                                        <Box sx={{width: "1.3em", borderRadius: "2px", backgroundColor: col.colorCode}}>    
                                                        </Box>
                                                        {col.name}
                                                    </Stack>
                                                </MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Stack>
                                <Stack direction="row" >
                                    <Button onClick={() => setSelectedToken(null)}>Discard changes</Button>
                                    <Button onClick={saveUpdates}>Save changes</Button>
                                </Stack>
                            </Stack>
                        </Dialog>
                    )}
                </Stack>
            )}
        </Container>
    );
};
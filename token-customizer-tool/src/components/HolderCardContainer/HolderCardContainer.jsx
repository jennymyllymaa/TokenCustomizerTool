import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import HolderCard from "../HolderCard/HolderCard";
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { useState, useContext } from "react";
import { HolderContext } from "../../contexts/HolderContext";

//Holder information from store-inventory
import inventory from "../../../../store-inventory/holder-sizes.json"

//Styles
import { cardStyle, contentStyle } from "./styles";

export default function HolderCardContainer() {
    //Holder "available" options from store-inventory
    const availableHolders = inventory.holderSizes.filter(holder => holder.available);

    const { selectedHolder, setSelectedHolder } = useContext(HolderContext);

    const handleChange = (event) => {
        setSelectedHolder(event.target.value);
    };

    return (
        <Card sx={cardStyle}>
            <FormControl>
                <RadioGroup value={selectedHolder} onChange={handleChange}>
                    <Box sx={contentStyle}>
                        {availableHolders.map(holder => (
                            <HolderCard key={holder.id} id={holder.id} name={holder.name} imagePath={holder.imagePath} alt={holder.alt} />
                        ))}
                    </Box>
                </RadioGroup>
            </FormControl>
        </Card>
    );
};

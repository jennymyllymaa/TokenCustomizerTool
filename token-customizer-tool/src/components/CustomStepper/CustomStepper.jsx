import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from "react-router-dom";

export default function CustomStepper() {
    const location = useLocation();

    const steps = [
        'Choose holder size and preset',
        'Customize holder and tokens',
        'Order information',
        ];

    const stepsMap = {
        '/': 0,
        '/customization': 1,
        '/confirmation': 2,
    };

    const activeStep = stepsMap[location.pathname] ?? 0;

    return (
        <Box sx={{ width: '50%' , margin: "0 auto", my: 4}}>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        </Box>
    );
};
import { Routes, Route } from "react-router-dom";
import CustomStepper from "../CustomStepper/CustomStepper";

// Pages
import Home from "../../pages/Home/Home";
import Customization from "../../pages/Customization/Customization";
import Confirmation from "../../pages/Confirmation/Confirmation";

export default function Router() {
  return (
    <>
      <CustomStepper />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}

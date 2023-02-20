import React from "react";
import StepperSidebar from "./StepperSidebar";

const Stepper = ({ labels, activeStep }) => {
	return <StepperSidebar labels={labels} activeStep={activeStep} />;
};

export default Stepper;

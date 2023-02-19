import React from "react";
import Stepper from "../../components/Stepper/Stepper";
import UserInformation from "./steps/UserInformation";
import { useSelector, useDispatch } from "react-redux";
import {
	selectActiveStep,
	changeActiveState,
} from "../../app/features/register-complete/registerCompleteSlice";
import StepperControll from "../../components/Stepper/StepperControll";
import Container from "../../components/Container";
import { registerCompleteSteps } from "../../utils/constants";

const RegistrationComplete = () => {
	const dispatch = useDispatch();
	const activeStep = useSelector(selectActiveStep);

	const handleNext = () => {
		if (activeStep === 5) {
			dispatch(changeActiveState(1));
			return;
		}

		dispatch(changeActiveState(activeStep + 1));
	};

	const handlePrevious = () => {
		dispatch(changeActiveState(activeStep - 1));
	};

	// TODO Add your component to switch statement
	const renderSteps = () => {
		switch (activeStep) {
			case 1:
				return <UserInformation />;
			default:
				return <></>;
		}
	};

	return (
		<div className="h-screen flex">
			<div className="w-1/4">
				<Stepper
					labels={registerCompleteSteps}
					activeStep={activeStep}
					handleNext={handleNext}
					handlePrevious={handlePrevious}
				/>
			</div>
			<div className="w-3/4 h-full flex">
				<Container className="my-auto w-3/4">
					{renderSteps()}
					<StepperControll
						activeStep={activeStep}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
				</Container>
			</div>
		</div>
	);
};

export default RegistrationComplete;

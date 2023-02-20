import React, { useState, useEffect } from "react";
import Stepper from "../../components/Stepper/Stepper";
import UserInformation from "./steps/UserInformation";
import { useSelector, useDispatch } from "react-redux";
import {
	selectActiveStep,
	changeActiveState,
	selectRegisterCompleteDefaultInfo,
	changeRegisterCompleteState
} from "../../app/features/register-complete/registerCompleteSlice";
import StepperControll from "../../components/Stepper/StepperControll";
import Container from "../../components/Container";
import { getRegisterCompleteDefautlData, registerCompleteSteps } from "../../utils/constants";
import { registerCompleteUserInformationValidator } from "../../utils/validators/registerCompleteValidators";


const RegistrationComplete = () => {
	const dispatch = useDispatch();

	const activeStep = useSelector(selectActiveStep);
	const defaultData = useSelector(selectRegisterCompleteDefaultInfo);

	const [valid, setValid] = useState(false);
	const [state, setState] = useState(getRegisterCompleteDefautlData(defaultData));

	useEffect(() => {
		setValid(stepValidator());
	}, [state])

	const handleNext = () => {
		dispatch(changeRegisterCompleteState(state));
		if (activeStep === 5) {
			// TODO Redirect to profile
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
				return <UserInformation
					userInformation={state.userInformation}
					setUserInformation={(data) => setState({ ...state, userInformation: data })}
				/>;
			default:
				return <></>;
		}
	};

	const stepValidator = () => {
		//add your validators
		switch (activeStep) {
			case 1:
				return registerCompleteUserInformationValidator(state.userInformation);
			default:
				return true;
		}
	}

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
			<div className="w-3/4 h-full flex relative">
				<Container className="my-auto w-3/4">
					{renderSteps()}
					<StepperControll
						activeStep={activeStep}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
						nextStepIsValid={!valid}
						className={"mt-24"}
					/>
				</Container>
			</div>
		</div>
	);
};

export default RegistrationComplete;

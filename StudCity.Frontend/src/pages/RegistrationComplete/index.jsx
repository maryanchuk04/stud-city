import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	selectActiveStep,
	changeActiveState,
	selectRegisterCompleteDefaultInfo,
	changeRegisterCompleteState
} from "../../app/features/register-complete/registerCompleteSlice";
import {
	getRegisterCompleteDefautlData,
	REGISTER_COMPLETE_STEPS,
	REGISTER_COMPLETE_STEPS_COUNT
} from "../../utils/constants";
import { registerCompleteRoleValidator, registerCompleteUserInformationValidator } from "../../utils/validators/registerCompleteValidators";
import Stepper from "../../components/Stepper/Stepper";
import UserInformation from "./steps/UserInformation";
import StepperControll from "../../components/Stepper/StepperControll";
import Container from "../../components/Container";
import ChooseRole from "./steps/ChooseRole";

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
		console.log('Work')
		if (activeStep === REGISTER_COMPLETE_STEPS_COUNT) {
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
			case 2: return <></>
			case 3:
				return <ChooseRole
					role={state.role}
					setRole={(data) => setState({ ...state, role: data })}
				/>
			default:
				return <></>;
		}
	};

	const stepValidator = () => {
		//add your validators
		switch (activeStep) {
			case 1:
				return registerCompleteUserInformationValidator(state.userInformation);
			case 3:
				return registerCompleteRoleValidator(state.role);
			default:
				return true;
		}
	}

	return (
		<div className="h-screen flex">
			<div className="w-1/4">
				<Stepper
					labels={REGISTER_COMPLETE_STEPS}
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

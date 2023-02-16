import React, { useState } from 'react'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper/Stepper';
import StepperControll from '../../components/Stepper/StepperControll';
import StepperHeader from '../../components/Stepper/StepperHeader';
import Svg from '../../components/Svg';
import UserInformation from './UserInformation';

const RegistrationComplete = () => {
	const [activeStep] = useState(0);
	const labels = ["User information", "Upload avatar", "Choose role", "Groups", "Settings"];
	return (
		<div className = "h-screen flex relative">
			<Container className = "my-auto h-3/4 z-10">
				<div className="h-full shadow-form w-full rounded-formRadius p-4 ">
					<h1 className = "text-3xl text-center font-bold my-2 text-primaryAuthentication">Registration complete</h1>
					<Stepper active = {activeStep}>
						<StepperHeader labels = {labels} />
						<UserInformation />
						<StepperControll />
					</Stepper>
				</div>
				
			</Container>
			<Svg type = "registerCompleteWave" className = "absolute z-0 bottom-0"/>
		</div>
		
	);
}

export default RegistrationComplete
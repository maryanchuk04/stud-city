import React from 'react'

import Button from '../../UI/Button'
import StepperStrip from './StepperStrip'

const StepperControll = ({ className, activeStep, handleNext, handlePrevious, nextStepIsValid }) => {
	const buttonDefaultStyles = "w-24 h-10 hover:enabled:bg-white hover:enabled:text-black  duration-500 border border-primaryRegistration"
	return (
		<div className={`flex justify-between items-center ${className}`}>
			<Button
				className={`${buttonDefaultStyles} disabled:opacity-0`}
				onClick={handlePrevious}
				disabled={activeStep === 1}
			>
				Previous
			</Button>
			<StepperStrip activeStep={activeStep} />
			<Button
				className={`${buttonDefaultStyles} disabled:opacity-40`}
				onClick={handleNext}
				disabled={nextStepIsValid}
			>
				{activeStep !== 5 ? "Next" : "Finish"}
			</Button>
		</div>
	)
}

export default StepperControll
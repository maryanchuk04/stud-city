import React from 'react'
import Button from '../../UI/Button'
import StepperStrip from './StepperStrip'

const StepperControll = ({ activeStep, handleNext, handlePrevious }) => {
	const buttonDefaultStyles = "w-24 h-10 hover:enabled:bg-white hover:enabled:text-black  duration-500 border border-primaryRegistration disabled:opacity-0"
	return (
		<div className="flex justify-between items-center">
			<Button
				className={buttonDefaultStyles}
				onClick={handlePrevious}
				disabled={activeStep === 1}
			>
				Cancel
			</Button>
			<StepperStrip activeStep = {activeStep} />
			<Button
				className={buttonDefaultStyles}
				onClick={handleNext}
			>
				{activeStep !== 5 ? "Next" : "Finish"}
			</Button>
		</div>
	)
}

export default StepperControll
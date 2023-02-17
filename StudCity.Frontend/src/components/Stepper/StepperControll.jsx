import React from 'react'
import Button from '../../UI/Button'

const StepperControll = ({ activeStep, handleNext, handlePrevious }) => {

	return (
		<div className="flex justify-between">
			<Button
				className="w-24 h-10 hover:bg-white hover:text-black duration-500 border-2 border-primaryRegistration disabled:opacity-60"
				onClick={handlePrevious}
				disabled={activeStep === 1}
			>
				Cancel
			</Button>
			<Button
				className="w-24 h-10 hover:bg-white hover:text-black duration-500 border-2 border-primaryRegistration"
				onClick={handleNext}
			>
				{activeStep !== 5 ? "Next" : "Finish"}
			</Button>
		</div>
	)
}

export default StepperControll
import React from 'react'
import Button from '../../UI/Button'

const StepperControll = () => {
  return (
	<div className = "flex justify-between">
		<Button className = "w-24 h-10 hover:bg-white hover:text-black duration-500 border border-primaryRegistration">Cancel</Button>
		<Button className = "w-24 h-10 hover:bg-white hover:text-black duration-500 border border-primaryRegistration">Next</Button>
	</div>
  )
}

export default StepperControll
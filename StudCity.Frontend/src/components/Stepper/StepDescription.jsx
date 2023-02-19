import React from 'react'

const StepDescription = ({ activeStep, description }) => {
  return (
	<div className = "text-white">
		<h1 className="text-xl font-bold mb-4">Step {activeStep}</h1>
		<p>{description}</p>
	</div>
  )
}

export default StepDescription
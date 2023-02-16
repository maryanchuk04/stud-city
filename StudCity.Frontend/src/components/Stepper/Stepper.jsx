import React from 'react'

const Stepper = ({ children }) => {
  return (
	<div className = "flex flex-col justify-evenly">
		{ children }
	</div>
  )
}

export default Stepper
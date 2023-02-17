import React from 'react'
import Container from '../Container'

const Stepper = ({ children }) => {
	return (
		<Container className="flex flex-col justify-evenly">
			{children}
		</Container>
	)
}

export default Stepper
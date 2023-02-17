import React from 'react'
import Container from '../Container';
import StepItem from './StepItem'

const StepperHeader = ({ labels, activeStep }) => {
	return (
		<Container>
			<div className="flex justify-evenly my-5">
				{labels.map((label, index) => (
					<>
						<StepItem label={label} key={label} index={index + 1} active={activeStep} />
						{index !== labels.length - 1 && <hr className="w-1/6 my-auto" />}
					</>
				))}
			</div>
		</Container>
	);
}

export default StepperHeader
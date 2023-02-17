import React, { useState } from 'react'
import TextField from './TextField'

const ValidateTextField = ({ validate, handleChange, ...custom }) => {
	const [errorMessage, setErrorMessage] = useState(" ");

	const onChange = (e) => {
		handleChange(e);
		setErrorMessage(validate(e.target.value));
	}

	return (
		<>
			<TextField
				handleChange={onChange}
				{...custom}
			/>
			<p className="text-center text-[#eb4848] mb-1">{errorMessage}</p>
		</>
	)
}

export default ValidateTextField
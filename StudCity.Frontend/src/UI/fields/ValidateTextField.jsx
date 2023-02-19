import React, { useState } from "react";
import TextField from "./TextField";

const ValidateTextField = ({
	validator,
	withErrorMessage = true,
	handleChange,
	...custom
}) => {
	const [errorMessage, setErrorMessage] = useState(" ");

	const onChange = (e) => {
		if (withErrorMessage) {
			handleChange(e.target.value);
			setErrorMessage(validator(e.target.value));
			return;
		}

		handleChange(validator(e.target.value));
	};

	return (
		<>
			<TextField handleChange={onChange} {...custom} />
			<p className="text-center text-[#eb4848] mb-1">{errorMessage}</p>
		</>
	);
};

export default ValidateTextField;

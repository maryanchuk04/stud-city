import React, { useState } from "react";
import TextField from "./TextField";

const ValidateTextField = ({
	validator,
	withErrorMessage = true,
	onChange,
	...custom
}) => {
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		if (withErrorMessage) {
			onChange(e.target.value);
			setErrorMessage(validator(e.target.value));
			return;
		}

		onChange(validator(e.target.value));
	};

	return (
		<>
			<TextField
				onChange={handleChange}
				{...custom}
			/>
			{withErrorMessage && <p className="text-center text-[#eb4848] mb-1"> {errorMessage}</p>}
		</>
	);
};

export default ValidateTextField;

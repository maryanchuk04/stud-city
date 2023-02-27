import React, { useState } from "react";
import TextField from "./TextField";

const ValidateTextField = ({
	setDisable = null,
	validator,
	withErrorMessage = true,
	onChange,
	value,
	...custom
}) => {
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		if (withErrorMessage) {
			onChange(e.target.value);
			const message = validator(e.target.value);
			setErrorMessage(message);

			if (setDisable) {
				if (message.length !== 0)
					setDisable(true);
				else
					setDisable(false);
			}


			return;
		}

		// 
		const value = validator(e.target.value);
		if (setDisable) {
			if (value.lenмgth === 0)
				setDisable(true);
			else
				setDisable(false);
		}

		onChange(value);
	};

	return (
		<>
			<TextField
				onChange={handleChange}
				value={value}
				{...custom}
			/>
			{withErrorMessage && <p className="text-center text-[#eb4848] mb-1"> {errorMessage}</p>}
		</>
	);
};

export default ValidateTextField;

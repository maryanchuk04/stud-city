import React, { useState } from "react";
import TextField from "./TextField";

const ValidateTextField = ({
	setDisabled = null,
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

			if (setDisabled) {
				if (message.length !== 0)
					setDisabled(true);
				else
					setDisabled(false);
			}

			return;
		}

		const value = validator(e.target.value);
		if (setDisabled) {
			if (value.lenмgth === 0)
				setDisabled(true);
			else
				setDisabled(false);
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

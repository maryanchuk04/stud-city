// const PHONE_EMPTY_MESSAGE = "The phone number cannot be empty";
// const PHONE_LENGTH_MESSAGE = "The length of the phone number should not exceed 7 characters";

export const passwordValidation = (password) => {
	const passwordInputValue = password.trim();
	const uppercaseRegExp = /(?=.*?[A-Z])/;
	const lowercaseRegExp = /(?=.*?[a-z])/;
	const digitsRegExp = /(?=.*?[0-9])/;
	const specialCharRegExp = /(?=.*?[()#?!@$%^&*-])/;
	const minLengthRegExp = /.{8,}/;
	const passwordLength = passwordInputValue.length;
	const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
	const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
	const digitsPassword = digitsRegExp.test(passwordInputValue);
	const specialCharPassword = specialCharRegExp.test(passwordInputValue);
	const minLengthPassword = minLengthRegExp.test(passwordInputValue);
	let errMsg = "";
	if (passwordLength === 0) {
		errMsg = "Password is empty";
	} else if (!uppercasePassword) {
		errMsg = "At least one Uppercase";
	} else if (!lowercasePassword) {
		errMsg = "At least one Lowercase";
	} else if (!digitsPassword) {
		errMsg = "At least one digit";
	} else if (!specialCharPassword) {
		errMsg = "At least one Special Characters";
	} else if (!minLengthPassword) {
		errMsg = "At least minumum 8 characters";
	}
	return errMsg;
};

export const passwordMatchValidation = (password, confirmPassword) => {
	return password !== confirmPassword ? "Passwords aren`t matches" : "";
};

export const phoneNumberValidator = (value) => {
	const pattern = new RegExp("^\\d{9}$");
	console.log(value.slice(4, value.length))
	if (pattern.test(value.slice(4, value.length))) {
		console.log("Not number")
		return "";
	}

	return value;
};

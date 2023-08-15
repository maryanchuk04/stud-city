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
	let errMsg = '';
	if (passwordLength === 0) {
		errMsg = 'form.validators.empty_password';
	} else if (!uppercasePassword) {
		errMsg = 'form.validators.one_uppercase';
	} else if (!lowercasePassword) {
		errMsg = 'form.validators.one_lowercase';
	} else if (!digitsPassword) {
		errMsg = 'form.validators.one_digit';
	} else if (!specialCharPassword) {
		errMsg = 'form.validators.one_spec_symbol';
	} else if (!minLengthPassword) {
		errMsg = 'form.validators.min_8_characters';
	}
	return errMsg;
};

export const passwordMatchValidation = (password, confirmPassword) => {
	return password !== confirmPassword ? 'form.validators.password_arent_matches' : '';
};

export const numberValidation = (number) => {
	const numberRegex = new RegExp('^[0-9]*$');

	if (numberRegex.test(number)) {
		return number;
	}

	return null;
};

export const phoneNumberValidator = (value) => {
	if (/^\d{0,9}$/.test(value.slice(4, value.length + 1))) {
		return value;
	} else {
		return value.slice(0, value.length - 1);
	}
};

export const emailValidator = (value) => {
	if (value.trim() === '') return 'form.validators.empty_email';

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
		return 'form.validators.invalid_email';
	}

	return '';
};

export const isNumber = (value) => {
	if (typeof value === 'string') {
		return !isNaN(value);
	}
};

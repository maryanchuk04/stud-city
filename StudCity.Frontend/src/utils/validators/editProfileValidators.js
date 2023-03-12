
export const phoneNumberValidator = (value) => {
	if (value.slice(0, 4) !== "+380") {
		return "Phone number must start from +380";
	}
	if (!/^\d{0,9}$/.test(value.slice(4, value.length + 1))) {
		return "Phone number is not valid";
	}
}


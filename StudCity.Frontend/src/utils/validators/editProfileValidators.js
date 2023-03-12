
export const phoneNumberValidator = (value) => {
	if (value.slice(0, 4) !== "+380") {
		return "Phone number must start from +380";
	}
	if (!/^\d{0,9}$/.test(value.slice(4, value.length + 1)) || value.slice(4).length !== 9) {
		return "Phone number is not valid";
	}
}

export const profileDetailsValidator = (details) => {
	const { firstName, lastName, dateOfBirth, avatar, phoneNumber, gender, userName } = details;

	if (firstName === "" || lastName === "" || dateOfBirth === "" || avatar === "" || phoneNumber === "" || gender === "" || userName === "") {
		return false;
	}

	return true;
}

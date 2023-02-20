const PHONE_NUMBER_VALID_LENGTH = 13;

export const registerCompleteUserInformationValidator = ({ 
	firstName,
	lastName,
	userName,
	email,
	gender,
	phoneNumber,
	birthday,
}) => {
	if(firstName === "" 
		|| lastName === "" 
		|| userName === "" 
		|| gender === "" 
		|| email === "" 
		|| phoneNumber === "" 
		|| birthday === ""
	) {
		return false;
	}

	if(phoneNumber.length !== PHONE_NUMBER_VALID_LENGTH) {
		return false;
	}

	return true;
}

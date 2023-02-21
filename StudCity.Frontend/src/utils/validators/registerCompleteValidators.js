const PHONE_NUMBER_VALID_LENGTH = 13;
const ROLE_STUDENT = 1;
const ROLE_TEACHER = 2;

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

export const registerCompleteRoleValidator = (role) => {
	if(role === ROLE_STUDENT || role === ROLE_TEACHER) {
		return true;
	}

	return false;
}
const PHONE_NUMBER_VALID_LENGTH = 13;
export const ROLE_STUDENT = "Student";
export const ROLE_TEACHER = "Teacher";

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

export const registerCompleteAvatarValidator = (avatar) => {
	if(avatar === "") {
		return false;
	}

	return true;
}
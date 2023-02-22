export const REGISTER_COMPLETE_STEPS_COUNT = 5;

export const GENDERS = [
	"male", "female", "other"
]

export const REGISTER_COMPLETE_STEPS = [
	{
		title: "User information",
		description: "Enter all your necessary data so that other users can get to know you better."
	},
	{
		title: "Upload avatar",
		description: "In order to successfully complete the registration, you need to upload your profile picture."
	},
	{
		title: "Choose role",
		description: "Choose your role on the StudCity"
	},
	{
		title: "Groups",
		description: "You can immediately apply to be added to different groups."
	},
	{
		title: "Settings",
		description: "Select site settings. (You can change them at any time)"
	}
]


export const MONTH = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export const getRegisterCompleteDefautlData = (defaultData) => {
	return {
		userInformation: {
			firstName: defaultData.userInformation.firstName || "",
			lastName: defaultData.userInformation.lastName || "",
			userName: defaultData.userInformation.userName || "",
			email: defaultData.userInformation.email || "userEmail@gmail.com",
			gender: defaultData.userInformation.gender || 1,
			phoneNumber: defaultData.userInformation.phoneNumber || "+380",
			birthday: defaultData.userInformation.birthday || "",
		},
		avatar: "",
		role: 0,
		groups: {},
		settings: {}
	}
}
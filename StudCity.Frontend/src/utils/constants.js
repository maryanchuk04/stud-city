export const DEFAULT_AVATAR_URL = "/images/defaultAvatar.png";

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
			gender: defaultData.userInformation.gender || 1,
			phoneNumber: defaultData.userInformation.phoneNumber || "+380",
			birthday: defaultData.userInformation.birthday || "",
		},
		avatar: "",
		role: "",
		groups: [],
		settings: {}
	}
}

export const GROUP_MOCK = [
	{
		id: "1",
		name: "Математичний факультет ЧНУ",
		usersCount: 442,
		isPrivate: false,
		image: "http://sun9-84.userapi.com/impf/c622929/v622929981/3d979/dSo2RuYjyCM.jpg?size=600x437&quality=96&sign=225909c72a4e04805890508898b50503&type=album"
	},
	{
		id: "2",
		name: "Юридичний факультет ЧНУ",
		usersCount: 341,
		isPrivate: false,
		image: "https://law.chnu.edu.ua/wp-content/uploads/2021/04/yurfak-chnu-building.jpg"
	},
	{
		id: "3",
		name: "Айтішніки ЧНУ",
		usersCount: 442,
		isPrivate: false,
		image: "https://cdn.seeklearning.com.au/media/images/career-guide/module/programmer.jpg"
	},
	{
		id: "4",
		name: "ЧНУ official",
		usersCount: 2542,
		isPrivate: false,
		image: "https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg"
	},
	{
		id: "5",
		name: "Викладачі Математичний Факультет",
		usersCount: 442,
		isPrivate: true,
		image: "https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg"
	},
	{
		id: "6",
		name: "Математичний факультет ЧНУ",
		usersCount: 442,
		isPrivate: false,
		image: "https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg"
	},
	{
		id: "7",
		name: "СтудПарламент ЧНУ",
		usersCount: 1230,
		isPrivate: false,
		image: "https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg"
	},
	{
		id: "8",
		name: "Новини Матфаку",
		usersCount: 201,
		isPrivate: false,
		image: "https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg"
	}
]
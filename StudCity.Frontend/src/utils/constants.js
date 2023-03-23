export const DEFAULT_AVATAR_URL = '/images/defaultAvatar.png';
export const DEFAULT_BACKGROUND_URL = '/images/ChnuBackground.png';
export const SELECT_BACKGROUND_URLS = [
	'/images/background1.jpeg',
	'/images/FlagUkraine.jpeg',
];
export const REGISTER_COMPLETE_STEPS_COUNT = 3;

export const GENDERS = ['male', 'female', 'other'];
export const TEST_ARRAY_MESSAGES = [
	{
		id: 'gfdgssgf',
		content: 'Hello',
		when: '23.03.2023',
		user: {
			id: '42f5826c-6b5e-47b0-eb3b-08db292cdad6',
			fullName: 'Vovan Romaniuk',
			userName: 'the_rmk',
			image: null,
		},
		room: 'Chnu',
		roomId: 'gfgdgjghj',
	},
	{
		id: 'gfdg2gf',
		content: 'Hello',
		when: '23.03.2023',
		user: {
			id: '42f5826c-6b5e-47b0-eb3b-08db292cdad6',
			fullName: 'Vovan Romaniuk',
			userName: 'the_rmk',
			image: null,
		},
		room: 'Chnu',
		roomId: 'gfgdgjghj',
	},
	{
		id: 'gfdg5gf',
		content: 'Hello',
		when: '23.03.2023',
		user: {
			id: 'gfgdgdfdfgdfgd',
			fullName: 'Vovan Romaniuk',
			userName: 'the_rmk',
			image: null,
		},
		room: 'Chnu',
		roomId: 'gfgdgjghj',
	},
	{
		id: 'g67fdggf',
		content: 'Hello',
		when: '23.03.2023',
		user: {
			id: 'gfgdgdfdfgdfgd',
			fullName: 'Vovan Romaniuk',
			userName: 'the_rmk',
			image: null,
		},
		room: 'Chnu',
		roomId: 'gfgdgjghj',
	},
	{
		id: 'gf67dggf',
		content: 'Hello',
		when: '23.03.2023',
		user: {
			id: '42f5826c-6b5e-47b0-eb3b-08db292cdad6',
			fullName: 'Vovan Romaniuk',
			userName: 'the_rmk',
			image: null,
		},
		room: 'Chnu',
		roomId: 'gfgdgjghj',
	},
];

export const REGISTER_COMPLETE_STEPS = [
	{
		title: 'User information',
		description:
			'Enter all your necessary data so that other users can get to know you better.',
	},
	{
		title: 'Upload avatar',
		description:
			'In order to successfully complete the registration, you need to upload your profile picture.',
	},
	{
		title: 'Groups',
		description:
			'You can immediately apply to be added to different groups.',
	},
];

export const MONTH = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const getRegisterCompleteDefautlData = (defaultData) => {
	return {
		userInformation: {
			firstName: defaultData.userInformation.firstName || '',
			lastName: defaultData.userInformation.lastName || '',
			userName: defaultData.userInformation.userName || '',
			gender: defaultData.userInformation.gender || 'male',
			phoneNumber: defaultData.userInformation.phoneNumber || '+380',
			birthday: defaultData.userInformation.birthday || '',
		},
		avatar: '',
		groups: [],
		settings: {},
	};
};

export const GROUP_MOCK = [
	{
		id: '1',
		name: 'Математичний факультет ЧНУ',
		usersCount: 442,
		isPrivate: false,
		image: 'http://sun9-84.userapi.com/impf/c622929/v622929981/3d979/dSo2RuYjyCM.jpg?size=600x437&quality=96&sign=225909c72a4e04805890508898b50503&type=album',
	},
	{
		id: '2',
		name: 'Юридичний факультет ЧНУ',
		usersCount: 341,
		isPrivate: false,
		image: 'https://law.chnu.edu.ua/wp-content/uploads/2021/04/yurfak-chnu-building.jpg',
	},
	{
		id: '3',
		name: 'Айтішніки ЧНУ',
		usersCount: 442,
		isPrivate: false,
		image: 'https://cdn.seeklearning.com.au/media/images/career-guide/module/programmer.jpg',
	},
	{
		id: '4',
		name: 'ЧНУ official',
		usersCount: 2542,
		isPrivate: false,
		image: 'https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg',
	},
	{
		id: '5',
		name: 'Викладачі Математичний Факультет',
		usersCount: 442,
		isPrivate: true,
		image: 'https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg',
	},
	{
		id: '6',
		name: 'Математичний факультет ЧНУ',
		usersCount: 442,
		isPrivate: false,
		image: 'https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg',
	},
	{
		id: '7',
		name: 'СтудПарламент ЧНУ',
		usersCount: 1230,
		isPrivate: false,
		image: 'https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg',
	},
	{
		id: '8',
		name: 'Новини Матфаку',
		usersCount: 201,
		isPrivate: false,
		image: 'https://bukinfo.com.ua/news-gallery/62dff9fe557e0.jpg',
	},
];

export const EDIT_PROFILE_SIDEBAR = [
	{
		title: 'My details',
		icon: 'fa-solid fa-address-card',
	},
	{
		title: 'Settings',
		icon: 'fa-duotone fa-gear',
	},
	{
		title: 'Security',
		icon: 'fa-solid fa-shield-halved',
	},
];

export const USER_PROFILE_ICONS = [
	'fa-solid fa-signature',
	'fa-solid fa-envelope',
	'fa-solid fa-cake-candles',
	'fa-solid fa-phone',
	'fa-solid fa-venus-mars',
	'fa-solid fa-person-chalkboard',
];

export const HEADER_LINKS = [
	{
		path: '/feeds',
		name: 'Feeds',
	},
	{
		path: '/profile',
		name: 'Profile',
	},
	{
		path: '/groups',
		name: 'Groups',
	},
	{
		path: '/users',
		name: 'Users',
	},
];

export const ICON_NAVBAR_ICONS = [
	{
		icon: 'fa-sharp fa-regular fa-bell',
		name: 'Notification',
	},
	{
		icon: 'fa-regular fa-comments',
		name: 'Chats',
	},
	{
		icon: 'fa-light fa-screen-users',
		name: 'My Groups',
	},
];

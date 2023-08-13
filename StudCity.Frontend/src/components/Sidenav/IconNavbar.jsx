import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuState, selectNavbarState, toggleNavbar } from '../../app/features/navbarSlice';
import { ICON_NAVBAR_ICONS } from '../../utils/constants';
import IconButton from '../../UI/IconButton';
import { AuthenticateService } from '../../services/authenticateService';
import { useTranslation } from 'react-i18next';

const IconNavbar = () => {
	const { t } = useTranslation();
	const service = new AuthenticateService();
	const iconStyles = 'rounded-full p-2 fa-solid fa-arrow-left duration-200 ';
	const { isOpen, active } = useSelector(selectNavbarState);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(toggleNavbar());
	};

	const handleClickIcon = (active, activeName) => {
		dispatch(changeMenuState({ active, activeName }));
	};

	const handleLogout = async () => {
		await service.logOut();
	};

	return (
		<div className='flex flex-col gap-3 w-24 items-center pt-2 border-r-2 h-full relative'>
			{ICON_NAVBAR_ICONS.map((item, index) => (
				<div
					key={item.name}
					onClick={() => handleClickIcon(index, t(item.name))}
					className={`w-12 h-12 flex cursor-pointer hover:bg-customGreen hover:shadow rounded-lg duration-300 ${
						index === active && 'bg-customGreen shadow'
					}`}
				>
					<i
						className={`${item.icon} w-11/12 h-full m-auto grid place-items-center text-xl `}
					></i>
				</div>
			))}
			<button
				className='hover:bg-primaryGold duration-500 focus-visible:outline-none w-10 h-10 rounded-full bg-customGreen grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				onClick={handleClick}
			>
				<i className={isOpen ? iconStyles : `${iconStyles} rotate-180`}></i>
			</button>
			<IconButton
				onClick={handleLogout}
				className='absolute bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-8 hover:bg-primaryGold bg-customGreen text-black'
			>
				<i className='fa-solid fa-right-from-bracket'></i>
			</IconButton>
		</div>
	);
};

export default IconNavbar;

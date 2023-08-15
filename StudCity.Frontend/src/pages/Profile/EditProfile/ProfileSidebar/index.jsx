import React from 'react';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'react-i18next';

const ProfileSidebar = ({ items, menuState, setMenuState }) => {
	const { t } = useTranslation();
	return (
		<div className='w-5/6 pl-0'>
			{items.map((item, index) => (
				<SidebarItem
					isActive={menuState === index}
					title={t(item.title)}
					icon={item.icon}
					key={`${item}-${index}`}
					handleClick={() => setMenuState(index)}
				/>
			))}
		</div>
	);
};

export default ProfileSidebar;

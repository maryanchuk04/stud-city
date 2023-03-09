import React from 'react'
import SidebarItem from './SidebarItem';

const ProfileSidebar = ({ items, menuState, setMenuState }) => {
	return (
		<div className='w-5/6 pl-0'>
			{
				items.map((item, index) => (
					<SidebarItem isActive={menuState === index} title={item.title} icon={item.icon} key={`${item}-${index}`} handleClick={() => setMenuState(index)} />
				))
			}
		</div>
	)
}

export default ProfileSidebar;
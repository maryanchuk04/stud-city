import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectNavbarState, toggleNavbar } from '../../app/features/navbar/navbarSlice';

const IconNavbar = () => {
	const iconStyles = " rounded-full p-2 fa-solid fa-arrow-left";
	const fullBarIsOpen = useSelector(selectNavbarState);
	const dispatch = useDispatch();
	const icons = [
		{
			icon: "fa-sharp fa-regular fa-bell",
			name: "My groups",
			path: "/groups/my"
		},
		{
			icon: "fa-regular fa-comments",
			name: "Chats",
			path: ""
		},
		{
			icon: "",
			name: ""
		},
		{
			icon: "",
			name: ""
		},
	];

	const handleClick = () => {
		dispatch(toggleNavbar());
	}

	return (
		<div className='flex flex-col gap-3 w-20 items-center pt-2 border-r-2 h-full relative'>
			{
				icons.map((item) => (
					<div key={item.name} className="w-16 h-16 flex cursor-pointer hover:bg-elephantBone hover:shadow rounded-lg duration-300">
						<i className={`${item.icon} w-11/12 h-full m-auto grid place-items-center text-xl `}></i>
					</div>
				))
			}
			<button className='hover:text-white hover:bg-primaryGold duration-500 focus-visible:outline-none w-10 h-10 rounded-full bg-[#bbddb7] grid place-items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={handleClick}>
				<i className={fullBarIsOpen ? iconStyles : `${iconStyles} rotate-180`}></i>
			</button>
		</div>
	)
}

export default IconNavbar
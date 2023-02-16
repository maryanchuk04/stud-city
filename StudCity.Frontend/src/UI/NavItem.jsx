import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ children, to = '/', className = '' }) => {
	return (
		<Link to={to} className={`group w-fit mainPageGradient bg-clip-text text-transparent relative px-5 py-2 font-semibold text-base ${className}`}>
			<i className='hidden absolute -top-1 left-1/2 -translate-x-1/2 p-1 border-white border-r-2 border-b-2 rotate-45 group-hover:inline-block group-hover:animate-bouncingArrow' />
			{children}
		</Link>
	)
}

export default NavItem;
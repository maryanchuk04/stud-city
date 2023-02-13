import React from 'react';
import { Link } from 'react-router-dom';

import Svg from '../../components/Svg';

const Main = () => {
	const transparentText = 'mainPageGradient bg-clip-text text-transparent';

	return (
		<div className='mainPageGradient w-screen h-screen grid place-items-center overflow-auto'>
			<div className='w-11/12 max-w-5xl h-3/4 flex items-center rounded-md bg-white/50 backdrop-blur-md shadow-card'>
				<div className='w-fit max-w-sm flex flex-col ml-20 text-left'>
					<h1 className={`${transparentText} text-6xl font-bold`}>Welcome to StudCity!</h1>
					<h3 className={`${transparentText} mt-4 text-base`}>Best place to learn, and have fun.</h3>
				</div>
				<div className='w-fit max-w-sm m-auto relative'>
					<div className='w-full flex justify-end absolute -top-28'>
						<NavItem to='contact' className={transparentText}>Contact Us</NavItem>
						<NavItem to='login' className={transparentText}>Login</NavItem>
						<NavItem to='register' className={transparentText}>Register</NavItem>
					</div>
					<Svg type="welcomeSvg" />
				</div>
			</div>
		</div>
	)
}

const NavItem = ({ children, to = '/', className = '' }) => {
	return (
		<Link to={to} className={`group w-fit mainPageGradient bg-clip-text text-transparent relative px-5 py-2 font-semibold text-base ${className}`}>
			<i className='hidden absolute -top-1 left-1/2 -translate-x-1/2 p-1 border-white border-r-2 border-b-2 rotate-45 group-hover:inline-block group-hover:animate-bouncingArrow' />
			{children}
		</Link>
	)
}

export default Main;
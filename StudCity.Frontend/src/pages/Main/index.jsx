import React from 'react';
import NavItem from '../../UI/NavItem';
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
						<NavItem to='authenticate' className={transparentText}>Login</NavItem>
						<NavItem to='registration' className={transparentText}>Register</NavItem>
					</div>
					<Svg type="welcomeSvg" />
				</div>
			</div>
		</div>
	)
}

export default Main;
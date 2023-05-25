import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '../../components/Container';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, selectCurrentUserData } from '../../app/features/userSlice';
import Avatar from '../../UI/Avatar';

const NavItem = ({ children, to }) => {
	return (
		<Link
			className='mr-10  last:mr-0 text-primaryAuthentication drop-shadow-2xl text-3xl font-extrabold hover:text-white duration-300'
			to={`/${to}`}
		>
			{children}
		</Link>
	);
};

export const Welcome = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectCurrentUserData);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, []);

	return (
		<div
			className='h-screen w-full relative'
			style={{ backgroundImage: "url('/images/wickedbackground.png')" }}
		>
			<div className=''>
				<Container className=''>
					<header className='py-4 w-full flex justify-between h-40 items-center'>
						<div className='w-56 h-full'>
							<img src='/logo.png' alt='' className='w-full h-full' />
						</div>
						<div className='flex w-fit items-center'>
							<NavItem to='contact-us'>Contact</NavItem>
							{user.id ? (
								<div
									onClick={() => navigate('/profile')}
									className='cursor-pointer rounded-xl shadow-xl p-4 bg-primaryRegistration/30 w-fit flex items-center animate-pulse'
								>
									<Avatar src={user.avatar} className='h-12 w-12' />
									<div>
										<h2 className='font-extrabold text-xl ml-4'>
											{user.fullName}
										</h2>
										<h1 className='font-bold text-xl ml-4'>{user.email}</h1>
									</div>
								</div>
							) : (
								<React.Fragment>
									<NavItem to='authenticate'>Login</NavItem>
									<button
										onClick={() => navigate('/registration')}
										className='animate-pulse text-2xl font-extrabold text-white p-3 bg-primaryAuthentication rounded-[50px] shadow-lg px-10 hover:bg-primaryRegistration duration-300'
									>
										Join now
									</button>
								</React.Fragment>
							)}
						</div>
					</header>
					<div className='h-[calc(100vh-10rem)] py-20 relative w-fit'>
						<div className='absolute w-40 h-40 rounded-full shadow-lg top-10 animate-bounce right-80  backdrop-blur-xl '></div>
						<div className='absolute w-40 h-40 rounded-full shadow-lg bottom-10 animate-bounce  left-40 backdrop-blur-xl '></div>
						<div className='absolute animate-bounce  w-32 h-32 rounded-full shadow-lg bottom-80 left-56 backdrop-blur-xl '></div>
						<h1 className=' text-9xl font-extrabold text-primaryAuthentication drop-shadow-xl w-fit'>
							Welcome To <br />
							StudCity
							<h4 className='text-5xl mt-12 text-primaryAuthentication font-light'>
								With us, your studies will become more comfortable!
							</h4>
						</h1>
					</div>
				</Container>
			</div>
		</div>
	);
};

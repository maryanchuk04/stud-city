import React from 'react'
import { useSelector } from 'react-redux';
import { selectNavbarState } from '../../app/features/navbar/navbarSlice';
import FullNavbar from './FullNavbar'
import IconNavbar from './IconNavbar'

const Sidenav = () => {
	const fullNavbar = useSelector(selectNavbarState);
	return (
		<div className='w-auto max-w-xs flex h-full'>
			<IconNavbar />
			{fullNavbar && <FullNavbar />}
		</div>
	)
}

export default Sidenav
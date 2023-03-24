import React from 'react'
import { useSelector } from 'react-redux';
import { selectNavbarState } from '../../app/features/navbarSlice';
import FullNavbar from './FullNavbar'
import IconNavbar from './IconNavbar'

const Sidenav = () => {
	const { isOpen, active, activeName } = useSelector(selectNavbarState);
	return (
		<div className='w-auto max-w-xl flex h-full'>
			<IconNavbar />
			{isOpen && <FullNavbar active={active} activeName={activeName} />}
			
		</div>
	)
}

export default Sidenav
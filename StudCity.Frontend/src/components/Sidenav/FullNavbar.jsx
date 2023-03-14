import React from 'react'
import Switch from '../Switch'
import MenuComponents from './MenuItems'

const FullNavbar = ({ active, activeName }) => {
	return (
		<div className='w-80 border-r-2'>
			<div className='w-5/6 mx-auto mt-4'>
				<h1 className='text-2xl font-semibold'>{activeName}</h1>
				<Switch active={active} components={MenuComponents} />
			</div>
		</div >
	)
}

export default FullNavbar
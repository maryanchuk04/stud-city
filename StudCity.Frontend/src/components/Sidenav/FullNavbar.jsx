import React from 'react'
import ChatSideItem from './MenuItems/ChatSideItem'

const FullNavbar = ({ active, activeName }) => {
	const render = () => {
		switch (active) {
			case 0: {
				return <>{activeName}</>
			}
			case 1: {
				return <ChatSideItem />
			}
			case 2: {
				return <>{activeName}</>
			}
		}
	}

	return (
		<div className='w-80 border-r-2'>
			<div className='w-5/6 mx-auto mt-4'>
				<h1 className='text-2xl font-semibold'>{activeName}</h1>
				{render()}
			</div>
		</div>
	)
}

export default FullNavbar
import React from 'react'

const Scroller = ({ children }) => {
	return (
		<div className='h-full w-full flex overflow-y-auto'>
			{children}
		</div>
	)
}

export default Scroller
import React from 'react'

const Scroller = ({ children, resRef = null }) => {
	return (
		<div ref={resRef} className='h-full w-full overflow-y-auto'>
			{children}
		</div>
	)
}

export default Scroller
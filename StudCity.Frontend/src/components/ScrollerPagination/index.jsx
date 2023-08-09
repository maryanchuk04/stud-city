import React from 'react';

const ScrollerPagination = ({ children, parentRef = null }) => {

	return (
		<div ref={parentRef} className='h-full w-full overflow-y-auto'>
			{children}
		</div >
	)
}

export default ScrollerPagination
import React from 'react'

const IconButton = ({ children, className = "", ...custom }) => {
	return (
		<button
			className={`duration-500 rounded-full w-12 h-12 p-1 hover:bg-primaryGold text-white ${className}`}
			{...custom}
		>
			{children}
		</button>
	)
}

export default IconButton
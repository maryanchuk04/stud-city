import React from 'react'

const Option = ({ children, isSelected = false }) => {
	return (
		<option className="bg-primaryAuthentication text-primaryWhite rounded hover:bg-primaryWhite" selected={isSelected}>
			{children}
		</option>
	)
}

export default Option
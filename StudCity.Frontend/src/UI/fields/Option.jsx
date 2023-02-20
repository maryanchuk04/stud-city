import React from 'react'

const Option = ({ children }) => {
	return (
		<option className="bg-primaryAuthentication text-primaryWhite rounded hover:bg-primaryWhite ">
			{children}
		</option>
	)
}

export default Option
import React from 'react'
import FetchSpinner from '../FetchSpinner'

const Layout = ({ children }) => {
	return (
		<div>
			{children}
			<FetchSpinner />
		</div>
	)
}

export default Layout
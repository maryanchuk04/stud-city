import React from 'react'
import FetchSpinner from '../FetchSpinner'

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen'>
			{children}
			<FetchSpinner />
		</div>
	)
}

export default Layout
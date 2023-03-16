import React from 'react'
import ProtectedRoute from '../ProtectedRoute'
import { tokenProtection } from '../../pages/routeProtection'
import Layout from '../Layout'

const AuthRoute = ({ component }) => {
	return <ProtectedRoute protectWhen={tokenProtection} redirectTo="/authenticate">
		<Layout>
			{component}
		</Layout>
	</ProtectedRoute>
}

export default AuthRoute
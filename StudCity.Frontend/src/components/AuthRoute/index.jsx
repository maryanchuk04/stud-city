import React from 'react'
import ProtectedRoute from '../ProtectedRoute'
import { tokenProtection } from '../../pages/routeProtection'
import Layout from '../Layout'

const AuthRoute = ({ component, signalR = null }) => {
	return <ProtectedRoute protectWhen={tokenProtection} redirectTo="/authenticate">
		<Layout signalR={signalR}>
			{component}
		</Layout>
	</ProtectedRoute>
}

export default AuthRoute
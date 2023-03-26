import React, { useEffect } from 'react'
import ProtectedRoute from '../ProtectedRoute'
import { tokenProtection } from '../../pages/routeProtection'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { connectToChatHub, selectHubConnection } from '../../app/features/chatsSlice'

const AuthRoute = ({ component }) => {
	const dispatch = useDispatch();
	const hubConnection = useSelector(selectHubConnection);


	useEffect(() => {
		if (!hubConnection) {
			dispatch(connectToChatHub());
		}
	}, [hubConnection])
	return <ProtectedRoute protectWhen={tokenProtection} redirectTo="/authenticate">
		<Layout>
			{component}
		</Layout>
	</ProtectedRoute>
}

export default AuthRoute
import React, { useEffect } from 'react'
import ProtectedRoute from '../ProtectedRoute'
import { tokenProtection } from '../../pages/routeProtection'
import Layout from '../Layout'
import { useDispatch, useSelector } from 'react-redux'
import { connectToChatHub, selectHubConnection, selectUserChats } from '../../features/chatsSlice';
import { TokenService } from '../../services/tokenService'

const AuthRoute = ({ component }) => {
	const dispatch = useDispatch();
	const tokenService = new TokenService();
	const chats = useSelector(selectUserChats);
	const hubConnection = useSelector(selectHubConnection);

	useEffect(() => {
		if (tokenService.getToken()) {
			if (!hubConnection && chats.length > 0) {
				dispatch(connectToChatHub(chats.map(x => x.id)));
			}
		}
	}, [hubConnection, chats])

	return <ProtectedRoute protectWhen={tokenProtection} redirectTo="/authenticate">
		<Layout>
			{component}
		</Layout>
	</ProtectedRoute>
}

export default AuthRoute
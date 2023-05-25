import React from 'react';
import Authenticate from './Authenticate';
import Registration from './Registration';
import RegistrationComplete from './RegistrationComplete';
import NotFound from './NotFound';
import VerifyEmail from './Verify-email';
import ForgotPassword from './ForgotPassword';
import RecoveryPassword from './RecoveryPassword';
import ProtectedRoute from '../components/ProtectedRoute';
import { tokenProtection } from './routeProtection';
import EditProfile from './Profile/EditProfile';
import ViewProfile from './Profile/ViewProfile';
import ContactUs from './ContactUs';
import AuthRoute from '../components/AuthRoute';
import Chat from './Chat';
import { Welcome } from './Welcome';
import Groups from './Groups';

export const routes = [
	{
		path: '/',
		element: <Welcome />,
	},
	{
		path: '/authenticate',
		element: <Authenticate />,
	},
	{
		path: '/registration',
		element: <Registration />,
	},
	{
		path: '/registration-complete',
		element: (
			<ProtectedRoute protectWhen={tokenProtection} redirectTo='/authenticate'>
				<RegistrationComplete />
			</ProtectedRoute>
		),
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
	{
		path: '/recovery-password/:accountId',
		element: <RecoveryPassword />,
	},
	{
		path: '/profile',
		element: <AuthRoute component={<EditProfile />} />,
	},
	{
		path: '/profile/:id',
		element: <AuthRoute component={<ViewProfile />} />,
	},
	{
		path: '/verify-email/:accountId',
		element: <VerifyEmail />,
	},
	{
		path: '/chats/:chatId',
		element: <AuthRoute component={<Chat />} />,
	},
	{
		path: '/contact-us',
		element: <ContactUs />,
	},
	{
		path: '/groups',
		element: <AuthRoute component={<Groups />} />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

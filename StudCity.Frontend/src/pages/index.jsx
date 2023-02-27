import React from "react"
import Main from "./Main"
import Authenticate from "./Authenticate"
import Registration from './Registration';
import RegistrationComplete from "./RegistrationComplete";
import NotFound from "./NotFound"
import VerifyEmail from "./Verify-email";
import ForgotPassword from "./ForgotPassword";
import RecoveryPassword from "./RecoveryPassword";

export const routes = [
	{
		path: "/",
		element: <Main />
	},
	{
		path: '/authenticate',
		element: <Authenticate />
	},
	{
		path: '/registration',
		element: <Registration />
	},
	{
		path: '/registration-complete',
		element: <RegistrationComplete />
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />
	},
	{
		path: '/recovery-password/:accountId',
		element: <RecoveryPassword />
	},
	{
		path: '/verify-email/:accountId',
		element: <VerifyEmail />
	},
	{
		path: "*",
		element: <NotFound />
	}
]
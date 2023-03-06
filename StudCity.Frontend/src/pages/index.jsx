import React from "react"
import Main from "./Main"
import Authenticate from "./Authenticate"
import Registration from './Registration';
import RegistrationComplete from "./RegistrationComplete";
import NotFound from "./NotFound"
import VerifyEmail from "./Verify-email";
import ForgotPassword from "./ForgotPassword";
import RecoveryPassword from "./RecoveryPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import { tokenProtection } from "./routeProtection";
import EditProfile from "./Profile/EditProfile";

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
		element: <ProtectedRoute protectWhen={tokenProtection} redirectTo="/authenticate">
			<RegistrationComplete />
		</ProtectedRoute>
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
		path: '/edit-profile/:accountId',
		element: <EditProfile />
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
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
import { TokenService } from "../services/tokenService";

const tokenService = new TokenService();

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
		element: <ProtectedRoute protectWhen={tokenService.getToken()} redirectTo="/authenticate">
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
		path: '/verify-email/:accountId',
		element: <VerifyEmail />
	},
	{
		path: "*",
		element: <NotFound />
	}
]
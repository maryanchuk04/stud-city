import React from "react"
import Main from "./Main/index"
import Authenticate from "./Authenticate/index"
import Registration from './Registration/index';
import RegistrationComplete from "./RegistrationComplete";

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
	}
]
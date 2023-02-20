import React from "react"
import Main from "./Main"
import Authenticate from "./Authenticate"
import Registration from './Registration';
import RegistrationComplete from "./RegistrationComplete";
import NotFound from "./NotFound"

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
		path: "*",
		element: <NotFound />
	}
]
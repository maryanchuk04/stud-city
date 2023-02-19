import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main";
import Authenticate from "./pages/authenticate";
import Registration from "./pages/registration";
import VerifyEmail from "./pages/verify-email";

const router = createBrowserRouter([
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
		path: '/verify-email/:accountId',
		element: <VerifyEmail />
	}
]);

function App() {
    return (
		<RouterProvider router={router} />
    );
}

export default App;

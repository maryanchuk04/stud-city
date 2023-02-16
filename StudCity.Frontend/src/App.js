import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

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

import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />
	},
	{
		page: '/authenticate',
		element: <Authenticate />
	},
	{
		page: '/registration',
		element: <Registration />
	}
]);

function App() {
    return (
		<RouterProvider router={router} />
    );
}

export default App;

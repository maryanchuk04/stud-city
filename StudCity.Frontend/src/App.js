import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";

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
		path: "*",
		element: <NotFound/>
	}
]);

function App() {
    return (
		<RouterProvider router={router} />
    );
}

export default App;

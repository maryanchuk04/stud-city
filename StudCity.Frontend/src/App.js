import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Main from "./pages/Main";
import Authenticate from "./pages/Authenticate";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import SecondStep from "./pages/secondStep";
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
		path: '/second-step',
		element: <SecondStep />
	},
	{
		path: '/not-found',
		element: <NotFound/>
	}
]);

function App() {
    return (
		<RouterProvider router={router} />
    );
}

export default App;

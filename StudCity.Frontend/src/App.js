import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages/index.jsx";

const router = createBrowserRouter(routes);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;

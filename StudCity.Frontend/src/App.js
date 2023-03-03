import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/index.jsx";
import { routes } from "./pages/index.jsx";

const router = createBrowserRouter(routes);

function App() {
	return (
		<Layout>
			<RouterProvider router={router} />
		</Layout>
	);
}

export default App;

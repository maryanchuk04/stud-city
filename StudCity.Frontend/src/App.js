import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages/index.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes);
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
	return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    );
}

export default App;

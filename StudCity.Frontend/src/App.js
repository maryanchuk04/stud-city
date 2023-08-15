import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './pages/index.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes);
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUserLanguage } from './app/features/userSlice.js';

function App() {
	const { i18n } = useTranslation();
	const language = useSelector(selectUserLanguage);

	useEffect(() => {
		if (language) i18n.changeLanguage(language);
	}, [language]);

	return (
		<GoogleOAuthProvider clientId={googleClientId}>
			<RouterProvider router={router} />
		</GoogleOAuthProvider>
	);
}

export default App;

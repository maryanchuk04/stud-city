import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, protectWhen, redirectTo = "/" }) => {
	const isDisabled = protectWhen();

	if (isDisabled) {
		return <Navigate to={redirectTo} />
	}

	return children;
}

export default ProtectedRoute;
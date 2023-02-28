import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, protectWhen, redirectTo = "/" }) => {
	if (!protectWhen) {
		return <Navigate to={redirectTo} />
	}

	return children;
}

export default ProtectedRoute;
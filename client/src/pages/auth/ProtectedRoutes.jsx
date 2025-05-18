import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    
    const isAuthenticated = !!token;
    
    // If role is specified, check if user has that role
    if (requiredRole && userRole !== requiredRole) {
        // Redirect to appropriate page based on actual role
        if (isAuthenticated) {
            return <Navigate to={userRole === 'admin' ? '/admin' : '/user'} />;
        }
        return <Navigate to="/login" />;
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute
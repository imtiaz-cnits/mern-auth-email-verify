import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import api from '../api/index.js';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = unauthenticated
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.post('/is-auth');
                setIsAuthenticated(response.data.success);
            } catch (error) {
                console.error('Authentication check failed:', error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        // Display a loading state while checking authentication
        return (
            <div className="flex h-screen items-center justify-center bg-[var(--bg)] dark:bg-[var(--dark-bg)]">
                <div className="text-[var(--text-1)] dark:text-[var(--text-4)]">Loading...</div>
            </div>
        );
    }

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/auth" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
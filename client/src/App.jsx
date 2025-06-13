import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Auth from './pages/admin/Auth.jsx';
import VerifyEmail from './pages/admin/VerifyEmail.jsx';
import ResetPassword from './pages/admin/ResetPassword.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import { SidebarProvider } from './contexts/SidebarContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Import AuthProvider

const App = () => {
    return (
        <AuthProvider> {/* Wrap with AuthProvider to provide token context */}
            <SidebarProvider>
                <Toaster richColors position="top-right" />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Route>
                    </Route>
                </Routes>
            </SidebarProvider>
        </AuthProvider>
    );
};

export default App;
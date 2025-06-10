import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Auth from "./pages/admin/Auth.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />} />
            <Route path="/auth" element={<Auth />} />
        </Routes>
    );
};

export default App;
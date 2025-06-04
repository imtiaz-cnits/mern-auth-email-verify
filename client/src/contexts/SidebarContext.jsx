import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        // Get initial state from localStorage
        const stored = localStorage.getItem('sidebarCollapsed');
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        // Update localStorage when state changes
        localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));

        // Update body class for responsive styling
        document.body.classList.toggle('sidebar-collapsed', isCollapsed);
    }, [isCollapsed]);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

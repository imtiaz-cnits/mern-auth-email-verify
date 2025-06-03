import { useEffect } from 'react';
import { scriptLoader } from './useScriptLoader';

const useAdminScripts = () => {
    useEffect(() => {
        const scripts = [
            '/admin/js/app.js',
            '/admin/js/sidebar.js'
        ];

        const loadAllScripts = async () => {
            try {
                await Promise.all(scripts.map(src => scriptLoader.loadScript(src)));
            } catch (error) {
                console.error('Error loading admin scripts:', error);
            }
        };

        loadAllScripts();

        // Cleanup function
        return () => {
            // Only remove scripts if no other admin components are mounted
            const adminComponents = document.querySelectorAll('.navbar, .sidebar');
            if (adminComponents.length <= 1) {
                scripts.forEach(src => scriptLoader.removeScript(src));
            }
        };
    }, []); // Empty dependency array means this runs once when component mounts
};

export default useAdminScripts;


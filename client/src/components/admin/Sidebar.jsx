import React from 'react';
import { toast } from "sonner";
import sidebarLogo from '../../../public/admin/icon/sidebar-logo.png';
import sidebarBrandNameLogo from '../../../public/admin/icon/sidebar-brandname-logo.png';
import darkSidebarLogo from '../../../public/admin/icon/dark-sidebar-logo.png';
import darkSidebarBrandNameLogo from '../../../public/admin/icon/dark-brand-name-logo.png';
import useDarkMode from "../../hooks/useDarkMode.jsx";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api/index.js";

const Sidebar = () => {
    const navigate = useNavigate();
    const [dark] = useDarkMode();

    const handleLogout = async () => {
        try {
            // Call backend logout endpoint to clear HTTP-only cookie
            const response = await api.post('/logout');
            if (response.data.success) {
                // Remove any client-side token (optional, as your app uses cookies)
                localStorage.removeItem('token');
                // Show success toast
                toast.success('Logout successful');
                // Navigate to sign-in page
                navigate('/auth');
            }
        } catch (error) {
            // Handle errors (e.g., network issues)
            console.error('Logout error:', error);
            toast.error('Logout failed. Please try again.');
        }
    };

    return (
        <aside className="sidebar fixed top-0 left-0 h-screen w-[270px] bg-[var(--bg)] dark:!bg-[var(--dark-bg2)] transition-all duration-[0.4s] ease">
            <header className="sidebar-header shadow-sm dark:!border-[var(--border-color2)]">
                {/* Light mode logos */}
                <div className={`light-logo-box ${dark ? 'hidden' : 'block'}`}>
                    <Link to="/" className="header-logo">
                        <img className="sidebar-logo" src={sidebarLogo} alt="Logo" />
                        <img className="sidebar-brandname-logo" src={sidebarBrandNameLogo} alt="Brand Logo" />
                    </Link>
                </div>

                {/* Dark mode logos */}
                <div className={`dark-logo-box ${dark ? 'block' : 'hidden'}`}>
                    <Link to="/" className="dark-header-logo">
                        <img className="sidebar-logo" src={darkSidebarLogo} alt="Logo" />
                        <img className="sidebar-brandname-logo" src={darkSidebarBrandNameLogo} alt="Brand Logo" />
                    </Link>
                </div>

                <button className="sidebar-toggler text-[var(--text-2)] dark:text-[var(--text-4)]">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            </header>

            <nav className="sidebar-nav">
                <ul className="nav-list primary-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
              <span className="w-[24px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_402_2908)">
                    <path
                        d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z"
                        fill="var(--text-2)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_2908">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Dashboard</span>
                        </Link>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link dropdown-title">Dashboard</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/nft-marketplace" className="nav-link">
              <span className="w-[24px]">
                {/* Placeholder for NFT icon SVG */}
                  <i className="fa-solid fa-cubes text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">NFT Marketplace</span>
                        </Link>
                    </li>

                    <li className="nav-item dropdown-container">
                        <Link to="/tables" className="nav-link dropdown-toggle">
              <span className="w-[24px]">
                {/* Placeholder for Tables icon SVG */}
                  <i className="fa-solid fa-table text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Tables</span>
                            <i className="dropdown-icon fa-solid fa-angle-down"></i>
                        </Link>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link to="/tables/1" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-1</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tables/2" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-2</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/tables/3" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-3</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/kanban" className="nav-link">
              <span className="w-[24px]">
                {/* Placeholder for Kanban icon SVG */}
                  <i className="fa-solid fa-columns text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Kanban</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
              <span className="w-[24px]">
                {/* Placeholder for Profile icon SVG */}
                  <i className="fa-solid fa-user text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Profile</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/signin" className="nav-link">
              <span className="w-[24px]">
                {/* Placeholder for Sign in icon SVG */}
                  <i className="fa-solid fa-sign-in-alt text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Sign In</span>
                        </Link>
                    </li>

                    <li className="nav-item dropdown-container">
                        <Link to="/bookmarks" className="nav-link dropdown-toggle">
                            <div className="w-24px">
                                <i className="fa-solid fa-star text-[var(--text-2)]"></i>
                            </div>
                            <span className="nav-label dark:text-[var(--text-4)]">Bookmarks</span>
                            <i className="dropdown-icon fa-solid fa-angle-down"></i>
                        </Link>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link to="/bookmarks/blogs" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i>
                                    <span>Favorite Blogs</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/bookmarks/guides" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i>
                                    <span>Resource Guides</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav-list secondary-nav dark:!bg-[var(--dark-bg2)]">
                    <li className="nav-item">
                        <Link to="/support" className="nav-link">
              <span className="w-[24px]">
                <i className="fa-solid fa-circle-question text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Support</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button
                            onClick={handleLogout}
                            className="nav-link w-full text-left flex items-center cursor-pointer"
                        >
              <span className="w-[24px]">
                <i className="fa-solid fa-right-from-bracket text-[var(--text-2)]"></i>
              </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Sign Out</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
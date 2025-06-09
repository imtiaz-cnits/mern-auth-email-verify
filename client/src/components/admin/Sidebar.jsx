import React from 'react';
import sidebarLogo from '../../../public/admin/icon/sidebar-logo.png'
import sidebarBrandNameLogo from '../../../public/admin/icon/sidebar-brandname-logo.png'
import darkSidebarLogo from '../../../public/admin/icon/dark-sidebar-logo.png'
import darkSidebarBrandNameLogo from '../../../public/admin/icon/dark-brand-name-logo.png'
import useDarkMode from "../../hooks/useDarkMode.jsx";

const Sidebar = () => {
    const [dark] = useDarkMode();

    return (
        <aside className="sidebar fixed top-0 left-0 h-screen w-[270px] bg-[var(--bg)] dark:!bg-[var(--dark-bg2)] transition-all duration-[0.4s] ease">
            <header className="sidebar-header shadow-sm dark:!border-[var(--border-color2)]">
                {/* Light mode logos */}
                <div className={`light-logo-box ${dark ? 'hidden' : 'block'}`}>
                    <a href="/" className="header-logo">
                        <img
                            className="sidebar-logo"
                            src={sidebarLogo}
                            alt="Logo"
                        />
                        <img
                            className="sidebar-brandname-logo"
                            src={sidebarBrandNameLogo}
                            alt="Brand Logo"
                        />
                    </a>
                </div>

                {/* Dark mode logos */}
                <div className={`dark-logo-box ${dark ? 'block' : 'hidden'}`}>
                    <a href="/" className="dark-header-logo">
                        <img
                            className="sidebar-logo"
                            src={darkSidebarLogo}
                            alt="Logo"
                        />
                        <img
                            className="sidebar-brandname-logo"
                            src={darkSidebarBrandNameLogo}
                            alt="Brand Logo"
                        />
                    </a>
                </div>

                <button
                    className="sidebar-toggler text-[var(--text-2)] dark:text-[var(--text-4)]">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
            </header>

            <nav className="sidebar-nav">
                <ul className="nav-list primary-nav">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <span className="w-[24px]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_402_2908)">
                                        <path
                                            d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z"
                                            fill="var(--text-2)"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_402_2908">
                                            <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Dashboard</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <a href="/" className="nav-link dropdown-title">Dashboard</a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a href="/nft-marketplace" className="nav-link">
                            <span className="w-[24px]">
                                {/* NFT icon SVG */}
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">NFT Marketplace</span>
                        </a>
                    </li>

                    <li className="nav-item dropdown-container">
                        <a href="/tables" className="nav-link dropdown-toggle">
                            <span className="w-[24px]">
                                {/* Tables icon SVG */}
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Tables</span>
                            <i className="dropdown-icon fa-solid fa-angle-down"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <a href="/tables/1" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-1</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/tables/2" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-2</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/tables/3" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i> <span>Table-3</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a href="/kanban" className="nav-link">
                            <span className="w-[24px]">
                                {/* Kanban icon SVG */}
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Kanban</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="/profile" className="nav-link">
                            <span className="w-[24px]">
                                {/* Profile icon SVG */}
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Profile</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="/signin" className="nav-link">
                            <span className="w-[24px]">
                                {/* Sign in icon SVG */}
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Sign In</span>
                        </a>
                    </li>

                    {/* Bookmarks dropdown */}
                    <li className="nav-item dropdown-container">
                        <a href="/bookmarks" className="nav-link dropdown-toggle">
                            <div className="w-24px">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span className="nav-label dark:text-[var(--text-4)]">Bookmarks</span>
                            <i className="dropdown-icon fa-solid fa-angle-down"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <a href="/bookmarks/blogs" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i>
                                    <span>Favorite Blogs</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/bookmarks/guides" className="nav-link dropdown-link">
                                    <i className="fa-solid fa-circle"></i>
                                    <span>Resource Guides</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className="nav-list secondary-nav dark:!bg-[var(--dark-bg2)]">
                    <li className="nav-item">
                        <a href="/support" className="nav-link">
                            <span className="w-[24px]">
                                <i className="fa-solid fa-circle-question text-[var(--text-2)]"></i>
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Support</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="/signout" className="nav-link">
                            <span className="w-[24px]">
                                <i className="fa-solid fa-right-from-bracket text-[var(--text-2)]"></i>
                            </span>
                            <span className="nav-label dark:text-[var(--text-4)]">Sign Out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

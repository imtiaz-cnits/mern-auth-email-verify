import React from 'react';
import useAdminScripts from '../../hooks/useAdminScripts';
import sidebarLogo from '../../../public/admin/icon/sidebar-logo.png'
import sidebarBrandNameLogo from '../../../public/admin/icon/sidebar-brandname-logo.png'
import darkSidebarLogo from '../../../public/admin/icon/dark-sidebar-logo.png'
import darkSidebarBrandNameLogo from '../../../public/admin/icon/dark-brand-name-logo.png'

const Sidebar = () => {
    useAdminScripts();

    return (
        <div className="bg-[var(--adm-secondary)] dark:bg-[var(--adm-dark-1)]">
            <aside className="sidebar dark:!bg-[var(--adm-dark-2)]">
                <header className="sidebar-header shadow-sm dark:!border-[var(--adm-border-dark)]">
                    {/*<!-- light-mode-header-logo -->*/}
                    <div className="light-logo-box">
                        <a href="/" className="header-logo">
                            {/* collapse logo */}
                            <img
                                className="sidebar-logo"
                                src={sidebarLogo}
                                alt="Logo"
                            />
                            {/* png name */}
                            <img
                                className="sidebar-brandname-logo"
                                src={sidebarBrandNameLogo}
                                alt="Logo2"
                            />
                            {/* text name */}
                            {/* <h2 className="text-name">Horizon Free</h2> */}
                        </a>
                    </div>

                    {/*<!------------------------------>*/}
                    {/*<!-- dark-mode-header-logo -->*/}
                    {/*<!--------------------------- -->*/}
                    <div className="dark-logo-box">
                        <a href="/" className="dark-header-logo">
                            {/* collapse logo */}
                            <img
                                className="sidebar-logo"
                                src={darkSidebarLogo}
                                alt="Logo"
                            />
                            {/* png name */}
                            <img
                                className="sidebar-brandname-logo"
                                src={darkSidebarBrandNameLogo}
                                alt="Logo2"
                            />
                            {/* text name */}
                            {/* <h2 className="text-name">Horizon Free</h2> */}
                        </a>
                    </div>
                    <button className="sidebar-toggler">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </header>

                <nav className="sidebar-nav">
                    <ul className="nav-list primary-nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <span className="w-[24px]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_402_2908)">
                                            <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z"
                                                  fill="var(--adm-text-secondary)"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_402_2908">
                                                <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span className="nav-label dark:text-[var(--adm-text-light)]">Dashboard</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a href="/" className="nav-link dropdown-title"
                                    >Dashboard</a
                                    >
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/" className="nav-link">
              <span className="w-[24px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_201_2909)">
                    <path
                        d="M15.55 13C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C21.25 4.82 20.77 4 20.01 4H5.21L4.27 2H1V4H3L6.6 11.59L5.25 14.03C4.52 15.37 5.48 17 7 17H19V15H7L8.1 13H15.55ZM6.16 6H18.31L15.55 11H8.53L6.16 6ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"
                        fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_201_2909">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>

                                <span className="nav-label dark:text-[var(--adm-text-light)]"
                                >NFT Marketplace</span
                                >
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a href="/" className="nav-link dropdown-title">NFT Marketplace</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown-container">
                            <a href="/" className="nav-link dropdown-toggle">
              <span className="w-[24px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_402_2896)">
                    <path
                        d="M7.46683 10.7333H7.70016C8.5985 10.7333 9.3335 11.4683 9.3335 12.3667V20.5333C9.3335 21.4317 8.5985 22.1667 7.70016 22.1667H7.46683C6.5685 22.1667 5.8335 21.4317 5.8335 20.5333V12.3667C5.8335 11.4683 6.5685 10.7333 7.46683 10.7333V10.7333ZM14.0002 5.83334C14.8985 5.83334 15.6335 6.56834 15.6335 7.46668V20.5333C15.6335 21.4317 14.8985 22.1667 14.0002 22.1667C13.1018 22.1667 12.3668 21.4317 12.3668 20.5333V7.46668C12.3668 6.56834 13.1018 5.83334 14.0002 5.83334ZM20.5335 15.1667C21.4318 15.1667 22.1668 15.9017 22.1668 16.8V20.5333C22.1668 21.4317 21.4318 22.1667 20.5335 22.1667C19.6352 22.1667 18.9002 21.4317 18.9002 20.5333V16.8C18.9002 15.9017 19.6352 15.1667 20.5335 15.1667V15.1667Z"
                        fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_2896">
                      <rect width="28" height="28" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>

                                <span className="nav-label dark:text-[var(--adm-text-light)]">Tables</span>
                                <i className="dropdown-icon fa-solid fa-angle-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Tables</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/table" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i> <span>Table-1</span></a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a href="/cloud-solutions" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i> <span>Table-2</span></a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a href="/mobile-apps" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i> <span>Table-3</span></a
                                    >
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/resources" className="nav-link">
              <span className="w-[24px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_402_2890)">
                    <path
                        d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
                        fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_2890">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>

                                <span className="nav-label dark:text-[var(--adm-text-light)]">Kanban</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Kanban</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/extensions" className="nav-link">
              <span className="w-[24px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_402_2884)">
                    <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z"
                        fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_2884">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>

                                <span className="nav-label dark:text-[var(--adm-text-light)]">Profile</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Profile</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/settings" className="nav-link">
              <span className="w-[24px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_402_2876)">
                    <path
                        d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM9 8V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9Z"
                        fill="#A3AED0"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_402_2876">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </span>

                                <span className="nav-label dark:text-[var(--adm-text-light)]">Sign In</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Sign In</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown-container">
                            <a href="#" className="nav-link dropdown-toggle">
                                <div className="w-24px">
                                    <i className="fa-solid fa-star"></i>
                                </div>

                                <span className="nav-label dark:text-[var(--adm-text-light)]">Bookmarks</span>
                                <i className="dropdown-icon fa-solid fa-angle-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Services</a>
                                </li>
                                <li className="nav-item sub-dropdown-container">
                                    <a href="#" className="nav-link sub-dropdown-toggle">
                                        <i className="fa-solid fa-circle"></i>
                                        <span className="nav-label">Sub Menu</span>
                                        <i className="dropdown-icon fa-solid fa-angle-down"></i>
                                    </a>
                                    <ul className="sub-dropdown-menu">
                                        <li className="nav-item">
                                            <a href="/prct" className="nav-link dropdown-link"
                                            >Sub-link 1</a
                                            >
                                        </li>
                                        <li className="nav-item">
                                            <a href="/sub-link2" className="nav-link dropdown-link"
                                            >Sub-link 2</a
                                            >
                                        </li>
                                        <li className="nav-item">
                                            <a href="/sub-link3" className="nav-link dropdown-link"
                                            >Sub-link 3</a
                                            >
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="/favorite-blogs" className="nav-link dropdown-link">
                                        <i className="fa-solid fa-circle"></i>
                                        <span>Favorite Blogs</span></a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a href="/resource-guides" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i
                                    ><span>Resource Guides</span></a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a href="/more-blogs" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i><span>More Blogs</span></a
                                    >
                                </li>
                                <li className="nav-item">
                                    <a href="/more-guides" className="nav-link dropdown-link"
                                    ><i className="fa-solid fa-circle"></i><span>More Guides</span></a
                                    >
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="nav-list secondary-nav dark:!bg-[var(--adm-dark-2)]">
                        <li className="nav-item">
                            <a href="/support" className="nav-link">
                                <span className="w-[24px]">
                                    <i className="fa-solid fa-circle-question text-[var(--adm-text-secondary)]"></i>
                                </span>
                                <span className="nav-label dark:text-[var(--adm-text-light)]">Support</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Support</a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a href="/signout" className="nav-link">
                                <span className="nav-label" style={{ color: 'var(--adm-text-light)' }}>Sign Out</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="nav-item">
                                    <a className="nav-link dropdown-title">Sign Out</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;


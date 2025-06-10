import React from 'react';

const Footer = () => {
    return (
        <div className="copyright sticky bg-[var(--bg)] dark:bg-[var(--dark-bg2)] right-0 bottom-[0px] px-[10px] lg:px-[20px] py-3 z-10">
            <div className="block text-center sm:flex items-center justify-between text-[var(--text-1)] dark:text-[var(--text-4)]">
                <p className="brand">
                    © 2022 Horizon UI. All Rights Reserved.
                </p>
                <div className="menu sm:flex items-center gap-3">
                    <a href="#">Developed By CodeNext IT</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
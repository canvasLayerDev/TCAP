import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate(path);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 0);
        }
    };

    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle menu on hamburger click
    const toggleMenu = () => setMenuOpen(prev => !prev);

    // Close menu
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* HEADER */}
            <header className="header fixed-top">
                <nav className="nav-container-fluid">

                    {/* LEFT */}
                    {/* <div className="nav-left">
                        <img src="/img/logo.jpg" alt="logo" className="logo" /><br></br>
                        <span style={{ marginLeft: "-7px" }}>T Capital Wealth</span>
                    </div> */}

                    {/* <Link to="/" className="logo-link">
                        <img src="/img/logo.jpg" alt="logo" className="logo" /><br></br>
                        <span className="logo-text">T Capital Wealth</span>
                    </Link> */}

                    <div
                        className="logo-link"
                        onClick={() => handleNavClick("/")}
                        style={{ cursor: "pointer" }}
                    >
                        <img src="/img/logo.jpg" alt="logo" className="logo" /><br />
                        <span className="logo-text">T Capital Wealth</span>
                    </div>


                    {/* CENTER (DESKTOP) */}
                    <div className="nav-center">
                        <span className="nav-link" onClick={() => handleNavClick("/")}>Home</span>
                        <span className="nav-link" onClick={() => handleNavClick("/about")}>About</span>
                        <span className="nav-link" onClick={() => handleNavClick("/product")}>Product</span>
                        <span className="nav-link" onClick={() => handleNavClick("/contact")}>Contact</span>
                        <span className="nav-link" onClick={() => handleNavClick("/partner")}>Partnerships</span>
                         <span className="nav-link" onClick={() => handleNavClick("/blog")}>Blogs</span>
                    </div>

                    {/* RIGHT */}
                    <div className="nav-right">
                        <a
                            href="https://mosl.co/YccUGchndd"
                            className="business-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open Account
                        </a>

                        {/* HAMBURGER */}
                        <div className="menu-btn" onClick={toggleMenu}>
                            <span className="material-icons">menu</span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* DARK OVERLAY */}
            <div
                className={`mobile-overlay ${menuOpen ? "open" : ""}`}
                onClick={closeMenu} // overlay click closes menu
            ></div>

            {/* RIGHT DRAWER MENU */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

                {/* MOBILE MENU LINKS */}
                <ul className="mobile-nav">
                    <li>
                        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
                    </li>

                    <li>
                        <NavLink to="/product" onClick={closeMenu}>Product</NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
                    </li>

                    <li>
                        <NavLink to="/partner" onClick={closeMenu}>Partnership</NavLink>
                    </li>

                     <li>
                        <NavLink to="/blog" onClick={closeMenu}>Blogs</NavLink>
                    </li>


                    
                    {/* <li className="mobile-account">
                        <a
                            href="https://mosl.co/YccUGchndd"
                            className="mobile-account-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                        >
                            Open Account
                        </a>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default Header;

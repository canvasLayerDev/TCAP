import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBlog, FaPlus, FaTimes } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`mobile-backdrop ${isOpen ? "visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`admin-sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <img
            src="/images/tcap-logo.jpg"
            alt="T Capital"
            className="sidebar-logo"
          />
          <div className="sidebar-brand">
            <h5 className="sidebar-title">Admin Panel</h5>
            <span className="sidebar-subtitle">Enterprise Admin</span>
          </div>
          {/* Mobile close button */}
          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${isActive("/dashboard") || isActive("/") ? "active" : ""}`}
          >
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </Link>

          <div className="nav-section">
            <span className="nav-section-title">Blog Management</span>

            <Link
              to="/blogs"
              className={`nav-item ${isActive("/blogs") && !isActive("/blogs/create") ? "active" : ""}`}
            >
              <FaBlog className="nav-icon" />
              <span>All Blogs</span>
            </Link>

            <Link
              to="/blogs/create"
              className={`nav-item ${isActive("/blogs/create") ? "active" : ""}`}
            >
              <FaPlus className="nav-icon" />
              <span>Create Blog</span>
            </Link>
          </div>
        </nav>

        <div className="sidebar-cta">
          <Link to="/blogs/create" className="btn-sidebar-cta">
            <FaPlus style={{ fontSize: 13 }} />
            Create Draft
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

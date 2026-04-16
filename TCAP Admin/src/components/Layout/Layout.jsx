import { useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-wrapper">
        <header className="admin-header">
          <div className="header-left">
            {/* Hamburger — only visible on mobile via CSS */}
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              aria-expanded={sidebarOpen}
            >
              <FaBars />
            </button>

            <h4 className="page-title">T Capital Wealth</h4>
          </div>

          <div className="header-right">
            <div className="user-profile">
              <div className="user-avatar">A</div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;

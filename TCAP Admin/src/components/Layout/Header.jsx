import { FaUser, FaBars, FaTimes } from "react-icons/fa";

function Header({ onMenuToggle, isMenuOpen }) {
  return (
    <header className="admin-header">
      <div className="header-left">
        {/* Hamburger menu button - visible only on mobile */}
        <button
          className="hamburger-btn"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h4 className="page-title">T Capital Wealth Admin</h4>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <FaUser className="user-icon" />
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Header;

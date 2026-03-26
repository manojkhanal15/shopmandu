import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = ({ setSearch }) => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const [showAccount, setShowAccount] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Avatar fallback
  const getAvatar = () => {
    if (user?.photoURL) return user.photoURL;
    const name = user?.displayName || user?.email || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=000&color=fff`;
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">

        {/* LEFT */}
        <div className="header__left">
          <Link to="/">
            <img
              src="/images/logo.jpg"
              alt="Shop Mandu"
              className="header__logo"
            />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV */}
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/fabric" onClick={() => setMenuOpen(false)}>Fabric</NavLink>
          <NavLink to="/journal" onClick={() => setMenuOpen(false)}>Journal</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        </nav>

        {/* RIGHT */}
        <div className="header__right">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            className="header__search"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ACCOUNT */}
          <div className="account" ref={dropdownRef}>
            <button
              className="account-trigger"
              onClick={() => setShowAccount(prev => !prev)}
            >
              {user ? (
                <img src={getAvatar()} alt="user" className="account-avatar" />
              ) : (
                <span className="icon">👤</span>
              )}
            </button>

            {showAccount && (
              <div className="account-dropdown">
                {!user ? (
                  <>
                    <h4>Welcome</h4>
                    <div className="account-buttons">
                      <Link to="/login" className="btn-dark">Sign In</Link>
                      <Link to="/signup" className="btn-light">Join</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h4>{user.displayName || user.email}</h4>
                    <button
                      className="btn-dark"
                      onClick={() => {
                        logout();
                        setShowAccount(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* WISHLIST */}
          <button className="icon">♡</button>

          {/* CART */}
          <Link to="/cart" className="cart">
            🛒
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
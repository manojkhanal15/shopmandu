import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import "./Header.css";

const Header = ({ setSearch }) => {
  const { cartItems } = useCart();
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);

    // Clear search when closing
    if (showSearch) {
      setSearch("");
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <Link to="/">
          <img 
            src="/images/logo.jpg" 
            alt="Logo" 
            className="header__logo-img"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="header__nav">
        <NavLink to="/" end>Shop</NavLink>
        <NavLink to="/fabric">Fabric</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <span className="header__welcome">Welcome, Alex</span>

        {/* 🔍 Button */}
        <button className="icon" onClick={toggleSearch}>
          🔍
        </button>

        {/* Search Input */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            className="header__search"
          />
        )}

        <button className="icon">♡</button>

        {/* Cart */}
        <Link to="/cart" className="header__cart">
          🛒 ({cartItems.length})
        </Link>
      </div>
    </header>
  );
};

export default Header;
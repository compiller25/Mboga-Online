import { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../store";
import DarkModeToggle from "./DarkModeToggle";
import { FaHome, FaInfoCircle, FaShoppingCart, FaCreditCard, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="brand">
        <img src="/logo.png" alt="Logo" className="logo" />
        <Link to="/">Mboga Online</Link>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <FaHome className="icon" /> <span className="nav-text">Home</span>
        </Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>
          <FaInfoCircle className="icon" /> <span className="nav-text">About</span>
        </Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart className="icon" /> <span className="nav-text">Cart</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
        <Link to="/checkout" onClick={() => setMenuOpen(false)}>
          <FaCreditCard className="icon" /> <span className="nav-text">Checkout</span>
        </Link>
      </div>

      <div className="navbar-actions">
        <DarkModeToggle />
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}
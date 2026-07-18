import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          TechForge
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/gaming">Gaming</Link>
          <Link to="/builder">Build PC</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/brands">Brands</Link>
        </nav>

        {/* Search */}
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search parts, brands..."
          />
        </div>

        {/* Icons */}
        <div className="nav-icons">

          <Link to="/wishlist" className="icon-btn">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="icon-btn">
            <ShoppingCart size={20} />
          </Link>

          <Link to="/profile" className="icon-btn">
            <User size={20} />
          </Link>

        </div>

      </div>
    </header>
  );
}
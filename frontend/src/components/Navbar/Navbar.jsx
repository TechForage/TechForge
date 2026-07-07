import {
  Cpu,
  Search,
  ChevronDown,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo">
          <div className="logo-icon">
            <Cpu size={20} />
          </div>
          <span>TechForage</span>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Processors, GPUs, Laptops, AI Gear..."
          />

          <button className="search-category">
            All Categories
            <ChevronDown size={14} />
          </button>

          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

        <div className="nav-icons">
          <div className="nav-icon">
            <User size={22} />
            <span>Account</span>
          </div>

          <div className="nav-icon">
            <Heart size={22} />
            <span>Wishlist</span>
          </div>

          <div className="cart">
            <ShoppingCart size={22} />
            <span className="cart-count">3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
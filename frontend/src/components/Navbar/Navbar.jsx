import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Search,
  ChevronDown,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useWatchlist } from "../../contexts/WatchlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { watchlistCount } = useWatchlist();

  return (
    <header className="navbar">
      <div className="container">
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
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

          <div
            className="nav-icon watchlist-nav-icon"
            onClick={() => navigate("/watchlist")}
            role="button"
            tabIndex={0}
          >
            <div className="watchlist-icon-wrap">
              <Heart
                size={22}
                fill={watchlistCount > 0 ? "#00f2fe" : "none"}
                color={watchlistCount > 0 ? "#00f2fe" : "currentColor"}
              />
              {watchlistCount > 0 && (
                <span className="watchlist-badge">{watchlistCount}</span>
              )}
            </div>
            <span>Watchlist</span>
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
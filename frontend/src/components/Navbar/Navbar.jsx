import { useState } from "react";
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
import { useCart } from "../../contexts/CartContext";
import { resolveSearchRoute } from "../../config/searchRoutes";

const Navbar = () => {
  const navigate = useNavigate();
  const { watchlistCount } = useWatchlist();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Shared search handler used by both the Enter key
   * and the search button click.
   */
  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm.length === 0) {
      return; // ignore empty/whitespace-only searches
    }

    const matchedRoute = resolveSearchRoute(trimmedTerm);

    if (matchedRoute) {
      navigate(matchedRoute);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmedTerm)}`);
    }

    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-icon">
            <Cpu size={20} />
          </div>
          <span>TechForage</span>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Processors, GPUs, Laptops, AI Gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-category" type="button">
            All Categories
            <ChevronDown size={14} />
          </button>

          <button className="search-btn" type="button" onClick={handleSearch}>
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

          <div
            className="cart"
            onClick={() => navigate("/cart")}
            role="button"
            tabIndex={0}
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
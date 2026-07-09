import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
import Footer from "../../components/Navbar/Footer";
import { useWatchlist } from "../../contexts/WatchlistContext";
import "./Watchlist.css";
import {
  Cpu,
  CircuitBoard,
  Laptop,
  MemoryStick,
  HardDrive,
  Monitor,
  Gamepad2,
  Wifi,
  Watch,
} from "lucide-react";

const categories = [
  { icon: Cpu, label: "Processors" },
  { icon: CircuitBoard, label: "Graphics Cards" },
  { icon: Laptop, label: "Laptops" },
  { icon: CircuitBoard, label: "Motherboards" },
  { icon: MemoryStick, label: "RAM Memory" },
  { icon: HardDrive, label: "SSD Storage" },
  { icon: Monitor, label: "Monitors" },
  { icon: Gamepad2, label: "Gaming Accessories" },
  { icon: Wifi, label: "Networking" },
  { icon: Watch, label: "Smart Devices" },
];

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const handleAddToCart = (productName) => {
    console.log(`Added ${productName} to cart.`);
  };

  return (
    <div className="techforage-site">
      <div className="wrap">
        <Navbar />

        <div className="content-layout">
          <Sidebar categories={categories} />

          <main className="main-content">
            {watchlist.length === 0 ? (
              <div className="watchlist-empty">
                <div className="watchlist-empty-icon">
                  <Heart size={90} strokeWidth={1.2} />
                </div>
                <h2 className="watchlist-empty-title">Your Watchlist is Empty</h2>
                <p className="watchlist-empty-subtitle">
                  Save your favourite products to view them later.
                </p>
                <button
                  className="watchlist-empty-btn"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <h2 className="watchlist-heading">
                  My Watchlist <span>({watchlist.length})</span>
                </h2>

                <div className="products-grid watchlist-grid">
                  {watchlist.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="card-header">
                        <span className={`badge ${product.badge?.toLowerCase() || ""}`}>
                          {product.badge}
                        </span>
                        <button
                          className="wishlist-btn"
                          onClick={() => removeFromWatchlist(product.id)}
                          aria-label="Remove from watchlist"
                        >
                          <Heart size={16} fill="#ff4081" color="#ff4081" />
                        </button>
                      </div>

                      <div className="product-img-wrapper">
                        <img src={product.image} alt={product.name} />
                      </div>

                      <div className="product-info">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-variant">{product.brand}</p>

                        <div className="rating-row">
                          <span className="rating-tag">★ {product.rating}</span>
                          <span className="review-count">({product.reviews})</span>
                          <span className="assured-tag">✓ Assured</span>
                        </div>

                        <div className="price-row">
                          <span className="current-price">₹{product.price}</span>
                          <span className="original-price">₹{product.originalPrice}</span>
                          <span className="discount-pct">{product.discount}</span>
                        </div>

                        <div className="watchlist-actions">
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product.name)}
                          >
                            🛒 Add to Cart
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromWatchlist(product.id)}
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Watchlist;
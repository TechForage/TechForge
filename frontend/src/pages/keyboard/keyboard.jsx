import React from 'react';
import { Heart } from 'lucide-react';
import './keyboard.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';
import Footer from "../../components/Navbar/Footer";
import { useWatchlist } from '../../contexts/WatchlistContext';
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

const productsData = [
  { id: 1, name: 'HP K200 Bluetooth Standard Laptop Keyboard Compatible...', brand: 'HP', type: 'Black', rating: 3.9, reviews: '1,619', price: 599, originalPrice: 1199, discount: '50% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80' },
  { id: 3, name: 'ZEBRONICS Zeb-K20 / Zeb-K65 Wired USB Standard Desktop...', brand: 'ZEBRONICS', type: 'Black', rating: 4.1, reviews: '3,5246', price: 297, originalPrice: 399, discount: '25% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80' },
  { id: 4, name: 'ZEBRONICS Zeb-Judwaa 750 Combo Wired USB Standard Deskto...', brand: 'ZEBRONICS', type: 'Black', rating: 4.2, reviews: '2,1336', price: 422, originalPrice: 999, discount: '53% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80' },
  { id: 6, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'White', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=300&q=80' },
  { id: 7, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'Yellow', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&q=80' },
  { id: 8, name: 'Chaebol Combo Portable Re...', brand: 'Chaebol', type: 'Yellow', rating: 4.1, reviews: '1,999', price: 998, originalPrice: 1999, discount: '51% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&q=80' },
  { id: 9, name: 'Chaebol Combo Portable Re...', brand: 'Chaebol', type: 'Yellow', rating: 4.1, reviews: '1,999', price: 998, originalPrice: 1999, discount: '51% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80' }
];

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

function Keyboard() {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

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
            <div className="products-grid">
              {productsData.map((product) => {
                const saved = isInWatchlist(product.id);
                return (
                  <div key={product.id} className="product-card">
                    <div className="card-header">
                      <span className={`badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                      <button
                        className="wishlist-btn"
                        onClick={() => toggleWatchlist(product)}
                        aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
                      >
                        <Heart
                          size={16}
                          fill={saved ? "#ff4081" : "none"}
                          color={saved ? "#ff4081" : "currentColor"}
                        />
                      </button>
                    </div>
                    <div className="product-img-wrapper">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-variant">{product.type}</p>

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

                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product.name)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Keyboard;
import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  Cpu,
  Monitor,
  HardDrive,
  Laptop,
  Smartphone,
  Search,
  User,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
  ChevronDown,
  Layers,
  Wifi,
  Sparkles,
  Zap,
  X,
  Trash2
} from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Intel Core i9-14900K', price: 589 },
    { id: 2, name: 'NVIDIA RTX 4080 Super', price: 999 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sidebarCategories = [
    { name: "Processors", icon: <Cpu size={14} /> },
    { name: "Graphics Cards", icon: <Layers size={14} /> },
    { name: "Laptops", icon: <Laptop size={14} /> },
    { name: "Motherboards", icon: <Layers size={14} /> },
    { name: "RAM Memory", icon: <Layers size={14} /> },
    { name: "SSD Storage", icon: <HardDrive size={14} /> },
    { name: "Monitors", icon: <Monitor size={14} /> },
    { name: "Gaming Accessories", icon: <Headphones size={14} />, active: true },
    { name: "Networking", icon: <Wifi size={14} /> },
    { name: "Smart Devices", icon: <Smartphone size={14} /> },
  ];

  const featuredCategories = [
    { name: "Computer", desc: "High performance systems", icon: <Monitor size={20} /> , route: "computer"},
    { name: "CPU", desc: "Powerful processors", icon: <Cpu size={20} /> , route: "cpu"},
    { name: "GPU", desc: "Next-gen graphics", icon: <Layers size={20} /> , route: "gpu"},
    { name: "Laptops", desc: "Portability & speed", icon: <Laptop size={20} /> , route: "laptops"},
    { name: "Motherboards", desc: "Reliable foundations", icon: <Layers size={20} /> , route: "motherboards"},
    { name: "RAM Memory", desc: "High-speed memory", icon: <HardDrive size={20} /> , route: "ram"}
  ];

  const flashDeals = [
    { id: 3, name: "Ryzen 9 7950X Processor", price: 549, oldPrice: 699, discount: "21% OFF", icon: <Cpu size={32} /> },
    { id: 4, name: "GeForce RTX 4070 Ti", price: 749, oldPrice: 899, discount: "16% OFF", icon: <Layers size={32} /> },
    { id: 5, name: "32GB DDR5 RAM 6000MHz", price: 119, oldPrice: 159, discount: "25% OFF", icon: <HardDrive size={32} /> },
  ];

  const brands = ["INTEL", "AMD", "NVIDIA", "ASUS", "MSI", "CORSAIR", "GIGABYTE"];

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const totalCartValue = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <span className="logo-icon"><Cpu size={18} /></span>
            <span>TechForage</span>
          </div>

          <div className="search-bar">
            <button className="category-select">
              All <ChevronDown size={10} />
            </button>
            <input
              type="text"
              placeholder="Search processors, GPUs, AI gear..."
              className="search-input"
            />
            <button className="search-btn"><Search size={14} /></button>
          </div>

          <div className="nav-actions">
            <div className="nav-item">
              <User size={16} />
              <span>Account</span>
            </div>
            <div className="nav-item">
              <Heart size={16} />
              <span>Wishlist</span>
            </div>
            <div className="nav-item" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={16} />
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="container main-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="categories-card">
            <h4 className="sidebar-title">CATEGORIES</h4>
            <ul className="category-list">
              {sidebarCategories.map((item, idx) => (
                <li key={idx} className={`category-item ${item.active ? "active" : ""}`}>
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="content-area">
          {/* HERO BANNER WITH BACKGROUND IMAGE */}
          <section className="hero-banner">
            <div className="hero-text">
              <h1>
                UNLEASH THE POWER
                <span>OF AI COMPUTING</span>
              </h1>
              <p className="hero-sub">Next-Gen Hardware | Expert AI Assistant</p>
              <button className="btn-primary">
                Shop Now <ArrowRight size={10} />
              </button>
            </div>
          </section>

          {/* FEATURES BAR */}
          <div className="features-bar">
            <div className="feature-item">
              <ShieldCheck size={16} color="#2563eb" />
              <div>
                <strong>100% Authentic</strong>
                <span>Products</span>
              </div>
            </div>
            <div className="feature-item">
              <ShieldCheck size={16} color="#2563eb" />
              <div>
                <strong>Secure</strong>
                <span>Payments</span>
              </div>
            </div>
            <div className="feature-item">
              <Truck size={16} color="#2563eb" />
              <div>
                <strong>Fast & Reliable</strong>
                <span>Delivery</span>
              </div>
            </div>
            <div className="feature-item">
              <Headphones size={16} color="#2563eb" />
              <div>
                <strong>Dedicated</strong>
                <span>Support</span>
              </div>
            </div>
          </div>

          {/* FLASH DEALS */}
          <section className="deals-section">
            <div className="section-header">
              <h3 className="section-title">
                <Zap size={14} color="#ef4444" /> FLASH DEALS
              </h3>
              <a href="#deals" className="view-all">View All →</a>
            </div>

            <div className="deals-grid">
              {flashDeals.map((deal) => (
                <div key={deal.id} className="deal-card">
                  <span className="deal-badge">{deal.discount}</span>
                  <div className="deal-image-placeholder">
                    {deal.icon}
                  </div>
                  <h4>{deal.name}</h4>
                  <div className="deal-price">
                    <span className="current-price">${deal.price}</span>
                    <span className="old-price">${deal.oldPrice}</span>
                  </div>
                  <button className="add-cart-btn" onClick={() => addToCart(deal)}>
                    <ShoppingCart size={12} /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURED CATEGORIES */}
          <section className="featured-section">
            <div className="section-header">
              <h3 className="section-title">
                <Sparkles size={14} color="#2563eb" /> FEATURED CATEGORIES
              </h3>
              <a href="#view-all" className="view-all">View All →</a>
            </div>

            <div className="categories-grid">
              {featuredCategories.map((cat, idx) => (
                <Link to={`/${cat.route}`}>
                <div key={idx} className="category-card">
                  <div className="card-icon">{cat.icon}</div>
                  <h4>{cat.name}</h4>
                  <p>{cat.desc}</p>
                  <span className="shop-link">Shop Now →</span>
                </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* BRANDS SHOWCASE */}
      <section className="brands-section">
        <div className="container">
          <p className="brands-title">Top Hardware Partners</p>
          <div className="brands-grid">
            {brands.map((brand, idx) => (
              <span key={idx} className="brand-item">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CART OVERLAY / DRAWER */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart ({cartItems.length})</h3>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-body">
              {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">${item.price}</div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${totalCartValue}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2><Cpu size={20} color="#2563eb" /> TechForage</h2>
              <p>Your premier destination for high-performance computing components and AI hardware.</p>
            </div>

            <div className="footer-col">
              <h4>Categories</h4>
              <ul className="footer-links">
                <li><a href="#processors">Processors</a></li>
                <li><a href="#gpus">Graphics Cards</a></li>
                <li><a href="#motherboards">Motherboards</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 TechForage Inc. All rights reserved.</p>
            <p>Designed for Ultimate Performance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
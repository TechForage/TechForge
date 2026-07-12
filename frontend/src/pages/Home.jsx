import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";
import {
  Cpu,
  MemoryStick,
  Laptop,
  CircuitBoard,
  HardDrive,
  Monitor,
  Gamepad2,
  Wifi,
  Watch,
  Search,
  User,
  Heart,
  Bell,
  ShoppingCart,
  ChevronDown,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
  Award,
  Shield,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./Home.css";
import { Link } from "react-router-dom";

const categories = [
  { icon: Cpu, label: "Processors", route: "/processor" },
  { icon: CircuitBoard, label: "Graphics Cards", route: "/graphicscard" },
  { icon: Laptop, label: "Laptops", route: "/laptop" },
  { icon: CircuitBoard, label: "Motherboards", route: "/motherboard" },
  { icon: MemoryStick, label: "RAM Memory", route: "/ram" },
  { icon: HardDrive, label: "SSD Storage", route: "/ssd" },
  { icon: Monitor, label: "Monitors", route: "/monitors" },
  { icon: Gamepad2, label: "Gaming Accessories", route: "/gamingaccessories" },
  { icon: Wifi, label: "Networking", route: "/networking" },
  { icon: Watch, label: "Smart Devices", route: "/smartdevices" },
];

const deals = [
  { 
    name: "ASUS ROG Strix GeForce RTX 4060", 
    price: "$1,889.00", 
    rating: 4,
    reviews: 128,
  },
  { 
    name: "Intel Core i7-14800K", 
    price: "$545.90", 
    rating: 5,
    reviews: 95,
  },
  { 
    name: "Razer Blade 14 Gaming Laptop", 
    price: "$2,000.00", 
    rating: 4,
    reviews: 67,
  },
  { 
    name: "Samsung Odyssey Neo G9", 
    price: "$1,699.00", 
    rating: 5,
    reviews: 43,
  },
];

const featuredCategories = [
  { label: "Graphics Cards", icon: CircuitBoard, color: "#6366f1", route: "/graphicscard" },
  { label: "Monitors", icon: Monitor, color: "#22d3ee", route: "/monitors" },
  { label: "Laptops", icon: Laptop, color: "#f59e0b", route: "/laptop" },
  { label: "Keyboard", icon: Gamepad2, color: "#f472b6", route: "/keyboard" },
  { label: "Hardware", icon: HardDrive, color: "#10b981", route: "/hardware" },
];

const brands = [
  { name: "Intel", color: "#0071c5" },
  { name: "AMD", color: "#ed1c24" },
  { name: "NVIDIA", color: "#76b900" },
  { name: "ASUS", color: "#00a3e0" },
  { name: "HP", color: "#0096d6" },
  { name: "Samsung", color: "#1428a0" },
  { name: "Lenovo", color: "#e2231a" },
];

function useCountdown(hours, minutes, seconds) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s -= 1;
        else if (m > 0) {
          m -= 1;
          s = 59;
        } else if (h > 0) {
          h -= 1;
          m = 59;
          s = 59;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const pad = (n) => String(n).padStart(2, "0");

export default function Home() {
  const dealsTimer = useCountdown(4, 21, 44);
  const featuredTimer = useCountdown(54, 52, 35);

  return (
    <div className="homepage">

       <Navbar />

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="container">
          {/* LEFT SIDEBAR */}
          <Sidebar categories={categories}/>

          {/* RIGHT CONTENT */}
          <div className="content-area">
            {/* TOP ROW: HERO + DEALS */}
            <div className="row">
              <div className="col-hero">
                <section className="hero">
                  <div className="hero-text">
                    <h1>
                      UNLEASH THE POWER
                      <br />
                      OF <span className="hero-highlight">AI COMPUTING</span>
                    </h1>
                    <p>Next-Gen Hardware | Expert AI Assistant</p>
                    <Link className="btn-primary" to="/keyboard">
                      Shop Now <ArrowRight size={18} />
                    </Link>
                  </div>
                  <div className="hero-image">
                    <div className="hero-glow"></div>
                    <Cpu size={100} className="hero-cpu" />
                    <div className="hero-stats">
                      <div className="hero-stat">
                        <span className="stat-value">1000+</span>
                        <span className="stat-label">Products</span>
                      </div>
                      <div className="hero-stat">
                        <span className="stat-value">50+</span>
                        <span className="stat-label">Brands</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* MIDDLE ROW: AI + FEATURED CATEGORIES */}
            <div className="row">
              <div className="col-ai">
                <section className="ai-section">
                  <div className="ai-header">
                    <Cpu size={20} />
                    <h3>AI Recommended Products</h3>
                  </div>
                  <div className="ai-banner">
                    <div className="ai-icon">
                      <Cpu size={44} />
                    </div>
                    <div className="ai-text">
                      <strong>AI Recommended Products</strong>
                      <p>Tailored picks based on your performance and creative workloads.</p>
                      <button className="btn-ai-shop">
                        Shop Now <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-featured">
                <section className="featured-categories">
                  <div className="featured-header">
                    <h3>Featured Categories</h3>
                  </div>
                  <div className="featured-grid">
  {featuredCategories.map((cat) => (
    <div className="featured-card" key={cat.route}>
      <Link to={cat.route} className="featured-link">
        <div
          className="featured-icon"
          style={{ color: cat.color }}
        >
          <cat.icon size={32} />
        </div>

        <p>{cat.label}</p>

        <div className="featured-arrow">
          <ArrowRight size={14} />
        </div>
      </Link>
    </div>
  ))}
</div>
                </section>
              </div>
            </div>

            {/* BOTTOM ROW: BRANDS + TESTIMONIALS + NEWSLETTER */}
            <div className="row row-bottom">
              <div className="col-brands">
                <section className="brands-section">
                  <h3>🏷️ Featured Brands</h3>
                  <div className="brands-grid">
                    {brands.map((brand) => (
                      <div className="brand-card" key={brand.name}>
                        <div className="brand-logo" style={{ background: brand.color }}>
                          {brand.name.charAt(0)}
                        </div>
                        <span>{brand.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Company</h4>
              <a>Home</a>
              <a>Shop Now</a>
              <a>PC Builder</a>
              <a>Contact</a>
            </div>

            <div className="footer-col">
              <h4>Shop</h4>
              <a>All Categories</a>
              <a>Order Tracking</a>
              <a>Shipping &amp; Returns</a>
              <a>Privacy Policy</a>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <a>Help Center</a>
              <a>Quick Links</a>
              <a>Terms of Service</a>
              <a>Cookie Policy</a>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <a>📧 contact@techforage.com</a>
              <a>📞 1-800-FORAGE</a>
              <a>📍 123 Tech Street, SV</a>
              <a>About Us</a>
            </div>

            <div className="footer-col">
              <h4>Payment</h4>
              <div className="payment-icons">
                <span>💳</span>
                <span>🏦</span>
                <span>🔒</span>
                <span>✅</span>
              </div>
              <div className="footer-badge">
                <Shield size={16} />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 TechForage. All rights reserved.</span>
            <div className="footer-links">
              <a>Privacy Policy</a>
              <a>Terms of Service</a>
              <a>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
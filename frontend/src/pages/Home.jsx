import React, { useState } from "react";
import {
  Cpu,
  Tv,
  Laptop,
  Server,
  MemoryStick,
  HardDrive,
  Monitor,
  Gamepad2,
  Wifi,
  User,
  Heart,
  ShoppingCart,
  Search,
  ChevronDown,
  ArrowRight,
  Star,
  ShieldHalf,
  Truck,
  Headphones,
  RotateCcw,
  CreditCard,
  Boxes,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import "./Home.css";

const sidebarCategories = [
  { name: "Processors", icon: Cpu },
  { name: "Graphics Cards", icon: Tv },
  { name: "Laptops", icon: Laptop },
  { name: "Motherboards", icon: Server },
  { name: "RAM Memory", icon: MemoryStick },
  { name: "SSD Storage", icon: HardDrive },
  { name: "Monitors", icon: Monitor },
  { name: "Gaming Accessories", icon: Gamepad2, active: true },
  { name: "Networking", icon: Wifi },
  { name: "Smart Devices", icon: Cpu },
];

const featuredCategories = [
  { name: "Computer", desc: "High performance systems for work & play", icon: Monitor },
  { name: "CPU", desc: "Powerful processors for every need", icon: Cpu },
  { name: "GPU", desc: "Next-gen graphics for gaming & creation", icon: Tv },
  { name: "Laptops", desc: "Power meets portability for every lifestyle", icon: Laptop },
  { name: "Motherboards", desc: "Reliable foundations for peak performance", icon: Server },
  { name: "RAM Memory", desc: "High-speed memory for ultimate efficiency", icon: MemoryStick },
];

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: RotateCcw, title: "Easy Returns", desc: "14-day return policy" },
  { icon: CreditCard, title: "Secure Payments", desc: "100% protected checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

const footerLinks = {
  Shop: ["All Categories", "New Arrivals", "Best Sellers", "Deals & Offers", "Clearance Sale"],
  "Customer Service": ["Track Order", "Returns & Refunds", "Shipping Policy", "Payment Methods", "FAQ"],
  Company: ["About Us", "Contact Us", "Careers", "Blog", "Terms & Conditions"],
};

const paymentBadges = [
  { label: "VISA", className: "badge-visa" },
  { label: "Mastercard", className: "badge-mastercard" },
  { label: "RuPay", className: "badge-rupay" },
  { label: "UPI", className: "badge-upi" },
  { label: "Paytm", className: "badge-paytm" },
];

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert("Subscribed!");
    setEmail("");
  };

  return (
    <div className="tf-page">
      {/* HEADER */}
      <header className="tf-header">
        <div className="tf-header-inner">
          <a href="#" className="tf-logo">
            <div className="tf-logo-icon">
              <Cpu size={20} color="#fff" />
            </div>
            <span className="tf-logo-text">
              Tech<span className="tf-accent">Forage</span>
            </span>
          </a>

          <button className="tf-categories-btn">
            All Categories
            <ChevronDown size={14} />
          </button>

          <div className="tf-search">
            <input
              type="text"
              placeholder="Search for processors, GPUs, laptops, AI gear..."
              className="tf-search-input"
            />
            <button className="tf-search-btn">
              <Search size={16} />
            </button>
          </div>

          <div className="tf-header-actions">
            <a href="#" className="tf-icon-link">
              <User size={20} />
              <span>Account</span>
            </a>
            <a href="#" className="tf-icon-link">
              <Heart size={20} />
              <span>Wishlist</span>
            </a>
            <a href="#" className="tf-icon-link tf-cart">
              <span className="tf-cart-badge">0</span>
              <ShoppingCart size={20} />
              <span>Cart</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="tf-main">
        <div className="tf-layout">
          {/* SIDEBAR */}
          <aside className="tf-sidebar">
            <div className="tf-sidebar-card">
              <p className="tf-sidebar-title">CATEGORIES</p>
              <nav className="tf-sidebar-nav">
                {sidebarCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <a
                      key={cat.name}
                      href="#"
                      className={`tf-sidebar-link ${cat.active ? "tf-sidebar-link-active" : ""}`}
                    >
                      <Icon size={16} />
                      {cat.name}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="tf-promo-card">
              <h3 className="tf-promo-title">
                Build. Upgrade.
                <br />
                Dominate.
              </h3>
              <p className="tf-promo-desc">
                High performance gear for gamers &amp; creators.
              </p>
              <button className="tf-btn-primary">
                Explore Now <ArrowRight size={14} />
              </button>
              <div className="tf-promo-visual">
                <div className="tf-promo-visual-box">
                  <Monitor size={48} color="#60a5fa" />
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="tf-content">
            {/* HERO */}
            <section className="tf-hero">
              <div className="tf-hero-inner">
                <div className="tf-hero-text">
                  <h1 className="tf-hero-heading">
                    UNLEASH THE POWER
                    <br />
                    OF <span className="tf-accent">AI COMPUTING</span>
                  </h1>
                  <p className="tf-hero-subtitle">
                    Next-Gen Hardware | Expert AI Assistant
                  </p>
                  <button className="tf-btn-primary tf-btn-large">
                    Shop Now <ArrowRight size={16} />
                  </button>

                  <div className="tf-hero-badges">
                    <div className="tf-hero-badge">
                      <Star size={20} className="tf-badge-icon" />
                      <div>
                        <span className="tf-badge-title">100% Authentic</span>
                        <span className="tf-badge-sub">Products</span>
                      </div>
                    </div>
                    <div className="tf-hero-badge">
                      <ShieldHalf size={20} className="tf-badge-icon" />
                      <div>
                        <span className="tf-badge-title">Secure</span>
                        <span className="tf-badge-sub">Payments</span>
                      </div>
                    </div>
                    <div className="tf-hero-badge">
                      <Truck size={20} className="tf-badge-icon" />
                      <div>
                        <span className="tf-badge-title">Fast &amp; Reliable</span>
                        <span className="tf-badge-sub">Delivery</span>
                      </div>
                    </div>
                    <div className="tf-hero-badge">
                      <Headphones size={20} className="tf-badge-icon" />
                      <div>
                        <span className="tf-badge-title">Dedicated</span>
                        <span className="tf-badge-sub">Support</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tf-hero-visual">
                  <div className="tf-chip-outer">
                    <div className="tf-chip-inner">
                      <span>AI</span>
                    </div>
                  </div>
                  <div className="tf-stat-card tf-stat-card-left">
                    <Boxes size={20} className="tf-badge-icon" />
                    <span className="tf-stat-number">1000+</span>
                    <span className="tf-stat-label">Products</span>
                  </div>
                  <div className="tf-stat-card tf-stat-card-right">
                    <Star size={20} className="tf-badge-icon" />
                    <span className="tf-stat-number">50+</span>
                    <span className="tf-stat-label">Brands</span>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED CATEGORIES */}
            <section className="tf-section">
              <div className="tf-section-header">
                <h2 className="tf-section-title">
                  <Star size={16} className="tf-badge-icon" /> FEATURED CATEGORIES
                </h2>
                <a href="#" className="tf-view-all">
                  View All <ArrowRight size={14} />
                </a>
              </div>

              <div className="tf-category-grid">
                {featuredCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.name} className="tf-category-card">
                      <div className="tf-category-pedestal">
                        <Icon size={40} color="#2563eb" strokeWidth={1.5} />
                      </div>
                      <h3 className="tf-category-name">{cat.name}</h3>
                      <p className="tf-category-desc">{cat.desc}</p>
                      <a href="#" className="tf-category-link">
                        Shop Now <ArrowRight size={12} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FEATURES BAR */}
            <section className="tf-features-bar">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="tf-feature-item">
                    <Icon size={24} className="tf-badge-icon" />
                    <div>
                      <p className="tf-feature-title">{f.title}</p>
                      <p className="tf-feature-desc">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="tf-footer">
        <div className="tf-footer-inner">
          <div className="tf-footer-brand">
            <div className="tf-logo">
              <div className="tf-logo-icon tf-logo-icon-sm">
                <Cpu size={16} color="#fff" />
              </div>
              <span className="tf-logo-text">
                Tech<span className="tf-accent">Forage</span>
              </span>
            </div>
            <p className="tf-footer-desc">
              Your one-stop destination for premium computer hardware, gaming
              accessories, and smart tech solutions.
            </p>
            <div className="tf-social-row">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="tf-social-icon">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="tf-footer-col">
              <p className="tf-footer-col-title">{title.toUpperCase()}</p>
              <ul className="tf-footer-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="tf-footer-col">
            <p className="tf-footer-col-title">SUBSCRIBE TO OUR NEWSLETTER</p>
            <p className="tf-footer-desc">
              Get exclusive deals, new arrivals &amp; more updates.
            </p>
            <form onSubmit={handleSubscribe} className="tf-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="tf-newsletter-input"
              />
              <button type="submit" className="tf-newsletter-btn">
                Subscribe
              </button>
            </form>
            <div className="tf-payment-row">
              {paymentBadges.map((badge) => (
                <span key={badge.label} className={`tf-payment-badge ${badge.className}`}>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="tf-footer-bottom">
          <div className="tf-footer-bottom-inner">
            <p>© 2025 TechForage. All rights reserved.</p>
            <div className="tf-footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Conditions</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
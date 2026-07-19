import React, { useState, useEffect } from "react";
import {
  Cpu,
  Tv,
  Laptop,
  Server,
  MemoryStick,
  Monitor,
  Keyboard,
  Mouse,
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
  Sun,
  Moon,
  Flame,
  Check,
  Quote,
  Clock,
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
  {
    name: "Processors",
    count: "120+ items",
    image: "https://images.unsplash.com/photo-1686195165991-74af7c2918d5?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "Graphics Cards",
    count: "85+ items",
    image: "https://images.unsplash.com/photo-1520520688967-7bdc16e77dc2?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "Laptops",
    count: "64+ items",
    image: "https://images.unsplash.com/photo-1595896424050-f70867364590?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "Motherboards",
    count: "70+ items",
    image: "https://images.unsplash.com/photo-1733741020205-1ed0208314b6?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "RAM Memory",
    count: "95+ items",
    image: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "SSD Storage",
    count: "58+ items",
    image: "https://images.unsplash.com/photo-1677086586945-ef95ab632232?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "Monitors",
    count: "47+ items",
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?w=160&h=160&fit=crop&auto=format&q=70",
  },
  {
    name: "Gaming Accessories",
    count: "110+ items",
    active: true,
    image: "https://images.unsplash.com/photo-1567603452116-e81dd3fc5fa4?w=160&h=160&fit=crop&auto=format&q=70",
  },
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

const bestSellers = [
  {
    id: "p1",
    name: "Ryzen 9 9950X",
    category: "Processor",
    icon: Cpu,
    price: 42999,
    originalPrice: 49999,
    rating: 4.8,
    reviews: 312,
    badge: "Hot",
  },
  {
    id: "p2",
    name: "RTX 5080 OC 16GB",
    category: "Graphics Card",
    icon: Tv,
    price: 89999,
    originalPrice: 99999,
    rating: 4.9,
    reviews: 208,
    badge: "Trending",
  },
  {
    id: "p3",
    name: "Stealth Pro 14 Laptop",
    category: "Laptop",
    icon: Laptop,
    price: 124999,
    originalPrice: 139999,
    rating: 4.6,
    reviews: 154,
    badge: "New",
  },
  {
    id: "p4",
    name: "Vortex Z790 Board",
    category: "Motherboard",
    icon: Server,
    price: 24999,
    originalPrice: 27999,
    rating: 4.7,
    reviews: 96,
    badge: "Sale",
  },
  {
    id: "p5",
    name: "Nova 32GB DDR5 Kit",
    category: "RAM",
    icon: MemoryStick,
    price: 8999,
    originalPrice: 11499,
    rating: 4.5,
    reviews: 189,
    badge: "Sale",
  },
  {
    id: "p6",
    name: "TitanFrame 27\" 240Hz",
    category: "Monitor",
    icon: Monitor,
    price: 34999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 121,
    badge: "Hot",
  },
  {
    id: "p7",
    name: "Aether Mech Keyboard",
    category: "Gaming Accessory",
    icon: Keyboard,
    price: 5999,
    originalPrice: 7499,
    rating: 4.6,
    reviews: 275,
    badge: "Trending",
  },
  {
    id: "p8",
    name: "Ghost X Wireless Mouse",
    category: "Gaming Accessory",
    icon: Mouse,
    price: 3499,
    originalPrice: 4299,
    rating: 4.7,
    reviews: 340,
    badge: "New",
  },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Content Creator",
    quote:
      "Upgraded my whole rig through TechForage. The build advice from their AI assistant saved me from a compatibility mess, and delivery was quicker than expected.",
    rating: 5,
    initials: "AM",
  },
  {
    name: "Priya Nair",
    role: "Competitive Gamer",
    quote:
      "Prices beat every other store I checked, and the RTX card I ordered arrived double-boxed and untouched. Already planning my next upgrade here.",
    rating: 5,
    initials: "PN",
  },
  {
    name: "Rohit Sharma",
    role: "Software Engineer",
    quote:
      "Returns process was painless when a stick of RAM didn't play well with my board. Support actually knew what they were talking about.",
    rating: 4,
    initials: "RS",
  },
];

const brands = [
  "AMD", "NVIDIA", "Intel", "ASUS", "MSI", "Corsair", "Logitech", "Razer",
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

function useCountdown(hoursFromNow) {
  const [target] = useState(() => Date.now() + hoursFromNow * 60 * 60 * 1000);
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(target - Date.now(), 0));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return { hours, minutes, seconds };
}

function formatPrice(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("light");
  const [cartItems, setCartItems] = useState([]);
  const { hours, minutes, seconds } = useCountdown(30);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert("Subscribed!");
    setEmail("");
  };

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const toggleCartItem = (id) => {
    setCartItems((items) =>
      items.includes(id) ? items.filter((i) => i !== id) : [...items, id]
    );
  };

  return (
    <div className="tf-page" data-theme={theme}>
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
            <button
              className="tf-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a href="#" className="tf-icon-link">
              <User size={20} />
              <span>Account</span>
            </a>
            <a href="#" className="tf-icon-link">
              <Heart size={20} />
              <span>Wishlist</span>
            </a>
            <a href="#" className="tf-icon-link tf-cart">
              <span className="tf-cart-badge">{cartItems.length}</span>
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
                {sidebarCategories.map((cat) => (
                  <a
                    key={cat.name}
                    href="#"
                    className={`tf-sidebar-link ${cat.active ? "tf-sidebar-link-active" : ""}`}
                  >
                    <span className="tf-sidebar-thumb">
                      <img src={cat.image} alt={cat.name} loading="lazy" />
                    </span>
                    <span className="tf-sidebar-link-text">
                      <span className="tf-sidebar-link-name">{cat.name}</span>
                      <span className="tf-sidebar-link-count">{cat.count}</span>
                    </span>
                    <ArrowRight size={14} className="tf-sidebar-link-arrow" />
                  </a>
                ))}
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

            {/* DEALS COUNTDOWN BANNER */}
            <section className="tf-deals-banner">
              <div className="tf-deals-text">
                <span className="tf-deals-eyebrow">
                  <Flame size={14} /> LIMITED TIME
                </span>
                <h2 className="tf-deals-title">Mega Hardware Sale — Up to 30% Off</h2>
                <p className="tf-deals-sub">Deal ends in:</p>
              </div>
              <div className="tf-countdown">
                <div className="tf-countdown-unit">
                  <span className="tf-countdown-num">{hours}</span>
                  <span className="tf-countdown-label">HRS</span>
                </div>
                <span className="tf-countdown-colon">:</span>
                <div className="tf-countdown-unit">
                  <span className="tf-countdown-num">{minutes}</span>
                  <span className="tf-countdown-label">MIN</span>
                </div>
                <span className="tf-countdown-colon">:</span>
                <div className="tf-countdown-unit">
                  <span className="tf-countdown-num">{seconds}</span>
                  <span className="tf-countdown-label">SEC</span>
                </div>
              </div>
              <button className="tf-btn-primary tf-deals-cta">
                Shop Deals <ArrowRight size={14} />
              </button>
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

            {/* BEST SELLERS */}
            <section className="tf-section">
              <div className="tf-section-header">
                <h2 className="tf-section-title">
                  <Flame size={16} className="tf-badge-icon" /> BEST SELLERS
                </h2>
                <a href="#" className="tf-view-all">
                  View All <ArrowRight size={14} />
                </a>
              </div>

              <div className="tf-product-grid">
                {bestSellers.map((product) => {
                  const Icon = product.icon;
                  const inCart = cartItems.includes(product.id);
                  const discountPct = Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  );
                  return (
                    <div key={product.id} className="tf-product-card">
                      <div className="tf-product-image">
                        <span className={`tf-product-badge tf-product-badge-${product.badge.toLowerCase()}`}>
                          {product.badge}
                        </span>
                        <Icon size={44} color="#2563eb" strokeWidth={1.5} />
                      </div>
                      <p className="tf-product-category">{product.category}</p>
                      <h3 className="tf-product-name">{product.name}</h3>
                      <div className="tf-product-rating">
                        <Star size={13} className="tf-star-filled" />
                        <span>{product.rating}</span>
                        <span className="tf-product-reviews">({product.reviews})</span>
                      </div>
                      <div className="tf-product-price-row">
                        <span className="tf-price-current">{formatPrice(product.price)}</span>
                        <span className="tf-price-original">{formatPrice(product.originalPrice)}</span>
                        <span className="tf-price-discount">-{discountPct}%</span>
                      </div>
                      <button
                        className={`tf-add-cart-btn ${inCart ? "tf-add-cart-btn-added" : ""}`}
                        onClick={() => toggleCartItem(product.id)}
                      >
                        {inCart ? (
                          <>
                            <Check size={14} /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={14} /> Add to Cart
                          </>
                        )}
                      </button>
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

            {/* TESTIMONIALS */}
            <section className="tf-section">
              <div className="tf-section-header">
                <h2 className="tf-section-title">
                  <Quote size={16} className="tf-badge-icon" /> WHAT OUR CUSTOMERS SAY
                </h2>
              </div>
              <div className="tf-testimonial-grid">
                {testimonials.map((t) => (
                  <div key={t.name} className="tf-testimonial-card">
                    <Quote size={22} className="tf-testimonial-quote-icon" />
                    <div className="tf-testimonial-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < t.rating ? "tf-star-filled" : "tf-star-empty"}
                        />
                      ))}
                    </div>
                    <p className="tf-testimonial-quote">"{t.quote}"</p>
                    <div className="tf-testimonial-author">
                      <div className="tf-testimonial-avatar">{t.initials}</div>
                      <div>
                        <p className="tf-testimonial-name">{t.name}</p>
                        <p className="tf-testimonial-role">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BRAND STRIP */}
            <section className="tf-brand-strip">
              {brands.map((b) => (
                <span key={b} className="tf-brand-item">
                  {b}
                </span>
              ))}
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
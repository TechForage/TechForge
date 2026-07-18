import React, { useState, useMemo } from "react";
import {
  Search, Heart, ShoppingCart, Bell, User, ChevronRight, Star,
  Cpu, CircuitBoard, MemoryStick, HardDrive, Monitor, Keyboard,
  Mouse, Wifi, Laptop, Fan, Box, Zap, Truck, ShieldCheck,
  Headphones, RotateCcw, Lock, Award, Globe, Mail,
  ArrowRight, Check, Eye, Plus,
} from "lucide-react";
import "./Home.css";
import Navbar from "../components/Navbar/Navbar";

/* ============================================================
   TOKENS — kept here for JS-side use (prices, icons, etc).
   The actual color values live in TechForgeHomepage.css as
   CSS custom properties on .cf-root, so the two stay in sync.
   ============================================================ */
const T = {
  orange: "#FF6B35",
};

/* ============================================================
   Circuit background — thin traces, glowing nodes, dashed paths
   (same visual grammar as the account-creation screen)
   ============================================================ */
function CircuitLayer() {
  return (
    <div className="cf-circuit" aria-hidden="true">
      <svg className="cf-circuit-svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <g className="cf-trace">
          <path d="M0 120 H340 V260 H620" />
          <path d="M60 900 V680 H260 V520" />
          <path d="M1600 90 H1260 V220 H1040" />
          <path d="M1600 760 H1320 V560" />
          <path d="M900 0 V90 H1120" />
        </g>
        <g className="cf-trace cf-trace--dashed">
          <path d="M0 540 H190 V760 H430 V900" />
          <path d="M1600 420 H1440 V300" />
        </g>
        <g className="cf-node">
          <circle cx="620" cy="260" r="4" />
          <circle cx="260" cy="520" r="3" />
          <circle cx="1040" cy="220" r="4" />
          <circle cx="1320" cy="560" r="3" />
          <circle cx="1120" cy="90" r="3" />
          <circle cx="430" cy="900" r="4" />
          <circle cx="1440" cy="300" r="3" />
        </g>
      </svg>
      <div className="cf-grid" />
    </div>
  );
}

/* Small reusable eyebrow label — mono, tracked out, orange */
function Eyebrow({ children }) {
  return <div className="cf-eyebrow">{children}</div>;
}

/* ============================================================
   NAVBAR
   ============================================================ */


/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section id="top" className="cf-hero">
      <CircuitLayer />
      <div className="cf-hero-inner">
        <div className="cf-hero-copy">
          <Eyebrow>HARDWARE COLLECTION</Eyebrow>
          <h1 className="cf-h1">
            Forge Your Ultimate<br />Gaming Setup
          </h1>
          <p className="cf-lede">
            Build powerful gaming PCs using premium hardware from Intel, AMD,
            NVIDIA, ASUS, MSI and Corsair.
          </p>
          <div className="cf-hero-actions">
            <button className="cf-btn cf-btn--primary">
              Shop Components <ArrowRight size={15} strokeWidth={2} />
            </button>
            <button className="cf-btn cf-btn--ghost">Build Your PC</button>
          </div>

          <div className="cf-hero-stats">
            <div><span>12,400+</span><small>Components in stock</small></div>
            <div><span>48hr</span><small>Nationwide dispatch</small></div>
            <div><span>4.9/5</span><small>Verified builder rating</small></div>
          </div>
        </div>

        <div className="cf-hero-visual">
          <div className="cf-glow-orb" />
          <div className="cf-rig">
            <div className="cf-rig-frame">
              <div className="cf-rig-row">
                <Cpu size={22} strokeWidth={1.5} />
                <div className="cf-rig-label"><span>AMD RYZEN 9</span><small>CPU // 16-CORE</small></div>
              </div>
              <div className="cf-rig-row cf-rig-row--accent">
                <CircuitBoard size={22} strokeWidth={1.5} />
                <div className="cf-rig-label"><span>RTX 4090 FE</span><small>GPU // 24GB GDDR6X</small></div>
              </div>
              <div className="cf-rig-row">
                <MemoryStick size={22} strokeWidth={1.5} />
                <div className="cf-rig-label"><span>32GB DDR5</span><small>RAM // 6000MHz</small></div>
              </div>
              <div className="cf-rig-row">
                <HardDrive size={22} strokeWidth={1.5} />
                <div className="cf-rig-label"><span>2TB NVME</span><small>SSD // GEN 4</small></div>
              </div>
              <div className="cf-rig-scan" />
            </div>
            <span className="cf-rig-tag">LIVE BUILD PREVIEW</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED CATEGORIES
   ============================================================ */
const CATEGORIES = [
  { name: "Processors", icon: Cpu },
  { name: "Graphics Cards", icon: CircuitBoard },
  { name: "Motherboards", icon: CircuitBoard },
  { name: "RAM", icon: MemoryStick },
  { name: "SSD Storage", icon: HardDrive },
  { name: "Gaming Monitors", icon: Monitor },
  { name: "Mech. Keyboards", icon: Keyboard },
  { name: "Gaming Mouse", icon: Mouse },
  { name: "Networking", icon: Wifi },
  { name: "Laptops", icon: Laptop },
];

function Categories() {
  return (
    <section id="categories" className="cf-section">
      <div className="cf-section-head">
        <div>
          <Eyebrow>BROWSE BY CATEGORY</Eyebrow>
          <h2 className="cf-h2">Featured Categories</h2>
        </div>
        <a className="cf-link" href="#categories">View all <ChevronRight size={14} /></a>
      </div>

      <div className="cf-cat-grid">
        {CATEGORIES.map(({ name, icon: Icon }) => (
          <button key={name} className="cf-cat-card">
            <span className="cf-corner cf-corner--tl" />
            <span className="cf-corner cf-corner--br" />
            <Icon size={22} strokeWidth={1.5} />
            <span className="cf-cat-name">{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   FEATURED PRODUCTS
   ============================================================ */
const PRODUCTS = [
  { brand: "NVIDIA", name: "GeForce RTX 4090 Founders Edition", price: 164900, old: 179900, rating: 4.9, stock: "In Stock", icon: CircuitBoard },
  { brand: "AMD", name: "Ryzen 9 7950X3D Desktop Processor", price: 54900, old: 61900, rating: 4.8, stock: "In Stock", icon: Cpu },
  { brand: "CORSAIR", name: "Dominator Platinum 32GB DDR5 6000MHz", price: 18900, old: 21500, rating: 4.7, stock: "Low Stock", icon: MemoryStick },
  { brand: "SAMSUNG", name: "990 PRO 2TB NVMe Gen4 SSD", price: 15400, old: 17900, rating: 4.9, stock: "In Stock", icon: HardDrive },
];

function ProductCard({ p }) {
  const [wish, setWish] = useState(false);
  const Icon = p.icon;
  const discount = Math.round(((p.old - p.price) / p.old) * 100);
  return (
    <article className="cf-product">
      <div className="cf-product-media">
        <span className="cf-corner cf-corner--tl" />
        <span className="cf-corner cf-corner--br" />
        <Icon size={40} strokeWidth={1} className="cf-product-icon" />
        <div className="cf-product-media-actions">
          <button aria-label="Wishlist" onClick={() => setWish((w) => !w)} className={wish ? "is-active" : ""}>
            <Heart size={14} strokeWidth={2} fill={wish ? T.orange : "none"} />
          </button>
          <button aria-label="Quick view"><Eye size={14} strokeWidth={2} /></button>
        </div>
        {discount > 0 && <span className="cf-discount-tag">-{discount}%</span>}
      </div>

      <div className="cf-product-body">
        <div className="cf-product-brand">{p.brand}</div>
        <h3 className="cf-product-name">{p.name}</h3>

        <div className="cf-product-rating">
          <Star size={12} strokeWidth={0} fill={T.orange} />
          <span>{p.rating}</span>
          <span className={`cf-stock ${p.stock === "Low Stock" ? "is-low" : ""}`}>{p.stock}</span>
        </div>

        <div className="cf-product-price">
          <span className="cf-price-now">₹{p.price.toLocaleString("en-IN")}</span>
          {p.old && <span className="cf-price-old">₹{p.old.toLocaleString("en-IN")}</span>}
        </div>

        <button className="cf-btn cf-btn--primary cf-btn--block">
          <Plus size={14} strokeWidth={2} /> Add to Cart
        </button>
      </div>
    </article>
  );
}

function FeaturedProducts() {
  return (
    <section id="products" className="cf-section">
      <div className="cf-section-head">
        <div>
          <Eyebrow>HAND-PICKED THIS WEEK</Eyebrow>
          <h2 className="cf-h2">Featured Products</h2>
        </div>
        <a className="cf-link" href="#products">Shop all <ChevronRight size={14} /></a>
      </div>
      <div className="cf-product-grid">
        {PRODUCTS.map((p) => <ProductCard key={p.name} p={p} />)}
      </div>
    </section>
  );
}

/* ============================================================
   BUILD YOUR DREAM PC — interactive selector
   ============================================================ */
const BUILD_PARTS = [
  { key: "cpu", label: "CPU", icon: Cpu, options: ["Ryzen 9 7950X3D", "Core i9-14900K"], price: 54900 },
  { key: "gpu", label: "GPU", icon: CircuitBoard, options: ["RTX 4090", "RX 7900 XTX"], price: 164900 },
  { key: "ram", label: "RAM", icon: MemoryStick, options: ["32GB DDR5", "64GB DDR5"], price: 18900 },
  { key: "ssd", label: "SSD", icon: HardDrive, options: ["2TB NVMe Gen4", "4TB NVMe Gen4"], price: 15400 },
  { key: "case", label: "Cabinet", icon: Box, options: ["Lian Li O11", "NZXT H9 Flow"], price: 12900 },
  { key: "psu", label: "Power Supply", icon: Zap, options: ["850W Gold", "1000W Platinum"], price: 9900 },
  { key: "cooling", label: "Cooling", icon: Fan, options: ["360mm AIO", "Air Tower"], price: 8900 },
];

function BuildPC() {
  const [selected, setSelected] = useState({});
  const total = useMemo(
    () => BUILD_PARTS.reduce((sum, part) => (selected[part.key] ? sum + part.price : sum), 0),
    [selected]
  );

  return (
    <section id="build-pc" className="cf-build">
      <CircuitLayer />
      <div className="cf-build-inner">
        <div className="cf-build-head">
          <Eyebrow>CONFIGURE FROM SCRATCH</Eyebrow>
          <h2 className="cf-h2">Build Your Dream PC</h2>
          <p className="cf-lede cf-lede--tight">
            Select components one by one — compatibility checked automatically, price updates live.
          </p>
        </div>

        <div className="cf-build-grid">
          {BUILD_PARTS.map((part) => {
            const Icon = part.icon;
            const active = Boolean(selected[part.key]);
            return (
              <button
                key={part.key}
                className={`cf-build-card ${active ? "is-selected" : ""}`}
                onClick={() =>
                  setSelected((s) => ({ ...s, [part.key]: active ? undefined : part.options[0] }))
                }
              >
                <div className="cf-build-card-top">
                  <Icon size={20} strokeWidth={1.5} />
                  {active && <Check size={14} strokeWidth={2.5} className="cf-build-check" />}
                </div>
                <span className="cf-build-label">{part.label}</span>
                <span className="cf-build-option">{active ? selected[part.key] : "Not selected"}</span>
                <span className="cf-build-price">₹{part.price.toLocaleString("en-IN")}</span>
              </button>
            );
          })}
        </div>

        <div className="cf-build-footer">
          <div className="cf-build-total">
            <small>ESTIMATED TOTAL</small>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button className="cf-btn cf-btn--primary cf-btn--lg">
            Start Building <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BEST SELLERS — horizontal strip
   ============================================================ */
const BEST_SELLERS = [
  { name: "RTX GPUs", icon: CircuitBoard, tag: "Trending" },
  { name: "Ryzen CPUs", icon: Cpu, tag: "Top Rated" },
  { name: "Intel Processors", icon: Cpu, tag: "New" },
  { name: "Samsung SSD", icon: HardDrive, tag: "Best Value" },
  { name: "Corsair RAM", icon: MemoryStick, tag: "Trending" },
  { name: "Logitech Mouse", icon: Mouse, tag: "Top Rated" },
  { name: "Mechanical Keyboards", icon: Keyboard, tag: "New" },
];

function BestSellers() {
  return (
    <section className="cf-section">
      <div className="cf-section-head">
        <div>
          <Eyebrow>MOST FORGED</Eyebrow>
          <h2 className="cf-h2">Best Sellers</h2>
        </div>
      </div>
      <div className="cf-bestsellers">
        {BEST_SELLERS.map(({ name, icon: Icon, tag }) => (
          <div key={name} className="cf-bs-card">
            <span className="cf-bs-tag">{tag}</span>
            <Icon size={26} strokeWidth={1.25} />
            <span className="cf-bs-name">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   WHY TECHFORGE
   ============================================================ */
const WHY = [
  { title: "Genuine Products", desc: "Sourced directly from authorized distributors.", icon: ShieldCheck },
  { title: "Fast Delivery", desc: "Dispatched within 48 hours, nationwide.", icon: Truck },
  { title: "Expert Support", desc: "Real builders, on chat, whenever you need.", icon: Headphones },
  { title: "Easy Returns", desc: "7-day no-questions returns on most parts.", icon: RotateCcw },
  { title: "Secure Payments", desc: "Encrypted checkout, every transaction.", icon: Lock },
  { title: "Official Warranty", desc: "Manufacturer-backed coverage, always.", icon: Award },
];

function WhyTechForge() {
  return (
    <section className="cf-section">
      <div className="cf-section-head">
        <div>
          <Eyebrow>THE TECHFORGE PROMISE</Eyebrow>
          <h2 className="cf-h2">Why TechForge</h2>
        </div>
      </div>
      <div className="cf-why-grid">
        {WHY.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="cf-why-card">
            <div className="cf-why-icon"><Icon size={18} strokeWidth={1.5} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   BRANDS
   ============================================================ */
const BRANDS = ["Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Corsair", "Gigabyte", "Samsung", "Logitech", "Razer"];

function Brands() {
  return (
    <section id="brands" className="cf-section cf-section--tight">
      <div className="cf-section-head">
        <div>
          <Eyebrow>AUTHORIZED PARTNERS</Eyebrow>
          <h2 className="cf-h2">Trusted Brands</h2>
        </div>
      </div>
      <div className="cf-brand-row">
        {BRANDS.map((b) => <span key={b} className="cf-brand">{b}</span>)}
      </div>
    </section>
  );
}

/* ============================================================
   NEWSLETTER — identical form styling to the login page
   ============================================================ */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="cf-newsletter">
      <CircuitLayer />
      <div className="cf-newsletter-card">
        <span className="cf-corner cf-corner--tl" />
        <span className="cf-corner cf-corner--br" />
        <Eyebrow>STAY IN THE LOOP</Eyebrow>
        <h2 className="cf-h2">Stay Updated</h2>
        <p className="cf-lede cf-lede--tight">
          Restock alerts, price drops, and new drops — straight to your inbox.
        </p>
        <form
          className="cf-newsletter-form"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="cf-btn cf-btn--primary">
            {sent ? <>Subscribed <Check size={14} strokeWidth={2.5} /></> : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const cols = [
    { title: "Products", links: ["Processors", "Graphics Cards", "Motherboards", "Laptops"] },
    { title: "Support", links: ["Warranty", "Returns", "Track Order", "Contact"] },
    { title: "Company", links: ["Privacy Policy", "Terms of Service", "Careers"] },
  ];
  return (
    <footer className="cf-footer">
      <CircuitLayer />
      <div className="cf-footer-inner">
        <div className="cf-footer-top">
          <a className="cf-logo" href="#top">
            <span className="cf-logo-dot" />
            TechForge
          </a>
          <div className="cf-footer-social">
            <a href="#top" aria-label="Website"><Globe size={16} strokeWidth={1.75} /></a>
            <a href="#top" aria-label="Contact"><Mail size={16} strokeWidth={1.75} /></a>
          </div>
        </div>

        <div className="cf-footer-grid">
          {cols.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((l) => <li key={l}><a href="#top">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>

        <div className="cf-footer-bottom">
          <span>© 2026 TechForge · Parts. Builds. People.</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function TechForgeHomepage() {
  return (
    <div className="cf-root">
      
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BuildPC />
      <BestSellers />
      <WhyTechForge />
      <Brands />
      <Newsletter />
      <Footer />
    </div>
  );
}
import "./Home.css";
import {
  Search,
  User,
  Speaker,
  Lightbulb,
  Keyboard,
  Camera,
  Watch,
  Headphones,
  Aperture,
  Package,
  ChevronRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Small inline icon for the drone (lucide has no drone icon)
--------------------------------------------------------- */
const DroneIcon = ({ size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="38" cy="10" r="6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="10" cy="34" r="6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="38" cy="34" r="6" stroke="currentColor" strokeWidth="1.6" />
    <line x1="14" y1="13" x2="20" y2="19" stroke="currentColor" strokeWidth="1.6" />
    <line x1="34" y1="13" x2="28" y2="19" stroke="currentColor" strokeWidth="1.6" />
    <line x1="14" y1="31" x2="20" y2="25" stroke="currentColor" strokeWidth="1.6" />
    <line x1="34" y1="31" x2="28" y2="25" stroke="currentColor" strokeWidth="1.6" />
    <rect x="18" y="19" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ---------------------------------------------------------
   Platform: the isometric-feeling "floating slab" card
--------------------------------------------------------- */
function Platform({ children, className = "", glow = "blue" }) {
  return (
    <div className={`platform glow-${glow} ${className}`}>
      <div className="platform-top">{children}</div>
    </div>
  );
}

function IconOrb({ children, size = "md", tint = "neutral" }) {
  return <div className={`orb orb-${size} tint-${tint}`}>{children}</div>;
}

export default function Home() {
  return (
    <div className="store-root">
      <div className="circuit-bg" />

      <div className="wrap">
        {/* ---------------- NAVBAR ---------------- */}
        <nav className="navbar">
          <div className="brand">
            <span className="brand-mark">
              <Package size={16} color="#fff" />
            </span>
            Orbit
          </div>

          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#">Shop Now</a>
            <a href="#">New Arrivals</a>
            <a href="#">Deals</a>
          </div>

          <div className="search-box">
            <Search size={14} />
            <input placeholder="Search for a product…" />
          </div>

          <div className="nav-right">
            <span className="icon-btn"><User size={16} /></span>
            <div className="profile">
              <span className="avatar" />
              <div className="profile-text">
                <div className="profile-name">Ana Cole</div>
                <div className="profile-sub">Pro member</div>
              </div>
            </div>
          </div>
        </nav>

        {/* ---------------- BENTO GRID ---------------- */}
        <div className="bento">

          {/* Smart Home */}
          <Platform className="cell-smart" glow="warm">
            <div className="filled-card">
              <div className="orb-row" style={{ marginBottom: 18 }}>
                <IconOrb size="lg" tint="warm"><Speaker size={30} /></IconOrb>
                <IconOrb size="md" tint="warm"><Lightbulb size={24} /></IconOrb>
              </div>
              <div className="platform-label">Smart Home</div>
              <div className="platform-sub">Voice hubs and adaptive lighting that learn your routine.</div>
            </div>
          </Platform>

          {/* Keyboards */}
          <Platform className="cell-keyboards" glow="magenta">
            <div className="filled-card center-align">
              <div className="orb-row" style={{ justifyContent: "center", marginBottom: 16 }}>
                <IconOrb size="lg" tint="magenta"><Keyboard size={32} /></IconOrb>
                <IconOrb size="lg" tint="blue"><Keyboard size={32} /></IconOrb>
              </div>
            </div>
          </Platform>

          {/* PC Parts */}
          <Platform className="cell-pcparts" glow="blue">
            <div className="filled-card center-align">
              <IconOrb size="md" tint="blue"><Aperture size={26} /></IconOrb>
              <div className="platform-label" style={{ marginTop: 12, fontSize: 12.5 }}>PC Parts</div>
              <div className="platform-sub" style={{ fontSize: 10.5 }}>Everything inside</div>
            </div>
          </Platform>

          {/* Drone hero */}
          <Platform className="cell-drone" glow="blue">
            <div className="filled-card center-align">
              <IconOrb size="lg" tint="blue"><DroneIcon size={34} /></IconOrb>
            </div>
          </Platform>

          {/* Wearables */}
          <Platform className="cell-wearables" glow="magenta">
            <div className="filled-card">
              <div className="orb-row" style={{ marginBottom: 16 }}>
                <IconOrb size="sm" tint="magenta"><Watch size={20} /></IconOrb>
                <IconOrb size="sm" tint="blue"><Watch size={20} /></IconOrb>
                <IconOrb size="md" tint="warm"><Watch size={24} /></IconOrb>
              </div>
              <div className="eyebrow">Featured</div>
              <div className="platform-label">AR Lens Collection</div>
            </div>
          </Platform>

          {/* Audio middle */}
          <Platform className="cell-audio-mid" glow="blue">
            <div className="filled-card center-align">
              <div className="orb-row" style={{ justifyContent: "center", marginBottom: 14 }}>
                <IconOrb size="lg" tint="blue"><Headphones size={32} /></IconOrb>
                <IconOrb size="md" tint="warm"><Watch size={24} /></IconOrb>
                <IconOrb size="lg" tint="neutral"><Headphones size={32} /></IconOrb>
              </div>
              <div className="platform-sub" style={{ margin: "0 auto", textAlign: "center" }}>
                Curated listening — headphones and earbuds side by side.
              </div>
            </div>
          </Platform>

          {/* Camcorder */}
          <Platform className="cell-camcorder" glow="blue">
            <div className="filled-card center-align">
              <IconOrb size="md" tint="neutral"><Camera size={26} /></IconOrb>
            </div>
          </Platform>

          {/* Audio & Gaming CTA */}
          <Platform className="cell-audio-cta" glow="blue">
            <div className="filled-card">
              <IconOrb size="lg" tint="blue"><Headphones size={30} /></IconOrb>
              <div className="platform-label" style={{ marginTop: 14 }}>Audio and Gaming</div>
              <div className="platform-sub">Immersive sound built for long sessions.</div>
              <button className="cta-btn">Shop Now <ChevronRight size={14} /></button>
            </div>
          </Platform>

          {/* Featured collections */}
          <Platform className="cell-collection" glow="blue">
            <div className="filled-card">
              <div className="eyebrow">Featured</div>
              <div className="platform-label" style={{ marginBottom: 0 }}>Collections</div>
            </div>
          </Platform>

          {/* Camera collection CTA */}
          <Platform className="cell-camcta" glow="warm">
            <div className="filled-card">
              <div className="orb-row" style={{ marginBottom: 14 }}>
                <IconOrb size="lg" tint="neutral"><Camera size={30} /></IconOrb>
                <IconOrb size="md" tint="neutral"><Camera size={24} /></IconOrb>
              </div>
              <div className="platform-label">Camera Collections</div>
              <div className="platform-sub">Mirrorless bodies and glass for every kind of shot.</div>
              <button className="cta-btn">Shop Now <ChevronRight size={14} /></button>
            </div>
          </Platform>

          {/* New Arrivals */}
          <Platform className="cell-newarr" glow="blue">
            <div className="filled-card">
              <IconOrb size="md" tint="blue"><Package size={24} /></IconOrb>
              <div className="platform-label" style={{ marginTop: 12, fontSize: 13 }}>New Arrivals</div>
              <div className="platform-sub" style={{ fontSize: 10.5 }}>Fresh in this week</div>
            </div>
          </Platform>

          {/* Accessories */}
          <Platform className="cell-accessory" glow="blue">
            <div className="filled-card center-align">
              <IconOrb size="lg" tint="blue"><DroneIcon size={30} /></IconOrb>
              <div className="platform-label" style={{ marginTop: 10, fontSize: 12.5 }}>Accessories</div>
            </div>
          </Platform>

        </div>

        {/* ---------------- FOOTER ---------------- */}
        <footer className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
          <a href="#">Careers</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </footer>
      </div>
    </div>
  );
}

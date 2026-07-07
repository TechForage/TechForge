import { Shield } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Company</h4>
            <a href="/">Home</a>
            <a href="/shop">Shop Now</a>
            <a href="/pc-builder">PC Builder</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <a href="/categories">All Categories</a>
            <a href="/orders">Order Tracking</a>
            <a href="/shipping">Shipping &amp; Returns</a>
            <a href="/privacy">Privacy Policy</a>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <a href="/help">Help Center</a>
            <a href="/quick-links">Quick Links</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <a href="mailto:contact@techforage.com">📧 contact@techforage.com</a>
            <a href="tel:1800367243">📞 1-800-FORAGE</a>
            <a href="#">📍 123 Tech Street, SV</a>
            <a href="/about">About Us</a>
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
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
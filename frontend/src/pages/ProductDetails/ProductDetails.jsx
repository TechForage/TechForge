import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ChevronLeft, Truck, ShieldCheck, RotateCcw, Minus, Plus } from 'lucide-react';
import './ProductDetails.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Navbar/Footer';
import { getProduct, getRelatedProducts } from '../../utils/productsData';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useCart } from '../../contexts/CartContext';

// The mock data only stores one overall rating + review count per product
// (no per-star breakdown). This derives a plausible 5→1 star distribution
// from that single number so the rating section has something real to show,
// weighted so scores near the overall rating dominate.
function buildRatingBreakdown(rating, reviewsStr) {
  const totalReviews = parseInt(String(reviewsStr).replace(/,/g, ''), 10) || 0;
  const weights = [5, 4, 3, 2, 1].map((star) => {
    const distance = Math.abs(star - rating);
    return Math.max(0.02, 1 - distance / 2.5) ** 3;
  });
  const weightSum = weights.reduce((a, b) => a + b, 0);
  return [5, 4, 3, 2, 1].map((star, i) => {
    const pct = weightSum ? weights[i] / weightSum : 0;
    return {
      star,
      pct,
      count: Math.round(pct * totalReviews),
    };
  });
}

function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { addToCart } = useCart();

  const product = useMemo(() => getProduct(category, id), [category, id]);
  const related = useMemo(() => getRelatedProducts(category, id, 4), [category, id]);

  const [qty, setQty] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  // Reset quantity/messages when navigating between products.
  useEffect(() => {
    setQty(1);
    setAddedMessage('');
  }, [category, id]);

  if (!product) {
    return (
      <div className="techforage-site">
        <div className="wrap">
          <Navbar />
          <div className="pd-not-found">
            <h2>Product not found</h2>
            <p>We couldn't find that product. It may have been removed or the link is incorrect.</p>
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={16} /> Go back
            </button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const saved = isInWatchlist(product.id);
  const specs = String(product.type)
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);
  const breakdown = buildRatingBreakdown(product.rating, product.reviews);
  const savings = product.originalPrice - product.price;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedMessage(`Added ${qty} to cart`);
    window.clearTimeout(handleAddToCart._t);
    handleAddToCart._t = window.setTimeout(() => setAddedMessage(''), 2200);
  };

  return (
    <div className="techforage-site">
      <div className="wrap">
        <Navbar />

        <div className="pd-page">
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <button className="pd-back-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={16} /> Back
            </button>
            <span className="pd-crumb-sep">/</span>
            <Link to={`/${category}`} className="pd-crumb-link">{category}</Link>
            <span className="pd-crumb-sep">/</span>
            <span className="pd-crumb-current">{product.brand}</span>
          </nav>

          <div className="pd-top">
            {/* Gallery */}
            <div className="pd-gallery">
              <span className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
              <div className="pd-image-frame">
                <img src={product.image} alt={product.name} />
              </div>
            </div>

            {/* Info + buy box */}
            <div className="pd-info">
              <p className="pd-brand">{product.brand}</p>
              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating-row">
                <span className="pd-rating-pill">★ {product.rating}</span>
                <span className="pd-review-count">{product.reviews} ratings</span>
                <span className="assured-tag">✓ Assured</span>
              </div>

              {specs.length > 0 && (
                <ul className="pd-spec-chips">
                  {specs.map((spec, i) => (
                    <li key={i} className="pd-spec-chip">{spec}</li>
                  ))}
                </ul>
              )}

              <div className="pd-buy-box">
                <div className="pd-price-row">
                  <span className="pd-current-price">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="pd-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="pd-discount-pct">{product.discount}</span>
                </div>
                {savings > 0 && (
                  <p className="pd-savings">You save ₹{savings.toLocaleString('en-IN')}</p>
                )}

                <div className="pd-qty-row">
                  <span className="pd-qty-label">Quantity</span>
                  <div className="pd-qty-stepper">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="pd-actions">
                  <button className="pd-add-cart-btn" onClick={handleAddToCart}>
                    🛒 Add to Cart
                  </button>
                  <button
                    className={`pd-wishlist-btn ${saved ? 'saved' : ''}`}
                    onClick={() => toggleWatchlist(product)}
                    aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    <Heart size={18} fill={saved ? '#ff4081' : 'none'} color={saved ? '#ff4081' : 'currentColor'} />
                  </button>
                </div>

                {addedMessage && <p className="pd-added-msg">{addedMessage}</p>}

                <ul className="pd-trust-list">
                  <li><Truck size={15} /> Free delivery in 3-5 business days</li>
                  <li><ShieldCheck size={15} /> 1 year warranty included</li>
                  <li><RotateCcw size={15} /> 7-day replacement policy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rating breakdown + specs */}
          <div className="pd-mid">
            <section className="pd-panel pd-ratings-panel">
              <h2>Customer ratings</h2>
              <div className="pd-ratings-summary">
                <div className="pd-ratings-score">
                  <span className="pd-score-num">{product.rating}</span>
                  <span className="pd-score-star">★</span>
                  <span className="pd-score-total">{product.reviews} ratings</span>
                </div>
                <div className="pd-ratings-bars">
                  {breakdown.map(({ star, pct, count }) => (
                    <div className="pd-bar-row" key={star}>
                      <span className="pd-bar-label">{star}★</span>
                      <div className="pd-bar-track">
                        <div className="pd-bar-fill" style={{ width: `${Math.round(pct * 100)}%` }} />
                      </div>
                      <span className="pd-bar-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="pd-panel pd-specs-panel">
              <h2>Specifications</h2>
              <table className="pd-specs-table">
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td style={{ textTransform: 'capitalize' }}>{category}</td>
                  </tr>
                  {specs.map((spec, i) => (
                    <tr key={i}>
                      <td>{specs.length > 1 ? `Detail ${i + 1}` : 'Details'}</td>
                      <td>{spec}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Warranty</td>
                    <td>1 year manufacturer warranty</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section className="pd-related">
              <h2>You may also like</h2>
              <div className="pd-related-grid">
                {related.map((rp) => (
                  <div
                    key={rp.id}
                    className="pd-related-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/${category}/${rp.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') navigate(`/product/${category}/${rp.id}`);
                    }}
                  >
                    <div className="pd-related-img">
                      <img src={rp.image} alt={rp.name} />
                    </div>
                    <p className="pd-related-name">{rp.name}</p>
                    <div className="pd-related-rating">★ {rp.rating}</div>
                    <div className="pd-related-price">
                      <span>₹{rp.price.toLocaleString('en-IN')}</span>
                      <span className="pd-related-original">₹{rp.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ProductDetails;
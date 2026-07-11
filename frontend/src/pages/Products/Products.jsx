import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import './Products.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';
import Footer from "../../components/Navbar/Footer";
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { applyFilters, applySort } from '../../utils/productFilters';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useCart } from '../../contexts/CartContext';
import { useParams } from 'react-router-dom';
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
import { Allproducts, categories } from '../../utils/productsData';
import { Link } from 'react-router-dom';

function Products() {

  const { category } = useParams();

  const productsData = Allproducts[category] || [];

  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { addToCart } = useCart();

  // Filter + sort state for the reusable FilterSidebar.
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('popularity');

  // Reset filters/sort whenever the category changes so stale
  // filters from one category don't leak into another.
  useEffect(() => {
    setFilters({});
    setSortBy('popularity');
  }, [category]);

  const visibleProducts = applySort(applyFilters(productsData, filters), sortBy);

  const handleAddToCart = (e, product) => {
    // Stop the click from bubbling up to the surrounding <Link>,
    // otherwise "Add to Cart" would also navigate to the product page.
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="techforage-site">
      <div className="wrap">
        <Navbar />

        <div className="content-layout">
          <Sidebar categories={categories} />

          {productsData.length > 0 && (
            <FilterSidebar
              category={category}
              products={productsData}
              filters={filters}
              onFilterChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}

          <main className="main-content">
            {productsData.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-dim, #8f98a8)" }}>
                <h2 style={{ color: "var(--ink, #e9edf3)" }}>No products found</h2>
                <p>We don't have any products listed for "{category}" yet.</p>
              </div>
            ) : visibleProducts.length === 0 ? (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-dim, #8f98a8)" }}>
                <h2 style={{ color: "var(--ink, #e9edf3)" }}>No products match your filters</h2>
                <p>Try clearing some filters to see more results.</p>
              </div>
            ) : (
            
              <div className="products-grid">
                {visibleProducts.map((product) => {
                  const saved = isInWatchlist(product.id);
                  return (
                    <Link key={product.id} to={`/${category}/${product.id}`}>
                    <div className="product-card">
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
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          🛒 Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            )}          
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Products;
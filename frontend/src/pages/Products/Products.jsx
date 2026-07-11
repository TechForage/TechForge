import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import './Products.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Navbar/Sidebar';
import Footer from "../../components/Navbar/Footer";
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { applyFilters, applySort } from '../../utils/productFilters';
import { useWatchlist } from '../../contexts/WatchlistContext';
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


const Allproducts = {
  keyboard: [
     { id: 1, name: 'HP K200 Bluetooth Standard Laptop Keyboard Compatible...', brand: 'HP', type: 'Black', rating: 3.9, reviews: '1,619', price: 599, originalPrice: 1199, discount: '50% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80' },
     { id: 3, name: 'ZEBRONICS Zeb-K20 / Zeb-K65 Wired USB Standard Desktop...', brand: 'ZEBRONICS', type: 'Black', rating: 4.1, reviews: '3,5246', price: 297, originalPrice: 399, discount: '25% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=300&q=80' },
     { id: 4, name: 'ZEBRONICS Zeb-Judwaa 750 Combo Wired USB Standard Deskto...', brand: 'ZEBRONICS', type: 'Black', rating: 4.2, reviews: '2,1336', price: 422, originalPrice: 999, discount: '53% off', badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80' },
     { id: 6, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'White', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=300&q=80' },
     { id: 7, name: 'ZEBRONICS Transformer (ZEB Designed f...', brand: 'ZEBRONICS', type: 'Yellow', rating: 4.1, reviews: '1,799', price: 1511, originalPrice: 1799, discount: '49% off', badge: 'Discount', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&q=80' }
  ],

  monitors: [
    {
      id: 101,
      name: "Samsung 24-inch Full HD IPS Monitor",
      brand: "Samsung",
      type: "24 inch",
      rating: 4.5,
      reviews: "2,340",
      price: 8999,
      originalPrice: 11999,
      discount: "25% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80"
    },
    {
      id: 102,
      name: "LG UltraGear 27-inch Gaming Monitor",
      brand: "LG",
      type: "27 inch",
      rating: 4.7,
      reviews: "1,850",
      price: 16999,
      originalPrice: 19999,
      discount: "15% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300&q=80"
    }
  ],

  processor: [
    {
      id: 201,
      name: "Intel Core i5-14400F Desktop Processor",
      brand: "Intel",
      type: "14th Gen",
      rating: 4.8,
      reviews: "980",
      price: 18999,
      originalPrice: 21999,
      discount: "14% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
    },
    {
      id: 202,
      name: "AMD Ryzen 7 7700X Processor",
      brand: "AMD",
      type: "8 Cores",
      rating: 4.9,
      reviews: "1,220",
      price: 27999,
      originalPrice: 31999,
      discount: "12% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
    }
  ],

  graphicscard: [
    {
      id: 301,
      name: "NVIDIA GeForce RTX 4060 8GB Graphics Card",
      brand: "NVIDIA",
      type: "8GB GDDR6",
      rating: 4.8,
      reviews: "720",
      price: 31999,
      originalPrice: 35999,
      discount: "11% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
    },
    {
      id: 302,
      name: "AMD Radeon RX 7600 Graphics Card",
      brand: "AMD",
      type: "8GB GDDR6",
      rating: 4.6,
      reviews: "510",
      price: 26999,
      originalPrice: 29999,
      discount: "10% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80"
    }
  ],

  laptop: [
    {
      id: 401,
      name: "HP Pavilion 15 Intel Core i5 Laptop",
      brand: "HP",
      type: "16GB RAM | 512GB SSD",
      rating: 4.5,
      reviews: "2,810",
      price: 58999,
      originalPrice: 65999,
      discount: "11% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
    },
    {
      id: 402,
      name: "Lenovo IdeaPad Slim 5",
      brand: "Lenovo",
      type: "Ryzen 7 | 16GB RAM",
      rating: 4.6,
      reviews: "1,430",
      price: 64999,
      originalPrice: 71999,
      discount: "10% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
    }
  ],

  motherboard: [
    {
      id: 501,
      name: "ASUS PRIME B760M Motherboard",
      brand: "ASUS",
      type: "LGA1700",
      rating: 4.7,
      reviews: "690",
      price: 11999,
      originalPrice: 13999,
      discount: "14% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
    },
    {
      id: 502,
      name: "MSI B650 Gaming Plus WiFi Motherboard",
      brand: "MSI",
      type: "AM5",
      rating: 4.8,
      reviews: "540",
      price: 17999,
      originalPrice: 19999,
      discount: "10% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
    }
  ],

  hardware: [
    {
      id: 601,
      name: "Corsair RM750x 750W Power Supply",
      brand: "Corsair",
      type: "80+ Gold, Fully Modular",
      rating: 4.7,
      reviews: "890",
      price: 9999,
      originalPrice: 11999,
      discount: "16% off",
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80"
    },
    {
      id: 602,
      name: "NZXT H510 Mid Tower Cabinet",
      brand: "NZXT",
      type: "ATX Case",
      rating: 4.5,
      reviews: "615",
      price: 6999,
      originalPrice: 8499,
      discount: "18% off",
      badge: "Discount",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80"
    }
  ]
};

const categories = [
  { icon: Cpu, label: "Processors", route: "/processor" },
  { icon: CircuitBoard, label: "Graphics Cards", route: "/graphicscard" },
  { icon: Laptop, label: "Laptops", route: "/laptop" },
  { icon: CircuitBoard, label: "Motherboards", route: "/motherboard" },
  { icon: MemoryStick, label: "RAM Memory", route: "/ram" },
  { icon: HardDrive, label: "SSD Storage", route: "/ssd" },
  { icon: Monitor, label: "Monitors", route: "/monitors" },
  { icon: Gamepad2, label: "Gaming Accessories", route: "/gaming-accessories" },
  { icon: Wifi, label: "Networking", route: "/networking" },
  { icon: Watch, label: "Smart Devices", route: "/smart-devices" },
];



function Products() {

  const { category } = useParams();

  const productsData = Allproducts[category] || [];

  const { isInWatchlist, toggleWatchlist } = useWatchlist();

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

  const handleAddToCart = (productName) => {
    console.log(`Added ${productName} to cart.`);
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
            )}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Products;
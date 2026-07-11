import React, { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { getFilterFields } from "../../config/filterConfig";
import "./FilterSidebar.css";

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest First" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "ratingHigh", label: "Highest Rated" },
];

const RATING_OPTIONS = [4, 3, 2, 1];

function getUniqueValues(products, key) {
  return [...new Set(products.map((p) => p[key]).filter(Boolean))].sort();
}

function FilterSidebar({ category, products, filters, onFilterChange, sortBy, onSortChange }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const fieldsConfig = getFilterFields(category);

  const priceBounds = useMemo(() => {
    if (products.length === 0) return [0, 0];
    const prices = products.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  const toggleCheckbox = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: next });
  };

  const setRating = (value) => {
    onFilterChange({ ...filters, rating: filters.rating === value ? null : value });
  };

  const setPriceMax = (value) => {
    onFilterChange({ ...filters, priceMax: Number(value) });
  };

  const activeFilterCount = Object.entries(filters).reduce((count, [key, val]) => {
    if (key === "priceMax") return val != null && val < priceBounds[1] ? count + 1 : count;
    if (key === "rating") return val ? count + 1 : count;
    return Array.isArray(val) ? count + val.length : count;
  }, 0);

  return (
    <>
      <button className="filter-mobile-toggle" onClick={() => setIsMobileOpen(true)}>
        <SlidersHorizontal size={16} />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      {isMobileOpen && <div className="filter-overlay" onClick={() => setIsMobileOpen(false)} />}

      <aside className={`filter-sidebar ${isMobileOpen ? "filter-sidebar-open" : ""}`}>
        <div className="filter-sidebar-header">
          <h3>Filters</h3>
          <div className="filter-header-actions">
            {activeFilterCount > 0 && (
              <button className="filter-clear-btn" onClick={() => onFilterChange({})}>
                Clear all
              </button>
            )}
            <button className="filter-mobile-close" onClick={() => setIsMobileOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-section-title" htmlFor="sort-by-select">
            Sort By
          </label>
          <div className="sort-select-wrap">
            <select
              id="sort-by-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="sort-select-icon" />
          </div>
        </div>

        {priceBounds[1] > 0 && (
          <div className="filter-section">
            <h4 className="filter-section-title">Price</h4>
            <input
              type="range"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={filters.priceMax ?? priceBounds[1]}
              onChange={(e) => setPriceMax(e.target.value)}
              className="price-range-input"
            />
            <div className="price-range-labels">
              <span>₹{priceBounds[0]}</span>
              <span>Up to ₹{filters.priceMax ?? priceBounds[1]}</span>
            </div>
          </div>
        )}

        <div className="filter-section">
          <h4 className="filter-section-title">Customer Rating</h4>
          <div className="filter-options">
            {RATING_OPTIONS.map((r) => (
              <label key={r} className="filter-radio-option">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === r}
                  onChange={() => setRating(r)}
                />
                <span>★ {r}+ & above</span>
              </label>
            ))}
          </div>
        </div>

        {fieldsConfig.map((field) => {
          const options = getUniqueValues(products, field.key);
          if (options.length === 0) return null;
          return (
            <div className="filter-section" key={field.key}>
              <h4 className="filter-section-title">{field.label}</h4>
              <div className="filter-options">
                {options.map((opt) => (
                  <label key={opt} className="filter-checkbox-option">
                    <input
                      type="checkbox"
                      checked={(filters[field.key] || []).includes(opt)}
                      onChange={() => toggleCheckbox(field.key, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </aside>
    </>
  );
}

export default FilterSidebar;
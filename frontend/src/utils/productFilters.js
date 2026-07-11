// Pure functions for filtering + sorting product arrays.
// Kept separate from the component so any page can reuse this logic.

export function applyFilters(products, filters) {
  return products.filter((product) => {
    if (filters.priceMax != null && product.price > filters.priceMax) {
      return false;
    }
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }
    for (const key of Object.keys(filters)) {
      if (key === "priceMax" || key === "rating") continue;
      const selected = filters[key];
      if (Array.isArray(selected) && selected.length > 0 && !selected.includes(product[key])) {
        return false;
      }
    }
    return true;
  });
}

function parseReviewCount(reviews) {
  return Number(String(reviews).replace(/,/g, "")) || 0;
}

export function applySort(products, sortBy) {
  const sorted = [...products];
  switch (sortBy) {
    case "priceLowHigh":
      return sorted.sort((a, b) => a.price - b.price);
    case "priceHighLow":
      return sorted.sort((a, b) => b.price - a.price);
    case "ratingHigh":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.sort((a, b) => b.id - a.id);
    case "popularity":
    default:
      return sorted.sort((a, b) => parseReviewCount(b.reviews) - parseReviewCount(a.reviews));
  }
}
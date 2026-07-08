import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext(null);

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return ctx;
};

const STORAGE_KEY = "techforage_watchlist";

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      /* storage unavailable, fail silently */
    }
  }, [watchlist]);

  const isInWatchlist = (productId) =>
    watchlist.some((item) => item.id === productId);

  const addToWatchlist = (product) => {
    setWatchlist((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWatchlist = (productId) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWatchlist = (product) => {
    isInWatchlist(product.id)
      ? removeFromWatchlist(product.id)
      : addToWatchlist(product);
  };

  const value = {
    watchlist,
    watchlistCount: watchlist.length,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
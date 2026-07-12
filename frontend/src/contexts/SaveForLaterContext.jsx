// src/contexts/SaveForLaterContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const SaveForLaterContext = createContext();

export const useSaveForLater = () => {
  const context = useContext(SaveForLaterContext);
  if (!context) {
    throw new Error('useSaveForLater must be used within SaveForLaterProvider');
  }
  return context;
};

export const SaveForLaterProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem('savedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToSaved = (product) => {
    setSavedItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromSaved = (productId) => {
    setSavedItems(prev => prev.filter(item => item.id !== productId));
  };

  const moveToCart = (productId, addToCart) => {
    const product = savedItems.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromSaved(productId);
    }
  };

  const clearSaved = () => {
    setSavedItems([]);
  };

  const value = {
    savedItems,
    addToSaved,
    removeFromSaved,
    moveToCart,
    clearSaved
  };

  return (
    <SaveForLaterContext.Provider value={value}>
      {children}
    </SaveForLaterContext.Provider>
  );
};
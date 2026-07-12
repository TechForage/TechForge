// src/pages/Cart/Cart.jsx
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useSaveForLater } from '../../contexts/SaveForLaterContext';
import { useWatchlist } from '../../contexts/WatchlistContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const { savedItems, addToSaved, removeFromSaved, moveToCart } = useSaveForLater();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleSaveForLater = (product) => {
    removeFromCart(product.id);
    addToSaved(product);
  };

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addToCart);
  };

  const handleAddToWatchlist = (product) => {
    if (isInWatchlist(product.id)) {
      removeFromWatchlist(product.id);
    } else {
      addToWatchlist(product);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <div className="cart-stats">
          {totalItems > 0 ? (
            <>
              <span>{totalItems}</span> items • <span>${calculateTotal().toFixed(2)}</span>
            </>
          ) : (
            'Your cart is empty'
          )}
        </div>
      </div>
      
      {cartItems.length === 0 && savedItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          {cartItems.length > 0 && (
            <div className="cart-items">
              <div className="section-header">
                <h2>Cart Items</h2>
                <span className="count">{totalItems} items</span>
              </div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">
                      ${item.price.toFixed(2)}
                      {item.originalPrice && (
                        <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="item-actions">
                    <button 
                      className="save-for-later-btn"
                      onClick={() => handleSaveForLater(item)}
                    >
                      Save for Later
                    </button>
                    <button 
                      className="watchlist-btn"
                      onClick={() => handleAddToWatchlist(item)}
                    >
                      {isInWatchlist(item.id) ? '❤️' : '🤍'}
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="cart-summary">
                <div className="total">
                  <strong>Total: </strong>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={clearCart}>
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          )}

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <div className="saved-items-section">
              <div className="section-header">
                <h2>📌 Saved for Later</h2>
                <span className="count">{savedItems.length} items</span>
              </div>
              {savedItems.map(item => (
                <div key={item.id} className="saved-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="move-to-cart-btn"
                      onClick={() => handleMoveToCart(item.id)}
                    >
                      Move to Cart
                    </button>
                    <button 
                      className="remove-saved-btn"
                      onClick={() => removeFromSaved(item.id)}
                    >
                      Remove
                    </button>
                    <button 
                      className="watchlist-btn"
                      onClick={() => handleAddToWatchlist(item)}
                    >
                      {isInWatchlist(item.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
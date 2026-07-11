import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import './Cart.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Navbar/Footer';
import { useCart } from '../../contexts/CartContext';

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div className="techforage-site">
      <div className="wrap">
        <Navbar />

        <div className="cart-page">
          <button className="cart-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={16} /> Back
          </button>

          <h1 className="cart-title">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything yet.</p>
              <button className="cart-continue-btn" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-img-wrapper">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-price">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="cart-item-qty-stepper">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="cart-summary-row">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Total Price</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <button className="cart-checkout-btn">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Cart;
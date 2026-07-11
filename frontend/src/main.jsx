import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { WatchlistProvider } from './contexts/WatchlistContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WatchlistProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import { SaveForLaterProvider } from "./contexts/SaveForLaterContext";
import Home from "./pages/Home";
import Watchlist from "./pages/watchlist/Watchlist";
import SearchResults from "./pages/SearchResults/SearchResults";
import Products from "./pages/Products/Products";
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <CartProvider>
      <WatchlistProvider>
        <SaveForLaterProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<ProductDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<SearchResults />} />
          </Routes>
        </SaveForLaterProvider>
      </WatchlistProvider>
    </CartProvider>
  );
}

export default App;
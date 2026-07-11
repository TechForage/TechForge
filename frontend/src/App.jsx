import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/watchlist/Watchlist";
import SearchResults from "./pages/SearchResults/SearchResults";
import Products from "./pages/Products/Products";
import ProductDetails from './pages/ProductDetails/ProductDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Products />} />
      <Route path="/:category/:id" element={<ProductDetails />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="*" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
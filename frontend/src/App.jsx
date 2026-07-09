import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
<<<<<<< HEAD
import Products from "./pages/Products/Products";
=======
import Keyboard from "./pages/keyboard/Keyboard";
>>>>>>> 2eae3afbd9f94c0ee12b5ba60441f39d7e11f4f9
import Watchlist from "./pages/watchlist/Watchlist";
import SearchResults from "./pages/SearchResults/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Products />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="*" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
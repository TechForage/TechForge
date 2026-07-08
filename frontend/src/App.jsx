import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Keyboard from "./pages/keyboard/keyboard";
import Watchlist from "./pages/watchlist/Watchlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/keyboard" element={<Keyboard />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Routes>
  );
}

export default App;
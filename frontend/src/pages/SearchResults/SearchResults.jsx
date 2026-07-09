// src/pages/SearchResults/SearchResults.jsx
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  return (
    <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
      <h2 style={{ color: "var(--ink, #e9edf3)" }}>No products found</h2>
      {query && (
        <p style={{ color: "var(--ink-dim, #8f98a8)" }}>
          We couldn't find anything matching "{query}".
        </p>
      )}
      <p style={{ color: "var(--ink-dim, #8f98a8)" }}>
        Try searching for "keyboard", "laptop", "ram", or "ssd".
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "16px",
          background: "var(--accent-cyan, #3fa9ff)",
          color: "#05121f",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default SearchResults;
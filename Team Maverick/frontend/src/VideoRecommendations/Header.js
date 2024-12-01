import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <h1 id="main-heading">Video Recommendations</h1>
        <div id="search-bar" className="search-bar">
          <input
            type="text"
            id="search-input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            id="search-button"
            style={{ width: "150px", textAlign: "center" }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

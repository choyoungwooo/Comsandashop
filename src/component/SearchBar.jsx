import "../css/searchbar.css";
import { useState } from "react";

function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    alert(`${keyword} 검색 (API 붙이면 여기서 처리)`);
  };

  return (
    <div className="search-wrapper">
  <div className="search-bar">
    <input type="text" placeholder="부품명을 검색해보세요 (예: RTX 4060)" />
    <button>검색</button>
  </div>
</div>

  );
}

export default SearchBar;

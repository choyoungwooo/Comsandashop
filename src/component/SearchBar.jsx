import "../css/searchbar.css";
import { useState, useMemo, useRef, useEffect } from "react";

function SearchBar({ onSearch, products = [] }) {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // 🔵 공백 제거 + 소문자 변환
  const normalize = (text) =>
    text.toLowerCase().replace(/\s/g, "");

  // 🔵 자동완성 목록 (useMemo로 최적화)
  const suggestions = useMemo(() => {
    if (!keyword.trim()) return [];

    return products
      .filter((p) =>
        normalize(p.name).includes(normalize(keyword))
      )
      .slice(0, 5);
  }, [keyword, products]);

  // 🔵 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔵 검색 실행
  const handleSearch = () => {
    if (!keyword.trim()) return;
    onSearch(keyword);
    setShowDropdown(false);
  };

  return (
    <div
      className="search-wrapper"
      ref={wrapperRef}
      style={{ position: "relative" }}
    >
      <div className="search-bar">
        <input
  value={keyword}
  onFocus={() => setKeyword("")}   // 🔥 포커스 시 초기화
  onChange={(e) => {
    setKeyword(e.target.value);
    setShowDropdown(true);
  }}
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  placeholder="부품명을 검색해보세요"
/>
        <button onClick={handleSearch}>검색</button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="search-dropdown">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="suggest-item"
              onClick={() => {
                setKeyword(item.name);
                onSearch(item.name);
                setShowDropdown(false);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

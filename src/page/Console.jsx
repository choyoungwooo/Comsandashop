import { useState, useMemo } from "react";
import { products } from "../data/Products";
import "../css/recommend.css";
import "../css/console.css";

function Console() {

  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortOrder, setSortOrder] = useState("low");

 const platformOptions = [
  { label: "전체", value: "all" },
  { label: "PS5", value: "ps5" },
  { label: "닌텐도", value: "nintendo" },
  { label: "Xbox", value: "xbox" }
];


  const filteredProducts = useMemo(() => {

    let filtered = products.filter(
      p => p.category === "console"
    );

    if (selectedPlatform !== "all") {
      filtered = filtered.filter(
        p => p.platform === selectedPlatform
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : b.price - a.price
    );

    return filtered;

  }, [selectedPlatform, sortOrder]);

  return (
    <div className="recommend-page">

      <h1>🎮 콘솔 · 게임 용품</h1>

      {/* ================= 플랫폼 필터 ================= */}
      <div className="console-filter">
        {platformOptions.map(option => (
          <button
            key={option.value}
            className={`console-btn ${
              selectedPlatform === option.value && option.value !== "all"
                ? "active"
                : ""
            }`}
            onClick={() => setSelectedPlatform(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* ================= 정렬 ================= */}
      <div className="console-sort">
        <button
          className="sort-btn"
          onClick={() =>
            setSortOrder(prev => prev === "low" ? "high" : "low")
          }
        >
          {sortOrder === "low" ? "낮은 가격순 ↓" : "높은 가격순 ↑"}
        </button>
      </div>

      {/* ================= 상품 ================= */}
      <div className="recommend-grid">
        {filteredProducts.map(item => (
          <div key={item.id} className="recommend-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              구매하기
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Console;

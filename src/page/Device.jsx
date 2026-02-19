import { useState, useMemo } from "react";
import { products } from "../data/Products";
import "../css/recommend.css";
import "../css/device.css";

function Device() {

  const [activeCategory, setActiveCategory] = useState("mouse");
  const [sortOrder, setSortOrder] = useState("low");
  const [selectedOption, setSelectedOption] = useState("all");

  const categories = [
    { label: "마우스", key: "mouse" },
    { label: "키보드", key: "keyboard" },
    { label: "모니터", key: "monitor" }
  ];

  // 🔥 브랜드 대신 카테고리별 옵션
  const optionMap = {
    mouse: [
      { label: "전체", value: "all" },
      { label: "무선", value: "wireless" },
      { label: "유선", value: "wired" }
    ],
    keyboard: [
      { label: "전체", value: "all" },
      { label: "적축", value: "red" },
      { label: "갈축", value: "brown" },
      { label: "청축", value: "blue" },
      { label: "저소음", value: "silent" }
    ],
    monitor: [
      { label: "전체", value: "all" },
      { label: "24인치", value: "24" },
      { label: "27인치", value: "27" },
      { label: "32인치", value: "32" }
    ]
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      p => p.category === activeCategory
    );

    // 🔥 옵션 필터
    if (selectedOption !== "all") {
      filtered = filtered.filter(
        p => p.option === selectedOption
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : b.price - a.price
    );

    return filtered;

  }, [activeCategory, sortOrder, selectedOption]);

  return (
    <div className="recommend-page">
      <h1>🎧 주변기기 모음</h1>

      {/* ================= 카테고리 ================= */}
      <div className="device-nav">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={activeCategory === cat.key ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat.key);
              setSelectedOption("all");
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ================= 필터 ================= */}
      <div className="filter-row">

        <button
          className="sort-btn"
          onClick={() =>
            setSortOrder(prev => (prev === "low" ? "high" : "low"))
          }
        >
          {sortOrder === "low" ? "낮은 가격순 ↓" : "높은 가격순 ↑"}
        </button>

        <select
          className="brand-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {optionMap[activeCategory]?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

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

export default Device;

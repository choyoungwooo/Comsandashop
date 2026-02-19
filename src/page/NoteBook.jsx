import { useState, useMemo } from "react";
import { products } from "../data/Products";
import "../css/recommend.css";
import "../css/notebook.css";

function NoteBook() {

  const [sortOrder, setSortOrder] = useState("low");
  const [priceRange, setPriceRange] = useState("all");

  // ✅ 게이밍 노트북 + 가격 필터
  const filteredProducts = useMemo(() => {

    let filtered = products.filter(
      (p) => p.category === "notebook" && p.type === "gaming"
    );

    // 🔥 가격대 필터
    if (priceRange === "100-150") {
      filtered = filtered.filter(
        (p) => p.price >= 1000000 && p.price < 1500000
      );
    }

    if (priceRange === "150-200") {
      filtered = filtered.filter(
        (p) => p.price >= 1500000 && p.price < 2000000
      );
    }

    if (priceRange === "200+") {
      filtered = filtered.filter(
        (p) => p.price >= 2000000
      );
    }

    // 🔥 가격 정렬
    filtered.sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : b.price - a.price
    );

    return filtered;

  }, [priceRange, sortOrder]);

  return (
    <div className="recommend-page">

      <h1>💻 게이밍 노트북 추천</h1>

      {/* ================= 가격 필터 ================= */}
      <div className="price-filter">

        <button
          className={priceRange === "all" ? "" : ""}
          onClick={() => setPriceRange("all")}
        >
          전체
        </button>

        <button
          className={priceRange === "100-" ? "active" : ""}
          onClick={() => setPriceRange("100-")}
        >
          100만원 이하
        </button>

        <button
          className={priceRange === "100-200" ? "active" : ""}
          onClick={() => setPriceRange("100-200")}
        >
          100~200만원
        </button>

        <button
          className={priceRange === "200~300" ? "active" : ""}
          onClick={() => setPriceRange("200~300")}
        >
          200 ~ 300만원 이상
        </button>

        <button
          className={priceRange === "300+" ? "active" : ""}
          onClick={() => setPriceRange("300+")}
        >
          300만원 이상
        </button>

      </div>

      {/* ================= 정렬 ================= */}
      <div className="filter-row">

        <button
          className="sort-btn"
          onClick={() =>
            setSortOrder(prev => prev === "low" ? "high" : "low")
          }
        >
          {sortOrder === "low" ? "⬇ 낮은 가격순" : "⬆ 높은 가격순"}
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

export default NoteBook;

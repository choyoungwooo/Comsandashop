import { useState, useMemo } from "react";
import { products } from "../data/Products";
import BuildGrid from "../component/BuildGrid";
import "../css/recommend.css";
import "../css/notebook.css";

function NoteBook() {

  const [sortOrder, setSortOrder] = useState("low");
  const [priceRange, setPriceRange] = useState("all");

  const filteredProducts = useMemo(() => {

    let filtered = products.filter(
      (p) => p.category === "notebook" && p.type === "gaming"
    );

    if (priceRange === "100-") {
      filtered = filtered.filter(p => p.price < 1000000);
    }

    if (priceRange === "100-200") {
      filtered = filtered.filter(
        p => p.price >= 1000000 && p.price < 2000000
      );
    }

    if (priceRange === "200-300") {
      filtered = filtered.filter(
        p => p.price >= 2000000 && p.price < 3000000
      );
    }

    if (priceRange === "300+") {
      filtered = filtered.filter(p => p.price >= 3000000);
    }

    filtered.sort((a, b) =>
      sortOrder === "low"
        ? a.price - b.price
        : b.price - a.price
    );

    // 🔥 BuildGrid 형식에 맞게 변환
    return filtered.map(p => ({
      name: p.name,
      image: p.image,
      price: `${p.price.toLocaleString()}원`,
      link: p.link
    }));

  }, [priceRange, sortOrder]);

  return (
    <div className="recommend-page">

      <h1>💻 게이밍 노트북 추천</h1>

      {/* 가격 필터 */}
      <div className="price-filter">

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
          100 ~ 200만원
        </button>

        <button
          className={priceRange === "200-300" ? "active" : ""}
          onClick={() => setPriceRange("200-300")}
        >
          200 ~ 300만원
        </button>

        <button
          className={priceRange === "300+" ? "active" : ""}
          onClick={() => setPriceRange("300+")}
        >
          300만원 이상
        </button>

      </div>

      {/* 정렬 */}
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

      <p className="partner-notice">
        ※ 본 페이지는 쿠팡 파트너스 활동의 일환으로,
        이에 따른 일정액의 수수료를 제공받을 수 있습니다.
      </p>

      {/* 🔥 공통 카드 사용 */}
      <BuildGrid builds={filteredProducts} />

    </div>
  );
}

export default NoteBook;
import { useState, useMemo } from "react";
import { products } from "../data/Products";
import BuildGrid from "../component/BuildGrid";
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

    // 🔥 BuildGrid 형식으로 변환
    return filtered.map(p => ({
      name: p.name,
      image: p.image,
      price: `${p.price.toLocaleString()}원`,
      link: p.link
    }));

  }, [selectedPlatform, sortOrder]);

  return (
    <div className="recommend-page">

      <h1>🎮 콘솔 · 게임 용품</h1>

      {/* 플랫폼 필터 */}
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

      {/* 정렬 */}
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

      <p className="partner-notice">
        ※ 본 페이지는 쿠팡 파트너스 활동의 일환으로,
        이에 따른 일정액의 수수료를 제공받을 수 있습니다.
      </p>

      {/* 🔥 공통 카드 사용 */}
      <BuildGrid builds={filteredProducts} />

    </div>
  );
}

export default Console;
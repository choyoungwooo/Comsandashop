import { useState, useMemo } from "react";
import { products } from "../data/Products";
import BuildGrid from "../component/BuildGrid";
import "../css/setup.css";

function Setup() {

  const [sortOrder, setSortOrder] = useState("low");
  const [selectedType, setSelectedType] = useState("all");

  const typeOptions = [
    { label: "전체", value: "all" },
    { label: "의자", value: "chair" },
    { label: "모니터암", value: "arm" },
    { label: "LED", value: "led" },
    { label: "패드", value: "pad" }
  ];

  const filteredProducts = useMemo(() => {

    let filtered = products.filter(
      p => p.category === "setup"
    );

    if (selectedType !== "all") {
      filtered = filtered.filter(
        p => p.type === selectedType
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

  }, [selectedType, sortOrder]);

  return (
    <div className="recommend-page">

      <h1>🪑 게이밍 환경 세팅</h1>

      {/* 타입 필터 */}
      <div className="setup-filter">
        {typeOptions.map(option => (
          <button
            key={option.value}
            className={`setup-btn ${
              selectedType === option.value && option.value !== "all"
                ? "active"
                : ""
            }`}
            onClick={() => setSelectedType(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <button
        className="sort-btn"
        onClick={() =>
          setSortOrder(prev => prev === "low" ? "high" : "low")
        }
      >
        {sortOrder === "low" ? "⬇ 낮은 가격순" : "⬆ 높은 가격순"}
      </button>

      <p className="partner-notice">
        ※ 본 페이지는 쿠팡 파트너스 활동의 일환으로,
        이에 따른 일정액의 수수료를 제공받을 수 있습니다.
      </p>

      {/* 🔥 공통 카드 */}
      <BuildGrid builds={filteredProducts} />

    </div>
  );
}

export default Setup;
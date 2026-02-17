import "../css/recommend.css";
import BuildGrid from "../component/BuildGrid";
import { useState, useMemo } from "react";

function Creator() {
  const [sortOrder, setSortOrder] = useState("low");
  const [priceFilter, setPriceFilter] = useState("all");

  const builds = [
    {
      name: "🚀 150만원 영상편집 세팅",
      price: 1500000,
      priceText: "약 150만원",
      img: "",
      link: ""
    },
    {
      name: "🎨 180만원 디자인 작업 세팅",
      price: 1800000,
      priceText: "약 180만원",
      img: "",
      link: ""
    },
    {
      name: "🔥 220만원 고급 크리에이터 세팅",
      price: 2200000,
      priceText: "약 220만원",
      img: "",
      link: ""
    }
  ];

  // 🔥 필터 + 정렬 로직
  const filteredAndSorted = useMemo(() => {
    let filtered = [...builds];

    // 가격 필터
    if (priceFilter === "100-150") {
      filtered = filtered.filter(b => b.price >= 1000000 && b.price < 1500000);
    }
    if (priceFilter === "150-200") {
      filtered = filtered.filter(b => b.price >= 1500000 && b.price < 2000000);
    }
    if (priceFilter === "200+") {
      filtered = filtered.filter(b => b.price >= 2000000);
    }

    // 정렬
    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [sortOrder, priceFilter]);

  return (
    <div className="recommend-page">
      <h1>🎬 영상 · 디자인 추천</h1>
      <p className="recommend-desc">
        GPU 가속 작업 최적화 구성
      </p>

      {/* 🔥 필터 영역 */}
      <div className="filter-bar">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low">낮은 가격순</option>
          <option value="high">높은 가격순</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">전체 가격</option>
          <option value="100-150">100 ~ 150만원</option>
          <option value="150-200">150 ~ 200만원</option>
          <option value="200+">200만원 이상</option>
        </select>
      </div>

      <BuildGrid
        builds={filteredAndSorted.map(b => ({
          ...b,
          price: b.priceText
        }))}
      />
    </div>
  );
}

export default Creator;

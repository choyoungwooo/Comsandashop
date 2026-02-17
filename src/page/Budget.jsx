import "../css/recommend.css";
import BuildGrid from "../component/BuildGrid";
import { useState, useMemo } from "react";

function Budget() {
  const [sortOrder, setSortOrder] = useState("low");
  const [priceFilter, setPriceFilter] = useState("all");

  const builds = [
    {
      name: "🎯 80만원 가성비 세팅",
      price: 800000,
      priceText: "약 80만원",
      img: "",
      link: ""
    },
    {
      name: "💡 60만원 입문용 세팅",
      price: 600000,
      priceText: "약 60만원",
      img: "",
      link: ""
    },
    {
      name: "🔥 100만원 가성비 게이밍",
      price: 1000000,
      priceText: "약 100만원",
      img: "",
      link: ""
    }
  ];

  const filteredAndSorted = useMemo(() => {
    let filtered = [...builds];

    // 🔎 가격 필터
    if (priceFilter === "50-80") {
      filtered = filtered.filter(b => b.price >= 500000 && b.price < 800000);
    }
    if (priceFilter === "80-100") {
      filtered = filtered.filter(b => b.price >= 800000 && b.price < 1000000);
    }
    if (priceFilter === "100+") {
      filtered = filtered.filter(b => b.price >= 1000000);
    }

    // 🔽 정렬
    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [sortOrder, priceFilter]);

  return (
    <div className="recommend-page">
      <h1>💰 가성비 추천</h1>
      <p className="recommend-desc">
        입문자 · 학생용 최적 구성
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
          <option value="50-80">50 ~ 80만원</option>
          <option value="80-100">80 ~ 100만원</option>
          <option value="100+">100만원 이상</option>
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

export default Budget;

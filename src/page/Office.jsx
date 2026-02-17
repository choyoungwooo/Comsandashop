import "../css/recommend.css";
import BuildGrid from "../component/BuildGrid";
import { useState, useMemo } from "react";

function Office() {
  const [sortOrder, setSortOrder] = useState("low");

  const builds = [
    {
      name: "💰 60만원 사무용",
      price: 600000,
      priceText: "약 60만원",
      img: "",
      link: ""
    },
    {
      name: "📈 80만원 업무 멀티세팅",
      price: 800000,
      priceText: "약 80만원",
      img: "",
      link: ""
    }
  ];

  // 🔥 정렬 로직
  const sortedBuilds = useMemo(() => {
    const sorted = [...builds];

    if (sortOrder === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [sortOrder]);

  return (
    <div className="recommend-page">
      <h1>💼 사무 · 업무용 추천</h1>
      <p className="recommend-desc">
        안정성과 가성비 중심 구성
      </p>

      {/* 🔥 정렬 필터 */}
      <div className="filter-bar">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low">낮은 가격순</option>
          <option value="high">높은 가격순</option>
        </select>
      </div>

      <BuildGrid builds={sortedBuilds.map(b => ({
        ...b,
        price: b.priceText
      }))} />
    </div>
  );
}

export default Office;

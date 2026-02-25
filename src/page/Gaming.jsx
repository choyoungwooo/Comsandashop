import { useState, useMemo } from "react";
import BuildGrid from "../component/BuildGrid";
import "../css/gaming.css";

function Gaming() {

  const builds = [
    {
  name: "샵다나와 조립PC 게이밍컴퓨터 사무용 업무용 데스크탑 스팀게임 배그 롤 오버워치",
  price: "679,000원", 
  wowprice : "663,000원",
  priceValue: 66,
  image: "https://thumbnail2.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/739f/c60b481865cbfa0c300fe11865a9523a9340806ce7e66a41e8de1a5ebfa5.jpg",
  link: "https://link.coupang.com/a/dNOQh8"
},

    {
  name: "샵다나와 조립PC 게이밍컴퓨터 사무용 업무용 데스크탑 스팀게임 배그 롤 오버워치",
  price: "679,000원",
  wowprice: "663,000원",
  priceValue: 66,
  image: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/739f/c60b481865cbfa0c300fe11865a9523a9340806ce7e66a41e8de1a5ebfa5.jpg",
  link: "https://link.coupang.com/a/dSYUSw"
},

{
  name: "에스티컴퓨터 2025 게이밍 조립PC 라이젠5 라이젠 7000 시리즈 라데온 RX 9060",
  price: "1,264,000원",
  wowprice: "1,248,000원",
  priceValue: 82,
  image: "https://thumbnail.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2025/12/10/11/5/8a2d38b0-1710-49af-ba34-0f827aedb883.jpg",
  link: "https://link.coupang.com/a/dSYXu6"
},
  ];

  const [sortType, setSortType] = useState("low");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredBuilds = useMemo(() => {
    let filtered = [...builds];

    // 가격 필터
    if (priceFilter === "low100") {
      filtered = filtered.filter(b => b.priceValue <= 100);
    } else if (priceFilter === "100to150") {
      filtered = filtered.filter(b => b.priceValue > 100 && b.priceValue <= 150);
    } else if (priceFilter === "high150") {
      filtered = filtered.filter(b => b.priceValue > 150);
    }

    // 정렬
    if (sortType === "low") {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    }

    return filtered;
  }, [sortType, priceFilter]);

  return (
    <div className="recommend-page">

      <h1>🎮 게이밍 PC 추천</h1>
      <p className="recommend-desc">게임별 예산에 맞는 추천 구성</p>

          <p className="affiliate-notice">
      이 페이지는 쿠팡 파트너스 활동의 일환으로,
      이에 따른 일정액의 수수료를 제공받을 수 있습니다.
    </p>

      {/* 🔥 필터 영역 */}
      <div className="filter-bar">
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="low">낮은 가격순</option>
          <option value="high">높은 가격순</option>
        </select>

        <select onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="all">전체 가격</option>
          <option value="low100">100만원 이하</option>
          <option value="100to150">100 ~ 150만원</option>
          <option value="high150">150만원 이상</option>
        </select>
      </div>

      <BuildGrid builds={filteredBuilds} />
    </div>
  );
}

export default Gaming;

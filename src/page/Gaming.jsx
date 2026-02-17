import { useState, useMemo } from "react";
import "../css/recommend.css";
import BuildGrid from "../component/BuildGrid";

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
  name: "가성비 게이밍 PC RTX3060 배그 롤 피파",
  price: "679,000원",
  wowprice: "663,000원",
  priceValue: 66,
  image: "",
  link: ""
},

{
  name: "FHD 풀옵 게이밍 컴퓨터 RTX4060",
  price: "829,000원",
  wowprice: "799,000원",
  priceValue: 82,
  image: "",
  link: ""
},

{
  name: "RTX4060Ti 고급형 게이밍 PC",
  price: "1,099,000원",
  wowprice: "1,059,000원",
  priceValue: 109,
  image: "",
  link: ""
},

{
  name: "배그 국민옵션 100만원대 세팅",
  price: "999,000원",
  wowprice: "959,000원",
  priceValue: 99,
  image: "",
  link: ""
},

{
  name: "고사양 FPS 전용 게이밍 PC",
  price: "1,299,000원",
  wowprice: "1,249,000원",
  priceValue: 129,
  image: "",
  link: ""
},

{
  name: "RTX4070 QHD 게이밍 세팅",
  price: "1,499,000원",
  wowprice: "1,439,000원",
  priceValue: 149,
  image: "",
  link: ""
},

{
  name: "하이엔드 RTX4070Ti 게이밍",
  price: "1,799,000원",
  wowprice: "1,729,000원",
  priceValue: 179,
  image: "",
  link: ""
},

{
  name: "영상편집 + 게이밍 겸용 32GB RAM",
  price: "1,399,000원",
  wowprice: "1,349,000원",
  priceValue: 139,
  image: "",
  link: ""
},

{
  name: "사무용 + 가벼운 게임 70만원대",
  price: "699,000원",
  wowprice: "",
  priceValue: 69,
  image: "",
  link: ""
},

{
  name: "대학생 가성비 80만원 PC",
  price: "829,000원",
  wowprice: "",
  priceValue: 82,
  image: "",
  link: ""
},

{
  name: "라이젠5 RTX3060 조합",
  price: "879,000원",
  wowprice: "849,000원",
  priceValue: 87,
  image: "",
  link: ""
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

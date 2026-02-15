import { useState } from "react";
import "../css/home.css";

function Builder({ category }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [sort, setSort] = useState("low");

  const categoryOptions = {
    gpu: ["rtx", "gtx"],
    cpu: ["intel", "amd", "ryzen"],
    notebook: ["게이밍", "사무용", "울트라북"],
    monitor: ["24inch", "27inch", "32inch"],
    ram: ["8gb", "16gb", "32gb"],
    ssd: ["sata", "nvme"],
    psu: ["600w", "700w", "800w"],
    case: ["미들타워", "빅타워"],
    cooler: ["공랭", "수랭"]
  };

  const subOptions = categoryOptions[category] || [];

  return (
    <div className="builder-section">

      <h2 className="builder-title">
        {category?.toUpperCase()}
      </h2>

      {/* 🔥 서브탭 */}
      <div className="sub-tab">
        <button
          className={activeTab === "전체" ? "active" : ""}
          onClick={() => setActiveTab("전체")}
        >
          전체
        </button>

        {subOptions.map((option, index) => (
          <button
            key={index}
            className={activeTab === option ? "active" : ""}
            onClick={() => setActiveTab(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔥 정렬 */}
      <div className="sort-box">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="low">낮은 가격순</option>
          <option value="high">높은 가격순</option>
        </select>
      </div>

      {/* 🔥 상품 영역 자리 */}
      <div className="product-area">
        <p>
          선택: {activeTab} / 정렬: {sort}
        </p>
      </div>

    </div>
  );
}

export default Builder;

import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { products } from "../data/Products";


import "../css/home.css";

function Builder() {
  const navigate = useNavigate();


const categories = [
  { label: "그래픽카드", key: "gpu" },
  { label: "메인보드", key: "mainboard" },
  { label: "램", key: "ram" },
  { label: "SSD", key: "ssd" },
  { label: "파워", key: "psu" },
  { label: "케이스", key: "case" },
  { label: "쿨러", key: "cooler"}
];

  const brandOptions = {
  gpu: ["rtx", "gtx", "amd"],
  mainboard: ["intel", "amd"],
  ram: ["samsung", "skhynix", "corsair", "gskill"],
  ssd: ["samsung", "wd", "skhynix", "crucial"],
  psu: ["seasonic", "fsp", "micronics", "corsair"],
  case: ["darkflash","3rays","abko","nzxt",],
  cooler: ["deepcool", "thermalright", "nzxt", "corsair", "coolermaster"],

};

  const [activeBrand, setActiveBrand] = useState("all");
  const [sortOrder, setSortOrder] = useState("low"); // low / high
  const [budget, setBudget] = useState(1000000);
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [sortType, setSortType] = useState("low");
  const [subFilter, setSubFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const multiQuantityTypes = ["ram", "ssd", "cooler"];
  const { searchKeyword } = useOutletContext();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

 const autoBuild = (budget) => {
  const getBest = (type, maxPrice) =>
    products
      .filter(p => p.type === type && p.price <= maxPrice)
      .sort((a, b) => b.price - a.price)[0] || null;

  // 💡 비율 설정
  const gpuBudget = budget * 0.45;
  const cpuBudget = budget * 0.25;
  const ramBudget = budget * 0.1;

  const selectedGPU = getBest("gpu", gpuBudget);
  const selectedCPU = getBest("cpu", cpuBudget);
  const selectedRAM = getBest("ram", ramBudget);
  const selectedSSD = getBest("ssd", budget * 0.1);
  const selectedPSU = getBest("psu", budget * 0.1);
  const selectedCase = getBest("case", budget * 0.1);

  const autoSelected = {
    gpu: selectedGPU && { product: selectedGPU, quantity: 1 },
    mainboard: selectedCPU && { product: selectedCPU, quantity: 1 },
    ram: selectedRAM && { product: selectedRAM, quantity: 2 },
    ssd: selectedSSD && { product: selectedSSD, quantity: 1 },
    psu: selectedPSU && { product: selectedPSU, quantity: 1 },
    case: selectedCase && { product: selectedCase, quantity: 1 },
  };

  // null 제거
  Object.keys(autoSelected).forEach(key => {
    if (!autoSelected[key]) delete autoSelected[key];
  });

  setSelectedItems(autoSelected);
  setIsOpen(true);
};


  const toggleSort = () => {
  setSortType((prev) => (prev === "low" ? "high" : "low"));
};

  const normalize = (text) =>
  text.toLowerCase().replace(/\s+/g, "");
  

  const flexibleMatch = (name, keyword) => {
  const nName = normalize(name);
  const nKeyword = normalize(keyword);

  // 1️⃣ 완전 포함
  if (nName.includes(nKeyword)) return true;

  // 2️⃣ 순서 포함 (t → x 처럼 떨어져 있어도 허용)
  let i = 0;
  for (let char of nName) {
    if (char === nKeyword[i]) {
      i++;
    }
    if (i === nKeyword.length) return true;
  }

  return false;
};



  // 🔥 객체 구조로 변경
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("pc-builder");
    return saved ? JSON.parse(saved) : {};
  });

  // 🔥 선택 (카테고리별 1개만)
  const handleSelect = (product) => {
  setSelectedItems((prev) => {
    const existing = prev[product.type];

    // 🔥 수량 허용 카테고리
    if (multiQuantityTypes.includes(product.type)) {
      if (existing) {
        return {
          ...prev,
          [product.type]: {
            ...existing,
            quantity: existing.quantity + 1,
          },
        };
      }

      return {
        ...prev,
        [product.type]: {
          product,
          quantity: 1,
        },
      };
    }

    // 🔥 1개만 허용 카테고리
    return {
      ...prev,
      [product.type]: {
        product,
        quantity: 1,
      },
    };
  });
};
const handleIncrease = (type) => {
  setSelectedItems((prev) => ({
    ...prev,
    [type]: {
      ...prev[type],
      quantity: prev[type].quantity + 1,
    },
  }));
};

const handleDecrease = (type) => {
  setSelectedItems((prev) => {
    const current = prev[type];

    if (!current) return prev;

    // 🔒 1 이하로 안 내려가게
    if (current.quantity <= 1) {
      return prev;
    }

    return {
      ...prev,
      [type]: {
        ...current,
        quantity: current.quantity - 1,
      },
    };
  });
};




  const handleRemove = (type) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const filteredProducts = useMemo(() => {
  let filtered = products;
    if (searchKeyword.trim() !== "") {
  filtered = filtered.filter((p) =>
    flexibleMatch(p.name, searchKeyword)
  );
}

  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.type === activeCategory);
  }

  if (subFilter !== "all") {
    filtered = filtered.filter((p) => p.brand === subFilter);
  }

  // 🔥 검색 추가

  if (sortType === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return filtered;
}, [activeCategory, subFilter, sortType, searchKeyword]);


  const paginatedProducts = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  return filteredProducts.slice(start, start + itemsPerPage);
}, [filteredProducts, currentPage]);


  const totalPrice = useMemo(() => {
  return Object.values(selectedItems).reduce((sum, item) => {
    if (!item.product) return sum; // 예전 데이터 방어

    return sum + item.product.price * item.quantity;
  }, 0);
}, [selectedItems]);



  const handleViewResult = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("제품을 선택해주세요.");
      return;
    }

    navigate("/result", {
      state: { items: selectedItems, total: totalPrice },
    });
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setSubFilter("all");
  };

  useEffect(() => {
    localStorage.setItem("pc-builder", JSON.stringify(selectedItems));
  }, [selectedItems]);

  
  return (
  <div className="builder-page">

    <div className="main-container">

      {/* =======================
          📦 왼쪽 메인 영역
      ======================== */}
      <div className="main-content">

        {/* 카테고리 */}
        <div className="category-nav">
          <div className="category-nav-inner">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={activeCategory === cat.key ? "active" : ""}
                onClick={() => handleCategoryChange(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 자동 설계 */}
        <div className="auto-build-box">
          <h3>🎮 게이밍 자동 설계</h3>

          <div className="auto-inner">
            <select
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-select"
            >
              <option value={1000000}>100만원 이하</option>
              <option value={2000000}>200만원 이하</option>
              <option value={3000000}>300만원 이하</option>
              <option value={4000000}>400만원 이하</option>
              <option value={5000000}>500만원 이하</option>
            </select>

            <button onClick={() => autoBuild(budget)}>
              ⚡ 자동완성
            </button>
          </div>
        </div>

        {/* 필터 영역 */}
        {activeCategory !== "all" && brandOptions[activeCategory] && (
          <div className="filter-row">

            <div className="brand-filter">
              <button onClick={() => setSubFilter("all")}>
                전체
              </button>

              {brandOptions[activeCategory].map((brand) => (
                <button
                  key={brand}
                  className={subFilter === brand ? "active" : ""}
                  onClick={() => setSubFilter(brand)}
                >
                  {brand.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="sort-toggle" onClick={toggleSort}>
              {sortType === "low"
                ? "⬇ 낮은 가격순"
                : "⬆ 높은 가격순"}
            </button>

          </div>
        )}

        {/* 상품 */}
        <div className="product-container">

          <div className="product-area">
            {paginatedProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>검색 결과가 없습니다</h3>
                <p>
                  <span>"{searchKeyword}"</span> 와 일치하는 상품이 없어요.
                </p>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>{product.price.toLocaleString()}원</p>
                  <button onClick={() => handleSelect(product)}>
                    선택하기
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

        </div>

      </div>

    </div>

    {/* =======================
        🧾 견적창 (완전 별도)
    ======================== */}
    <div className="estimate-wrapper">
      <div className={`estimate-box ${isOpen ? "open" : ""}`}>

        <div
          className="estimate-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="estimate-left">
            내 견적 상세
          </div>

          <span className="estimate-total">
            {totalPrice.toLocaleString()}원
          </span>
        </div>

        <div className="estimate-content">

          {Object.entries(selectedItems).length === 0 ? (
  <div className="empty-estimate">
    선택된 제품이 없습니다.
  </div>
) : (
  Object.entries(selectedItems).map(([type, item]) => (
    <div key={type} className="estimate-slot">

      <div className="slot-left">
        <span className="slot-label">
          {categories.find(c => c.key === type)?.label}
        </span>
      </div>

      <div className="slot-right">

        <span className="slot-name">
          {item.product.name}
        </span>

        {multiQuantityTypes.includes(type) && (
          <div className="quantity-box">
            <button onClick={() => handleDecrease(type)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrease(type)}>+</button>
          </div>
        )}

        <span className="slot-price">
          {(item.product.price * item.quantity).toLocaleString()}원
        </span>

        <button
          className="remove-btn"
          onClick={() => handleRemove(type)}
        >
          ✕
        </button>

      </div>
    </div>
  ))
)}

          {Object.entries(selectedItems).length > 0 && (
            <>
              <div className="total-price">
                총 금액: {totalPrice.toLocaleString()}원
              </div>

              <button
                className="estimate-btn"
                onClick={handleViewResult}
              >
                🛒 구매처 한번에 보기
              </button>
            </>
          )}

        </div>
      </div>
    </div>

  </div>
);
}

            


export default Builder;

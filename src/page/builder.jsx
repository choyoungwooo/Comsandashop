import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { products } from "../data/Products";


import "../css/home.css";

function Builder() {
  const navigate = useNavigate();


  const categories = [
    { label: "전체", key: "all" },
    { label: "그래픽카드", key: "gpu" },
    { label: "메인보드", key: "mainboard" },
    { label: "노트북", key: "notebook" },
    { label: "모니터", key: "monitor" },
    { label: "램카드", key: "ram" },
    { label: "SSD", key: "ssd" },
    { label: "파워", key: "psu" },
    { label: "케이스", key: "case" },
    { label: "쿨러", key: "cooler" },
    { label: "마우스", key: "mouse" },
    { label: "키보드", key: "keyboard" },
    { label: "헤드셋", key: "headset" },
    { label: "마이크", key: "mic" },
    { label: "웹캠", key: "webcam" },
    { label: "스피커", key: "speaker" },
  ];

  const brandOptions = {
  gpu: ["rtx", "gtx", "amd"],
  mainboard: ["intel", "amd"],
  cpu: ["intel", "amd"],
  mouse: ["logitech", "razer"],
  keyboard: ["logitech", "abko"],
  headset: ["corsair"],
  mic: ["blue"],
  webcam: ["logitech"],
  speaker: ["britz"],
};


  const [activeCategory, setActiveCategory] = useState("all");
  const [sortType, setSortType] = useState("low");
  const [subFilter, setSubFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const multiQuantityTypes = ["ram", "ssd", "cooler"];
  const { searchKeyword } = useOutletContext();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

     <div className="category-nav">
  <div className="category-nav-inner">
    {categories.map((cat) => (
      <button
        key={cat.key}
        className={
          activeCategory !== "all" && activeCategory === cat.key
            ? "active"
            : ""
        }
        onClick={() => handleCategoryChange(cat.key)}
      >
        {cat.label}
      </button>
    ))}
  </div>
</div>
{activeCategory !== "all" && brandOptions[activeCategory] && (
  <div className="filter-row">

    <div className="filter-row">

  <div className="brand-filter">
    <button
      
      onClick={() => setSubFilter("all")}
    >
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
    {sortType === "low" ? "⬇ 낮은 가격순" : "⬆ 높은 가격순"}
  </button>
</div>
  </div>
)}
      <div className="builder-layout">
        {/*왼쪽 */}
        <div className="product-wrapper">
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

  <div className="estimate-wrapper">
  <div className={`estimate-box ${isOpen ? "open" : ""}`}>

    {/* 📱 토글 헤더 (총금액만 표시) */}
    <div
      className="estimate-toggle"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="arrow">
        {isOpen ? "▼" : "▲"}
      </span>

      <span className="estimate-total">
        {totalPrice.toLocaleString()}원
      </span>
    </div>

    {/* 📱 선택된 것만 표시 */}
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
    </div>
  );
}
export default Builder;

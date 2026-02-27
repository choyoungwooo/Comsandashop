import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { products } from "../data/Products";


import "../css/home.css";

function Builder() {
  const navigate = useNavigate();


const categories = [
  { label: "그래픽카드", key: "gpu" },
  { label: "CPU", key: "cpu" },
  { label: "메인보드", key: "mainboard" },
  { label: "램", key: "ram" },
  { label: "SSD", key: "ssd" },
  { label: "파워", key: "psu" },
  { label: "케이스", key: "case" },
  { label: "쿨러", key: "cooler"}
];


 const brandOptions = {
  gpu: [
    { value: "nvidia", label: "NVIDIA" },
    { value: "amd", label: "AMD Radeon" }
  ],
  cpu: [
    { value: "intel", label: "Intel" },
    { value: "amd", label: "AMD" }
  ],
  mainboard: [
    { value: "asus", label: "ASUS" },
    { value: "msi", label: "MSI" },
    { value: "gigabyte", label: "Gigabyte" },
    { value: "asrock", label: "ASRock" }
  ],
  ram: [
    { value: "samsung", label: "Samsung" },
    { value: "skhynix", label: "SK Hynix" },
    { value: "corsair", label: "Corsair" },
    { value: "gskill", label: "G.SKILL" }
  ],
  ssd: [
    { value: "samsung", label: "Samsung" },
    { value: "wd", label: "Western Digital" },
    { value: "skhynix", label: "SK Hynix" },
    { value: "crucial", label: "Crucial" }
  ],
  psu: [
    { value: "seasonic", label: "Seasonic" },
    { value: "fsp", label: "FSP" },
    { value: "micronics", label: "Micronics" },
    { value: "corsair", label: "Corsair" }
  ],
  case: [
    { value: "darkflash", label: "DarkFlash" },
    { value: "3rsys", label: "3RSYS" },
    { value: "abko", label: "ABKO" },
    { value: "nzxt", label: "NZXT" }
  ],
  cooler: [
    { value: "deepcool", label: "DeepCool" },
    { value: "thermalright", label: "Thermalright" },
    { value: "nzxt", label: "NZXT" },
    { value: "corsair", label: "Corsair" },
    { value: "coolermaster", label: "Cooler Master" }
  ]
};

  const [activeBrand, setActiveBrand] = useState("all");
  const [sortOrder, setSortOrder] = useState("low"); // low / high
  const [selectedGame, setSelectedGame] = useState("lol");
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [sortType, setSortType] = useState("low");
  const [subFilter, setSubFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const multiQuantityTypes = ["ram", "ssd", "cooler"];
  const { searchKeyword } = useOutletContext();
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const games = [
  { label: "롤", key: "lol" },
  { label: "발로란트", key: "valorant" },
  { label: "피파", key: "fifa" },
  { label: "오버워치", key: "overwatch" },
  { label: "배틀그라운드", key: "pubg" },
  { label: "로스트아크", key: "loa" },
  { label: "GTA/스팀 고사양", key: "highend" },
  { label: "저사양 RPG", key: "light" }
];

 const gameBudgetMap = {
  lol: 800000,
  valorant: 900000,
  fifa: 800000,
  overwatch: 1000000,
  pubg: 1300000,
  loa: 1200000,
  highend: 1800000,
  light: 700000,
};


const gameTierMap = {
  lol: "low",
  valorant: "low",
  fifa: "low",
  overwatch: "mid",
  pubg: "high",
  loa: "high",
  highend: "ultra",
  light: "low",
};

const tierBudgetMap = {
  low: 800000,
  mid: 1000000,
  high: 1300000,
  ultra: 1800000,
};
const autoBuild = (game) => {

  const tier = gameTierMap[game] || "mid";
  const budget = tierBudgetMap[tier];

  const getBest = (type, maxPrice) => {
    return products
      .filter(p => p.type === type && p.price <= maxPrice)
      .sort((a, b) => b.price - a.price)[0] || null;
  };

  // 예산 분배
  const selectedCPU = getBest("cpu", budget * 0.25);
  let selectedMainboard = null;

if (selectedCPU) {
  selectedMainboard = products
    .filter(p =>
      p.type === "mainboard" &&
      p.socket === selectedCPU.socket &&
      p.price <= budget * 0.2
    )
    .sort((a, b) => b.price - a.price)[0] || null;
}

  const selectedGPU = getBest("gpu", budget * 0.45);
  const selectedRAM = getBest("ram", budget * 0.1);
  const selectedSSD = getBest("ssd", budget * 0.1);
  const selectedPSU = getBest("psu", budget * 0.1);
  const selectedCase = getBest("case", budget * 0.08);
  const selectedCooler = getBest("cooler", budget * 0.07);

  const autoSelected = {
    cpu: selectedCPU && { product: selectedCPU, quantity: 1 },
    mainboard: selectedMainboard && { product: selectedMainboard, quantity: 1 },
    gpu: selectedGPU && { product: selectedGPU, quantity: 1 },
    ram: selectedRAM && { product: selectedRAM, quantity: 2 },
    ssd: selectedSSD && { product: selectedSSD, quantity: 1 },
    psu: selectedPSU && { product: selectedPSU, quantity: 1 },
    case: selectedCase && { product: selectedCase, quantity: 1 },
    cooler: selectedCooler && { product: selectedCooler, quantity: 1 },
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

  const keyword = searchKeyword?.trim() || "";

  if (keyword !== "") {
    filtered = filtered.filter((p) =>
      flexibleMatch(p.name, keyword)
    );
  }

  // ✅ 선택 안 된 카테고리 목록
const emptyCategories = useMemo(() => {
  return categories
    .filter(cat => !selectedItems[cat.key])   // 선택 안된 것
    .map(cat => cat.label);
}, [selectedItems, categories]);

  if (activeCategory !== "all") {
    filtered = filtered.filter((p) => p.type === activeCategory);
  }

  if (subFilter !== "all") {
    filtered = filtered.filter((p) => p.brand === subFilter);
  }

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
const compatibilityWarning = useMemo(() => {
  const cpu = selectedItems.cpu?.product;
  const mainboard = selectedItems.mainboard?.product;

  if (!cpu || !mainboard) return null;

  if (cpu.socket !== mainboard.socket) {
    return `⚠ CPU(${cpu.socket})와 메인보드(${mainboard.socket}) 소켓이 맞지 않습니다.`;
  }

  return null;
}, [selectedItems]);




const handleViewResult = () => {
  if (Object.keys(selectedItems).length === 0) {
    alert("제품을 선택해주세요.");
    return;
  }

  // ✅ 비어있는 카테고리 안내
  if (emptyCategories.length > 0) {
    const confirmMove = window.confirm(
      `아직 선택되지 않은 항목이 있습니다:\n- ${emptyCategories.join("\n- ")}\n\n그래도 구매처 보기를 진행하시겠습니까?`
    );
    if (!confirmMove) return;
  }

  // ✅ 호환성 경고가 있을 경우 (기존 로직 유지)
  if (compatibilityWarning) {
    const confirmMove = window.confirm(
      compatibilityWarning + "\n\n그래도 진행하시겠습니까?"
    );
    if (!confirmMove) return;
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

  useEffect(() => {
  setCurrentPage(1);
}, [searchKeyword, activeCategory, subFilter]);
const handleSearch = () => {
  if (!searchInput.trim()) {
    localStorage.removeItem("pc-builder");
    setSelectedItems({});
  }

  setSearchKeyword(searchInput);
};


useEffect(() => {
  console.log("검색어 변경됨:", searchKeyword);
}, [searchKeyword]);

useEffect(() => {
  const keyword = searchKeyword?.trim();

  if (!keyword) {
    // 🔥 검색어 없으면 초기화
    setActiveCategory("gpu");   // 기본 카테고리
    setSubFilter("all");
    setCurrentPage(1);
  } else {
    // 🔥 검색어 있으면 전체에서 검색
    setActiveCategory("all");
    setSubFilter("all");
    setCurrentPage(1);
  }
}, [searchKeyword]);



  
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
  value={selectedGame}
  onChange={(e) => setSelectedGame(e.target.value)}
  className="game-select"
>
  {games.map(game => (
    <option key={game.key} value={game.key}>
      {game.label}
    </option>
  ))}
</select>

            <button onClick={() => autoBuild(selectedGame)}>
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

              {brandOptions[activeCategory].map((option) => (
  <button
    key={option.value}
    className={subFilter === option.value ? "active" : ""}
    onClick={() => setSubFilter(option.value)}
  >
    {option.label}
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
            {(searchKeyword?.trim() || "") !== "" && filteredProducts.length === 0 ? (


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
        </div>{compatibilityWarning && (
  <div className="compatibility-warning">
    {compatibilityWarning}
  </div>
)}


        <div className="estimate-content">
          {categories.map((cat) => {
  const item = selectedItems[cat.key];

  // ✅ 비어있는 슬롯
  if (!item) {
    return (
      <div key={cat.key} className="estimate-slot empty">
        <div className="slot-left">
          <span className="slot-label">{cat.label}</span>
        </div>

        <div className="slot-right">
          <span className="slot-empty">비어있음</span>

          <button
            className="go-select-btn"
            onClick={() => handleCategoryChange(cat.key)}
          >
            선택하러가기
          </button>
        </div>
      </div>
    );
  }

  // ✅ 선택된 슬롯 (기존 그대로)
  return (
    <div key={cat.key} className="estimate-slot">
      <div className="slot-left">
        <span className="slot-label">{cat.label}</span>
      </div>

      <div className="slot-right">
        <div className="slot-info">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="slot-image"
          />
          <span className="slot-name">{item.product.name}</span>
        </div>

        {multiQuantityTypes.includes(cat.key) && (
          <div className="quantity-box">
            <button onClick={() => handleDecrease(cat.key)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrease(cat.key)}>+</button>
          </div>
        )}

        <span className="slot-price">
          {(item.product.price * item.quantity).toLocaleString()}원
        </span>

        <button className="remove-btn" onClick={() => handleRemove(cat.key)}>
          ✕
        </button>
      </div>
    </div>
  );
})}

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

        <div className="slot-info">
  <img 
    src={item.product.image} 
    alt={item.product.name} 
    className="slot-image"
  />
  <span className="slot-name">
    {item.product.name}
  </span>
</div>

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

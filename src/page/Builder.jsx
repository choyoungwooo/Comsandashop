import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { products } from "../data/Products";
import ConfirmModal from "../component/ConfirmModal";


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
  const outlet = useOutletContext?.() || {};
const searchKeyword = outlet.searchKeyword || ""; // 안전하게
  const [sortOrder, setSortOrder] = useState("low"); // low / high
  const [selectedGame, setSelectedGame] = useState("lol");
  const [activeCategory, setActiveCategory] = useState("gpu");
  const [sortType, setSortType] = useState("low");
  const [subFilter, setSubFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const multiQuantityTypes = ["ram", "ssd", "cooler"];
  const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmMessage, setConfirmMessage] = useState("");
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
  lol: 1200000,
  valorant: 1500000,
  fifa: 1200000,
  overwatch: 1500000,
  pubg: 2000000,
  loa: 2000000,
  highend: 3000000,
  light: 1000000,
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
  low: 1200000,
  mid: 2000000,
  high: 3000000,
  ultra: 10000000000,
};
const autoBuild = (game) => {
  const tier = gameTierMap[game] || "mid";
  const budget = tierBudgetMap[tier];

  // ✅ 최소 보장 옵션들 (너 데이터에 맞게 가격 범위만 조절하면 됨)
  const pickBestInRange = (type, minPrice, maxPrice) => {
    return products
      .filter(p => p.type === type && p.price >= minPrice && p.price <= maxPrice)
      .sort((a, b) => b.price - a.price)[0] || null;
  };

  const pickBestUnder = (type, maxPrice) => {
    return products
      .filter(p => p.type === type && p.price <= maxPrice)
      .sort((a, b) => b.price - a.price)[0] || null;
  };

  // ✅ 1) RAM 최소 보장: 16GB를 "무조건"
  // - 네 데이터가 16GB 단품이면 quantity=1
  // - 8GB 단품이면 quantity=2로 16GB 만들기
  // 여기선 "8GB 제품을 2개" 가정 (필요하면 16GB 제품 1개로 바꿔)
  const ramMin = pickBestInRange("ram", 180000); // 8GB/16GB 저가대 대충 범위
  const ramQuantity = 1; // ✅ 2개로 16GB 가정

  // RAM이 없으면(데이터 없으면) 그냥 null 처리
  const ramCost = ramMin ? ramMin.price * ramQuantity : 0;

  // ✅ 2) 남은 예산
  const remain = Math.max(budget - ramCost, 0);

  // ✅ 3) 남은 예산으로 CPU/GPU 등 배분 (RAM이 먼저 먹었으니 비율 조금 조절)
  const selectedCPU = pickBestUnder("cpu", remain * 0.25);

  let selectedMainboard = null;
  if (selectedCPU) {
    selectedMainboard = products
      .filter(p =>
        p.type === "mainboard" &&
        p.socket === selectedCPU.socket &&
        p.price <= remain * 0.20
      )
      .sort((a, b) => b.price - a.price)[0] || null;
  }

  const selectedGPU = pickBestUnder("gpu", remain * 0.45);
  const selectedPSU = pickBestUnder("psu", remain * 0.10);
  const selectedCase = pickBestUnder("case", remain * 0.08);
  const selectedCooler = pickBestUnder("cooler", remain * 0.07);

  const autoSelected = {
    cpu: selectedCPU && { product: selectedCPU, quantity: 1 },
    mainboard: selectedMainboard && { product: selectedMainboard, quantity: 1 },
    gpu: selectedGPU && { product: selectedGPU, quantity: 1 },

    // ✅ RAM은 무조건 들어가게 (ramMin이 있으면)
    ram: ramMin && { product: ramMin, quantity: ramQuantity },

    psu: selectedPSU && { product: selectedPSU, quantity: 1 },
    case: selectedCase && { product: selectedCase, quantity: 1 },
    cooler: selectedCooler && { product: selectedCooler, quantity: 1 },
  };

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
  setSelectedItems((prev) => {
    const current = prev[type];
    if (!current) return prev;

    // 🔥 RAM은 최대 2개
    if (type === "ram" && current.quantity >= 2) {
      return prev;
    }
    if (type === "ssd" && current.quantity >= 2) {
  return prev;
}

    return {
      ...prev,
      [type]: {
        ...current,
        quantity: current.quantity + 1,
      },
    };
  });
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

const requiredKeys = ["gpu", "cpu", "mainboard", "ram", "psu", "case", "cooler"];
const emptyCategories = useMemo(() => {
  return categories
    .filter(cat => 
      cat.key !== "ssd" &&   // 🔥 SSD 제외
      !selectedItems[cat.key]
    )
    .map(cat => cat.label);
}, [selectedItems]); // categories는 컴포넌트 내부 상수라 보통 생략 가능



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


const compatibilityWarnings = useMemo(() => {
  const cpu = selectedItems.cpu?.product;
  const mainboard = selectedItems.mainboard?.product;
  const ram = selectedItems.ram?.product;
  const gpu = selectedItems.gpu?.product;
  const psu = selectedItems.psu?.product;
  const caseItem = selectedItems.case?.product;
  const cooler = selectedItems.cooler?.product;

  const warnings = [];

  // 1️⃣ CPU ↔ 메인보드
  if (cpu && mainboard && cpu.socket !== mainboard.socket) {
    warnings.push("CPU와 메인보드 소켓이 맞지 않습니다.");
  }

  // 2️⃣ RAM ↔ 메인보드
  if (ram && mainboard && ram.memoryType !== mainboard.memoryType) {
    warnings.push("RAM 타입과 메인보드 메모리 타입이 맞지 않습니다.");
  }

  // 3️⃣ CPU ↔ 쿨러
  if (cpu && cooler && cpu.tdp > cooler.maxTdp) {
    warnings.push("CPU 발열을 쿨러가 감당하지 못합니다.");
  }

  // 4️⃣ 쿨러 ↔ 케이스
  if (cooler && caseItem && cooler.height > caseItem.maxCoolerHeight) {
    warnings.push("쿨러 높이가 케이스에 맞지 않습니다.");
  }

  // 5️⃣ GPU ↔ 케이스
  if (gpu && caseItem && gpu.length && gpu.length > caseItem.maxGpuLength) {
    warnings.push("그래픽카드 길이가 케이스에 맞지 않습니다.");
  }

  // 6️⃣ 파워 체크
  const totalWatt = (cpu?.tdp || 0) + (gpu?.tdp || 0);
  if (psu && totalWatt > psu.watt * 0.7) {
    warnings.push("파워 용량이 부족할 수 있습니다.");
  }

  return warnings;
}, [selectedItems]);




const handleViewResult = () => {
  if (compatibilityWarnings.length > 0) {
  const message =
    "⚠ 호환 문제 발견:\n\n" +
    compatibilityWarnings.map(w => "- " + w).join("\n") +
    "\n\n그래도 진행하시겠습니까?";

  const confirmMove = window.confirm(message);
  if (!confirmMove) return;
}

  // ✅ 비어있는 카테고리 안내
    if (emptyCategories.length > 0) {
    setConfirmMessage(
      `아직 선택되지 않은 항목이 있습니다:\n- ${emptyCategories.join("\n- ")}\n\n그래도 구매처 보기를 진행하시겠습니까?`
    );
    setConfirmOpen(true);
    return;
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
          
        </div>{compatibilityWarnings.length > 0 && (
  <div className="compatibility-warning">
    {compatibilityWarnings.map((msg, idx) => (
      <div key={idx}>⚠ {msg}</div>
    ))}
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
<ConfirmModal
  open={confirmOpen}
  title="안내"
  message={confirmMessage}
  onCancel={() => setConfirmOpen(false)}
  onConfirm={() => {
    setConfirmOpen(false);
    navigate("/result", { state: { items: selectedItems, total: totalPrice } });
  }}
/>
  </div>
  
);
}

            


export default Builder;

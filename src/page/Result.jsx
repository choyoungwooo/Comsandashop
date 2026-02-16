import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useRef } from "react";
import html2canvas from "html2canvas";
import "../css/result.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const captureRef = useRef();

 const storedRaw = localStorage.getItem("pc-builder");

let storedItems = [];

try {
  const parsed = JSON.parse(storedRaw);
  if (Array.isArray(parsed)) {
    storedItems = parsed;
  }
} catch (e) {
  storedItems = [];
}

// 🔥 location.state 우선, 아니면 localStorage, 아니면 []
const locationItems = location.state?.items;

let baseItems = [];

if (Array.isArray(locationItems)) {
  baseItems = locationItems;
} else if (locationItems && typeof locationItems === "object") {
  baseItems = Object.values(locationItems);
} else if (Array.isArray(storedItems)) {
  baseItems = storedItems;
} else if (storedItems && typeof storedItems === "object") {
  baseItems = Object.values(storedItems);
}
const initItems = baseItems.map((it) => ({
  id: it.product.id,
  name: it.product.name,
  price: it.product.price,
  type: it.product.type,
  qty: it.quantity ?? 1,
}));

const handleSaveImage = async () => {
  const canvas = await html2canvas(captureRef.current);
  const link = document.createElement("a");
  link.download = `computersanda-computer-${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
};


  const [items, setItems] = useState(initItems);

  const total = useMemo(
    () => items.reduce((sum, p) => sum + p.price * (p.qty ?? 1), 0),
    [items]
  );

  const changeQty = (type, delta) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.type !== type) return p;
        return { ...p, qty: Math.max(1, (p.qty ?? 1) + delta) };
      })
    );
  };

  if (!items.length)
  return (
    <div style={{ padding: 100 }}>
      <p>선택된 제품이 없습니다.</p>
      <button onClick={() => navigate("/builder")}>
        다시 선택하러 가기
      </button>
    </div>
  );


  return (
    <div className="result-wrapper">
      <div className="result-title-area">
  <span className="result-badge">BUILD COMPLETE</span>
  <h1 className="result-title">
    내가 만든 <span>나만의 PC</span>
  </h1>
  <p className="result-sub">
    세상에 단 하나뿐인 나의 커스텀 조합
  </p>
</div>


      <div className="result-content">
        {/* 좌측 SUMMARY */}
        <div className="summary-box" ref={captureRef}>
          <div className="summary-top">
            <h3>선택한 제품</h3>
              <div className="summary-price">
    TOTAL PRICE
    <span>{total.toLocaleString()}원</span>
  </div>
          </div>
          {items.map((item) => (
  <div key={item.type} className="summary-item">
    <div className="summary-left">
      <p className="item-name">{item.name}</p>
      <span className="item-type">{item.type.toUpperCase()}</span>
    </div>

    <div className="summary-price">
      {item.price.toLocaleString()}원
    </div>
  </div>
))}

<div className="summary-footer">
  <div className="footer-left">
    comsanda.co.kr
  </div>

  <div className="footer-right">
    <p>컴퓨터는 역시 컴산다존</p>
  </div>
</div>

        </div>

        {/* 우측 구매 링크 */}
        <div className="buy-box">
          <h3>제품 구매 링크</h3>

          {items.map((item) => (
  <div key={item.type} className="summary-item">
    <div className="summary-left">
      <p className="item-name">{item.name}</p>
      <span className="item-type">{item.type.toUpperCase()}</span>

      {/* 🔥 모바일 전용 구매 버튼 */}
      <div className="mobile-buy-buttons">
        <button className="mobile-buy-ali">
          알리
        </button>
        <button className="mobile-buy-coupang">
          쿠팡
        </button>
      </div>
    </div>

    <div className="summary-price">
      {item.price.toLocaleString()}원
    </div>
  </div>
))}
    
        </div>
   
      </div>
                 <div className="result-bottom">
  <button className="save-btn" onClick={handleSaveImage}>
    📸 견적서 이미지 저장
  </button>

  <button className="edit-btn" onClick={() => navigate("/builder")}>
    ✏️ 구성 다시 만들기
  </button>
</div>

    </div>
  );
}

export default Result;

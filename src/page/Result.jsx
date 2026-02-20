import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useRef } from "react";
import html2canvas from "html2canvas";
import "../css/result.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const captureRef = useRef();

  /* =========================
     1. 데이터 초기화 로직 정리
  ========================== */

  const getInitialItems = () => {
    const locationItems = location.state?.items;

    const storedRaw = localStorage.getItem("pc-builder");

    let storedItems = [];
    try {
      const parsed = JSON.parse(storedRaw);
      if (Array.isArray(parsed)) storedItems = parsed;
    } catch (e) {}

    let baseItems = [];

    if (Array.isArray(locationItems)) {
      baseItems = locationItems;
    } else if (locationItems && typeof locationItems === "object") {
      baseItems = Object.values(locationItems);
    } else if (Array.isArray(storedItems)) {
      baseItems = storedItems;
    }

    return baseItems.map((it) => ({
      id: it.product.id,
      name: it.product.name,
      price: it.product.price,
      type: it.product.type,
      qty: it.quantity ?? 1,
    }));
  };

  const [items, setItems] = useState(getInitialItems());

  /* =========================
     2. 총 가격 계산
  ========================== */

  const total = useMemo(
    () => items.reduce((sum, p) => sum + p.price * p.qty, 0),
    [items]
  );

  /* =========================
     3. 이미지 저장
  ========================== */

  const handleSaveImage = async () => {
    const canvas = await html2canvas(captureRef.current);
    const link = document.createElement("a");
    link.download = `comsanda-build-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  /* =========================
     4. 외부 링크 생성 함수
  ========================== */

  const getAliLink = (name) =>
    `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(name)}`;

  const getCoupangLink = (name) =>
    `https://www.coupang.com/np/search?q=${encodeURIComponent(name)}`;

  /* =========================
     5. 상품 UI 컴포넌트
  ========================== */

  const ItemRow = ({ item, showButtons = false }) => (
    <div className="summary-item">
      <div className="summary-left">
        <p className="item-name">{item.name}</p>
        <span className="item-type">{item.type.toUpperCase()}</span>

        {showButtons && (
          <div className="buy-buttons">
            <a
              href={getAliLink(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="ali-btn"
            >
              알리
            </a>

            <a
              href={getCoupangLink(item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="coupang-btn"
            >
              쿠팡
            </a>
          </div>
        )}
      </div>

      <div className="summary-price">
        {item.price.toLocaleString()}원
      </div>
    </div>
  );

  if (!items.length) {
    return (
      <div style={{ padding: 100 }}>
        <p>선택된 제품이 없습니다.</p>
        <button onClick={() => navigate("/builder")}>
          다시 선택하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="result-wrapper">
      {/* 상단 */}
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
              <p className="price-label">TOTAL PRICE</p>
              <span>{total.toLocaleString()} 원</span>
            </div>
          </div>

          {items.map((item) => (
            <ItemRow key={item.id} item={item} showButtons={true} />
          ))}

          <div className="summary-footer">
            <div className="footer-left">comsanda.co.kr</div>
            <div className="footer-right">
              <p>컴퓨터는 역시 컴산다존</p>
            </div>
          </div>
        </div>

        {/* 우측 구매 링크 */}
        <div className="buy-box">
          <h3>제품 구매 링크</h3>
          {items.map((item) => (
            <ItemRow key={`buy-${item.id}`} item={item} showButtons={true} />
          ))}
        </div>

      </div>

      {/* 하단 버튼 */}
      <div className="result-bottom">
        <button className="save-btn" onClick={handleSaveImage}>
          📸 견적서 이미지 저장
        </button>

        <button
          className="edit-btn"
          onClick={() => navigate("/builder")}
        >
          ✏️ 구성 다시 만들기
        </button>
      </div>
    </div>
  );
}

export default Result;

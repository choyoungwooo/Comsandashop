import { products } from "../data/Products";
import "../css/recommend.css";

function Device() {
  const deviceProducts = products.filter(
    p => p.category === "device"
  );

  return (
    <div className="recommend-page">
      <h1>🎧 주변기기 모음</h1>

      <div className="recommend-grid">
        {deviceProducts.map(item => (
          <div key={item.id} className="recommend-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              구매하기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Device;

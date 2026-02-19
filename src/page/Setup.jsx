import { products } from "../data/Products";
import "../css/recommend.css";

function Setup() {
  const setupProducts = products.filter(
    p => p.category === "setup"
  );

  return (
    <div className="recommend-page">
      <h1>🪑 게이밍 환경 세팅</h1>

      <div className="recommend-grid">
        {setupProducts.map(item => (
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

export default Setup;

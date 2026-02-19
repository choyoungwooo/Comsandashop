import { products } from "../data/Products";
import "../css/recommend.css";

function Console() {
  const consoleProducts = products.filter(
    p => p.category === "console"
  );

  return (
    <div className="recommend-page">
      <h1>🎮 콘솔 · 게임 용품</h1>

      <div className="recommend-grid">
        {consoleProducts.map(item => (
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

export default Console;
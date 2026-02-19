import { products } from "../data/Products";
import "../css/recommend.css";

function NoteBook() {
  const notebookProducts = products.filter(
    p => p.category === "notebook"
  );

  return (
    <div className="recommend-page">
      <h1>💻 노트북 추천</h1>

      <div className="recommend-grid">
        {notebookProducts.map(item => (
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

export default NoteBook;

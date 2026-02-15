const categories = [
  { name: "게이밍 노트북" },
  { name: "가성비 노트북" },
  { name: "RTX 그래픽카드" },
  { name: "CPU 추천" },
  { name: "SSD" },
  { name: "게이밍 모니터" },
];

function CategoryGrid() {
  return (
    <div className="grid">
      {categories.map((item, index) => (
        <div key={index} className="card">
          <h3>{item.name}</h3>
          <button>가격 비교하기</button>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;

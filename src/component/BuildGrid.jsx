import "../css/recommend.css";
function BuildGrid({ builds }) {
  return (
    <div className="build-grid">
      {builds.map((b, idx) => (
        <div className="build-card" key={idx}>
          <div className="build-img-wrap">
            <img
              className="build-img"
              src={b.image || "/images/placeholder.jpg"}
              alt={b.name}
            />
          </div>

          <div className="build-body">
            <h3 className="build-name">{b.name}</h3>
            <div className="build-price">가격 : {b.price}</div>
              {b.wowprice && (
    <div className="wow-price">WOW 할인가 :  {b.wowprice}</div>
  )}

            <button
              className="build-btn"
              onClick={() => window.open(b.link, "_blank")}
            >
              바로가기 →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuildGrid;

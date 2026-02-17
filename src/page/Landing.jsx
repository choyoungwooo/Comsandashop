import { useNavigate } from "react-router-dom";
import { categories } from "../data/Categories";

import "../css/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1>컴맹도 3분이면 완성하는 PC 추천</h1>
          <p>
            목적만 선택하면 자동으로 최적 견적을 제안합니다.  
            복잡한 가격 비교 없이, 빠르게 결정하세요.
          </p>
          <button
            className="primary-btn"
            onClick={() => navigate("/builder")}
          >
            맞춤 PC 만들기 →
          </button>
        </div>
      </section>

      {/* CATEGORY DASHBOARD */}
      <section className="dashboard">
        <div className="dashboard-inner">

          <h2>🔥 목적별 빠른 추천</h2>

          <div className="category-grid">
  {categories.map((item, index) => (
    <div
      key={index}
      className="category-card"
      onClick={() => {
        if (item.external) {
          window.open(item.link, "_blank");
        } else {
          navigate(item.path);
        }
      }}
    >
      <div className="category-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="why">
        <div className="why-inner">
          <h2>왜 Comsandashop인가?</h2>

          <div className="why-grid">
            <div className="why-item">
              ⚡ 복잡한 가격 비교 없이 추천
            </div>
            <div className="why-item">
              🎯 목적 기반 자동 세팅
            </div>
            <div className="why-item">
              💰 예산에 맞는 최적 구성
            </div>
          </div>
        </div>
      </section>
      <section className="stats">
  <div className="stats-inner">
    <div>
      <h3>1,200+</h3>
      <p>추천 견적 생성</p>
    </div>
    <div>
      <h3>98%</h3>
      <p>사용자 만족도</p>
    </div>
    <div>
      <h3>3분</h3>
      <p>평균 견적 완성 시간</p>
    </div>
  </div>
</section>


      {/* MONTHLY RECOMMEND */}


          <section className="monthly">
  <div className="monthly-inner">
    <h2>🔥 이번 달 추천 견적</h2>

    <div className="monthly-grid">

      <div className="monthly-card">
        <h3>로스트아크 120만원</h3>
        <p>RTX 4060 · FHD 풀옵션</p>
        <button>자세히 보기 →</button>
      </div>

      <div className="monthly-card">
        <h3>영상편집 150만원</h3>
        <p>RTX 4060Ti · 32GB RAM</p>
        <button>자세히 보기 →</button>
      </div>

      <div className="monthly-card">
        <h3>대학생 가성비 80만원</h3>
        <p>i5 · 내장그래픽</p>
        <button>자세히 보기 →</button>
      </div>

      <div className="monthly-card">
        <h3>코딩용 100만원</h3>
        <p>Ryzen 5 · 16GB RAM</p>
        <button>자세히 보기 →</button>
      </div>

    </div>
  </div>
</section>
        </div>
  );
}
export default Landing;
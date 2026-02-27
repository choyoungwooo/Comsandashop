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
        <span className="badge">BEST</span>
        <h3>달컴 윈도우탑재 게이밍 조립PC</h3>
        <p>RTX 5070 + i7 12700F 조합</p>
        <a
          href="https://link.coupang.com/a/dTl4vg"
          className="detail-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          상품 보러가기 →
        </a>
      </div>

      <div className="monthly-card">
        <span className="badge">가성비</span>
        <h3>40만원대 가성비 i7 게이밍 PC</h3>
        <p>
          GTX1060 + 16GB 구성 <br />
          입문용으로 부담 적은 가격대
        </p>
        <a
          href="https://link.coupang.com/a/dTmyL4"
          className="detail-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          상품 보러가기 →
        </a>
      </div>

      <div className="monthly-card">
        <span className="badge">BEST</span>
        <h3>
            원트컴 음악작업 미디 작곡용 큐베이스 컴퓨터</h3>
        <p>
          🎼 음악 작업 입문자용 32GB 세팅, 홈레코딩·BGM 제작에 적합한 PC
        </p>
        <a
          href="https://link.coupang.com/a/dTmHvY"
          className="detail-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          상품 보러가기 →
        </a>
      </div>

      <div className="monthly-card">
        <span className="badge">BEST</span>
        <h3>
            포토샵·오토캐드 작업용</h3>
        <p>
          🖌️ 포토샵·캐드용 실속형 본체, 사무·디자인 겸용으로 적당
        </p>
        <a
          href="https://link.coupang.com/a/dTmYiT"
          className="detail-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          상품 보러가기 →
        </a>
      </div>

    </div>
  </div>
</section>
        </div>
  );
}
export default Landing;
import { useNavigate } from "react-router-dom";
import "../css/landing.css";

function Landing() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: "🎮",
      title: "게이밍 PC",
      desc: "RTX 기반 고성능 세팅",
      link: "/computer?type=gaming"
    },
    {
      icon: "💼",
      title: "사무 · 업무용",
      desc: "가성비 + 안정성 중심",
      link: "/computer?type=office"
    },
    {
      icon: "🎬",
      title: "영상 · 디자인",
      desc: "GPU 가속 · 고해상도 작업",
      link: "/computer?type=creator"
    },
    {
      icon: "💰",
      title: "가성비 추천",
      desc: "입문자 · 학생 추천",
      link: "/computer?type=recommend"
    }
  ];

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1>나에게 맞는 컴퓨터를 빠르게 찾으세요</h1>
          <p>
            사용 목적에 맞는 PC를 추천하고  
            실시간 가격 비교까지 한 번에 제공합니다.
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

          <h2>🔥 추천 카테고리</h2>

          <div className="category-grid">
            {categories.map((item, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => navigate(item.link)}
              >
                <div className="category-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}

            {/* 외부 링크 카드 */}
            <div
  className="category-card external danawa-card"
  onClick={() => window.open("https://shop.danawa.com/pc/")}
>
              <div className="category-icon">🛠</div>
              <h3>다나와 견적 요청 게시판</h3>
              <p>실시간 PC 견적 문의 확인</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;

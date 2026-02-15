import { useNavigate } from "react-router-dom";
import "../css/landing.css";
import pcImage from "../assets/pc.png";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">

          {/* 왼쪽 텍스트 */}
          <div className="hero-left">
            <h1>
              나에게 맞는 컴퓨터,<br />
              쉽고 빠르게 선택하세요.
            </h1>
            <p>
              복잡한 부품 고민 없이<br />
              상황에 맞는 추천 구성을 확인하세요.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate("/builder")}
              >
                제품 보러가기 →
              </button>
            </div>
          </div>

          {/* 오른쪽 이미지 추가 🔥 */}
          <div className="hero-right">
            <img src={pcImage} alt="PC 이미지" />
          </div>

        </div>
      </section>

      {/* 추천 */}
      <section className="recommend">
        <div className="recommend-inner">
          <h2>🔥 완성 PC 추천</h2>

          <div className="recommend-grid">

            <div
              className="recommend-card"
              onClick={() => navigate("/computer?type=gaming")}
            >
              <h3>고사양 게이밍 PC</h3>
              <p>RTX 기반 퍼포먼스 세팅</p>
              <span>배그 · 스팀 · AAA 게임</span>
            </div>

            <div
              className="recommend-card"
              onClick={() => navigate("/computer?type=office")}
            >
              <h3>문서·사무용 PC</h3>
              <p>가성비 + 안정성 중심</p>
              <span>문서 · 인강 · 업무용</span>
            </div>

            <div
              className="recommend-card"
              onClick={() => navigate("/computer?type=creator")}
            >
              <h3>영상편집·디자인용</h3>
              <p>고해상도 + GPU 가속</p>
              <span>프리미어 · 포토샵 · 3D</span>
            </div>

            <div
              className="recommend-card"
              onClick={() => navigate("/computer?type=recommend")}
            >
              <h3>가성비 추천 PC</h3>
              <p>가격 대비 최고의 구성</p>
              <span>입문자 · 학생 추천</span>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-brand">
            <h3>컴산다샵</h3>
            <p>© 2026 Comsanda. All rights reserved.</p>
          </div>

          <div className="footer-info">
            <span>이메일: jovis000@naver.com</span>
          </div>

          <div className="footer-links">
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Landing;

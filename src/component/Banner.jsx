import "../css/banner.css";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <section className="banner">
      <div className="banner-box">
        <h1>컴산다샵</h1>
        <p>예산에 맞는 컴퓨터를 쉽고 빠르게 제작하세요</p>
        <button onClick={() => navigate("/notebook")}>
          제작 시작하기
        </button>
      </div>
    </section>
  );
}

export default Banner;

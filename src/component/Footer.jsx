import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-left">
          <h3>컴산다샵</h3>
          <p>© 2026 Comsanda. All rights reserved.</p>
        </div>

        <div className="footer-info">
      <span>이메일: jovis000@naver.com</span>
    </div>

        <div className="footer-right">
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

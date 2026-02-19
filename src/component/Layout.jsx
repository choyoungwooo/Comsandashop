import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import { products } from "../data/Products";
import "../css/layout.css";

function Layout() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (keyword) => {
  setSearchKeyword(keyword);

  if (window.location.pathname !== "/builder") {
    navigate("/builder");
  }
};

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="layout-header">
        <div className="layout-inner">

          <div className="logo-search">

            {/* 로고 */}
            <h1 className="logo">
              <Link to="/">컴산다샵</Link>
            </h1>

            {/* 검색바 */}
            <SearchBar
              onSearch={handleSearch}
              products={products}
            />

          </div>

        </div>
      </header>

      {/* ================= PAGE ================= */}
      <main>
  <Outlet context={{ searchKeyword }} />
</main>


      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
}

export default Layout;

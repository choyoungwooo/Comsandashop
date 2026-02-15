import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import { products } from "../data/Products";
import "../css/layout.css";

function Layout() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <>
      <header className="layout-header">
        <div className="layout-inner">
          <div className="logo-search">
            <h1 className="logo">
              <Link to="/">컴산다샵</Link>
            </h1>

            {/* 🔥 여기 안에서 products 전달 */}
            <SearchBar
              onSearch={setSearchKeyword}
              products={products}
            />
          </div>
        </div>
      </header>

      <Outlet context={{ searchKeyword }} />
      <Footer />
    </>
  );
}

export default Layout;

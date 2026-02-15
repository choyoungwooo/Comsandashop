import { Outlet, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../css/layout.css";
import { Link } from "react-router-dom";


function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <>
      <header className="layout-header">
        <div className="layout-inner">
          <div className="logo-search">
            <h1 className="logo">
            <Link to="/builder">컴산다샵</Link>
            </h1>
            <SearchBar />
          </div>

          {isHome && (
            <div className="category-menu">
              {/* 카테고리 아이템들 */}
            </div>
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;

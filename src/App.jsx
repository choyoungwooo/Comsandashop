import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";

import Landing from "./page/Landing";
import Home from "./page/builder";


function App() {
  return (
    <Routes>

      {/* ✅ 랜딩은 Layout 없이 */}
      <Route path="/" element={<Landing />} />

      {/* ✅ 나머지 페이지는 Layout 적용 */}
      <Route element={<Layout />}>
        <Route path="/builder" element={<Home />} />
      </Route>

    </Routes>
  );
}

export default App;

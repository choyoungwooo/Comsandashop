import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";

import Landing from "./page/Landing";
import Home from "./page/builder";
import Result from "./page/Result";
import Terms from "./page/Terms";
import Privacy from "./page/Privacy";

function App() {
  return (
    <Routes>

      {/* ✅ 랜딩은 Layout 없이 */}
      <Route path="/" element={<Landing />} />

      {/* ✅ 나머지 페이지는 Layout 적용 */}
      <Route element={<Layout />}>
        <Route path="/builder" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
      </Route>

    </Routes>
  );
}

export default App;

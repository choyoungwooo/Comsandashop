import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";

import Landing from "./page/Landing";

import Result from "./page/Result";
import Terms from "./page/Terms";
import Privacy from "./page/Privacy";
import Gaming from "./page/Gaming";
import Office from "./page/Office";
import Creator from "./page/Creator";
import Budget from "./page/Budget";
import Builder from "./page/Builder";



function App() {
  return (
    
    <Routes>

      {/* ✅ 랜딩은 Layout 없이 */}
      
<Route element={<Layout />}>
      {/* ✅ 나머지 페이지는 Layout 적용 */}
      
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/result" element={<Result />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/recommend/gaming" element={<Gaming />} />
        <Route path="/recommend/office" element={<Office />} />
        <Route path="/recommend/creator" element={<Creator />} />
        <Route path="/recommend/budget" element={<Budget />} />

      </Route>

    </Routes>
  );
}

export default App;

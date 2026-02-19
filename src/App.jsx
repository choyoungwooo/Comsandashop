import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";

import Landing from "./page/Landing";

import Result from "./page/Result";
import Terms from "./page/Terms";
import Privacy from "./page/Privacy";
import Gaming from "./page/Gaming";
import Device from "./page/Device";
import Setup from "./page/Setup";
import Console from "./page/Console";
import NoteBook from "./page/NoteBook";
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
<Route path="/recommend/device" element={<Device />} />
<Route path="/recommend/notebook" element={<NoteBook />} />
<Route path="/recommend/setup" element={<Setup />} />
<Route path="/recommend/console" element={<Console />} />
      </Route>
    </Routes>
  );
}
export default App;
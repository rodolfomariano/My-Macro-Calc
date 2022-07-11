import { Route, Routes } from "react-router-dom";

import App from "./App";
import { AboutBioType } from "./pages/AboutBioType";
import { AboutCalc } from "./pages/AboutCalc";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/bio-type" element={<AboutBioType />} />
      <Route path="/calc" element={<AboutCalc />} />
    </Routes>
  )
}
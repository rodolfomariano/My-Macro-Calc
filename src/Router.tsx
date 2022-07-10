import { Route, Routes } from "react-router-dom";
import App from "./App";
import { AboutBioType } from "./pages/AboutBioType";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/bio-type" element={<AboutBioType />} />
    </Routes>
  )
}
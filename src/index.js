import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import AllSightingList from "./components/AllSightingList";
import SightingPage from "./components/SightingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<AllSightingList />} />
        {/*index prop is a special kind of Route that renders when no other Route in the Routes tree matches. */}
        <Route path="sightings/:sightingIndex" element={<SightingPage />} />
        <Route path="*" element={"No page found!"} />
        {/*path prop is used to match the current URL or a portion of it.*/}
      </Route>
    </Routes>
  </BrowserRouter>
);

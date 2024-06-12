import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<MovieDetailsPage />} />
        {/* 可以根据需要继续添加更多路由 */}
      </Routes>
    </Router>
  );
}

export default AppRouter;


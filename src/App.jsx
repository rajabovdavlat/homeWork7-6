// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

import MainLayout from "./layout/MainLayout";

export default function App() {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <Routes>
      {/* Публичные маршруты (без Header/Footer) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Приватные маршруты с макетом (layout) */}
      <Route
        path="/"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
      </Route>

      {/* Если не найден маршрут — редиректим */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

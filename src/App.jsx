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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

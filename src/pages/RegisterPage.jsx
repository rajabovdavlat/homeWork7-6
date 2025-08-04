import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import PasswordField from "../features/auth/PasswordField";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [passError, setPassError] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      alert("Заполните все поля");
      return;
    }

    if (password !== confirm) {
      setPassError("Пароли не совпадают");
      return;
    }

    setPassError("");
    dispatch(register({ username, email, password }));
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/cyber-shield.png')" }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Регистрация</h2>

        <label className="block mb-4">
          <span className="mb-1 block text-sm text-gray-600">Имя пользователя</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Введите имя"
          />
        </label>

        <label className="block mb-4">
          <span className="mb-1 block text-sm text-gray-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </label>

        <PasswordField
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passError}
          placeholder="Введите пароль"
        />

        <PasswordField
          label="Повторите пароль"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={passError}
          name="confirmPassword"
          placeholder="Повторите пароль"
        />

        {error && (
          <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-green-600 py-2.5 text-white font-medium hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Отправка..." : "Зарегистрироваться"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}


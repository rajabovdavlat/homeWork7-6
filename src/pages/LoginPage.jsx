import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice"; 
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (isAuthenticated && user) {
      const userRef = ref(db, `onlineUsers/${user.uid}`);
      set(userRef, {
        uid: user.uid,
        email: user.email,
      })
        .then(() => console.log("✅ Пользователь записан в онлайн:", user.email))
        .catch((error) => console.error("❌ Ошибка при записи в Firebase:", error));
    }
  }, [isAuthenticated]);

  if (isAuthenticated) return <Navigate to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Введите логин и пароль");
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/cyber-shield.png')" }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Вход</h2>

        <label className="block mb-4">
          <span className="mb-1 block text-sm text-gray-600">Email или логин</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="test@test.com"
          />
        </label>

        <label className="block mb-6">
          <span className="mb-1 block text-sm text-gray-600">Пароль</span>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Введите пароль"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPass ? "🙈" : "👁"}
            </button>
          </div>
        </label>

        {error && (
          <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Входим..." : "Войти"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Зарегистрируйтесь
          </Link>
        </p>
      </form>
    </main>
  );
}

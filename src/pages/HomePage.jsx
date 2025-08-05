import React from "react";
import { useSelector } from "react-redux"; 
import useOnlineStatus from "../hooks/useOnlineStatus";
import OnlineUsers from "../components/OnlineUsers";

export default function HomePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useOnlineStatus(); 

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать на главную страницу!</h1>

      {isAuthenticated ? (
        <>
          <p className="text-green-600">Вы вошли как: <strong>{user.email}</strong></p>
          <OnlineUsers />
        </>
      ) : (
        <p className="text-red-600">Вы не вошли в систему.</p>
      )}
    </div>
  );
}

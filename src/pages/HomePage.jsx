import React from "react";
import { useSelector } from "react-redux"; 
import useOnlineStatus from "../hooks/useOnlineStatus";
import OnlineUsers from "../components/OnlineUsers";
import UserCard from "../components/UserCard";

export default function HomePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useOnlineStatus(); 

  return (
    <div className=" p-6">
      <h1 className="text-4xl text-center font-bold mb-4">Добро пожаловать на главную страницу!</h1>

      {isAuthenticated ? (
        <>
          <UserCard /> 
          <div className="mt-4">
            <OnlineUsers />
          </div>
        </>
      ) : (
        <p className="text-red-600">Вы не вошли в систему.</p>
      )}
    </div>
  );
}

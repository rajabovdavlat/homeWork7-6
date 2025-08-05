// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// ✅ Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOO5fMy7RbxEVagmx62zDUy3X6MrkvGTM",
  authDomain: "users-7812d.firebaseapp.com",
  databaseURL: "https://users-7812d-default-rtdb.firebaseio.com", // ⬅️ здесь всё верно
  projectId: "users-7812d",
  storageBucket: "users-7812d.appspot.com", // 🔧 исправлено: должно быть *.appspot.com
  messagingSenderId: "940754457872",
  appId: "1:940754457872:web:5884579a08a403a46e4195",
  measurementId: "G-MJ34Z82LRQ",
};

// ⚙️ Инициализация Firebase
const app = initializeApp(firebaseConfig);

// ⬇️ Экспортируем нужные модули
export const auth = getAuth(app);
export const db = getDatabase(app);

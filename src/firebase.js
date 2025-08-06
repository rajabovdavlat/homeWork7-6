import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBweC7VI08zfxNqXUBq1NF5pscyJelPSnE",
  authDomain: "users-207ce.firebaseapp.com",
  projectId: "users-207ce",
  storageBucket: "users-207ce.appspot.com", 
  messagingSenderId: "65451987114",
  appId: "1:65451987114:web:8888d780b0d01b8f2600d3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); 

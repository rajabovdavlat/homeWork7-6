import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";
import { setOnlineUsers } from "../features/users/onlineUsersSlice";

export default function useListenOnlineUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const usersRef = ref(db, "onlineUsers");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      const usersArray = usersData
        ? Object.values(usersData)
        : [];
      dispatch(setOnlineUsers(usersArray));
    });

    return () => unsubscribe();
  }, [dispatch]);
}

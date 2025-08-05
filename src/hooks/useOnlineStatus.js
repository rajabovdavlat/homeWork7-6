import { useEffect } from "react";
import { ref, set, onDisconnect } from "firebase/database";
import { auth, db } from "../firebase";

export default function useOnlineStatus() {
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const statusRef = ref(db, `status/${user.uid}`);

    set(statusRef, {
      state: "online",
      name: user.email,
      uid: user.uid,
    });

    onDisconnect(statusRef).set({
      state: "offline",
      name: user.email,
      uid: user.uid,
    });
  }, []);
}

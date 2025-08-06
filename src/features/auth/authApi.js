import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export async function firebaseRegister({ username, email, password }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username });

  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: username,
    },
    token: await userCredential.user.getIdToken(),
  };
}

export async function firebaseLogin({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return {
    user: {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    },
    token: await userCredential.user.getIdToken(),
  };
}

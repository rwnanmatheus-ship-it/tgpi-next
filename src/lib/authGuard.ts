import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

export function requireAuth(callback: (user: User) => void): () => void {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.assign("/login");
      return;
    }

    callback(user);
  });
}

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export function requireAuth(callback: (user: any) => void) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/login";
    } else {
      callback(user);
    }
  });
}
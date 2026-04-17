import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHX51OzHeliEuhUt86V-UxUFWhjqNWPBM",
  authDomain: "tgpi-next.firebaseapp.com",
  projectId: "tgpi-next",
  storageBucket: "tgpi-next.firebasestorage.app",
  messagingSenderId: "420470087490",
  appId: "1:420470087490:web:080e29fbc61255d03172db",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqNLAo2mPO1vwJov20YmhyDXACB6ZCU5A",
  authDomain: "ale-art.firebaseapp.com",
  projectId: "ale-art",
  storageBucket: "ale-art.appspot.com",
  messagingSenderId: "303695385557",
  appId: "1:303695385557:web:1505385ba9d97c7192a35c",
  measurementId: "G-Y5L57JRYBH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

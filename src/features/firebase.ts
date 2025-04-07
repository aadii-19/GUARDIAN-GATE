import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7ShhHskYRJwBhTKLstlYOfaZ0hjwb0CY",
  authDomain: "guardian-gate-fd812.firebaseapp.com",
  projectId: "guardian-gate-fd812",
  storageBucket: "guardian-gate-fd812.appspot.com",
  messagingSenderId: "52177565301",
  appId: "1:52177565301:web:a2433f75317f5d3ea42a3c",
  measurementId: "G-2J5Y5XPKTP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth and Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // 💥 THIS was missing!

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "guardian-gate-fd812.firebaseapp.com",
  projectId: "guardian-gate-fd812",
  storageBucket: "guardian-gate-fd812.appspot.com",
  messagingSenderId: "52177565301",
  appId: "1:52177565301:web:a2433f75317f5d3ea42a3c",
  measurementId: "G-2J5Y5XPKTP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };

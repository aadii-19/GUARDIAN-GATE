import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/features/firebase";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      alert("Google Sign-in failed ❌");
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      alert("Email Sign-in failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-white">
      <div className="bg-white shadow-lg border-2 border-red-500 rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
          Welcome to Guardian Gate 🛡️
        </h1>

        <div className="space-y-4">
          <Button
            className="w-full bg-red-500 hover:bg-red-400 text-white"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>

          <div className="text-center text-gray-500 font-semibold">OR</div>

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full bg-red-500 hover:bg-red-400 text-white"
            onClick={handleEmailLogin}
          >
            Sign in with Email
          </Button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

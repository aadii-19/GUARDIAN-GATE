import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/features/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Email Sign-up failed ❌");
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      alert("Google Sign-up failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-100 to-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full border-2 border-red-500">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Create Account 🛡️</h1>

        <div className="space-y-4">
          <Button className="w-full bg-red-500 hover:bg-red-400 text-white" onClick={handleGoogleSignup}>
            Sign up with Google
          </Button>

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
          <Button className="w-full bg-red-500 hover:bg-red-400 text-white" onClick={handleEmailSignup}>
            Sign up with Email
          </Button>
        </div>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-red-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

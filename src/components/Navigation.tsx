import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/features/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("Logout failed ❌");
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="w-full h-16 flex items-center justify-between px-5">
        {/* Left-aligned Guardian Gate */}
        <Link
          to="/"
          className="flex items-center space-x-2 border border-black rounded-lg px-4 py-2 transition-all duration-200 hover:bg-white-400 hover:border-black-400"
        >
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">Guardian Gate</span>
        </Link>

        {/* Right-aligned Navigation Links */}
        <div className="flex items-center space-x-6 mr-4">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            to="/resources"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Resources
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Button variant="destructive" onClick={() => navigate("/emergency")}>
            Get Help Now
          </Button>

          {/* 🔐 Auth Buttons */}
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.displayName || user.email}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-sm"
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/signup")}
                className="text-sm"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

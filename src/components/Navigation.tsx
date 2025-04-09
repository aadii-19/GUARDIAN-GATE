import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/features/firebase";
import { sendEmergencyAlert } from "@/features/emergency"; // 🔥 Add this
import { toast } from "sonner"; // ✅ For feedback
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function Navigation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);


  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // 🆘 Trigger alert to Firebase
  const handleSendAlert = async () => {
    console.log("🚨 Send alert triggered");
    if (user?.uid) {
      await sendEmergencyAlert(user.uid);
    } else {
      await sendEmergencyAlert(null);
    }
  
    toast.error("🚨 Emergency Alert Sent! Authorities have been notified.", {
      style: { backgroundColor: "red", color: "white" },
    });
  
    setOpen(false); // 👈 this will close the dialog after alert is sent
  };
  

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
        {/* 🔰 Guardian Gate Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 border border-black rounded-lg px-4 py-2 transition-all duration-200 hover:bg-white-400 hover:border-black-400"
        >
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">Guardian Gate</span>
        </Link>

        {/* 📌 Navigation Links */}
        <div className="flex items-center space-x-6 mr-4">
          {!isAuthPage && (
            <>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </>
          )}

          {/* 🆘 Emergency Button */}
          <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
  <Button variant="destructive" onClick={() => setOpen(true)}>
    Get Help Now
  </Button>
</AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Emergency Help Confirmation</AlertDialogTitle>
      <AlertDialogDescription className="text-gray-800 text-base">
        Are you sure you want to trigger an <strong>Emergency Alert</strong>? This action will notify emergency contacts and store the alert.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button variant="destructive" onClick={handleSendAlert}>
        Yes, Send Alert 🚨
      </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


          {/* 👤 Display name */}
          {user?.displayName && (
            <span className="text-sm font-semibold text-red-600 ml-4">
              {user.displayName}
            </span>
          )}

          {/* 🔓 Auth Buttons */}
          {user ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-sm">
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-800 text-base">
                    Are you sure you want to logout from <strong>Guardian Gate</strong>? You’ll need to login again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")} className="text-sm">
                Login
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")} className="text-sm">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

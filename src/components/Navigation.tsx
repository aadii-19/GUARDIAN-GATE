import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<any>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUserName(
        data.session?.user?.user_metadata?.full_name ||
          data.session?.user?.email ||
          null
      );
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUserName(
          session?.user?.user_metadata?.full_name ||
            session?.user?.email ||
            null
        );
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error signing out: " + error.message);
    else {
      setSession(null);
      navigate("/login");
    }
  };

  // Utility function to determine active link styles using smaller sizes
  const linkClasses = (path: string) => {
    const base =
      "px-2 py-1 transition-all duration-300 font-semibold uppercase tracking-wide text-sm";
    const active =
      "text-primary border-b-2 border-primary";
    const inactive =
      "text-gray-600 hover:text-primary";
    return location.pathname === path ? `${base} ${active}` : `${base} ${inactive}`;
  };

  return (
    <nav className="w-full z-50 border-b border-gray-200 bg-white/30 dark:bg-background/60 backdrop-blur-md transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      <div className="w-full h-16 flex items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center space-x-2 px-3 py-1 bg-white/40 dark:bg-background/30 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Shield className="w-5 h-5 text-primary drop-shadow-md" />
          <span className="text-lg font-bold text-foreground">Guardian Gate</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Redesigned, smaller header navigation links */}
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
          <Link to="/services" className={linkClasses("/services")}>
            Services
          </Link>
          <Link to="/resources" className={linkClasses("/resources")}>
            Resources
          </Link>
          <Link to="/about" className={linkClasses("/about")}>
            About
          </Link>

          <Button
            variant="destructive"
            className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm px-3 py-1"
            onClick={() => navigate("/emergency")}
          >
            Get Help Now
          </Button>

          {session && userName && (
  <>
    <div className="px-3 py-1 text-sm font-medium text-gray-800 bg-white/70 backdrop-blur-md border border-gray-300 rounded-xl shadow hover:shadow-xl transition-all duration-300">
      {userName}
    </div>

    <Button
      onClick={() => navigate("/user-profile")}
      className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-sm px-3 py-1 bg-white/80 hover:bg-white text-gray-800 border border-gray-300"
    >
      Profile
    </Button>
  </>
)}



          {session && (
            <button
              className="group relative flex items-center justify-start w-[40px] h-[40px] rounded-full bg-red-500 shadow-md overflow-hidden transition-all duration-300 hover:w-[100px] hover:rounded-lg active:translate-x-[1px] active:translate-y-[1px]"
              onClick={handleSignOut}
            >
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-[30%] group-hover:pl-3">
                <svg viewBox="0 0 512 512" className="w-[15px]">
                  <path
                    fill="white"
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9v-62.1h-128c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9 9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128C0 75 43 32 96 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                  />
                </svg>
              </div>
              <div className="absolute right-0 text-white font-semibold text-xs opacity-0 w-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-[70%] group-hover:pr-3">
                Sign Out
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

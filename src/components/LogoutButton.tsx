import { auth } from "@/features/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-500">
      Logout
    </Button>
  );
};

export default LogoutButton;

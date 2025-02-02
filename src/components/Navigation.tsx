import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">Guardian Gate</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
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
          <Button 
            variant="destructive"
            onClick={() => navigate('/emergency')}
          >
            Get Help Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
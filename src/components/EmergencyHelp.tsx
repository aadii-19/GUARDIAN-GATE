import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

export function EmergencyHelp() {
  const navigate = useNavigate();

  return (
    <div className="bg-destructive text-destructive-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Phone className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-bold">Need Immediate Help?</h2>
              <p className="text-lg">24/7 Emergency Support Available</p>
            </div>
          </div>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/emergency')}
            className="w-full md:w-auto"
          >
            Get Emergency Help Now
          </Button>
        </div>
      </div>
    </div>
  );
}
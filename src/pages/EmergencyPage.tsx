import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sendEmergencyAlert } from "@/features/emergency"; // we’ll create this next
import { toast } from "sonner"; // if you're using sonner for notifications

export function EmergencyPage() {
  const { user } = useAuth(); // 👈 get current user

  // ✅ Add the alert trigger function here
  const handleSendAlert = async () => {
    console.log("🚨 Send alert triggered"); // <- ADD THIS FIRST
    try {
      await sendEmergencyAlert(user?.uid || null);
      toast.success("🚨 Emergency alert sent!");
    } catch (err) {
      toast.error("❌ Failed to send emergency alert");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Emergency Help</h1>
        <p className="text-xl text-muted-foreground">
          Immediate assistance is available 24/7. Don't hesitate to reach out.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="p-6 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-4">Emergency Hotline</h2>
          <p className="text-muted-foreground mb-6">
            Call our emergency helpline for immediate assistance
          </p>
          <Button
            size="lg"
            variant="destructive"
            className="w-full"
            onClick={handleSendAlert}
          >
            Call 1-800-SAFE-NOW
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-4">Crisis Chat</h2>
          <p className="text-muted-foreground mb-6">
            Chat with a crisis counselor anonymously
          </p>
          <Button size="lg" variant="secondary" className="w-full">
            Start Chat
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-4">Emergency Services</h2>
          <p className="text-muted-foreground mb-6">
            Contact local emergency services
          </p>
          <Button size="lg" variant="outline" className="w-full">
            Call 911
          </Button>
        </Card>
      </div>

      <Card className="mt-12 p-6">
        <h2 className="text-2xl font-semibold mb-4">Safety Tips</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="font-semibold">1.</span>
            Stay on the line until help arrives
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">2.</span>
            If possible, get to a safe location
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">3.</span>
            Keep your phone charged and accessible
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">4.</span>
            Share your location with trusted contacts
          </li>
        </ul>
      </Card>
    </div>
  );
}

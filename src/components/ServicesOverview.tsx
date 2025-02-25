import { Card } from "@/components/ui/card";
import { Scale, GamepadIcon, Users2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function ServicesOverview() {
  return (
    <div className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid gap-8 md:grid-cols-4">
          <Card className="p-6">
            <Scale className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Legal Advisory</h3>
            <p className="text-muted-foreground mb-4">
              Understand your legal rights and get expert guidance.
            </p>
            <Link to="/legal-help" className="text-primary hover:underline">
              Learn more →
            </Link>
          </Card>

          <Card className="p-6">
            <GamepadIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-muted-foreground mb-4">
              Learn about your rights through engaging activities.
            </p>
            <Link to="/services" className="text-primary hover:underline">
              Learn more →
            </Link>
          </Card>

          <Card className="p-6">
            <Users2 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-muted-foreground mb-4">
              Connect with others and share experiences safely.
            </p>
            <Link to="/services" className="text-primary hover:underline">
              Learn more →
            </Link>
          </Card>

          <Card className="p-6">
            <Heart className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mental Well-being</h3>
            <p className="text-muted-foreground mb-4">
              Access resources for mental health and self-defense.
            </p>
            <Link to="/mental-wellbeing" className="text-primary hover:underline">
              Learn more →
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { Card } from "@/components/ui/card";
import { Scale, GamepadIcon, Users2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
export function ServicesOverview() {
  return (
    <div className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-center">
  <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 mb-9 flex items-center space-x-4">
    
    <Shield className="w-8 h-8 text-primary" />
    
    
    <h2 className="text-3xl font-bold text-center">Our Services</h2>
  </div>
</div>



<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
  {[
    { Icon: Scale, title: "Legal Advisory", desc: "Understand your legal rights and get expert guidance.", link: "/legal-help" },
    { Icon: GamepadIcon, title: "Interactive Learning", desc: "Learn about your rights through engaging activities.", link: "/services" },
    { Icon: Users2, title: "Community Support", desc: "Connect with others and share experiences safely.", link: "/services" },
    { Icon: Heart, title: "Mental Well-being", desc: "Access resources for mental health and self-defense.", link: "/mental-wellbeing" }
  ].map(({ Icon, title, desc, link }, index) => (
    <Card 
      key={index} 
      className="p-8 border-4 border-black-700 bg-white rounded-2xl shadow-3xl transition-all duration-300 hover:shadow-4xl hover:scale-105 hover:-translate-y-1"
    >
      <Icon className="w-14 h-14 text-primary mb-4" />
      <h3 className="text-2xl font-bold text-black-800 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{desc}</p>
      <Link to={link} className="text-primary font-semibold hover:underline">
        Learn more →
      </Link>
    </Card>
  ))}
</div>

      </div>
    </div>
  );
}
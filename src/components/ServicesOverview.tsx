import { Card } from "@/components/ui/card";
import { Scale, GamepadIcon, Users2, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import homebg from "@/images/homebg3.jpg";

export function ServicesOverview() {
  return (
    <div
      className="py-24 bg-muted/50"
      style={{
        backgroundImage: `url(${homebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-12">
          <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 flex items-center space-x-4 bg-white bg-opacity-80 backdrop-blur-md">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-center text-black">Our Services</h2>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {[ 
            {
              Icon: Scale,
              title: "Legal Advisory",
              desc: "Understand your legal rights and get expert guidance.",
              link: "/legal-help",
            },
            {
              Icon: GamepadIcon,
              title: "Interactive Learning",
              desc: "Learn about your rights through engaging activities.",
              link: "/interactive-learning",
            },
            {
              Icon: Users2,
              title: "Community Support",
              desc: "Connect with others and share experiences safely.",
              link: "/community", // Changed link to /community
            },
            {
              Icon: Heart,
              title: "Mental Well-being",
              desc: "Access resources for mental health and self-defense.",
              link: "/mental-wellbeing",
            },
          ].map(({ Icon, title, desc, link }, index) => (
            <Card
              key={index}
              className="relative group w-full h-72 rounded-3xl border border-gray-200 bg-white/30 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-[1.03]"
            >
              {/* Hover background overlay */}
              <div className="absolute inset-0 bg-gray-300 bg-opacity-40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon and Title */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center transition-all duration-700 group-hover:opacity-0 group-hover:-translate-y-12">
                <Icon className="w-16 h-16 text-primary mb-3 transition-transform duration-700 group-hover:scale-110" />
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
              </div>

              {/* Hover Reveal */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 transition-all duration-700 text-center text-gray-900">
                <p className="text-base font-medium mb-4">{desc}</p>
                <Link
                  to={link}
                  className="px-4 py-2 bg-white/80 text-primary font-semibold rounded-lg shadow-md hover:bg-white/90 transition-all duration-300"
                >
                  Learn more →
                </Link>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary transition-all duration-700 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Book, Phone, Shield } from "lucide-react";
import homebg from "@/images/homebg3.jpg";

export function Resources() {
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
        {/* Heading */}
        <div className="flex justify-center mb-12">
          <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 flex items-center space-x-4 bg-white bg-opacity-80 backdrop-blur-md">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold text-center text-black">Helpful Resources</h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              Icon: FileText,
              title: "Legal Documents",
              desc: "Access important legal forms and documents.",
              btnText: "View Documents",
            },
            {
              Icon: Book,
              title: "Educational Materials",
              desc: "Learn about your rights and safety measures.",
              btnText: "Access Materials",
            },
            {
              Icon: Phone,
              title: "Support Directory",
              desc: "Find local support services and contacts.",
              btnText: "View Directory",
            },
            {
              Icon: Shield,
              title: "Safety Planning",
              desc: "Create your personal safety plan.",
              btnText: "Start Planning",
            },
          ].map(({ Icon, title, desc, btnText }, index) => (
            <Card
              key={index}
              className="relative group w-full h-72 rounded-3xl border border-gray-200 bg-white/30 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-[1.03]"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gray-300 bg-opacity-40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Icon + Title */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center transition-all duration-700 group-hover:opacity-0 group-hover:-translate-y-12">
                <Icon className="w-16 h-16 text-primary mb-3 transition-transform duration-700 group-hover:scale-110" />
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
              </div>

              {/* On hover: Description + Button */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 transition-all duration-700 text-center text-gray-900">
                <p className="text-base font-medium mb-4">{desc}</p>
                <Button
                  variant="outline"
                  className="border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {btnText}
                </Button>
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

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80')",
          filter: "brightness(0.3)",
          backgroundPosition: "center 30%", // Adjusted to move the image upwards
        }}
      />
      
      <div className="relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Safety is Our Priority
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
          Guardian Gate provides comprehensive support and resources for women and children's safety and mental well-being. You're not alone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="destructive">
            Get Immediate Help
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="secondary">
            Explore Resources
          </Button>
        </div>
      </div>
    </div>
  );
}

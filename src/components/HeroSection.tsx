import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import image1 from "@/images/1.jpeg";
import { Typewriter } from "react-simple-typewriter";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl text-center text-white px-6 py-16 md:py-28 animate-fadeIn">
        {/* Typing animation for first heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          <Typewriter
            words={[
              "Your Safety is Our Priority",
              "We Stand With You",
              "Support. Strength. Security.",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h1>

        {/* Static second heading */}
        <p className="text-xl md:text-2xl mt-6 mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Guardian Gate offers 24/7 support, legal guidance, and mental health resources. We’re here for women and children — always.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="destructive"
            className="px-8 py-5 text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get Immediate Help
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="px-8 py-5 text-lg font-medium backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Explore Resources
          </Button>
        </div>
      </div>
    </div>
  );
}

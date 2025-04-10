import { HeroSection } from "@/components/HeroSection";
import { ServicesOverview } from "@/components/ServicesOverview";
import { EmergencyHelp } from "@/components/EmergencyHelp";
import { Resources } from "@/components/Resources";
import { useRef, useState } from "react";
import hp from "@/images/hp.mp4";

export function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] overflow-hidden rounded-3xl border border-gray-300 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] mt-10 backdrop-blur-xl bg-white/70">
        {/* Video Side */}
        <div className="relative p-4 sm:p-6">
          <div className="relative rounded-2xl overflow-hidden border-[5px] border-gray-300 shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-[1.02] transition-all duration-500">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-[14px] cursor-pointer"
              loop
              muted={isMuted}
              playsInline
              onClick={togglePlay}
            >
              <source src={hp} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent pointer-events-none rounded-[14px]" />

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/50 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  Click to Play ▶️
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 bg-white/80 hover:bg-white text-black px-5 py-2 rounded-full backdrop-blur-md transition font-semibold shadow-lg focus:ring-4 focus:ring-red-300"
          >
            {isMuted ? "Unmute 🔊" : "Mute 🔇"}
          </button>
        </div>

        {/* Text Content */}
        <div className="bg-white/90 px-6 sm:px-8 py-8 flex items-center border-l-2 border-gray-200 backdrop-blur-lg">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight relative inline-block after:block after:h-1 after:bg-red-500 after:w-16 after:mt-2">
              Who We Are
            </h1>
            <p className="text-lg text-gray-700 max-w-xl leading-relaxed">
              Guardian Gate stands as a beacon of hope and strength, advocating safety, rights, and mental wellness for women and children across the nation.
              We’re powered by a passionate team of individuals who believe that every voice matters and every story deserves to be heard.
              Our platform brings together resources, knowledge, and support to foster empowerment and build a stronger, more resilient community.
            </p>
          </div>
        </div>
      </div>

      <ServicesOverview />
      <EmergencyHelp />
      <Resources />
    </>
  );
}

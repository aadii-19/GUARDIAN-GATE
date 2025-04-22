import { useEffect, useRef, useState } from "react";
import hp from "@/images/hp.mp4";

const aboutSections = [
  {
    title: "Our Mission",
    description:
      "Guardian Gate is dedicated to providing support and resources for women and children's safety and mental well-being.",
  },
  {
    title: "Who We Are",
    description:
      "We are a community-driven initiative focused on creating a safe and supportive environment for those in need.",
  },
  {
    title: "What We Offer",
    description:
      "From emergency helplines to mental health support, we ensure that help is always available.",
  },
  {
    title: "Get Involved",
    description:
      "Join our mission by volunteering, donating, or spreading awareness about safety and well-being.",
  },
  {
    title: "Our Values",
    description:
      "We believe in inclusivity, empathy, and empowering individuals to take control of their safety and well-being.",
  },
  {
    title: "Our Vision",
    description:
      "We envision a world where everyone, especially women and children, can live free from harm and access the support they need.",
  },
];

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(video?.duration || 0);
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-white min-h-screen px-4 md:px-8">
      {/* Hero Split Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] overflow-hidden rounded-3xl border border-gray-300 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.3)] mt-10 backdrop-blur-xl bg-white/70">
        {/* Video Side */}
        <div className="relative p-4 sm:p-6">
          <div className="relative rounded-2xl overflow-hidden border-[5px] border-gray-300 shadow-[0,20px,60px,rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-500">
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

            {/* Video overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none rounded-[14px]" />

            {/* Click to Play Text */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/50 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                  Click to Play ▶️
                </div>
              </div>
            )}

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm rounded-b-[14px] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Timestamp */}
              <div className="text-white text-sm font-semibold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Seek Bar */}
              <input
                type="range"
                min={0}
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={(e) => {
                  const time = parseFloat(e.target.value);
                  if (videoRef.current) {
                    videoRef.current.currentTime = time;
                    setCurrentTime(time);
                  }
                }}
                className="w-full sm:w-3/5 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>

          {/* Mute/Unmute Button */}
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

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-0">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 underline underline-offset-8 decoration-red-500">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutSections.map((section, index) => (
            <div
              key={index}
              tabIndex={0}
              className="service-card fade-in p-5 bg-white/90 border-2 border-gray-200 rounded-2xl shadow-md transition-transform duration-500 ease-in-out focus:ring-4 focus:ring-red-200 focus:outline-none backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {section.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed text-center">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom styles for service cards */}
      <style jsx>{`
        .service-card {
          perspective: 1000px;
        }
        .service-card:hover {
          transform: rotateX(5deg) rotateY(5deg) scale(1.05);
          box-shadow: 0 25px 70px -10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wind, Heart, StretchHorizontal, Smile } from "lucide-react"; // Added Smile icon for Mood Tracker
import BreathingExercise from "@/components/BreathingExercise";
import MeditationTool from "@/components/MeditationTool";
import YogaPoseGuide from "@/components/YogaPoseGuide";
import ModalWindow from "@/components/ModalWindow";
import AffirmationCard from "@/components/AffirmationCard";
import { Typewriter } from "react-simple-typewriter";
import { useSpring, animated } from "@react-spring/web";
import Mood from "@/components/Mood"; // Import the MoodTracker component

export default function MentalWellBeing() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMeditation, setIsModalOpenMeditation] = useState(false);
  const [isModalOpenYoga, setIsModalOpenYoga] = useState(false);
  const [isModalOpenMoodTracker, setIsModalOpenMoodTracker] = useState(false); // State for Mood Tracker Modal

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    {
      title: "Breathing Exercise",
      description: "Calm your mind with deep, guided breathing sessions.",
      icon: <Wind className="w-14 h-14 text-red-500 mb-3" />,
      onClick: () => setIsModalOpen(true),
    },
    {
      title: "Meditation Sessions",
      description: "Center your thoughts and emotions with guided meditations.",
      icon: <Heart className="w-14 h-14 text-red-500 mb-3" />,
      onClick: () => setIsModalOpenMeditation(true),
    },
    {
      title: "Yoga Pose Guide",
      description: "Improve flexibility and mindfulness with yoga poses.",
      icon: <StretchHorizontal className="w-14 h-14 text-red-500 mb-3" />,
      onClick: () => setIsModalOpenYoga(true),
    },
    {
      title: "Mood Tracker", // Added Mood Tracker card
      description: "Track your mood with real-time emotion detection.",
      icon: <Smile className="w-14 h-14 text-red-500 mb-3" />,
      onClick: () => setIsModalOpenMoodTracker(true), // Open Mood Tracker modal
    },
  ];

  const headingSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 1000 },
  });

  const closeMoodTrackerModal = () => {
    setIsModalOpenMoodTracker(false);
    // Stop the camera stream when closing the Mood Tracker modal
    const stream = document.querySelector("video")?.srcObject;
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach(track => track.stop()); // Stops all tracks of the stream
    }
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-6 py-6 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Page Header */}
      <div className="flex justify-center">
        <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 mb-6 flex items-center space-x-4 bg-white/90 backdrop-blur-lg">
          <h2 className="text-4xl font-bold text-center text-black">Mental Well-being & Support</h2>
        </div>
      </div>

      {/* Affirmation Card */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <AffirmationCard />
      </motion.div>

      {/* Tools Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 pt-8"
      >
        <div className="bg-white/60 backdrop-blur-xl border border-red-300 rounded-3xl shadow-[0_8px_30px_rgba(255,0,0,0.1)] p-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(255,0,0,0.2)]">
          {/* Animated Heading */}
          <animated.div style={headingSpring} className="text-center mb-8">
            <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
              <Typewriter
                words={["Your Well-being Toolbox"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore curated tools designed to ease your mind, energize your body, and support your emotional flow.
            </p>
          </animated.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"> {/* 2-column grid for small to large screens */}
            {cards.map(({ title, description, icon, onClick }, idx) => (
              <div
                key={idx}
                onClick={onClick}
                className="group relative bg-white/30 backdrop-blur-xl p-6 rounded-3xl border border-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] hover:scale-[1.04] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  {icon}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-700 text-base font-medium">{description}</p>
                </div>
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-red-400/60 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modals */}
      {isModalOpen && (
        <ModalWindow onClose={() => setIsModalOpen(false)}>
          <BreathingExercise />
        </ModalWindow>
      )}
      {isModalOpenMeditation && (
        <ModalWindow onClose={() => setIsModalOpenMeditation(false)}>
          <MeditationTool />
        </ModalWindow>
      )}
      {isModalOpenYoga && (
        <ModalWindow onClose={() => setIsModalOpenYoga(false)}>
          <YogaPoseGuide />
        </ModalWindow>
      )}
      {isModalOpenMoodTracker && ( // Add Mood Tracker modal
        <ModalWindow onClose={closeMoodTrackerModal}>
          <Mood />
        </ModalWindow>
      )}
    </div>
  );
}

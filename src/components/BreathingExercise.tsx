import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlayCircleIcon, PauseCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function BreathingExercise() {
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [targetTime, setTargetTime] = useState(20);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);
  const hasSpokenRef = useRef(false);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };
  

  useEffect(() => {
    let timeInterval: NodeJS.Timeout;
    if (isPlaying) {
      timeInterval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev + 1 >= targetTime) {
            setIsPlaying(false);
            setHasReachedTarget(true);
            speak("Session complete");
            return targetTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeInterval);
  }, [isPlaying, targetTime]); // ✅ Added targetTime
  

  useEffect(() => {
    let timeInterval: NodeJS.Timeout;
    if (isPlaying) {
      timeInterval = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev + 1 >= targetTime) {
            setIsPlaying(false);
            setHasReachedTarget(true);
            speak("Session complete");
            return targetTime;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && !hasSpokenRef.current) {
      speak(isBreathingIn ? "Inhale" : "Exhale");
      hasSpokenRef.current = true;
    }
  }, [isBreathingIn, isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    setHasReachedTarget(false);
    setIsBreathingIn(true);
    hasSpokenRef.current = false;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-2">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">Breathing Exercise</h1>
      <hr className="border-red-500 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-[60%_40%] gap-6 items-center w-full">
          <div className="flex flex-col items-center space-y-16">
            <motion.div
              animate={isPlaying && !hasReachedTarget ? { scale: isBreathingIn ? 1.5 : 1 } : { scale: 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-40 h-40 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl shadow-xl border-4 border-white drop-shadow-lg"
            >
              {hasReachedTarget ? "Done" : isPlaying ? (isBreathingIn ? "Inhale" : "Exhale") : "Paused"}
            </motion.div>

            <div className="flex space-x-4">
              <Button
                className="px-6 py-3 rounded-lg shadow-lg bg-red-500 text-white hover:bg-red-300 transition-transform hover:scale-105 border-2 border-white drop-shadow-lg flex items-center"
                onClick={() => {
                  if (!isPlaying) {
                    speak("Inhale"); // 🔥 Speak only when Play is clicked the first time
                    hasSpokenRef.current = true;
                  }
                  setIsPlaying((prev) => !prev);
                }}
                disabled={hasReachedTarget}
              >
                {isPlaying ? <PauseCircleIcon className="w-6 h-6" /> : <PlayCircleIcon className="w-6 h-6" />}
                <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
              </Button>

              <Button
                className="px-6 py-3 rounded-lg shadow-lg bg-red-500 text-white hover:bg-red-300 transition-transform hover:scale-105 border-2 border-white drop-shadow-lg flex items-center"
                onClick={handleReset}
              >
                <ArrowPathIcon className="w-6 h-6" />
                <span className="ml-2">Reset</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-8 text-gray-800">
            <h3 className="text-xl font-semibold text-center">Session Stats</h3>
            <p>Time Spent: <span className="font-bold">{elapsedTime} sec</span></p>
            <p>Target Time: <span className="font-bold">{targetTime} sec</span></p>

            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-red-500 h-full transition-all"
                style={{ width: `${(elapsedTime / targetTime) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">Progress: {Math.round((elapsedTime / targetTime) * 100)}%</p>

            <div className="flex justify-center space-x-2">
              {[20, 40, 60].map((time) => (
                <Button
                  key={time}
                  className={`px-4 py-2 rounded-lg shadow-md border-2 drop-shadow-lg ${
                    targetTime === time ? "bg-red-500 text-white" : "bg-white text-gray-800"
                  } hover:bg-red-300 hover:text-white`}
                  onClick={() => {
                    setTargetTime(time);
                    handleReset();
                  }}
                >
                  {time} sec
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-gray-800 text-lg space-y-4">
          <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-2">How to Use</h2>
          <p>1. Click the <strong>Play</strong> button to start the guided breathing exercise.</p>
          <p>2. The circle will expand while inhaling and shrink while exhaling.</p>
          <p>3. Follow the visual and audio cues to sync your breathing.</p>
          <p>4. Click <strong>Pause</strong> anytime to stop the animation and voice guidance.</p>
          <p>5. Click <strong>Reset</strong> to restart the session from zero.</p>
          <p>6. Select a <strong>Target Time</strong> (20s, 40s, or 60s) for your session.</p>
          <p>7. Once the target time is reached, the session automatically stops and the voice will say "Session complete".</p>
        </div>
      </div>
      <div className="mt-12 text-gray-800 text-lg space-y-4">
        <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-2">Benefits of This Tool</h2>
        <p>✔ Helps reduce stress and anxiety by promoting deep breathing techniques.</p>
        <p>✔ Improves focus and concentration by syncing breath with movement.</p>
        <p>✔ Enhances lung capacity and overall respiratory health.</p>
        <p>✔ Encourages mindfulness, helping you stay present and relaxed.</p>
        <p>✔ Can be used anytime for a quick mental reset or relaxation session.</p>
      </div>
    </div>
  );
}


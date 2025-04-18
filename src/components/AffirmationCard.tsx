import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const affirmations = [
  "🌟 You are enough. You’ve always been enough. Don't let anyone or anything make you feel otherwise. Embrace your unique worth.",
  "💖 I am in charge of how I feel, and today I choose peace. No matter the challenges, I hold the power to maintain my calm and inner peace.",
  "🌱 I trust the journey, even when I don’t understand it. Every step, no matter how uncertain, is leading me to something beautiful and meaningful.",
  "💪 My mind is strong. My heart is calm. I am resilient and can overcome anything. Today, I stand strong in my thoughts and emotions.",
  "🌻 I am doing my best, and that is enough. I honor the effort I put into everything, and I am proud of my progress, no matter the pace.",
  "✨ I radiate positivity and good vibes. My energy is contagious, and I spread light and love wherever I go.",
  "🌸 I deserve all the love and happiness the world has to offer. I am open to receiving the abundance of joy, love, and blessings around me.",
  "🦋 I am constantly growing and evolving. I embrace change, knowing that every day brings new opportunities to learn and grow into my best self.",
  "🌞 Today is a new beginning, full of endless possibilities. I release the past and welcome the fresh opportunities today brings with an open heart.",
  "🌈 I am grateful for today and all that it brings. No matter what happens, I choose to focus on the good and find joy in every moment.",
];

export default function AffirmationCard() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  const getNewQuote = () => {
    setQuote(affirmations[Math.floor(Math.random() * affirmations.length)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mb-4 px-4"
    >
      <div className="bg-white/60 backdrop-blur-xl border border-red-300 rounded-3xl shadow-[0_8px_30px_rgba(255,0,0,0.1)] p-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(255,0,0,0.2)]">
        <h3 className="text-3xl font-bold text-red-500 mb-2 text-center drop-shadow-sm tracking-tight">
          🌞 Daily Affirmation
        </h3>
        <p className="text-center text-xl font-medium text-gray-800 italic leading-relaxed mb-2">
          “{quote}”
        </p>
        <div className="flex justify-center">
          <button
            onClick={getNewQuote}
            className="bg-red-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-red-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            New Affirmation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

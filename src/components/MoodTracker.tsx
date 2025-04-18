// components/MoodTracker.tsx
import { useState, useEffect } from "react";

const moods = ["😊", "😐", "😢", "😠", "😴"];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("moodData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedMood(parsed.mood);
      setNote(parsed.note);
    }
  }, []);

  const saveMood = () => {
    localStorage.setItem("moodData", JSON.stringify({ mood: selectedMood, note }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-md mx-auto text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 How are you feeling today?</h3>
      <div className="flex justify-center space-x-3 mb-4">
        {moods.map((mood, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMood(mood)}
            className={`text-3xl ${selectedMood === mood ? 'scale-125' : 'opacity-70'} transition-transform`}
          >
            {mood}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Why do you feel this way?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border p-2 rounded-lg mb-4"
      />
      <button
        onClick={saveMood}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
      >
        Save Mood
      </button>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Volume2, Volume1, VolumeX } from 'lucide-react';
import birdsChirping from '@/components/audio/birds-chirping.mp3';
import cricketSound from '@/components/audio/cricket.mp3';
import rainSound from '@/components/audio/rain.mp3';
  
const meditationSessions = [
  {
    id: 1,
    name: "Morning Awakening",
    duration: 600, // 10 minutes
    description: "Start your day with clarity and calm.",
    instructions: [
      "Find a quiet space and sit comfortably.",
      "Close your eyes and take a deep breath.",
      "Allow thoughts to pass by without judgment.",
      "Focus on the sound of your breath and your inner calm.",
      "Let the guided voice lead you into a deeper state of relaxation."
    ],
    ambientSound: birdsChirping
  },
  {
    id: 2,
    name: "Evening Reflection",
    duration: 900, // 15 minutes
    description: "Wind down your day with reflective meditation.",
    instructions: [
      "Find a quiet and comfortable place.",
      "Sit or lie down in a relaxed position.",
      "Close your eyes and focus on your breath.",
      "Let your thoughts settle and allow feelings of gratitude to arise.",
      "Reflect on the day and let go of any tension."
    ],
    ambientSound: cricketSound
  },
  {
    id: 3,
    name: "Stress Relief",
    duration: 480, // 8 minutes
    description: "Calm your mind and reduce stress quickly.",
    instructions: [
      "Sit comfortably and relax your shoulders.",
      "Close your eyes and take a slow, deep breath.",
      "Let the guided instructions lead you into a state of relaxation.",
      "Visualize tension melting away with every exhale.",
      "Focus on the sensations of calm and peace."
    ],
    ambientSound: rainSound
  }
];

function MeditationTool() {
  const [activeSession, setActiveSession] = useState<{
    id: number;
    name: string;
    duration: number;
    description: string;
    instructions: string[];
    ambientSound: string;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [totalMeditatedMinutes, setTotalMeditatedMinutes] = useState<number>(0);
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [sessionHistory, setSessionHistory] = useState<
    {
      session: string;
      duration: number;
      timestamp: string;
      journal: string;
    }[]
  >([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // When a new session is selected, reset timer and states
  useEffect(() => {
    if (activeSession) {
      setTimeLeft(activeSession.duration);
      setIsPlaying(false);
    }
  }, [activeSession]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Session completed
      setIsPlaying(false);
      setCompletedSessions(prev => prev + 1);
      if (activeSession) {
        setTotalMeditatedMinutes(prev => prev + Math.round(activeSession.duration / 60));
      }
      if (activeSession) {
        setSessionHistory(prev => [
          ...prev,
          {
            session: activeSession.name,
            duration: activeSession.duration,
            timestamp: new Date().toLocaleString(),
            journal: journalEntry
          }
        ]);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, activeSession, journalEntry]);

  // Update ambient audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (activeSession) {
      setIsPlaying(!isPlaying);
      if (!isPlaying && activeSession.ambientSound) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  };

  const resetSession = () => {
    if (activeSession) {
      setTimeLeft(activeSession.duration);
      setIsPlaying(false);
      audioRef.current && (audioRef.current.pause(), (audioRef.current.currentTime = 0));
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />;
    if (volume < 50) return <Volume1 className="w-5 h-5" />;
    return <Volume2 className="w-5 h-5" />;
  };

  const handleSessionSelect = (session: {
    id: number;
    name: string;
    duration: number;
    description: string;
    instructions: string[];
    ambientSound: string;
  }) => {
    setActiveSession(session);
    setJournalEntry("");
  };

  const handleJournalSubmit = () => {
    if (activeSession && timeLeft === 0 && journalEntry.trim() !== "") {
      setSessionHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].journal = journalEntry;
        return newHistory;
      });
      setJournalEntry("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-2 bg-white">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">Meditation Sessions</h1>
      <hr className="border-red-500 mb-8" />

      {/* Session selection */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Meditation Session:</h2>
        <h1 className="text-1xl font-semibold text-gray-800 mb-4">Choose a session to start meditating:</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {meditationSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSessionSelect(session)}
              className={`p-3 rounded-lg border transition-colors ${
                activeSession?.id === session.id
                  ? "bg-red-200 border-red-500"
                  : "bg-white border-gray-300 hover:border-red-400"
              } text-left`}
            >
              <h3 className="text-lg font-bold">{session.name}</h3>
              <p className="text-xs text-gray-700">{session.description}</p>
              <p className="text-xs text-gray-500">Duration: {formatTime(session.duration)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active session */}
      {activeSession && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{activeSession.name}</h2>
          <div className="text-4xl font-mono text-center mb-4 text-gray-800">{formatTime(timeLeft)}</div>
          
          {/* Guided instructions */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Guided Instructions:</h3>
            <ol className="list-decimal list-inside text-gray-700">
              {activeSession.instructions.map((step, index) => (
                <li key={index} className="mb-1">{step}</li>
              ))}
            </ol>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={resetSession}
              className="p-2 border-2 border-red-500 rounded hover:bg-red-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Volume control */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {getVolumeIcon()}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-40 accent-red-500"
            />
          </div>

          {/* Ambient audio */}
          {activeSession.ambientSound && (
            <audio src={activeSession.ambientSound} ref={audioRef} loop />
          )}

          {/* Journaling prompt after session completion */}
          {timeLeft === 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do you feel?</h3>
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Write a brief journal entry about your session..."
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleJournalSubmit}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                >
                  Enter Your Thoughts
                </button>
              </div>
            )}
          </div>
      )}

      

      {/* Session history */}
      {sessionHistory.length > 0 && (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Session History</h2>
          <ul className="divide-y divide-gray-200">
            {sessionHistory.map((entry, index) => (
                <li key={index} className="py-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">{entry.session}</span>
                  <span className="text-sm text-gray-500">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">Duration: {formatTime(entry.duration)}</p>
                {entry.journal && <p className="text-sm text-gray-600 italic">Journal: "{entry.journal}"</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* How to Use Section */}
      <div className="mt-12 text-gray-800 text-lg space-y-4">
        <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-2">How to Use</h2>
        <p>1. Select a meditation session from the boxes above.</p>
        <p>2. Once selected, review the session details and follow the guided instructions.</p>
        <p>3. Use the play/pause controls to manage the session timer and ambient audio.</p>
        <p>4. Adjust the volume of the ambient sound using the slider.</p>
        <p>5. After the session ends, record your feelings in the journal entry box.</p>
        <p>6. Check your progress and session history to track your meditation journey.</p>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 text-gray-800 text-lg space-y-4">
        <h2 className="text-3xl font-bold border-b-4 border-red-500 pb-2">Benefits of This Tool</h2>
        <p>✔ Helps reduce stress and anxiety through guided meditation.</p>
        <p>✔ Promotes mindfulness and self-reflection.</p>
        <p>✔ Enhances focus and improves mental clarity.</p>
        <p>✔ Provides progress tracking to motivate continued practice.</p>
        <p>✔ Allows you to log and reflect on your meditation experience.</p>
      </div>
    </div>
  );
}

export default MeditationTool;

import * as faceapi from 'face-api.js';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const moodContent: Record<string, { title: string; message: string; advice: string }> = {
  happy: {
    title: "Overflowing with Joy ✨",
    message: "Your smile is lighting up the screen! You're radiating positivity and warmth.",
    advice: "Channel that joy—dance like no one’s watching, or send a sweet text to someone you love.",
  },
  sad: {
    title: "Waves of Sadness 🌧️",
    message: "We sense a heavy heart. It's completely okay to feel this way.",
    advice: "Wrap yourself in comfort—try journaling, listening to soft music, or simply resting.",
  },
  angry: {
    title: "Stormy Skies 🌩️",
    message: "There's some tension in your expression. Anger is valid, and it’s trying to tell you something.",
    advice: "Step away, breathe deeply, maybe take a walk or punch a pillow. You’ve got this.",
  },
  surprised: {
    title: "Caught Off Guard 😮",
    message: "That look says something unexpected hit you!",
    advice: "Take a breath and ground yourself. Sometimes surprises lead to the best moments.",
  },
  neutral: {
    title: "Calm & Collected 🌸",
    message: "You're in a neutral space, balanced and steady. That’s a peaceful place to be.",
    advice: "Stay present. Reflect or just enjoy the calm—this is your inner reset zone.",
  },
  fearful: {
    title: "On Edge 😰",
    message: "We sense a bit of fear or unease—your body might be trying to protect you.",
    advice: "You are safe. Try the 5-4-3-2-1 grounding method or hug something soft for comfort.",
  },
  disgusted: {
    title: "Something’s Not Sitting Right 😒",
    message: "You look unsettled—maybe something is out of sync or unpleasant.",
    advice: "Acknowledge the feeling. Step back, breathe, and give yourself space to recalibrate.",
  },
};

const MoodTracker = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [emotion, setEmotion] = useState('');
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      setIsModelsLoaded(true);
    };

    const setupWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => setIsVideoReady(true);
      }
    };

    loadModels();
    setupWebcam();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (isVideoReady && isModelsLoaded && videoRef.current) {
      const detect = async () => {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current!,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
          )
          .withFaceExpressions();

        if (detections?.expressions) {
          const detected = detections.expressions.asSortedArray()[0];
          if (detected.probability > 0.5) {
            setEmotion(detected.expression);
          }
        }
      };

      const interval = setInterval(() => {
        detect();
        setCountdown(5);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isVideoReady, isModelsLoaded]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-6 py-12 rounded-3xl bg-white/60 backdrop-blur-xl border border-gray-200 shadow-[0_20px_80px_rgba(255,0,0,0.15)]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-5xl font-bold text-center text-red-600 mb-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.2)] tracking-wide">
        Mood Tracker 💡
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Emotion Panel */}
        <motion.div
          className="bg-white/40 backdrop-blur-2xl p-10 rounded-[2rem] border border-gray-300 shadow-[0_10px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_60px_rgba(255,0,0,0.2)] transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {emotion ? (
            <>
              <h3 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-sm">{moodContent[emotion]?.title}</h3>
              <p className="text-lg text-gray-700 mt-3 leading-relaxed">{moodContent[emotion]?.message}</p>
              <p className="mt-4 italic text-gray-600">{moodContent[emotion]?.advice}</p>
              <p className="mt-6 text-sm text-gray-500">
                ⏳ Next check in: <span className="font-semibold text-red-600">{countdown}s</span>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-lg">
              {isModelsLoaded && isVideoReady ? (
                'Detecting emotion...'
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <Loader2 className="animate-spin" />
                  <span>Loading magic...</span>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Webcam Feed */}
        <motion.div
          className="flex justify-center transition-transform hover:scale-105"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="rounded-[2rem] overflow-hidden border-[6px] border-red-400 shadow-[0_10px_50px_rgba(255,0,0,0.2)] transition-all duration-300">
            <video
              ref={videoRef}
              autoPlay
              muted
              width="500"
              height="380"
              className="rounded-2xl brightness-105 contrast-105 saturate-[1.2]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoodTracker;

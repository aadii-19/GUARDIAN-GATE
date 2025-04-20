import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Typewriter } from 'react-simple-typewriter';
import ModalWindow from '@/components/ModalWindow';
import DiscreetCamera from '@/components/DiscreetCamera';
import { Button } from "@/components/ui/button";
import FakeUIScreen from '@/components/FakeUIScreen';  // Adjust the path as needed
import homebg from "@/images/homebg.jpg";
import { useSpring, animated } from "@react-spring/web";
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showFakeUI, setShowFakeUI] = useState(false);
  const navigate = useNavigate();
  const headingSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-40px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 1000 },
  });

  const textSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
    config: { duration: 1200 },
  });

  const buttonSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 600,
    config: { duration: 1200 },
  });
  useEffect(() => {
    setShowEmergency(false);
    setLocation(null);

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) navigate('/');
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data, error;

      if (isLogin) {
        ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
      } else {
        ({ data, error } = await supabase.auth.signUp({ email, password }));
      }

      if (error) {
        alert(`❌ ${error.message}`);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      alert(`Something went wrong: ${err.message || err}`);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(`Error signing out: ${error.message}`);
    else {
      setSession(null);
      setIsLogin(true);
    }
  };

  const triggerEmergencyAlert = () => {
    setShowEmergency(true);
    setLocation(null); // Reset location to refetch
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleShareLocation = () => {
    if (!location) return;
    const link = `https://maps.google.com/?q=${location.lat},${location.lng}`;

    if (navigator.share) {
      navigator.share({
        title: 'Emergency! Track my location',
        text: 'Here is my current location. Please help.',
        url: link,
      }).catch((err) => console.error('Share failed:', err));
    } else {
      alert('Sharing is not supported in this browser. Copy and send the link manually.');
    }
  };

  return (
    
    <div 
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: `url(${homebg})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire div
    backgroundPosition: "center", // Center the background image
    backgroundAttachment: "fixed", // Optional: for parallax effect
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
    }}>
      {showFakeUI && <FakeUIScreen onClose={() => setShowFakeUI(false)} />}
    <button
    onClick={() => setShowFakeUI(true)}
    className="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.8)]"
    >
    🖥️ Activate Fake UI
    </button>
      <button
        onClick={triggerEmergencyAlert}
        className="fixed top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.8)]"
      >
        🚨 Emergency
      </button>

      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-red-300 via-red-500 to-red-300 animate-bgMove" />
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-red-500 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-rose-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />

      {!showEmergency && (
        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,0,0,0.6)]">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-tight drop-shadow-lg">
            {isLogin ? 'Login to Guardian Gate' : 'Create Your Account'}
          </h2>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none bg-white/80 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-500 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="my-4 text-center text-gray-300">or</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-400 text-white font-medium py-3 rounded-xl bg-white/10 backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]"
          >
            Continue with Google
          </button>

          <div className="text-sm text-center text-gray-200 mt-6">
            {isLogin ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-red-300 underline font-semibold hover:text-red-200"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-red-300 underline font-semibold hover:text-red-200"
                >
                  Log in
                </button>
              </>
            )}
          </div>

          {session && (
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            >
              Sign Out
            </button>
          )}
        </div>
      )}

{showEmergency && (
  <ModalWindow onClose={() => setShowEmergency(false)}>
    <div className="text-black text-center space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* Heading Box */}
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border-2 border-gray-300 shadow-xl inline-block">
        <animated.h2
          style={headingSpring}
          className="text-3xl sm:text-4xl font-bold text-red-600 drop-shadow-xl"
        >
          🚨 Emergency Mode Activated
        </animated.h2>
      </div>

      {/* Typewriter Text for Location Sharing */}
      <p className="text-lg sm:text-xl text-gray-800 mt-6">
        <Typewriter
          words={['Share this link to allow others to track your live location.']}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </p>

      {/* Box for location */}
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border-2 border-gray-300 shadow-xl space-y-4">
        <p className="text-base sm:text-lg font-medium text-gray-900">📍 Your current location:</p>

        {location ? (
          <>
            <a
              href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-black/40 text-white px-4 py-3 rounded-lg text-sm sm:text-base break-all underline hover:text-red-300 transition-all duration-300"
            >
              https://maps.google.com/?q={location.lat},{location.lng}
            </a>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <animated.button
                style={buttonSpring}
                onClick={handleShareLocation}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 text-base sm:text-lg rounded-xl font-semibold shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,0,0,0.7)] border-2 border-red-600"
              >
                📤 Share Location
              </animated.button>
              <animated.button
                style={buttonSpring}
                onClick={() => setShowEmergency(false)}
                className="bg-white hover:bg-gray-100 text-red-600 px-5 py-3 text-base sm:text-lg rounded-xl font-semibold shadow-md transition-all duration-300 border-2 border-red-600"
              >
                Back to Login
              </animated.button>
            </div>
          </>
        ) : (
          <p className="text-red-600 text-base sm:text-lg font-semibold animate-pulse">Fetching location...</p>
        )}
      </div>

      {/* 🎥 Camera Button */}
      {showCamera && <DiscreetCamera onClose={() => setShowCamera(false)} />}
      <animated.button
        style={buttonSpring}
        onClick={() => setShowCamera(true)}
        className="w-full sm:w-auto bg-black/80 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl text-center shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.6)] border-2 border-black"
      >
        🎥 Capture Evidence Silently
      </animated.button>

      {/* Emergency Services Section with All Buttons in One Box */}
      <div className="border-2 border-red-600 rounded-xl p-6 shadow-lg space-y-4">
        <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center">Choose your emergency service:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <animated.a
            style={buttonSpring}
            href="tel:100"
            className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300"
          >
            🚓 Police
          </animated.a>
          <animated.a
            style={buttonSpring}
            href="tel:102"
            className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300"
          >
            🚑 Ambulance
          </animated.a>
          <animated.a
            style={buttonSpring}
            href="tel:101"
            className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300"
          >
            🔥 Fire
          </animated.a>
          <animated.a
            style={buttonSpring}
            href="tel:1091"
            className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300"
          >
            ☎️ Women Helpline
          </animated.a>
        </div>
      </div>
    </div>
  </ModalWindow>
)}



      
    </div>
  );
}

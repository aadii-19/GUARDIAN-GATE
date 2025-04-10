import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import ModalWindow from '@/components/ModalWindow';
import DiscreetCamera from '@/components/DiscreetCamera';
import FakeUIScreen from '@/components/FakeUIScreen';  // Adjust the path as needed

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
    
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
        <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl transition-all duration-300 hover:shadow-[0_10px_10px_rgba(255,0,0,0.6)]">
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
      <h2 className="text-3xl sm:text-4xl font-bold text-red-600 drop-shadow-md">
        🚨 Emergency Mode Activated
      </h2>
      <p className="text-lg sm:text-xl text-gray-800">
        Share this link to allow others to track your <span className="font-semibold text-red-500">live location</span>.
      </p>

      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-md space-y-4">
        <p className="text-base sm:text-lg font-medium text-gray-900">📍 Your current location:</p>

        {location ? (
          <>
            <a
              href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-black/40 text-white px-4 py-3 rounded-lg text-sm sm:text-base break-all underline hover:text-red-300 transition-all"
            >
              https://maps.google.com/?q={location.lat},{location.lng}
            </a>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
              <button
                onClick={handleShareLocation}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 text-base sm:text-lg rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.7)]"
              >
                📤 Share Location
              </button>
              <button
                onClick={() => setShowEmergency(false)}
                className="bg-white hover:bg-gray-100 text-red-600 px-5 py-3 text-base sm:text-lg rounded-xl font-semibold shadow-md transition-all duration-300 border border-red-300"
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-600 text-base sm:text-lg font-semibold animate-pulse">Fetching location...</p>
        )}
      </div>

      {/* 🔥 Add Camera Button Here */}
      {showCamera && <DiscreetCamera onClose={() => setShowCamera(false)} />}
      <button
        onClick={() => setShowCamera(true)}
        className="w-full sm:w-auto bg-black/80 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.4)]"
      >
        🎥 Capture Evidence Silently
      </button>

      {/* Emergency Services */}
      <div className="space-y-6">
        <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center">Choose your emergency service:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="tel:100" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]">🚓 Police</a>
          <a href="tel:102" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]">🚑 Ambulance</a>
          <a href="tel:101" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]">🔥 Fire</a>
          <a href="tel:1091" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl text-center shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,0,0.6)]">☎️ Women Helpline</a>
        </div>
      </div>
      
      
    </div>
  </ModalWindow>
)}



      <style>
        {`
          @keyframes bgMove {
            0% { background-position: 0% 0%; }
            25% { background-position: 50% 100%; }
            50% { background-position: 100% 50%; }
            75% { background-position: 50% 0%; }
            100% { background-position: 0% 0%; }
          }

          .animate-bgMove {
            background-size: 300% 300%;
            animation: bgMove 16s ease-in-out infinite;
          }

          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }

          .animate-blob {
            animation: blob 10s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
    </div>
  );
}

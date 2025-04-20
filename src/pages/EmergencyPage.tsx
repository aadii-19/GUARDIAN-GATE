import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust the import based on your file structure

export function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [emergency1, setEmergency1] = useState<string>('');
  const [emergency2, setEmergency2] = useState<string>('');
  const [emergency3, setEmergency3] = useState<string>('');

  // Fetch user's emergency contacts and location
  useEffect(() => {
    // Get user from Supabase
    const fetchUserProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error('Error fetching user:', error);
        return;
      }

      // Fetch user profile from Supabase
      const { data, error: profileError } = await supabase
        .from('user_profiles')
        .select('emergency1, emergency2, emergency3')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      setEmergency1(data?.emergency1 || '');
      setEmergency2(data?.emergency2 || '');
      setEmergency3(data?.emergency3 || '');
    };

    fetchUserProfile();

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
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleShareLocation = () => {
    if (!location) return;
    const link = `https://maps.google.com/?q=${location.lat},${location.lng}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Emergency! Track my location',
          text: 'Here is my current location. Please help.',
          url: link,
        })
        .catch((err) => console.error('Share failed:', err));
    } else {
      prompt('Copy this link to share:', link);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-black flex items-center justify-center">
      <div className="flex flex-row w-full max-w-5xl gap-8">
        {/* Left Section: Guidelines */}
        <div className="flex-1 w-1/2 bg-gradient-to-r from-gray-100 via-white to-gray-100 p-8 rounded-3xl shadow-xl border-2 border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">⚡ How to Use This Tool</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-4">
            <li>
              <strong>Live Location:</strong> This tool fetches your live location and generates a link to share with others for emergency assistance.
            </li>
            <li>
              <strong>Quick Access Numbers:</strong> Easily call emergency services like the police, ambulance, or fire services by clicking the respective number.
            </li>
            <li>
              <strong>Share Location:</strong> After fetching your location, you can share it with others to get immediate help.
            </li>
          </ul>

          {/* New Section: Benefits */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌟 Benefits of Using This Tool</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-4">
              <li>
                <strong>Quick Response:</strong> Helps emergency responders or your loved ones reach you faster by sharing your real-time location.
              </li>
              <li>
                <strong>Easy Access:</strong> The tool provides a simple, no-fuss way to connect with critical services, especially in urgent situations.
              </li>
              <li>
                <strong>Peace of Mind:</strong> Knowing that help is just a button away brings confidence and reduces panic during emergencies.
              </li>
              <li>
                <strong>Privacy-Safe:</strong> No need to share personal data; only your location is sent, ensuring privacy while still getting help.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Emergency Tool */}
        <div className="flex-1 w-1/2 bg-gradient-to-r from-gray-100 via-white to-gray-100 p-8 rounded-3xl shadow-xl border-2 border-gray-300">
          <h1 className="text-4xl font-bold mb-6 text-red-600 text-center">🚨 Emergency Mode</h1>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📍 Live Location</h2>

            {location ? (
              <>
                <a
                  href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-red-100 text-red-800 px-4 py-2 rounded-md mb-4 underline hover:bg-red-200 transition-all duration-300"
                >
                  {`https://maps.google.com/?q=${location.lat},${location.lng}`}
                </a>
                <button
                  onClick={handleShareLocation}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                >
                  📤 Share Location
                </button>
              </>
            ) : (
              <p className="text-gray-600 animate-pulse">Fetching your location...</p>
            )}

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">🚑 Quick Access Numbers:</h3>
              <ul className="grid gap-3">
                <li>
                  <a
                    href="tel:100"
                    className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    🚓 Police
                  </a>
                </li>
                <li>
                  <a
                    href="tel:102"
                    className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    🚑 Ambulance
                  </a>
                </li>
                <li>
                  <a
                    href="tel:101"
                    className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    🔥 Fire
                  </a>
                </li>
                <li>
                  <a
                    href="tel:1091"
                    className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    ☎️ Women Helpline
                  </a>
                </li>

                {/* New Emergency Contacts from Supabase */}
                {emergency1 && (
                  <li>
                    <a
                      href={`tel:${emergency1}`}
                      className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      📞 {emergency1}
                    </a>
                  </li>
                )}
                {emergency2 && (
                  <li>
                    <a
                      href={`tel:${emergency2}`}
                      className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      📞 {emergency2}
                    </a>
                  </li>
                )}
                {emergency3 && (
                  <li>
                    <a
                      href={`tel:${emergency3}`}
                      className="block bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      📞 {emergency3}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

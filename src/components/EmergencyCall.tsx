import { useState } from 'react';

export default function EmergencyFakeCall() {
  const [showFakeCallSetup, setShowFakeCallSetup] = useState(true); // Show input form first
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFakeCallActive, setIsFakeCallActive] = useState(false); // To manage the fake call state

  // Handle the setup of the fake call
  const handleCallSetup = () => {
    if (name && phoneNumber) {
      setShowFakeCallSetup(false); // Hide input form after setup
      setIsFakeCallActive(true); // Start the fake call
    }
  };

  // End the fake call
  const handleEndCall = () => {
    setIsFakeCallActive(false); // End the fake call
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-800 text-white">
      {/* Emergency Button */}
      <button
        className="absolute top-10 left-10 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        onClick={() => {}}
      >
        Emergency
      </button>

      {/* Button to set up the fake call */}
      <button
        className="absolute bottom-10 right-10 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => setShowFakeCallSetup(true)}
      >
        Set up Fake Call
      </button>

      {/* Fake Call Setup (Input Form) */}
      {showFakeCallSetup && !isFakeCallActive && (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-80 mx-auto">
          <h2 className="text-xl font-semibold text-center mb-4">Set up Fake Call</h2>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-gray-600 text-white"
          />
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-gray-600 text-white"
          />
          <button
            className="w-full py-3 bg-green-600 rounded-lg text-white font-semibold"
            onClick={handleCallSetup}
          >
            Start Fake Call
          </button>
        </div>
      )}

      {/* Fake Call Screen (Modal) */}
      {isFakeCallActive && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg w-96 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Incoming Call</h2>
            <p className="text-xl text-white">{name}</p>
            <p className="text-lg text-gray-400 mb-6">{phoneNumber}</p>

            <div className="flex justify-between">
              <button
                className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold"
                onClick={handleEndCall}
              >
                Answer
              </button>
              <button
                className="bg-red-600 px-6 py-3 rounded-lg text-white font-semibold"
                onClick={handleEndCall}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

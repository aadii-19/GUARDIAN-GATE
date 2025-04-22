import { useState } from 'react';

type ScreenType = 'chat' | 'calculator' | 'news';

export default function FakeUIScreen({
  onClose,
}: {
  onClose: () => void;
}) {
  const [screen, setScreen] = useState<ScreenType>('chat');

  const renderFakeContent = () => {
    switch (screen) {
      case 'chat':
        return (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-6">📱 Chat App</h1>
            <div className="w-full max-w-lg space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <p className="text-gray-800">👤 Alex: Hey, what time is the meeting?</p>
                  <p className="text-sm text-gray-500">10:15 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 self-end bg-blue-50 p-4 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-400"></div>
                <div className="flex-1 text-right">
                  <p className="text-blue-800">You: Around 3 PM. See you!</p>
                  <p className="text-sm text-gray-500">10:16 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
                <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                <div className="flex-1">
                  <p className="text-gray-800">👤 Jordan: Don’t forget the slides!</p>
                  <p className="text-sm text-gray-500">10:17 AM</p>
                </div>
              </div>
            </div>
          </>
        );
      case 'calculator':
        return (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-6">🧮 Calculator</h1>
            <div className="bg-white p-6 rounded-xl shadow-md w-80 mx-auto">
              <div className="bg-gray-50 p-4 rounded-xl text-right text-3xl font-mono mb-6">
                <p className="text-gray-800">42 + 69 = 111</p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {['7', '8', '9', '/'].map((item) => (
                  <button
                    key={item}
                    className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none"
                  >
                    {item}
                  </button>
                ))}
                {['4', '5', '6', 'x'].map((item) => (
                  <button
                    key={item}
                    className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none"
                  >
                    {item}
                  </button>
                ))}
                {['1', '2', '3', '-'].map((item) => (
                  <button
                    key={item}
                    className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none"
                  >
                    {item}
                  </button>
                ))}
                {['0', '.', '=', '+'].map((item) => (
                  <button
                    key={item}
                    className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-lg font-semibold text-gray-800 focus:outline-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </>
        );
      case 'news':
        return (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mt-8 mb-6">📰 Daily Times</h1>
            <div className="max-w-lg space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Scientists Discover Water on Mars
                </h2>
                <p className="text-gray-600 mb-3">
                  In a surprising breakthrough, NASA reports signs of water on Mars, revealing potential for future human missions to the red planet...
                </p>
                <p className="text-sm text-gray-500">Published: April 10, 2025</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Tech Giants Face New Privacy Challenges</h2>
                <p className="text-gray-600 mb-3">
                  Major tech companies have come under scrutiny for their data privacy practices, with new regulations likely to shape the future of digital rights...
                </p>
                <p className="text-sm text-gray-500">Published: April 9, 2025</p>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-700 text-white flex flex-col items-center justify-start p-8">
      {/* Selector */}
      <div className="absolute top-6 left-6 flex gap-6">
        <button
          onClick={() => setScreen('chat')}
          className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-full text-lg font-semibold focus:outline-none"
        >
          Chat
        </button>
        <button
          onClick={() => setScreen('calculator')}
          className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-full text-lg font-semibold focus:outline-none"
        >
          Calculator
        </button>
        <button
          onClick={() => setScreen('news')}
          className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-full text-lg font-semibold focus:outline-none"
        >
          News
        </button>
      </div>

      {/* Fake UI */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {renderFakeContent()}
      </div>

      {/* Exit Button */}
      <button
        onClick={onClose}
        className="absolute bottom-6 text-sm text-gray-400 underline hover:text-white transition-colors"
      >
        🔙 Back to Real UI
      </button>
    </div>
  );
}

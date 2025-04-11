import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faUser,
  faGavel,
  faPaperPlane,
  faComments,
  faRedo,
  faTrash,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import BinButton from "../components/BinButton"; // adjust path if needed

const LegalChatbot: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState<{ type: "user" | "bot"; message: string; time: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setChatLog([
      {
        type: "bot",
        message: "Hi! I’m your legal assistant. Ask me anything related to Indian law!",
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const newChatLog: { type: "user" | "bot"; message: string; time: string }[] = [
      ...chatLog,
      { type: "user", message: userInput, time: timestamp },
    ];
    setChatLog(newChatLog);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful legal assistant specialized in Indian law. Be concise, clear, and provide correct legal guidance based on Indian law and rights.",
            },
            ...newChatLog.map((chat) => ({
              role: chat.type === "user" ? "user" : "assistant",
              content: chat.message,
            })),
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      setChatLog((prev) => [
        ...prev,
        {
          type: "bot",
          message: reply || "Sorry, I couldn’t fetch a response.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch {
      setChatLog((prev) => [
        ...prev,
        {
          type: "bot",
          message: "An error occurred while fetching the response.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={`min-h-screen grid grid-cols-[1fr_3fr] ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} font-sans`}>
      {/* Spinner Styles */}
      <style>{`
        .spinner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          background: linear-gradient(135deg, rgb(186, 66, 255), rgb(0, 225, 255));
          animation: spin 1.3s linear infinite, auraPulse 2.5s ease-in-out infinite;
          filter: blur(1px);
          box-shadow:
            0 0 20px rgba(186, 66, 255, 0.6),
            0 0 35px rgba(0, 225, 255, 0.4),
            0 0 50px rgba(186, 66, 255, 0.3),
            0 0 75px rgba(0, 225, 255, 0.2);
          transition: all 0.3s ease-in-out;
        }
  
        .spinner1 {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: rgb(36, 36, 36);
          filter: blur(10px);
        }
  
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
  
        @keyframes auraPulse {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(186, 66, 255, 0.6),
              0 0 35px rgba(0, 225, 255, 0.4),
              0 0 50px rgba(186, 66, 255, 0.3),
              0 0 75px rgba(0, 225, 255, 0.2);
          }
          50% {
            box-shadow:
              0 0 30px rgba(186, 66, 255, 0.8),
              0 0 50px rgba(0, 225, 255, 0.6),
              0 0 80px rgba(186, 66, 255, 0.4),
              0 0 110px rgba(0, 225, 255, 0.3);
          }
        }
      `}</style>
  
      {/* 🧭 Instructions Panel */}
      <div className={`border-r-8 p-6 ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-100"} flex flex-col items-center justify-center`}>
        <div className="max-w-xs">
          <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? "text-yellow-400" : "text-blue-700"}`}>
            ℹ️ How to Use
          </h2>
          <ul className={`space-y-5 text-lg ${darkMode ? "text-gray-200" : "text-blue-900"}`}>
            <li className="flex items-start gap-3">
              <FontAwesomeIcon icon={faGavel} className="text-yellow-400 pt-1" />
              Type any legal question you have related to Indian law.
            </li>
            <li className="flex items-start gap-3">
              <FontAwesomeIcon icon={faPaperPlane} className="text-yellow-400 pt-1" />
              Click <strong>Send</strong> or press <strong>Enter</strong>.
            </li>
            <li className="flex items-start gap-3">
              <FontAwesomeIcon icon={faComments} className="text-yellow-400 pt-1" />
              The chatbot will respond with legal guidance instantly.
            </li>
            <li className="flex items-start gap-3">
              <FontAwesomeIcon icon={faRedo} className="text-yellow-400 pt-1" />
              Ask follow-up questions naturally!
            </li>
          </ul>
        </div>
      </div>
  
      {/* 💬 Chat Area */}
      <div className="flex flex-col justify-between p-6 gap-6">
        {/* Header */}
        <div className="flex justify-center items-center border-b-4 pb-4 relative">
          <h1 className={`text-4xl font-bold tracking-wide px-8 py-4 border-4 rounded-2xl shadow-md transition-all duration-300 animate-fade-in-up ${
            darkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-white text-black"
          }`}>
            🧑‍⚖️ Legal Advice Chatbot
          </h1>
          <div className="absolute right-0 flex gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <BinButton onClick={() => setChatLog([])} />
          </div>
        </div>
  
        {/* Chat Box */}
        <div className={`flex-grow overflow-y-auto border-4 rounded-2xl shadow-md p-6 space-y-5 max-h-[70vh] ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-400 bg-gray-50"}`}>
          {chatLog.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl border-2 shadow ${
                chat.type === "user"
                  ? darkMode ? "bg-blue-600 text-white border-blue-400" : "bg-blue-100 text-black border-blue-400"
                  : darkMode ? "bg-green-700 text-white border-green-500" : "bg-green-100 text-black border-green-400"
              }`}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={chat.type === "user" ? faUser : faRobot} className="mt-1" />
                  <div>
                    <p className="whitespace-pre-line">{chat.message}</p>
                    <span className="text-xs text-gray-400 block mt-1 text-right">{chat.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="w-full flex justify-center">
              <div className="spinner">
                <div className="spinner1" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
  
        {/* Input Section */}
        <div className={`flex gap-3 items-center border-4 rounded-2xl shadow-lg p-3 transition-all duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}>
          <input
            type="text"
            className={`flex-grow px-4 py-3 text-lg rounded-lg border-2 focus:outline-none focus:ring transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-400 text-black placeholder-gray-500"
            }`}
            placeholder="Type your legal question here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg shadow transition-all duration-200"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default LegalChatbot;

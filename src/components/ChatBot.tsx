import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faUser,
  faGavel,
  faPaperPlane,
  faComments,
  faRedo,
  faMicrophone,
  faTrash,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const LegalChatbot: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState<{ type: "user" | "bot"; message: string; time: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 👋 Add greeting message on first load
  useEffect(() => {
    setChatLog([
      {
        type: "bot",
        message: "Hi! I’m your legal assistant. Ask me anything related to Indian law!",
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  // // 🔽 Scroll to bottom when new message arrives
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatLog, loading]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const newChatLog = [
      ...chatLog,
      { type: "user" as const, message: userInput, time: timestamp },
    ];
    setChatLog(newChatLog);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ",
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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = (event: any) => {
      setUserInput(event.results[0][0].transcript);
    };
  };
  
  return (
    <div className={`flex min-h-screen font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
  {/* 📘 Instructions Panel */}
  <div className={`w-1/4 border-r-4 ${darkMode ? "border-gray-700" : "border-blue-400"} flex items-center justify-center p-8`}>
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

  {/* 🤖 Chat Area */}
  <div className="w-3/4 flex flex-col justify-between p-8">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-bold text-center flex-1">🧑‍⚖️ Legal Advice Chatbot</h1>
      <div className="flex gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        <button onClick={() => setChatLog([])} className="text-2xl text-red-500">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>

    <div className={`flex-grow overflow-y-auto border rounded-lg p-6 mb-4 shadow-inner max-h-[70vh] ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-50"}`}>
      {chatLog.map((chat, index) => (
        <div key={index} className={`mb-5 flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[75%] px-5 py-3 rounded-xl text-lg relative ${
              chat.type === "user"
                ? darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-right"
                : darkMode
                ? "bg-green-700 text-white"
                : "bg-green-100 text-left"
            }`}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={chat.type === "user" ? faUser : faRobot} />
              <span className="whitespace-pre-line">{chat.message}</span>
            </div>
            <div className="text-xs text-gray-400 absolute bottom-1 right-3">{chat.time}</div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="text-center text-lg text-gray-400 animate-pulse">🤖 Typing...</div>
      )}
      <div ref={messagesEndRef} />
    </div>

    <div className="flex gap-3">
      <button onClick={handleVoiceInput} className={`text-xl ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <input
        type="text"
        className={`flex-grow border rounded px-5 py-3 text-lg focus:outline-none focus:ring ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "border-gray-300 text-black"
        }`}
        placeholder="Type your legal question here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded shadow text-lg"
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

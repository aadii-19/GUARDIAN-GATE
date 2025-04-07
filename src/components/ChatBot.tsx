import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser,faGavel, faPaperPlane, faComments, faRedo } from "@fortawesome/free-solid-svg-icons";

const LegalChatbot: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [chatLog, setChatLog] = useState<{ type: string; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newChatLog = [...chatLog, { type: "user", message: userInput }];
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

      if (reply) {
        setChatLog((prev) => [...prev, { type: "bot", message: reply }]);
      } else {
        setChatLog((prev) => [
          ...prev,
          { type: "bot", message: "Sorry, I couldn’t fetch a response." },
        ]);
      }
    } catch (error) {
      setChatLog((prev) => [
        ...prev,
        { type: "bot", message: "An error occurred while fetching the response." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex min-h-screen font-sans text-black">
  {/* 📘 Left Instructions Panel */}
  <div className="w-1/4 bg-blue-50 border-r-4 border-blue-400 flex items-center justify-center p-8">
    <div className="max-w-xs">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">ℹ️ How to Use</h2>
      <ul className="space-y-5 text-lg text-blue-900">
        <li className="flex items-start gap-3">
          <FontAwesomeIcon icon={faGavel} className="text-blue-500 pt-1" />
          Type any legal question you have related to Indian law.
        </li>
        <li className="flex items-start gap-3">
          <FontAwesomeIcon icon={faPaperPlane} className="text-blue-500 pt-1" />
          Click <strong>Send</strong> or press <strong>Enter</strong>.
        </li>
        <li className="flex items-start gap-3">
          <FontAwesomeIcon icon={faComments} className="text-blue-500 pt-1" />
          The chatbot will respond with legal guidance instantly.
        </li>
        <li className="flex items-start gap-3">
          <FontAwesomeIcon icon={faRedo} className="text-blue-500 pt-1" />
          Ask follow-up questions naturally!
        </li>
      </ul>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-3">📋 Example Questions:</h3>
        <ul className="list-disc list-inside text-blue-900 space-y-2 text-base">
          <li>What is the process for filing an FIR?</li>
          <li>Can I get bail for a non-bailable offense?</li>
          <li>What are my rights during police interrogation?</li>
          <li>How do I register a property in Delhi?</li>
          <li>What is the legal age for marriage in India?</li>
        </ul>
      </div>
    </div>
  </div>

  {/* 🤖 Right Chat Area */}
  <div className="w-3/4 flex flex-col justify-between p-8 bg-white">
    <h1 className="text-4xl font-bold mb-4 text-center">🧑‍⚖️ Legal Advice Chatbot</h1>

    <div className="flex-grow overflow-y-auto border border-gray-300 rounded-lg p-6 mb-4 shadow-inner bg-gray-50 max-h-[70vh]">
      {chatLog.map((chat, index) => (
        <div key={index} className={`mb-5 flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[75%] px-5 py-3 rounded-xl text-lg ${
              chat.type === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"
            }`}
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={chat.type === "user" ? faUser : faRobot} />
              <span className="whitespace-pre-line">{chat.message}</span>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="text-center text-lg text-gray-500">Fetching legal wisdom...</div>
      )}
    </div>

    <div className="flex gap-3">
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded px-5 py-3 text-lg focus:outline-none focus:ring"
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

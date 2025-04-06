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
    <div className="min-h-screen bg-white p-6 text-black font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">🧑‍⚖️ Legal Advice Chatbot</h1>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-lg shadow-md mb-6">
  <h2 className="text-2xl font-semibold mb-3 text-blue-700">ℹ️ How to Use</h2>
  <ul className="space-y-3 text-sm text-blue-900">
    <li className="flex items-start gap-2">
      <FontAwesomeIcon icon={faGavel} className="text-blue-500 pt-1" />
      Type any legal question you have related to Indian law.
    </li>
    <li className="flex items-start gap-2">
      <FontAwesomeIcon icon={faPaperPlane} className="text-blue-500 pt-1" />
      Click <strong>Send</strong> or press <strong>Enter</strong>.
    </li>
    <li className="flex items-start gap-2">
      <FontAwesomeIcon icon={faComments} className="text-blue-500 pt-1" />
      The chatbot will respond with legal guidance instantly.
    </li>
    <li className="flex items-start gap-2">
      <FontAwesomeIcon icon={faRedo} className="text-blue-500 pt-1" />
      Ask follow-up questions naturally!
    </li>
  </ul>
</div>
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto shadow-inner">
          {chatLog.map((chat, index) => (
            <div key={index} className={`mb-3 flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                  chat.type === "user" ? "bg-blue-100 text-right" : "bg-green-100 text-left"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={chat.type === "user" ? faUser : faRobot} />
                  <span className="text-sm whitespace-pre-line">{chat.message}</span>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-sm text-gray-500">Fetching legal wisdom...</div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring"
            placeholder="Type your legal question here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
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

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

const legalResponses: { [key: string]: { [key: string]: string[] } } = {
  harassment: {
    "workplace": [
      "Workplace harassment is a serious issue. Here are the steps you can take:",
      "- Report the harassment to your Human Resources (HR) department immediately.",
      "- If HR does not take appropriate action, file a complaint with the Internal Complaints Committee (ICC) under the POSH Act.",
      "- If the issue persists, consider contacting a legal expert or a lawyer specializing in workplace rights.",
      "For more details, refer to the POSH Act, 2013."
    ],
    "sexual": [
      "Sexual harassment at the workplace is illegal under the POSH Act. Here's what you can do:",
      "- Report the incident to HR or the ICC.",
      "- If you're not comfortable with HR, you can file a complaint with the Ministry of Women and Child Development.",
      "- If you need immediate help, call the national helpline: 181.",
      "It's essential to preserve any evidence of the harassment (emails, screenshots, etc.)."
    ]
  },
  domesticViolence: {
    "general": [
      "Domestic violence is a serious offense. You can take the following steps:",
      "- File a complaint under the Protection of Women from Domestic Violence Act, 2005.",
      "- Contact the nearest Women's Helpline: 181 or National Helpline for Women: 1091.",
      "- If you're in immediate danger, call the police at 100.",
      "You may also be entitled to a Protection Order, Residence Order, or Monetary Relief under the law."
    ],
    "childAbuse": [
      "If a child is being abused, immediate action is crucial. Here's what you can do:",
      "- Call the Childline helpline: 1098.",
      "- Report the abuse to the police or a child welfare committee.",
      "- In some cases, the child may need medical or psychological help, so consider reaching out to a child protection organization."
    ]
  },
  cyberbullying: {
    "onlineHarassment": [
      "If you're experiencing online harassment, here are some steps you can take:",
      "- Report the harassment to the platform you're using (Facebook, Instagram, etc.). Most platforms have ways to report abusive behavior.",
      "- File a complaint with the Cyber Crime Cell of your nearest police station.",
      "- You can also contact the National Cyber Crime Reporting Portal: https://cybercrime.gov.in.",
      "Cyberbullying is punishable under the IT Act, 2000."
    ],
    "identityTheft": [
      "Identity theft is a serious issue. If you're facing it, do the following:",
      "- Report the theft to the Cyber Crime Cell and file a First Information Report (FIR).",
      "- Contact your bank and any financial institutions if your financial information has been compromised.",
      "- Consider freezing your credit with the credit bureaus to prevent further misuse."
    ]
  },
  propertyRights: {
    "inheritance": [
      "Under the Hindu Succession Act, 1956, women have equal rights to ancestral property. Here are your options:",
      "- You are entitled to a share in the family property. If there’s a will, ensure it's legally valid and properly executed.",
      "- If there’s a dispute, consult a property lawyer who can help you with legal proceedings.",
      "Seek professional legal advice to understand your rights in more detail."
    ],
    "ownership": [
      "If you're facing issues related to property ownership, here are some steps you can take:",
      "- First, verify the title deed and ownership records of the property.",
      "- If there’s a dispute, consult with a property lawyer to explore options for settling the issue legally.",
      "- In some cases, you might need to approach the civil court to resolve property disputes."
    ]
  }
};

const randomResponses = [
  "Please note that laws can vary based on your location. Always consult with a legal professional for precise guidance.",
  "If you need help with a legal issue, don't hesitate to reach out to a legal expert or helpline.",
  "Your legal rights are important! This chatbot provides basic information, but professional legal advice is recommended."
];

function getLegalAdvice(category: string, subcategory: string): string {
  if (category && subcategory) {
    return legalResponses[category]?.[subcategory]?.join("\n") || randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

export default function LegalAdviceChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Initial question, 2: Topic selected, 3: Subtopic selected
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
    setMessages(savedMessages);
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: query };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response
    setLoading(true);
    let botResponse = "";
    
    if (step === 1) {
      // Step 1: Present options
      botResponse = "Please select a topic to ask about:\n1. Harassment\n2. Domestic Violence\n3. Cyberbullying\n4. Property Rights";
      setStep(2); // Moving to topic selection step
    } else if (step === 2) {
      // Step 2: Handle topic selection
      switch (query.toLowerCase()) {
        case "1":
          botResponse = "You selected Harassment. Do you want to know about:\n1. Workplace harassment\n2. Sexual harassment";
          setCategory("harassment");
          break;
        case "2":
          botResponse = "You selected Domestic Violence. Do you want to know about:\n1. General advice\n2. Child abuse";
          setCategory("domesticViolence");
          break;
        case "3":
          botResponse = "You selected Cyberbullying. Do you want to know about:\n1. Online harassment\n2. Identity theft";
          setCategory("cyberbullying");
          break;
        case "4":
          botResponse = "You selected Property Rights. Do you want to know about:\n1. Inheritance\n2. Ownership issues";
          setCategory("propertyRights");
          break;
        default:
          botResponse = "Please select a valid option (1, 2, 3, or 4).";
      }
      setStep(3); // Moving to subtopic selection
    } else if (step === 3) {
      // Step 3: Handle subtopic selection and give advice
      switch (query.toLowerCase()) {
        case "1":
          setSubcategory("general");
          botResponse = getLegalAdvice(category!, "general");
          break;
        case "2":
          if (category === "harassment") {
            setSubcategory("workplace");
            botResponse = getLegalAdvice("harassment", "workplace");
          } else if (category === "domesticViolence") {
            setSubcategory("childAbuse");
            botResponse = getLegalAdvice("domesticViolence", "childAbuse");
          } else if (category === "cyberbullying") {
            setSubcategory("onlineHarassment");
            botResponse = getLegalAdvice("cyberbullying", "onlineHarassment");
          } else if (category === "propertyRights") {
            setSubcategory("inheritance");
            botResponse = getLegalAdvice("propertyRights", "inheritance");
          }
          break;
        default:
          botResponse = "Please select a valid subtopic (1 or 2).";
      }
      setStep(1); // Reset the chat to initial step after response
    }

    // Add bot response to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);

    setQuery(""); // Clear the input field
    setLoading(false); // Stop loading spinner
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-red-500 text-center mb-4">Legal Advice Chat</h2>

      {/* Chat Box */}
      <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-3 ${msg.sender === "user" ? "text-right" : ""}`}
          >
            {msg.sender === "bot" ? (
              <FontAwesomeIcon icon={faRobot} className="text-blue-500 mr-2" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="text-green-500 mr-2" />
            )}
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center mb-3">
            <FontAwesomeIcon
              icon={faRobot}
              className="text-blue-500 mr-2 animate-spin"
            />
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
              ...Typing
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full p-2 rounded-lg border border-gray-300"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-red-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}


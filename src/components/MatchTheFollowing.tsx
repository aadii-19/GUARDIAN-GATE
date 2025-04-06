import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sets = [
    {
      name: "Mental Health",
      scenarios: [
        "You’re feeling overwhelmed with work and can’t concentrate.",
        "A friend opens up about struggling with depression.",
        "You often feel stressed and have trouble sleeping.",
        "You are experiencing frequent mood swings and feel emotionally drained.",
        "You feel anxious before a big presentation or event."
      ],
      actions: [
        "Practice mindfulness or take a short break to relax.",
        "Offer your support and encourage them to seek professional help.",
        "Develop a bedtime routine and reduce screen time before sleep.",
        "Consider seeking therapy or talking to a trusted person.",
        "Practice deep breathing and visualization techniques."
      ],
      correctAnswers: [
        "Practice mindfulness or take a short break to relax.",
        "Offer your support and encourage them to seek professional help.",
        "Develop a bedtime routine and reduce screen time before sleep.",
        "Consider seeking therapy or talking to a trusted person.",
        "Practice deep breathing and visualization techniques."
      ]
    },
    {
      name: "Workplace Safety",
      scenarios: [
        "Someone at your workplace is making inappropriate comments.",
        "You see an electrical hazard in the office.",
        "You witness a co-worker get injured at work.",
        "You notice a fire exit is blocked by storage items.",
        "A suspicious person is trying to access a restricted area in your office."
      ],
      actions: [
        "Report the incident to HR or a supervisor.",
        "Inform the maintenance team immediately.",
        "Call emergency services or seek first aid.",
        "Report the issue to the safety officer and ensure the exit is cleared.",
        "Inform security personnel immediately."
      ],
      correctAnswers: [
        "Report the incident to HR or a supervisor.",
        "Inform the maintenance team immediately.",
        "Call emergency services or seek first aid.",
        "Report the issue to the safety officer and ensure the exit is cleared.",
        "Inform security personnel immediately."
      ]
    },
    {
      name: "Emergency Situations",
      scenarios: [
        "You are in a public place and feel someone is following you.",
        "You’ve witnessed a car accident.",
        "A fire alarm goes off in a crowded mall.",
        "You receive an emergency alert about an approaching natural disaster.",
        "A stranger collapses in front of you on the street."
      ],
      actions: [
        "Call emergency services and stay in a safe location.",
        "Call emergency services immediately and offer help if safe.",
        "Follow the emergency exit plan and avoid using elevators.",
        "Follow the official safety guidelines and seek shelter if needed.",
        "Check if the person is breathing and call for medical help."
      ],
      correctAnswers: [
        "Call emergency services and stay in a safe location.",
        "Call emergency services immediately and offer help if safe.",
        "Follow the emergency exit plan and avoid using elevators.",
        "Follow the official safety guidelines and seek shelter if needed.",
        "Check if the person is breathing and call for medical help."
      ]
    }
  ];
  

export default function MatchTheFollowing() {
    const navigate = useNavigate();
    const [selectedSetIndex, setSelectedSetIndex] = useState(0);
    const selectedSet = sets[selectedSetIndex];
  
    const [matches, setMatches] = useState(Array(selectedSet.scenarios.length).fill(null));
    const [showResults, setShowResults] = useState(false);
  
    const handleMatch = (index: number, action: string) => {
      const newMatches = [...matches];
      newMatches[index] = action;
      setMatches(newMatches);
    };
  
    const checkAnswers = () => {
      setShowResults(true);
    };
  
    const switchSet = (index: number) => {
      setSelectedSetIndex(index);
      setMatches(Array(sets[index].scenarios.length).fill(null));
      setShowResults(false);
    };
  
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">
          Match the Following: {selectedSet.name}
        </h2>
  
        {/* Switch Set Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {sets.map((set, index) => (
            <button
              key={index}
              onClick={() => switchSet(index)}
              className={`px-4 py-2 rounded-lg shadow-md text-white transition-all ${
                selectedSetIndex === index ? "bg-red-500" : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {set.name}
            </button>
          ))}
        </div>
  
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
          {/* Scenarios Section */}
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-4 text-center">Scenarios</h3>
            <ul className="space-y-4">
              {selectedSet.scenarios.map((scenario, index) => (
                <li key={index} className="bg-white p-4 border rounded-lg shadow-md">
                  <p className="font-medium">{scenario}</p>
                  <select
                    value={matches[index] || ""}
                    onChange={(e) => handleMatch(index, e.target.value)}
                    className="mt-2 p-2 border rounded-lg w-full"
                  >
                    <option value="">Select an action</option>
                    {selectedSet.actions.map((action, idx) => (
                      <option key={idx} value={action}>{action}</option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Responses Section with Boxed UI */}
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-4 text-center">Responses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedSet.actions.map((action, index) => (
                <div key={index} className="bg-gray-100 p-4 border rounded-lg shadow-md text-center font-medium">
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Check Answers Button */}
        <div className="text-center mt-6">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-400 transition-all"
          >
            Check Answers
          </button>
        </div>
  
        {/* Results Section */}
        {showResults && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-red-500 mb-4 text-center">Results</h3>
            <ul className="space-y-4">
              {selectedSet.scenarios.map((scenario, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-md bg-white">
                  <p className="font-medium">{scenario}</p>
                  <p className={`mt-2 p-2 rounded-lg ${
                    matches[index] === selectedSet.correctAnswers[index] ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                  }`}>
                    Your Answer: {matches[index] || "Not answered"}
                  </p>
                  <p className="text-gray-700 font-semibold">
                    Correct Answer: {selectedSet.correctAnswers[index]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/interactive-learning")}
            className="px-6 py-2 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-600 transition-all"
          >
            Return to Interactive Learning
          </button>
        </div>
      </div>
  );
}

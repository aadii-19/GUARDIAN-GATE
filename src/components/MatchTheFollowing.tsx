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
      <div className="max-w-7xl mx-auto px-6 py-12 animate__animated animate__fadeIn">
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-gray-200 rounded-3xl p-12 mb-8 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transform hover:scale-[1.01]">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-100/30 to-gray-200/30 rounded-full blur-2xl -z-10"></div>

          <h2 className="text-4xl font-bold mb-8 text-center text-red-600 animate__animated animate__slideInDown">
            Match the Following: {selectedSet.name}
          </h2>

          {/* Switch Set Buttons */}
          <div className="flex justify-center space-x-4 mb-8 animate__animated animate__fadeIn">
            {sets.map((set, index) => (
              <button
                key={index}
                onClick={() => switchSet(index)}
                className={`px-6 py-3 rounded-xl shadow-lg text-white transition-all duration-300 transform hover:scale-105 ${
                  selectedSetIndex === index ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {set.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            {/* Scenarios Section */}
            <div className="flex-1 animate__animated animate__fadeInLeft bg-white rounded-2xl shadow-xl p-8">
              <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Scenarios</h3>
              <ul className="space-y-4">
                {selectedSet.scenarios.map((scenario, index) => (
                  <li key={index} className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                    <p className="font-medium text-lg text-gray-800">{scenario}</p>
                    <select
                      value={matches[index] || ""}
                      onChange={(e) => handleMatch(index, e.target.value)}
                      className="mt-4 p-3 border-2 border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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

            {/* Responses Section */}
            <div className="flex-1 animate__animated animate__fadeInRight bg-white rounded-2xl shadow-xl p-8">
              <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Responses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSet.actions.map((action, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 text-center font-medium text-gray-800 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Check Answers Button */}
          <div className="text-center mt-10">
            <button
              onClick={checkAnswers}
              className="px-8 py-4 text-lg text-white bg-red-500 rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Check Answers
            </button>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-10 animate__animated animate__fadeIn">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">Results</h3>
                <ul className="space-y-6">
                  {selectedSet.scenarios.map((scenario, index) => (
                    <li key={index} className="p-6 rounded-xl shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                      <p className="font-medium text-lg text-gray-800 mb-3">{scenario}</p>
                      <p className={`p-4 rounded-xl transition-all duration-300 ${
                        matches[index] === selectedSet.correctAnswers[index] 
                          ? "bg-green-100 text-green-800 border border-green-200" 
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}>
                        Your Answer: {matches[index] || "Not answered"}
                      </p>
                      <p className="mt-3 font-semibold text-gray-700">
                        Correct Answer: {selectedSet.correctAnswers[index]}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/interactive-learning")}
              className="px-8 py-4 text-lg text-white bg-gray-600 rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              Return to Interactive Learning
            </button>
          </div>

        </div>
      </div>
  );
}

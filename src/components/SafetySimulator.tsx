import { useState, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 

const safetyScenarios = [
    {
      scenario: "You are in a public place and someone is making you uncomfortable by invading your personal space. What should you do?",
      options: [
        "Stay silent and hope they leave",
        "Firmly tell them to step back and seek help if needed",
        "Ignore it and continue your activity",
        "Move away but don't inform anyone",
      ],
      correctAnswer: "Firmly tell them to step back and seek help if needed",
      description: "If someone invades your personal space and makes you uncomfortable, you should assertively ask them to step back and seek help from authorities or bystanders if necessary.",
    },
    {
      scenario: "A friend confides in you that they are in an abusive relationship. How should you respond?",
      options: [
        "Advise them to stay quiet to avoid conflict",
        "Encourage them to seek support and offer help",
        "Tell them it's not a big deal and relationships have problems",
        "Ignore the situation because it's their personal matter",
      ],
      correctAnswer: "Encourage them to seek support and offer help",
      description: "Supporting a friend in an abusive relationship involves encouraging them to seek help from a trusted authority or organization and offering emotional support without forcing decisions on them.",
    },
    {
      scenario: "You suspect someone is being followed while walking home. What is the safest action to take?",
      options: [
        "Keep watching from a distance but do nothing",
        "Approach the person following them and confront them",
        "Call emergency services and stay in a visible, safe location",
        "Ignore the situation and walk away",
      ],
      correctAnswer: "Call emergency services and stay in a visible, safe location",
      description: "If you suspect someone is in danger, calling emergency services while maintaining a safe distance ensures their safety without putting yourself at risk.",
    },
    {
      scenario: "A coworker frequently makes inappropriate comments about women at your workplace. What should you do?",
      options: [
        "Ignore it to avoid conflict",
        "Report it to HR or a supervisor",
        "Laugh along so they don’t target you",
        "Confront them aggressively",
      ],
      correctAnswer: "Report it to HR or a supervisor",
      description: "Workplace harassment should be reported to the appropriate authorities, such as HR or a supervisor, to ensure a safe and respectful environment.",
    },
    {
      scenario: "You come across an online post spreading false information about women's rights. What should you do?",
      options: [
        "Ignore it since social media isn't serious",
        "Report the post and, if safe, provide factual information",
        "Argue with the poster aggressively",
        "Share it to see what others think",
      ],
      correctAnswer: "Report the post and, if safe, provide factual information",
      description: "Misinformation can be harmful. Reporting false information and providing accurate details (without engaging in heated arguments) helps spread awareness and truth.",
    },
    {
      scenario: "You witness a case of street harassment where someone is being harassed verbally. What should you do?",
      options: [
        "Walk away and pretend you didn't see it",
        "Confront the harasser aggressively",
        "Distract by engaging the victim in a casual conversation and offer support",
        "Record the incident but do nothing else",
      ],
      correctAnswer: "Distract by engaging the victim in a casual conversation and offer support",
      description: "One of the safest intervention methods is distraction. Engaging the victim in a conversation and offering support can help defuse the situation without escalating the conflict.",
    },
    {
      scenario: "A friend tells you that they have been sexually harassed but are scared to report it. How should you respond?",
      options: [
        "Tell them to forget about it to avoid stress",
        "Encourage them to report it and offer emotional support",
        "Blame them for putting themselves in that situation",
        "Share their story publicly without their consent",
      ],
      correctAnswer: "Encourage them to report it and offer emotional support",
      description: "Survivors of harassment need support. Encouraging them to report it and reassuring them that they are not alone can be very helpful. Respecting their decision is also important.",
    },
    {
      scenario: "You receive a threatening message online from an anonymous user. What should you do?",
      options: [
        "Respond to the message with anger",
        "Ignore it and hope it stops",
        "Block the user and report the threat to the platform and authorities if necessary",
        "Engage with them to see if they're serious",
      ],
      correctAnswer: "Block the user and report the threat to the platform and authorities if necessary",
      description: "Threats online should never be ignored. Blocking the user and reporting the incident to the platform and, if necessary, to the authorities ensures safety.",
    },
    {
      scenario: "You notice a child alone in a public place, looking distressed. What should you do?",
      options: [
        "Approach them gently and ask if they need help",
        "Ignore it, assuming their guardian is nearby",
        "Take them with you to find their parents",
        "Call the police immediately without assessing the situation",
      ],
      correctAnswer: "Approach them gently and ask if they need help",
      description: "If a child seems lost, calmly approach them and ask if they need help. If they are lost, you can help them find their guardian or alert authorities if needed.",
    },
    {
      scenario: "Someone is pressuring you to share personal information or photos online. How should you handle it?",
      options: [
        "Give in to avoid conflict",
        "Block and report them immediately",
        "Ask them why they need it",
        "Try to convince them not to ask for it",
      ],
      correctAnswer: "Block and report them immediately",
      description: "If someone pressures you to share personal information or photos, it is best to block and report them immediately to protect your privacy and safety.",
    },
  ];
  

  export default function SafetySimulation() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [finished, setFinished] = useState(false);
  
    const handleAnswerSelection = (answer: SetStateAction<string>) => {
      setSelectedAnswer(answer);
      setShowAnswer(true);
    };
  
    const handleNextScenario = () => {
      if (currentScenario + 1 < safetyScenarios.length) {
        setCurrentScenario(currentScenario + 1);
        setSelectedAnswer("");
        setShowAnswer(false);
      } else {
        setFinished(true);
      }
    };
  
    const restartScenarios = () => {
      setCurrentScenario(0);
      setSelectedAnswer("");
      setShowAnswer(false);
      setFinished(false);
    };
  
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate__animated animate__fadeIn">
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-gray-200 rounded-3xl p-12 mb-8 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transform hover:scale-[1.01]">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-100/30 to-gray-200/30 rounded-full blur-2xl -z-10"></div>

          {!finished ? (
            <div className="animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-center text-red-600 mb-8 animate__animated animate__slideInDown">
                Scenario {currentScenario + 1}
              </h2>
              <p className="text-xl mb-8 text-center font-medium text-gray-800">{safetyScenarios[currentScenario].scenario}</p>
              <div className="space-y-4">
                {safetyScenarios[currentScenario].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={`w-full p-5 text-lg rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedAnswer === option
                        ? "bg-red-500 text-white border-transparent shadow-lg"
                        : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200"
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {showAnswer && (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl animate__animated animate__fadeIn">
                  <h3 className="text-xl font-bold text-red-600 mb-3">Correct Answer:</h3>
                  <p className="text-lg font-medium text-gray-800 mb-3">{safetyScenarios[currentScenario].correctAnswer}</p>
                  <p className="text-gray-600">{safetyScenarios[currentScenario].description}</p>
                </div>
              )}
              <div className="text-center mt-8">
                <Button 
                  onClick={handleNextScenario}
                  className="px-8 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Next Scenario →
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold mb-6 text-red-600">
                Simulation Completed! 🎉
              </h2>
              <div className="space-x-4">
                <Button 
                  onClick={restartScenarios}
                  className="px-8 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Try Again
                </Button>
                <Link
                  to="/interactive-learning"
                  className="inline-block px-8 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Back to Learning
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
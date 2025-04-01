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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white shadow-2xl rounded-lg p-8 mb-8 border-4 border-gray-200">
          {!finished ? (
            <>
              <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">
                Scenario {currentScenario + 1}
              </h2>
              <p className="text-lg mb-4 text-center">{safetyScenarios[currentScenario].scenario}</p>
              <div className="space-y-4">
                {safetyScenarios[currentScenario].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={`w-full p-4 text-lg rounded-lg shadow-md transition-colors duration-300 ${
                      selectedAnswer === option ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-black">{option}</span>
                  </Button>
                ))}
              </div>
              {showAnswer && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-500">Correct Answer:</h3>
                  <p className="text-black font-medium">{safetyScenarios[currentScenario].correctAnswer}</p>
                  <p className="text-sm text-gray-700">{safetyScenarios[currentScenario].description}</p>
                </div>
              )}
              <div className="text-center mt-6">
                <Button onClick={handleNextScenario} className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-400">
                  Next Scenario
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-6 text-red-500">Simulation Completed!</h2>
              <Button onClick={restartScenarios} className="px-6 py-2 m-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-400">
                Repeat Scenarios
              </Button>
              <Link to="/interactive-learning">
                <Button className="px-6 py-2 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300">
                  Go to Interactive Learning
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  
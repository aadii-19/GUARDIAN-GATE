import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming Button is custom styled based on your theme

const questions = [
    {
      question: "What is the right to equality under the Indian Constitution?",
      options: [
        "Right to Equal Treatment before the Law",
        "Right to Vote",
        "Right to Own Property",
        "Right to Free Speech",
      ],
      correctAnswer: "Right to Equal Treatment before the Law",
      description: "The Right to Equality ensures that every individual, regardless of their gender, caste, religion, or place of birth, is treated equally before the law. It aims to abolish discrimination in the eyes of the law.",
    },
    {
      question: "Which of the following acts is aimed at preventing dowry-related violence?",
      options: [
        "The Dowry Prohibition Act, 1961",
        "The Domestic Violence Act, 2005",
        "The Maternity Benefit Act, 1961",
        "The Sexual Harassment of Women at Workplace Act, 2013",
      ],
      correctAnswer: "The Dowry Prohibition Act, 1961",
      description: "The Dowry Prohibition Act aims to prevent the practice of dowry, which has been a significant cause of violence against women. It makes the giving and receiving of dowry illegal and punishable under the law.",
    },
    {
      question: "Which law provides protection against sexual harassment at the workplace in India?",
      options: [
        "The Protection of Women from Domestic Violence Act, 2005",
        "The Sexual Harassment of Women at Workplace Act, 2013",
        "The Dowry Prohibition Act, 1961",
        "The Maternity Benefit Act, 1961",
      ],
      correctAnswer: "The Sexual Harassment of Women at Workplace Act, 2013",
      description: "This law provides a framework for the prevention, prohibition, and redressal of sexual harassment at the workplace. It mandates employers to set up committees to address such complaints and ensure a safe work environment for women.",
    },
    {
      question: "Under which law can a woman file for maintenance from her husband in India?",
      options: [
        "The Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
        "The Protection of Women from Domestic Violence Act, 2005",
        "The Divorce Act, 1869",
        "The Hindu Marriage Act, 1955",
      ],
      correctAnswer: "The Protection of Women from Domestic Violence Act, 2005",
      description: "This Act allows women who are victims of domestic violence to seek maintenance from their husbands. It ensures financial support for women who may be financially dependent on their spouse.",
    },
    {
      question: "Which is the minimum age for marriage for women in India?",
      options: [
        "18 years",
        "21 years",
        "20 years",
        "16 years",
      ],
      correctAnswer: "18 years",
      description: "The legal age for marriage in India is 18 years for women, as per the Prohibition of Child Marriage Act, 2006. This law aims to prevent child marriages and ensure that women have the legal right to choose when to marry.",
    },
    {
      question: "What is the Protection of Women from Domestic Violence Act, 2005 designed to do?",
      options: [
        "Prevent dowry-related violence",
        "Ensure women's right to education",
        "Provide a legal framework for the protection of women from domestic abuse",
        "Guarantee maternity leave for women",
      ],
      correctAnswer: "Provide a legal framework for the protection of women from domestic abuse",
      description: "The Protection of Women from Domestic Violence Act, 2005, provides a comprehensive legal framework for the protection of women from various forms of domestic abuse. It includes provisions for safety orders, maintenance, and the right to reside in a shared household.",
    },
    {
      question: "Which Act ensures equal pay for equal work for both men and women in India?",
      options: [
        "The Equal Remuneration Act, 1976",
        "The Maternity Benefit Act, 1961",
        "The Factories Act, 1948",
        "The Employees' State Insurance Act, 1948",
      ],
      correctAnswer: "The Equal Remuneration Act, 1976",
      description: "The Equal Remuneration Act, 1976, mandates that both men and women be paid equal wages for equal work. This law aims to eliminate gender-based wage discrimination and ensure fairness in the workplace.",
    },
    {
      question: "Which act protects women from trafficking and sexual exploitation in India?",
      options: [
        "The Immoral Traffic (Prevention) Act, 1956",
        "The Dowry Prohibition Act, 1961",
        "The Domestic Violence Act, 2005",
        "The Protection of Women from Sexual Offences Act, 2013",
      ],
      correctAnswer: "The Immoral Traffic (Prevention) Act, 1956",
      description: "The Immoral Traffic (Prevention) Act, 1956, provides measures to combat trafficking for prostitution and sexual exploitation. It criminalizes the trafficking of women and children for the purpose of sexual exploitation.",
    },
    {
      question: "Which law prohibits child marriage and prescribes the minimum age for marriage for both boys and girls?",
      options: [
        "The Child Marriage Restraint Act, 1929",
        "The Prohibition of Child Marriage Act, 2006",
        "The Hindu Marriage Act, 1955",
        "The Special Marriage Act, 1954",
      ],
      correctAnswer: "The Prohibition of Child Marriage Act, 2006",
      description: "The Prohibition of Child Marriage Act, 2006, prohibits child marriage and prescribes the minimum legal age for marriage as 18 years for women and 21 years for men. It aims to eliminate child marriage and its harmful effects.",
    },
    {
      question: "Under which law can a woman get protection from sexual offenses and harassment in public spaces in India?",
      options: [
        "The Sexual Harassment of Women at Workplace Act, 2013",
        "The Criminal Law (Amendment) Act, 2013",
        "The Protection of Women from Domestic Violence Act, 2005",
        "The Indian Penal Code, 1860",
      ],
      correctAnswer: "The Criminal Law (Amendment) Act, 2013",
      description: "The Criminal Law (Amendment) Act, 2013, strengthens the legal framework for the protection of women against sexual offenses, including rape and harassment in public spaces. It also enhances the punishment for sexual violence against women.",
    },
  ];
  

export default function RightsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(30); // Timer countdown for each question
  const [isCorrect, setIsCorrect] = useState(false); // To show if the user's answer is correct
  const [feedback, setFeedback] = useState(""); // To give feedback for the answer

  useEffect(() => {
    // Start timer countdown when question is displayed
    if (timer > 0 && !quizFinished) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
    if (timer === 0 && !quizFinished) {
      handleNextQuestion();
    }
  }, [timer, quizFinished]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
      setFeedback("Correct!");
    } else {
      setIsCorrect(false);
      setFeedback("Incorrect.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setIsCorrect(false);
      setFeedback("");
      setTimer(30); // Reset timer for next question
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setQuizFinished(false);
    setTimer(30); // Reset timer on restart
  };

  const progress = ((currentQuestion) / questions.length) * 100; // Corrected to start from 0%

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate__animated animate__fadeIn">
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-gray-200 rounded-3xl p-12 mb-8 backdrop-blur-sm relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transform hover:scale-[1.01]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-100/30 to-gray-200/30 rounded-full blur-2xl -z-10"></div>

        <h2 className="text-4xl font-bold text-center text-red-600 mb-8 animate__animated animate__slideInDown">
          Question {currentQuestion + 1}
        </h2>

        {/* Progress Bar */}
        <div className="mb-8 animate__animated animate__fadeIn">
          <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            >
              <div className="animate-pulse-gradient"></div>
            </div>
          </div>
          <p className="text-center mt-2 text-sm font-medium text-red-600">
            {progress.toFixed(0)}% completed
          </p>
        </div>

        {!quizFinished ? (
          <div className="animate__animated animate__fadeIn">
            <p className="text-xl mb-8 text-center font-medium text-gray-800">{questions[currentQuestion].question}</p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
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

            {/* Timer Display */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gray-50 px-6 py-3 rounded-full shadow-inner">
                <p className="text-lg font-semibold text-red-600">
                  ⏱️ {timer} seconds remaining
                </p>
              </div>
            </div>

            {selectedAnswer && (
              <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl animate__animated animate__fadeIn">
                <p className="font-bold text-xl text-red-600 mb-2">{feedback}</p>
                <p className="font-medium text-gray-800 mb-2">Correct Answer: {questions[currentQuestion].correctAnswer}</p>
                <p className="text-gray-600">{questions[currentQuestion].description}</p>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Button
                onClick={handleNextQuestion}
                className="px-8 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Next Question →
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center animate__animated animate__fadeIn">
            <h2 className="text-4xl font-bold mb-6 text-red-600">
              Quiz Completed! 🎉
            </h2>
            <p className="text-xl mb-8 text-gray-800">
              You scored <span className="font-bold text-red-500">{score}</span> out of <span className="font-bold text-red-500">{questions.length}</span>
            </p>
            <div className="space-x-4">
              <Button
                onClick={handleRestartQuiz}
                className="px-8 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </Button>
              <Link
                to="/interactive-learning"
                className="inline-block px-8 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

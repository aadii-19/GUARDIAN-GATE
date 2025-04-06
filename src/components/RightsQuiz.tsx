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
    <div className="max-w-7xl mx-auto px-6 py-12">
  <div className="bg-white shadow-2xl border-2 border-gray-300 rounded-xl p-8 mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-red-500">Question {currentQuestion + 1}</h2>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-red-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-500">{progress.toFixed(0)}% completed</p>
        </div>

        {!quizFinished ? (
          <div>
            <p className="text-lg mb-4 text-center">{questions[currentQuestion].question}</p>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className={`w-full p-4 text-lg rounded-lg shadow-md transition-colors duration-300 ${
                    selectedAnswer === option
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-black"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Timer Display */}
            <p className="text-center mt-4 text-lg font-semibold">
              Time Left: {timer} seconds
            </p>

            {selectedAnswer && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="font-semibold text-red-500">{feedback}</p>
                <p className="font-semibold text-red-500">Correct Answer: {questions[currentQuestion].correctAnswer}</p>
                <p>{questions[currentQuestion].description}</p>
              </div>
            )}
            
            <div className="text-center mt-6">
              <Button
                onClick={handleNextQuestion}
                className="px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-400 transition-colors duration-300"
              >
                Next Question
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-red-500">Quiz Finished!</h2>
            <p className="text-lg mb-4">
              You answered {score} out of {questions.length} questions correctly!
            </p>
            <div className="space-x-4">
              <Button
                onClick={handleRestartQuiz}
                className="px-6 py-2 text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
              >
                Restart Quiz
              </Button>
              <Link
                to="/interactive-learning"
                className="inline-block px-6 py-2 text-white bg-red-500 rounded-lg shadow-md hover:bg-red-400 transition-colors duration-300"
              >
                Go to Interactive Learning
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

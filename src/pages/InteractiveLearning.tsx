import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { GamepadIcon, Users2, Heart, BookOpen } from "lucide-react";  // Import icons for each game
import { Link } from "react-router-dom";


export default function InteractiveLearning() {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setShowHeading(true);
      }, 150);
    }, 100);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-6 py-12 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {showHeading && (
        <h1 className="text-5xl text-center font-bold mb-12 transition-opacity duration-1000 fade-in">
          Interactive Learning Games
        </h1>
      )}

      <Tabs defaultValue="game1" className="space-y-8">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full min-h-[50px]">
          {/* Each game is represented by a tab */}
          <TabsTrigger value="game1" className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="h-5 w-5" />
            Rights Quiz
          </TabsTrigger>
          <TabsTrigger value="game2" className="flex items-center gap-2 text-xl font-semibold">
            <Heart className="h-5 w-5" />
            Safety Simulation
          </TabsTrigger>
          <TabsTrigger value="game4" className="flex items-center gap-2 text-xl font-semibold">
            <GamepadIcon className="h-5 w-5" />
            Mental Health Puzzle
          </TabsTrigger>
          <TabsTrigger value="game3" className="flex items-center gap-2 text-xl font-semibold">
            <Users2 className="h-5 w-5" />
            Chat Bot
          </TabsTrigger>
        </TabsList>

        {/* Game 1: Rights Quiz */}
        <TabsContent value="game1" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Rights Quiz</h2>
            <p className="text-lg">Take a quiz to test your knowledge of legal rights and protections.</p>
            <Link to="/game-1" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Start the Rights Quiz
            </Link>
          </Card>
        </TabsContent>

        {/* Game 2: Safety Simulation */}
        <TabsContent value="game2" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Safety Simulation</h2>
            <p className="text-lg">Simulate different safety scenarios and learn how to respond effectively.</p>
            <Link to="/game-2" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Start Safety Simulation
            </Link>
          </Card>
        </TabsContent>

        <TabsContent value="game3" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-semibold mb-6">Legal Advice Chatbot</h2>
                <p className="text-lg">
              Interact with the chatbot to receive helpful legal advice on various topics, including harassment, cyberbullying, and more. The chatbot will guide you through different topics and provide tailored advice based on your selections.
                 </p>
            <Link to="/game-3" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
             Start Chatting with the Legal Bot
             </Link>
            </Card>
        </TabsContent>


        {/* Game 4: Mental Health Puzzle */}
        <TabsContent value="game4" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Mental Health Puzzle</h2>
            <p className="text-lg">Solve puzzles designed to enhance your mental well-being.</p>
            <Link to="/game-4" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Start Mental Health Puzzle
            </Link>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

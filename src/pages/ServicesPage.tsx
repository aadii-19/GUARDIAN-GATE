import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Scale, GamepadIcon, Users2, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function ServicesPage() {
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
        <h1 className="text-5xl text-center font-bold mb-12 transition-opacity duration-1000 fade-in" >Our Services</h1>
      )}

      <Tabs defaultValue="legal" className="space-y-8">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full min-h-[50px]">
          <TabsTrigger value="legal" className="flex items-center gap-2 text-xl font-semibold">
            <Scale className="h-5 w-5" />
            Legal Advisory
          </TabsTrigger>
          <TabsTrigger value="gamified" className="flex items-center gap-2 text-xl font-semibold">
            <GamepadIcon className="h-5 w-5" />
            Interactive Learning
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2 text-xl font-semibold">
            <Users2 className="h-5 w-5" />
            Community
          </TabsTrigger>
          <TabsTrigger value="wellbeing" className="flex items-center gap-2 text-xl font-semibold">
            <Heart className="h-5 w-5" />
            Well-being
          </TabsTrigger>
        </TabsList>

        <TabsContent value="legal" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Legal Rights & Advisory</h2>
            <p className="text-lg">Understand your legal rights and seek professional guidance.</p>
            <Link to="/legal-help" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Explore Legal Help & Resources
            </Link>
          </Card>
        </TabsContent>

        <TabsContent value="gamified" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Interactive Learning</h2>
            <p className="text-lg">Engage in quizzes and simulations to learn about safety and rights.</p>
            <Link to="/interactive-learning" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Start Interactive Learning Now
            </Link>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Community Support</h2>
            <p className="text-lg">Join a safe space to share experiences and support each other.</p>
            <Link to="/community-support" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Join the Community & Share Stories
            </Link>
          </Card>
        </TabsContent>

        <TabsContent value="wellbeing" className="space-y-8">
          <Card className="p-8">
            <h2 className="text-3xl font-semibold mb-6">Mental Well-being</h2>
            <p className="text-lg">Explore mindfulness, self-defense, and mental health resources.</p>
            <Link to="/mental-wellbeing" className="inline-block mt-6 px-6 py-2 text-white bg-red-500 rounded hover:bg-red-400">
              Improve Your Mental Well-being
            </Link>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Card } from "@/components/ui/card";
  import { Scale, GamepadIcon, Users2, Heart  } from "lucide-react";

  export function ServicesPage() {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">Our Services</h1>
        
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
              <div className="prose max-w-none">
                <h3 className="text-2xl font-medium mb-4">Know Your Rights</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-xl font-medium mb-3">Domestic Violence Laws</h4>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Protection Orders</li>
                      <li>Emergency Restraining Orders</li>
                      <li>Legal Aid Services</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-3">Workplace Rights</h4>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Sexual Harassment Laws</li>
                      <li>Equal Pay Rights</li>
                      <li>Discrimination Protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-medium mb-4">Family Protection Laws</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li>Child Custody Rights</li>
                <li>Divorce Laws</li>
                <li>Spousal Support & Alimony</li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="gamified" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-semibold mb-6">Interactive Learning</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium">Legal Rights Quiz</h3>
                  <p className="text-lg">Test your knowledge about your legal rights through our interactive quiz.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium">Safety Scenarios</h3>
                  <p className="text-lg">Practice decision-making in various scenarios through our interactive simulations.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-medium mb-4">Emergency Response Simulation</h3>
              <p className="text-lg">Engage in real-life emergency response simulations to prepare for various safety situations.</p>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-semibold mb-6">Community Support</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium mb-4">Share Your Story</h3>
                  <p className="text-lg mb-6">
                    Connect with others and share your experiences in a safe, anonymous environment.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-4">Discussion Forums</h3>
                  <p className="text-lg">
                    Join moderated discussions on various topics related to safety and well-being.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-medium mb-4">Peer Support Groups</h3>
              <p className="text-lg">Connect with peers for support, guidance, and shared experiences in overcoming challenges.</p>
            </Card>
          </TabsContent>

          <TabsContent value="wellbeing" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-semibold mb-6">Mental Well-being</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium">Yoga Sessions</h3>
                  <p className="text-lg">Access guided yoga sessions designed for stress relief and mental peace.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium">Self-Defense Basics</h3>
                  <p className="text-lg">Learn fundamental self-defense techniques through video tutorials.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-medium mb-4">Mindfulness Meditation</h3>
              <p className="text-lg">Guided sessions focused on mindfulness and meditation to improve mental clarity and focus.</p>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-medium mb-4">Stress Management Workshops</h3>
              <p className="text-lg">Workshops that teach effective techniques for managing stress and emotional well-being.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

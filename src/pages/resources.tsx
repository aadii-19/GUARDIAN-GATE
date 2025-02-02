import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PhoneCall, Globe, Heart } from "lucide-react";

const resources = [
  {
    title: "Emergency Helplines",
    description: "Find immediate support through 24/7 helplines for women and children in distress.",
    icon: <PhoneCall size={24} />, 
    link: "#",
  },
  {
    title: "Mental Health Support",
    description: "Access counseling services, self-care tips, and mental health hotlines.",
    icon: <Heart size={24} />, 
    link: "#",
  },
  {
    title: "Legal Assistance",
    description: "Know your rights! Get legal aid, protection orders, and advocacy support.",
    icon: <BookOpen size={24} />, 
    link: "#",
  },
  {
    title: "Online Safety & Awareness",
    description: "Learn about digital safety, cyberbullying prevention, and self-defense strategies.",
    icon: <Globe size={24} />, 
    link: "#",
  },
];

export default function ResourcesPage() {
  // Animation for fade-in effect
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
      el.classList.add('opacity-0');
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('transition-opacity', 'duration-1000', 'opacity-100');
      }, 100);
    });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12 fade-in">Resources & Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {resources.map((resource, index) => (
          <Card 
            key={index} 
            className="fade-in p-6 flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="mb-4 text-indigo-600">{resource.icon}</div>
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{resource.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{resource.description}</p>
              <Button variant="outline" className="transition-all duration-300 hover:bg-indigo-600 hover:text-white">
                <a href={resource.link}>Learn More</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

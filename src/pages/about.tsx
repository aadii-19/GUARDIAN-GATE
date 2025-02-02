import { useEffect } from "react";

const aboutSections = [
  {
    title: "Our Mission",
    description: "Guardian Gate is dedicated to providing support and resources for women and children's safety and mental well-being.",
  },
  {
    title: "Who We Are",
    description: "We are a community-driven initiative focused on creating a safe and supportive environment for those in need.",
  },
  {
    title: "What We Offer",
    description: "From emergency helplines to mental health support, we ensure that help is always available.",
  },
  {
    title: "Get Involved",
    description: "Join our mission by volunteering, donating, or spreading awareness about safety and well-being.",
  },
  // Additional sections
  {
    title: "Our Values",
    description: "We believe in inclusivity, empathy, and empowering individuals to take control of their safety and well-being.",
  },
  {
    title: "Our Vision",
    description: "We envision a world where everyone, especially women and children, can live free from harm and access the support they need.",
  },
];

export default function AboutPage() {
  // Using a simple useEffect hook to trigger a fade-in animation
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
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12 fade-in">About Us</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className="space-y-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out fade-in"
          >
            <h2 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect } from "react";

const aboutSections = [
  // Initial sections
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
    <div className="p-8 max-w-7xl mx-auto bg-white">
      <div className="flex justify-center">
  <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 mb-9 flex items-center space-x-4">
    
    <h2 className="text-3xl font-bold text-center">Our Services</h2>
  </div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-[12px] border-4 border-gray-200 shadow-xl hover:shadow-2xl hover:scale-105 hover:translate-y-2 transition-all duration-500 ease-in-out hover:rounded-[20px] flex flex-col items-center space-y-6 fade-in"
          >
            <h2 className="text-2xl font-semibold text-gray-900 hover:text-primary transition-colors duration-300">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

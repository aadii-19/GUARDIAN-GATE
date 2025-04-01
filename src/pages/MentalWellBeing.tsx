import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExpandableCard from "@/components/ExpandableCards";
import { motion } from "framer-motion";
import ModalWindow from "@/components/ModalWindow";
import BreathingExercise from "@/components/BreathingExercise";
import MeditationTool from "@/components/MeditationTool";
import YogaPoseGuide from "@/components/YogaPoseGuide";

export default function MentalWellBeing() {
  const [activeSection, setActiveSection] = useState<'women' | 'children'>('women');
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMeditation, setIsModalOpenMeditation] = useState(false);
  const [isModalOpenYoga, setIsModalOpenYoga] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-6 py-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex justify-center">
  <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 mb-9 flex items-center space-x-4">
    
    <h2 className="text-3xl font-bold text-center"> Mental Well-being & Support</h2>
  </div>
</div>
       
      

      <p className="text-xl mb-12 text-center text-gray-600">
        Prioritizing mental health is essential. Explore strategies, resources, and professional support for emotional well-being.
      </p>

      <div className="flex justify-center space-x-6 mb-12">
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === 'women' ? 'bg-red-600' : 'bg-red-500'
          } text-white hover:bg-red-300`}
          onClick={() => setActiveSection('women')}
        >
          Women's Mental Health
        </Button>
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === 'children' ? 'bg-red-600' : 'bg-red-500'
          } text-white hover:bg-red-300`}
          onClick={() => setActiveSection('children')}
        >
          Children's Mental Health
        </Button>
        
      </div>

      {activeSection === 'women' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100 shadow-md rounded-lg p-4"
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
            Women's Mental Well-being & Resources
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center mb-6">
            {[
              "Managing Anxiety & Stress",
              "Self-care & Mindfulness",
              "Coping with Depression",
              "Work-Life Balance",
              "Therapy & Counseling Options",
              "Dealing with Trauma",
              "Emotional Support Groups",
              "Mental Health Helplines"
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${
                  selectedTopic === topic ? 'bg-red-500 text-white' : 'bg-gray-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {activeSection === 'children' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100 shadow-md rounded-lg p-8"
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
            Children's Mental Well-being & Resources
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center mb-6">
            {[
              "Managing Anxiety & Stress",
              "Self-care & Mindfulness",
              "Coping with Depression",
              "School-Life Balance",
              "Therapy & Counseling Options",
              "Dealing with Trauma",
              "Emotional Support Groups",
              "Mental Health Helplines"
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${
                  selectedTopic === topic ? 'bg-red-500 text-white' : 'bg-gray-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {selectedTopic && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] max-w-full max-h-full overflow-auto">
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
            <h3 className="text-3xl font-bold mb-4 text-center">{selectedTopic}</h3>
            <ExpandableCard
              title={selectedTopic}
              description={`Detailed insights about ${selectedTopic}.`}
              details={`Here you will find valuable content about ${selectedTopic}.`}
            />
          </div>
        </div>
      )}

      {/* Mental Well-being Tools Section inside a styled box */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100 shadow-md rounded-lg p-4"
      >
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
          Mental Well-being Tools
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none bg-red-500 text-white hover:bg-red-300"
            onClick={() => setIsModalOpen(true)}
          >
            Breathing Exercise
          </button>
          <button
            className="px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none bg-red-500 text-white hover:bg-red-300"
            onClick={() => setIsModalOpenMeditation(true)}
          >
            Meditation Sessions
          </button>
          <button
            className="px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none bg-red-500 text-white hover:bg-red-300"
            onClick={() => setIsModalOpenYoga(true)}
          >
            Yoga Pose Guide
          </button>
        </div>

        {isModalOpen && (
          <ModalWindow onClose={() => setIsModalOpen(false)}>
            <BreathingExercise />
          </ModalWindow>
        )}
        {isModalOpenMeditation && (
          <ModalWindow onClose={() => setIsModalOpenMeditation(false)}>
            <MeditationTool />
          </ModalWindow>
        )}
        {isModalOpenYoga && (
          <ModalWindow onClose={() => setIsModalOpenYoga(false)}>
            <YogaPoseGuide />
          </ModalWindow>
        )}
      </motion.section>
    </div>
  );
}

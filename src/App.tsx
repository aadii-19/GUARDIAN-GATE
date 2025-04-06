import { Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { EmergencyPage } from "@/pages/EmergencyPage";
import ResourcesPage from "@/pages/resources";
import AboutPage from "@/pages/about";
import LHR from "@/pages/LHR"; // Import Legal Help & Resources Page
import MWB from "@/pages/MentalWellBeing"; // Import Mental Well-being Page 
import IL from "@/pages/InteractiveLearning";
import RQ from "@/components/RightsQuiz";
import SS from "@/components/SafetySimulator";
import MTF from "@/components/MatchTheFollowing";
import CB from "@/components/ChatBot";
function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/legal-help" element={<LHR/>} /> 
        <Route path="/mental-wellbeing" element={<MWB/>} />
        <Route path="/interactive-learning" element={<IL/>} />
        <Route path="/game-1" element={<RQ/>} />
        <Route path="/game-2" element={<SS/>} />
        <Route path="/game-3" element={<CB/>} />
        <Route path="/game-4" element={<MTF/>} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

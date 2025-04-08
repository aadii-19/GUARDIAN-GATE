import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { EmergencyPage } from "@/pages/EmergencyPage"; // ✅
import ResourcesPage from "@/pages/resources";
import AboutPage from "@/pages/about";
import LHR from "@/pages/LHR";
import MWB from "@/pages/MentalWellBeing";
import IL from "@/pages/InteractiveLearning";
import RQ from "@/components/RightsQuiz";
import SS from "@/components/SafetySimulator";
import MTF from "@/components/MatchTheFollowing";
import CB from "@/components/ChatBot";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />

        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emergency" element={<EmergencyPage />} /> {/* 🔓 Public now */}

          {/* 🔐 Protected Routes */}
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
          <Route path="/legal-help" element={<ProtectedRoute><LHR /></ProtectedRoute>} />
          <Route path="/mental-wellbeing" element={<ProtectedRoute><MWB /></ProtectedRoute>} />
          <Route path="/interactive-learning" element={<ProtectedRoute><IL /></ProtectedRoute>} />
          <Route path="/game-1" element={<ProtectedRoute><RQ /></ProtectedRoute>} />
          <Route path="/game-2" element={<ProtectedRoute><SS /></ProtectedRoute>} />
          <Route path="/game-3" element={<ProtectedRoute><CB /></ProtectedRoute>} />
          <Route path="/game-4" element={<ProtectedRoute><MTF /></ProtectedRoute>} />
        </Routes>

        {!hideFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;

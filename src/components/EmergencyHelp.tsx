import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import "@/index.css"; // Make sure your .cssbuttons-io-button styles are also in this file or imported

export function EmergencyHelp() {
  const navigate = useNavigate();

  return (
    <div className="bg-destructive text-destructive-foreground w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <Phone className="w-12 h-12 phone-shake" />
            <div>
              <h2 className="text-2xl font-bold leading-snug">
                <Typewriter
                  words={["Need Immediate Help?"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </h2>
              <p className="text-lg">24/7 Emergency Support Available</p>
            </div>
          </div>

          {/* Custom Button */}
          <button
            className="cssbuttons-io-button"
            onClick={() => navigate("/emergency")}
          >
            Get Emergency Help Now
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

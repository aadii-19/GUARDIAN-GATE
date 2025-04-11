import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t backdrop-blur-lg bg-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.3)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary drop-shadow-sm" />
              <span className="text-xl font-bold text-black tracking-wide">Guardian Gate</span>
            </div>
            <p className="text-sm text-gray-800/80 leading-relaxed">
              Dedicated to protecting and supporting women and children's safety and well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-700/80">
              {["Home", "About Us", "Services", "Resources"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-primary transition duration-300 ease-in-out hover:underline underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Support</h3>
            <ul className="space-y-3 text-sm text-gray-700/80">
              {["Emergency Help", "Counseling", "Support Groups", "Safety Resources"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-primary transition duration-300 ease-in-out hover:underline underline-offset-4"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-700/80">
              <li><span className="font-medium">Emergency:</span> 1-800-SAFE-NOW</li>
              <li><span className="font-medium">Email:</span> help@guardiangate.org</li>
              <li><span className="font-medium">Hours:</span> 24/7 Support</li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-gray-300/30 pt-6 text-center text-sm text-gray-700/80">
          <p>&copy; {new Date().getFullYear()} <span className="font-medium text-black">Guardian Gate</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

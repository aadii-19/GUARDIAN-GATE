import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">Guardian Gate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Dedicated to protecting and supporting women and children's safety and well-being.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Emergency Help</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Counseling</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support Groups</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Safety Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Emergency: 1-800-SAFE-NOW</li>
              <li>Email: help@guardiangate.org</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Guardian Gate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
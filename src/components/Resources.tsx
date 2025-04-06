import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Book, Phone, Shield } from "lucide-react";

export function Resources() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-center">
  <div className="border-2 border-black rounded-2xl shadow-lg px-6 py-3 mb-9 flex items-center space-x-4">
    
    <FileText className="w-8 h-8 text-primary" />
    
    
    <h2 className="text-3xl font-bold text-center">Helpful Resources</h2>
  </div>
</div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: FileText, title: "Legal Documents", desc: "Access important legal forms and documents.", btnText: "View Documents" },
            { Icon: Book, title: "Educational Materials", desc: "Learn about your rights and safety measures.", btnText: "Access Materials" },
            { Icon: Phone, title: "Support Directory", desc: "Find local support services and contacts.", btnText: "View Directory" },
            { Icon: Shield, title: "Safety Planning", desc: "Create your personal safety plan.", btnText: "Start Planning" }
          ].map(({ Icon, title, desc, btnText }, index) => (
            <Card 
              key={index} 
              className="p-8 border-4 border-black-700 bg-white rounded-2xl shadow-3xl min-h-[300px] h-full flex flex-col justify-between transition-all duration-300 hover:shadow-4xl hover:scale-105 hover:-translate-y-1"
            >
              <div>
                <Icon className="w-14 h-14 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-black-800 mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
              <Button variant="outline" className="w-full border-2 border-gray-700 text-gray-800 font-semibold  hover:transition-all duration-300">
                {btnText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    
    
    
      </div>
  );
}

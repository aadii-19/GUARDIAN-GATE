import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Book, Phone, Shield } from "lucide-react";

export function Resources() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Helpful Resources</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Legal Documents</h3>
            <p className="text-muted-foreground mb-4">
              Access important legal forms and documents.
            </p>
            <Button variant="outline" className="w-full">View Documents</Button>
          </Card>

          <Card className="p-6">
            <Book className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Educational Materials</h3>
            <p className="text-muted-foreground mb-4">
              Learn about your rights and safety measures.
            </p>
            <Button variant="outline" className="w-full">Access Materials</Button>
          </Card>

          <Card className="p-6">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Support Directory</h3>
            <p className="text-muted-foreground mb-4">
              Find local support services and contacts.
            </p>
            <Button variant="outline" className="w-full">View Directory</Button>
          </Card>

          <Card className="p-6">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Safety Planning</h3>
            <p className="text-muted-foreground mb-4">
              Create your personal safety plan.
            </p>
            <Button variant="outline" className="w-full">Start Planning</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
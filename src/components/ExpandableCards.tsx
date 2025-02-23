import { useState } from "react";
import { Card } from "@/components/ui/card";

interface ExpandableCardProps {
  title: string;
  description: string;
  details: string;
}


export default function ExpandableCard({ title, description, details }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="p-6 shadow-lg rounded-lg bg-blue-50 hover:bg-blue-100 transform transition-all hover:scale-[1.025] hover:duration-200 border-2 border-red-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="mt-4 text-lg text-gray-700">{description}</p>
      {isExpanded && (
        <div className="mt-4 text-gray-800 border-t-2 border-gray-300 pt-4">
          <p>{details}</p>
        </div>
      )}
    </Card>
  );
}

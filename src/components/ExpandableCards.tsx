import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ExpandableCardProps {
  title: string;
  description: string;
  details: React.ReactNode;
}

export default function ExpandableCard({ title, description, details }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Card
      className="p-6 shadow-lg rounded-lg bg-white-50 hover:bg-white-100 transform transition-all hover:scale-[1.025] hover:duration-200 border-2 border-red-400 cursor-pointer"
      onClick={toggleExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleExpand();
        }
      }}
      tabIndex={0} // Makes the card focusable for keyboard interaction
      role="button" // Improves accessibility
    >
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="mt-4 text-lg text-gray-700">{description}</p>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-gray-800 border-t-2 border-gray-300 pt-4"
        >
          <div>{details}</div>
        </motion.div>
      )}
    </Card>
  );
}

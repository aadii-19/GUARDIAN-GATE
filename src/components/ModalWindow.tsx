import { motion } from "framer-motion";
import { useEffect, ReactNode, FC } from "react";

interface ModalWindowProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 z-10" // added z-10
      >
        Close
      </button>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] overflow-auto relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ModalWindow;
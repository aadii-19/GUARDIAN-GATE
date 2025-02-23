import { motion } from "framer-motion";

interface ModalWindowProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalWindow({ children, onClose }: ModalWindowProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] overflow-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Close
        </button>
        {children} {/* Now it accepts any content */}
      </motion.div>
    </div>
  );
}

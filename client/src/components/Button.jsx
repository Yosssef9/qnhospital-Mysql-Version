import { motion } from "framer-motion";

export default function Button({ text }) {
  return (
    <>
      <motion.button
        className="text-white rounded-md bg-[#2e438a] hover:bg-[#2e438a]/80 transition-all duration-300 cursor-pointer w-32 py-2 px-4"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {text}
      </motion.button>
    </>
  );
}

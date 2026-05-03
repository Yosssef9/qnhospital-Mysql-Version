import { motion } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 2500); // 2.5s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,95,108,0.08),transparent_40%)]" />
      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center text-center px-6"
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.img
          src="/images/newLogo-removebg-preview.png"
          alt="QNH Hospital Logo"
          className="w-[320px] md:w-[420px] h-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            y: { duration: 2.2, repeat: Infinity, repeatType: "mirror" },
          }}
        />

        {/* Title */}
        <motion.h1
          className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-[#042777]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          Welcome to QN Hospital
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-2 text-sm md:text-base text-slate-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          Caring • Quality • Trust
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-[#105f6c]"
              animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

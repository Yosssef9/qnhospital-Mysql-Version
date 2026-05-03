import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay2() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <img
            src="/images/newLogo-removebg-preview.png"
            alt="Qassim National Hospital"
            className="h-10 w-auto opacity-90"
          />

          {/* Simple spinner */}
          <div className="h-6 w-6 border-2 border-slate-200 border-t-[rgb(21,98,160)] rounded-full animate-spin" />

          {/* Optional text */}
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

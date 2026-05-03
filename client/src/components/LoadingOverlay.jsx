import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingOverlay (QNH style)
 * - Soft white overlay (matches site)
 * - Logo-inspired “crescent weave” spinner
 * - Optional wordmark/logo under spinner
 *
 * Usage:
 * {loading && <LoadingOverlay />}
 */
export default function LoadingOverlay() {
  return (
    <AnimatePresence>
      <motion.div
        key="qnh-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[999] flex items-center justify-center"
      >
        {/* Overlay background (eye-friendly) */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-md" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(21,98,160,0.12),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(21,98,160,0.08),transparent_55%)]" />

        {/* Content */}
        <motion.div
          initial={{ scale: 0.98, y: 6, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.98, y: 6, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="relative flex flex-col items-center gap-4"
        >
          {/* Spinner Card */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm px-8 py-6">
            <div className="flex flex-col items-center gap-3">
              {/* Logo-inspired spinner */}
              <motion.div
                aria-label="Loading"
                role="status"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="relative h-16 w-16"
              >
                {/* Crescent weave SVG */}
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Base crescent arc */}
                  <path
                    d="M 60 10
                       A 50 50 0 1 1 60 110"
                    stroke="rgba(21,98,160,0.22)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />

                  {/* “Weave” layer 1 (dashed, main blue) */}
                  <path
                    d="M 60 10
                       A 50 50 0 1 1 60 110"
                    stroke="rgb(21,98,160)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="5 9"
                    opacity="0.95"
                  />

                  {/* “Weave” layer 2 (dashed, lighter blue) slightly offset */}
                  <g transform="rotate(12 60 60)">
                    <path
                      d="M 60 10
                         A 50 50 0 1 1 60 110"
                      stroke="rgba(64,165,208,0.95)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="3 11"
                      opacity="0.9"
                    />
                  </g>

                  {/* Small inner highlight arc for depth */}
                  <path
                    d="M 60 18
                       A 42 42 0 1 1 60 102"
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>

                {/* center dot (subtle) */}
                <div className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-[rgb(21,98,160)]/20" />
              </motion.div>

              {/* Text */}
              <div className="text-center">
                <div className="text-sm font-bold text-slate-900">
                  Please wait…
                </div>
                <div className="mt-0.5 text-xs text-slate-600">
                  Loading Qassim National Hospital
                </div>
              </div>

              {/* Optional: show your logo/wordmark (uncomment and set correct path) */}
              <img
                src="/images/newLogo-removebg-preview.png"
                alt="Qassim National Hospital"
                className="h-10 w-auto object-contain opacity-95"
              />
            </div>
          </div>

          {/* Tiny hint line (optional) */}
          <div className="text-[11px] text-slate-500">
            Secure • Reliable • Patient-first
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingOverlay from "../components/LoadingOverlay";
import LoadingOverlay2 from "../components/LoadingOverlay-2";

const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  // const [loading, setLoading] = useState(true); // Start with loading true

  // useEffect(() => {
  //   // Simulate loading time - adjust duration as needed
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000000); // 3 seconds delay

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      <AnimatePresence>{loading && <LoadingOverlay2 />}</AnimatePresence>
      {/* <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence> */}
    </LoadingContext.Provider>
  );
};

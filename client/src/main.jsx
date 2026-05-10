import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/router";
import { LoadingProvider } from "./context/LoadingContext";
import App from "./App";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";
import { initGA } from "./utils/analytics";

initGA();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000 * 60, // 5 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        {import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}{" "}
      </QueryClientProvider>
    </LoadingProvider>
  </StrictMode>,
);

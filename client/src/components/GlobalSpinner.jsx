import { useIsFetching } from "@tanstack/react-query";

export default function GlobalSpinner() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[rgb(21,98,160)]"></div>

        {/* Text */}
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

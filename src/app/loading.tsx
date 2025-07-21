export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Main spinning ring */}
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-primary rounded-full animate-spin"></div>

        {/* Secondary ring with different timing */}
        <div
          className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-primary/50 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
      </div>
    </div>
  );
}

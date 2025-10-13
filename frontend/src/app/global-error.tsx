"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center min-h-screen bg-[#ECF0F0]">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-500">Fatal Error</h1>
            <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-700">
              Something went seriously wrong!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              The application encountered a critical error. We have been
              notified and are working to fix the issue.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#045D5E] text-white rounded-full hover:bg-[#034344] transition-colors duration-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

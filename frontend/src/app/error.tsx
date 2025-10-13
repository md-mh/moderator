"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
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
    <div className="flex items-center justify-center min-h-screen bg-[#ECF0F0]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Error</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-700">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          An unexpected error has occurred. We have been notified and are
          working to fix the issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#045D5E] text-white rounded-full hover:bg-[#034344] transition-colors duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

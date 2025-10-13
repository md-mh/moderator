export function getStatusMessage(status: number, fallback?: string): string {
  switch (status) {
    case 200:
      return "Request was successful.";
    case 204:
      return "Request was successful.";
    case 400:
      return "Bad request. Please check your input.";
    case 401:
      return "You are not authorized. Please log in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 405:
      return "Method not allowed.";
    case 408:
      return "Request timeout. Please try again.";
    case 409:
      return "Conflict. The request could not be completed due to a conflict.";
    case 413:
      return "Payload too large. Please upload a smaller file.";
    case 415:
      return "Unsupported media type.";
    case 429:
      return "Too many requests. Please slow down.";
    case 500:
      return "A server error occurred. Please try again later.";
    case 502:
      return "Bad gateway. Please try again later.";
    case 503:
      return "Service unavailable. Please try again later.";
    case 504:
      return "Gateway timeout. Please try again later.";
    // Add more as needed
    default:
      return fallback || "An unknown error occurred.";
  }
}

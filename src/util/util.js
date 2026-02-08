import { useRef, useEffect } from "react";

// Base URL for API: same origin in browser (avoids production proxy/CDN issues), empty for SSR
function getApiBase() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

// Make an API request to `/api/{path}`
export function apiRequest(path, method = "GET", data) {
  const url = `${getApiBase()}/api/${path}`;
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then(async (response) => {
      const text = await response.text();
      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        throw new CustomError(
          "INVALID_RESPONSE",
          response.ok ? "Invalid response from server." : "Something went wrong. Please try again or contact us directly."
        );
      }
      if (!response.ok) {
        const message = json.message || json.error || response.statusText || "Something went wrong.";
        throw new CustomError(json.code || "REQUEST_FAILED", message);
      }
      if (json.status === "error") {
        throw new CustomError(json.code, json.message);
      }
      return json.data;
    });
}

// Make an API request to any external URL
export function apiRequestExternal(url, method = "GET", data) {
  return fetch(url, {
    method: method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json());
}

// Create an Error with custom message and code
export function CustomError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

// Hook that returns previous value of state
export function usePrevious(state) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}

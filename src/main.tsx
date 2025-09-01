import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

// Check if Convex URL is configured
const convexUrl = import.meta.env.VITE_CONVEX_URL;
let convex: ConvexReactClient;

if (!convexUrl) {
  console.error("VITE_CONVEX_URL is not set. Please run 'npx convex dev' to set up your Convex deployment.");
  // Create a fallback client that will show an error message
  convex = new ConvexReactClient("https://placeholder.convex.cloud");
} else {
  convex = new ConvexReactClient(convexUrl);
}

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
);

import React from "react";

// Import ReactDOM for rendering the React application to the DOM
import ReactDOM from "react-dom/client";

// Import application styles
import "./App.css";

// Import the root App component
import App from "./App";

// Import BrowserRouter to enable client-side routing
import { BrowserRouter } from "react-router-dom";

// Import Google OAuth provider for Google authentication
import { GoogleOAuthProvider } from "@react-oauth/google";

// Import authentication context provider
import { AuthProvider } from "./context/AuthContext";

// Import AOS (Animate On Scroll) library
import AOS from "aos";

// Import AOS default styles
import "aos/dist/aos.css";

// Initialize AOS animations 
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  once: true, // Run animation only once per element
});

// Retrieve Google Client ID from environment variables
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application into the DOM
root.render(
  <React.StrictMode>
    {/* Provide Google OAuth context to the entire app */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* Provide authentication  */}
      <AuthProvider>
        {/* Enable routing across the application */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
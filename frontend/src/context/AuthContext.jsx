import { createContext, useContext, useEffect, useState } from "react";

/* This is for managing authentication state
 * across the entire application. It provides access to the currently authenticated user, 
   authentication actions, and loading status.*/
const AuthContext = createContext();

/* AuthProvider Component
 * This provider wraps the application and supplies authentication
 * data and functions to all child components using React Context.*/
export const AuthProvider = ({ children }) => {
  // Stores the authenticated user's data
  const [user, setUser] = useState(null);

  // Tracks whether authentication state is still being restored
  const [loading, setLoading] = useState(true);

  /**
   * useEffect: Restore authentication state on page refresh . 
   * This effect runs once when the application loads. It checks
   * localStorage for previously saved user data and authentication
   * token to persist login sessions across browser refreshes.*/
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // If both user data and token exist, restore authentication state
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    // Mark authentication restoration as complete
    setLoading(false);
  }, []);

  /** login
   * Handles user login by storing authentication credentials
   * in localStorage and updating the global user state.*/
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  /**logout
   * Clears authentication data from localStorage and resets
   * the global user state, effectively logging the user out.
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  /*context Provider
   * Exposes authentication-related state and functions
   * to all components wrapped within this provider. */
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/*useAuth Hook
 * A custom hook that provides easy access to authentication
 * context values without requiring repeated useContext calls.*/
export const useAuth = () => useContext(AuthContext);
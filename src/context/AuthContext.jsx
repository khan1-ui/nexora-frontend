import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import api from "../services/api";

export const AuthContext = createContext();

/**
 * AuthProvider
 * ---------------------------------
 * Handles:
 * - Login
 * - Logout
 * - Persistent session restore
 * - Secure token handling
 * - Clean architecture (No UI logic here)
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore session on mount
   */
  useEffect(() => {
    const restoreSession = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          const parsedUser = JSON.parse(storedUser);

          // Attach token globally
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * Login
   * UI handles toast & navigation
   */
  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = data;

    // Save token
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Attach token to axios
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    setUser(user);

    return user;
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];

    setUser(null);
  }, []);

  /**
   * Context value
   */
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
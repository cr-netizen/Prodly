import { useState, useCallback } from "react";
import { AuthContext } from "./authContextObject";


function readStoredUser() {
  try {
    const raw = window.localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("token")
  );
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback((nextToken, nextUser) => {
    window.localStorage.setItem("token", nextToken);
    if (nextUser) {
      window.localStorage.setItem("user", JSON.stringify(nextUser));
    }
    setToken(nextToken);
    setUser(nextUser ?? readStoredUser());
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: Boolean(token), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("login-user");
    const savedToken = sessionStorage.getItem("access_token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

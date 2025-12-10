import { createContext, useState, useEffect } from "react";
import API from "../api/axiosConfig";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Check for token and user data on load
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Force redirect to login
  };

  return (
    <AppContext.Provider value={{ user, setUser, applications, setApplications, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

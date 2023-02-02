import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../services/AuthService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const localUsedData = localStorage.getItem("user");
  const userData = localUsedData ? JSON.parse(localUsedData) : {};
  const [user, setUser] = useState(userData);

  const handleLogin = async (data) => {
    try {
      const response = await authService.login(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await authService.register(data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/login");
    } catch (error) {}
  };
  const handleLogout = async (data) => {
    try {
      const response = await authService.logout(data);
      setUser({});
      localStorage.removeItem("token")
      localStorage.removeItem('user')

      navigate("/login");
    } catch (error) { 
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
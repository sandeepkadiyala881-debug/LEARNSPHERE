import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔥 TEMPORARY: Disable Base44 authentication completely
    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
    setAuthError(null);
  }, []);

  const navigateToLogin = () => {
    console.log("Login navigation disabled (demo mode)");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

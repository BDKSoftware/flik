import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
const AuthContext = createContext();

// Functional Component Declaration
const AuthProvider = ({ children }) => {
  // State Declaration
  const [userToken, setUserToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_token");

      if (value) {
        setUserToken(value);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  // Function Declaration
  useEffect(() => {
    readData();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem("@user_Token", token);
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user_token");
    setUserToken(null);
    setIsLoggedIn(false);
  };

  const register = async () => {
    return;
  };

  // Values passed to the context
  const authContextValue = {
    userToken,
    isLoggedIn,
    login,
    logout,
    register,
  };

  // Return
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

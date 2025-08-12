import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLogggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, SetUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      SetUser(storedUser);
      setIsLogggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (userdata) => {
    setIsLogggedIn(true);
    SetUser(userdata);
    sessionStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = (data) => {
    if (data) {
      setIsLogggedIn(false);
      SetUser(null);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, user, loading, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

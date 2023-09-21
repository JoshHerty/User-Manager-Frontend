import { ReactNode, useState } from "react";
import UserContext from "./UserContext";
import User from "../models/User";

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notification, _setNotification] = useState<string | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN")
  );

  const setNotification = (message: string) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification(null);
    }, 5000);
  };

  const setToken = (token: string | null) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

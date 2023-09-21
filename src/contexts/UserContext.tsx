import { createContext, useContext } from "react";
import User from "../models/User";

export interface UserContextProviderModel {
  user: User | null;
  token: string | null;
  notification: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setNotification: (message: string) => void;
}

const defaultValue: UserContextProviderModel = {
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
};

const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

export default UserContext;

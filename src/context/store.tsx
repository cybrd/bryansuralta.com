import {
  createContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { User } from "../models/user";
import { Login } from "../models/login";

type StoreSetResult<T> = (value: T) => void;
type StoreSet<T> = (
  key: string,
  setter: Dispatch<SetStateAction<T>>
) => StoreSetResult<T>;

type StoreState = {
  user: User;
  setStoreUser: StoreSetResult<User>;
  login: Login;
  setStoreLogin: StoreSetResult<Login>;
};
const initState = {} as StoreState;

export const StoreContext = createContext(initState);

const getStore = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key) as string);
};

const setStore: StoreSet<any> = (key, setter) => {
  return (value) => {
    setter(value);
    return window.localStorage.setItem(key, JSON.stringify(value));
  };
};

export const StoreProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: "",
  });
  const [login, setLogin] = useState<Login>(getStore("login"));

  const store: StoreState = {
    user,
    setStoreUser: setStore("user", setUser),
    login,
    setStoreLogin: setStore("login", setLogin),
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

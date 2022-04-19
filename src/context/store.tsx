import {
  createContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { User } from "../models/user";

type StoreSetResult<T> = (value: T) => void;
type StoreSet<T> = (
  key: string,
  setter: Dispatch<SetStateAction<T>>
) => StoreSetResult<T>;

type StoreState = {
  user: User;
  signingIn: boolean;
  setStoreUser: StoreSetResult<User>;
  setStoreSigningIn: StoreSetResult<boolean>;
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
  const [user, setUser] = useState<User>({});
  const [signingIn, setSigningIn] = useState<boolean>(getStore("signingIn"));

  const store: StoreState = {
    user,
    signingIn,
    setStoreUser: setStore("user", setUser),
    setStoreSigningIn: setStore("signingIn", setSigningIn),
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

import {
  createContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { User } from "../models/user";

type StoreState = {
  user: User;
  signingIn: boolean;
  setStore: {
    user: any;
    signingIn: any;
  };
};
const initState = {} as StoreState;

export const StoreContext = createContext(initState);

const getStore = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key) as string);
};

const setStore = <T,>(key: string, setter: Dispatch<SetStateAction<T>>) => {
  return (value: T) => {
    setter(value);
    return window.localStorage.setItem(key, JSON.stringify(value));
  };
};

export const StoreProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState({});
  const [signingIn, setSigningIn] = useState(getStore("signingIn"));

  const store: StoreState = {
    user,
    signingIn,
    setStore: {
      user: setStore("user", setUser),
      signingIn: setStore("signingIn", setSigningIn),
    },
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

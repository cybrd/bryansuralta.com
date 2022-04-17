import {
  createContext,
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { User } from "../models/user";

type InitState = {
  user: [User | null, Dispatch<SetStateAction<User | null>>];
};
const initState = {} as InitState;

export const StoreContext = createContext(initState);

export const StoreProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const store = {
    user: useState(JSON.parse(window.localStorage.getItem("user") as string)),
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

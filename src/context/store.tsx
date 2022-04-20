import {
  createContext,
  FunctionComponent,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

import { User } from "../models/user";
import { Login } from "../models/login";

type StoreState = {
  user: User;
  setUser: Dispatch<User>;
  login: Login;
  setLogin: Dispatch<Login>;
};
const initState = {} as StoreState;

export const StoreContext = createContext(initState);

export const StoreProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useReducer(
    (prev: User, current: User) => {
      const updated = { ...prev, ...current };
      window.localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    },
    { name: "" }
  );

  const [login, setLogin] = useReducer((prev: Login, current: Login) => {
    const updated = { ...prev, ...current };
    window.localStorage.setItem("login", JSON.stringify(updated));
    return updated;
  }, JSON.parse(window.localStorage.getItem("login") as string));

  const store: StoreState = {
    user,
    setUser,
    login,
    setLogin,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

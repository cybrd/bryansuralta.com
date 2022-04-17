import { FunctionComponent, useContext } from "react";

import { StoreContext } from "../../context/store";
import "./index.scss";

export const Login: FunctionComponent = () => {
  const { user } = useContext(StoreContext);
  console.log("Login");

  const loginClick = () => {
    user[1]({
      name: "test",
    });
  };

  return (
    <div id="login">
      {user[0]?.name ? (
        <div>Welcome {user[0].name}</div>
      ) : (
        <div onClick={loginClick}>Login</div>
      )}
    </div>
  );
};

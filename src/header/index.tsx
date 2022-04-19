import { FunctionComponent } from "react";

import { Logo } from "./logo";
import { Banner } from "./banner";
import { Login } from "./login";
import "./index.scss";

export const Header: FunctionComponent = () => {
  return (
    <div id="header-wrapper">
      <div id="header">
        <Logo />
        <Banner />
        <Login />
      </div>
    </div>
  );
};

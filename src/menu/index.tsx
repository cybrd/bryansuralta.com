import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

export const Menu: FunctionComponent = () => {
  return (
    <div id="menu-wrapper">
      <div id="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/comment">Comment</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

import { StoreContext } from "../../context/store";
import { SignIn } from "./sign-in";
import "./index.scss";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

Amplify.configure({
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_FYMeBFCcH",
  aws_user_pools_web_client_id: "s7k2ite2i04r2f7smld6js12a",
  oauth: {
    domain: "bryansuralta.auth.us-east-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: isLocalhost
      ? "http://localhost:3000"
      : "https://bryansuralta.com",
    redirectSignOut: isLocalhost
      ? "http://localhost:3000"
      : "https://bryansuralta.com",
    responseType: "token",
  },
});

export const Login: FunctionComponent = () => {
  const { user, setUser } = useContext(StoreContext);
  const [signOut, setSignOut] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser: CognitoUser) => {
        setUser({
          name: currentUser.getUsername(),
        });
      })
      .catch(() => {
        console.log("Not signed in");
      });
  }, [setUser]);

  if (signOut) {
    return <div id="login">Signing out...</div>;
  } else if (user?.name) {
    return (
      <div id="login">
        Welcome {user.name}
        <button
          onClick={() => {
            setSignOut(true);
            Auth.signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div id="login">
        <SignIn />
      </div>
    );
  }
};

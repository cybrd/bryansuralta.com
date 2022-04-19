import { FunctionComponent, useContext, useMemo } from "react";
import { Amplify, Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

import { StoreContext } from "../../context/store";
import { SignIn } from "./sign-in";
import "./index.scss";

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
    redirectSignIn: "http://localhost:3000",
    redirectSignOut: "http://localhost:3000",
    responseType: "token",
  },
});

export const Login: FunctionComponent = () => {
  const { user, signingIn, setStoreUser, setStoreSigningIn } =
    useContext(StoreContext);

  useMemo(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser: CognitoUser) => {
        setStoreUser({ name: currentUser.getUsername() });
      })
      .catch(() => {
        console.log("Not signed in");
      });
  }, [setStoreUser]);

  if (user?.name) {
    return (
      <div id="login">
        Welcome {user.name}
        <button
          onClick={() => {
            setStoreSigningIn(false);
            Auth.signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else if (signingIn) {
    return <div id="login">Signing in...</div>;
  } else {
    return (
      <div id="login">
        <SignIn />
      </div>
    );
  }
};

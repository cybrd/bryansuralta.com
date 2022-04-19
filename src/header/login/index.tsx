import { FunctionComponent, useContext, useEffect } from "react";
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
  const { user, setStoreUser, login, setStoreLogin } = useContext(StoreContext);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser: CognitoUser) => {
        setStoreUser({
          ...user,
          name: currentUser.getUsername(),
        });
      })
      .catch(() => {
        setStoreLogin({
          ...login,
          signingOut: 0,
        });
        console.log("Not signed in");
      });
  }, []);

  if (user?.name) {
    return (
      <div id="login">
        Welcome {user.name}
        <button
          onClick={() => {
            setStoreLogin({
              signingIn: 0,
              signingOut: new Date().getTime(),
            });
            Auth.signOut().catch((err) => console.error(err));
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else if (new Date().getTime() - login?.signingIn < 3000) {
    return <div id="login">Signing in...</div>;
  } else if (new Date().getTime() - login?.signingOut < 3000) {
    return <div id="login">Signing out...</div>;
  } else {
    return (
      <div id="login">
        <SignIn />
      </div>
    );
  }
};

import { FunctionComponent, useContext } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

import { StoreContext } from "../../../context/store";

import facebook from "./facebook.png";
import google from "./google.png";
import "./index.scss";

export const SignIn: FunctionComponent = () => {
  const { login, setStoreLogin } = useContext(StoreContext);

  return (
    <div id="sign-in">
      Sign in with
      <img
        src={facebook}
        alt="Login with Facebook"
        onClick={() => {
          setStoreLogin({
            ...login,
            signingIn: new Date().getTime(),
          });
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Facebook,
          });
        }}
      />
      <img
        src={google}
        alt="Login with Google"
        onClick={() => {
          setStoreLogin({
            ...login,
            signingIn: new Date().getTime(),
          });
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        }}
      />
    </div>
  );
};

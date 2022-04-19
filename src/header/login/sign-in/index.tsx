import { FunctionComponent, useContext } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

import { StoreContext } from "../../../context/store";

export const SignIn: FunctionComponent = () => {
  const { setStoreSigningIn } = useContext(StoreContext);

  return (
    <div id="sign-in">
      Sign in with
      <button
        onClick={() => {
          setStoreSigningIn(true);
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Facebook,
          });
        }}
      >
        Facebook
      </button>
      <button
        onClick={() => {
          setStoreSigningIn(true);
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        }}
      >
        Google
      </button>
    </div>
  );
};

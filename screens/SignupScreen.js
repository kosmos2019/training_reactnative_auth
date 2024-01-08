import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import { signUp } from "../util/http";

function SignupScreen() {
  const authContext = useContext(AuthContext);
  const [isSigningUp, setIsSigningUp] = useState(false);

  async function signUpHandler({ email, password }) {
    try {
      setIsSigningUp(true);
      const token = await signUp(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input and try again later."
      );
    }

    setIsSigningUp(false);
  }

  if (isSigningUp) {
    return <LoadingOverlay message="SignUp user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;

import { useContext, useState } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { signIn } from "../util/http";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [isAuthencating, setIsAuthencating] = useState(false);

  async function authenticateHandler({ email, password }) {
    try {
      setIsAuthencating(true);
      const token = await signIn(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Please check your credentials or try again later."
      );
    }

    setIsAuthencating(false);
  }

  if (isAuthencating) {
    <LoadingOverlay message="SignIn user..." />;
  }

  return <AuthContent isLogin onAuthenticate={authenticateHandler} />;
}

export default LoginScreen;

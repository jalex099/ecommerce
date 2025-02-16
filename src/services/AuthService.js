import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { removeKey, setKey } from "#/utils/localStorageHelper";
import { useAuthState } from "#/stores/AuthState";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading, addToast } from "#/stores/UIState.js";
import { useCartState } from "#/stores/cart";
import { getMessageFromFirebaseAuthError } from "#/utils/firebaseUtils.js";
import { useLocationState } from "#/stores/LocationState.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";

const AuthService = () => {
  const auth = getAuth();
  const authState = useAuthState();
  const provider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cart = useCartState();
  const checkout = useCheckoutState();
  const location = useLocationState();
  const setAuthentication = (idToken, displayName, email, picture = null) => {
    setKey("token", idToken);
    // If the displayName is null, we set the email as displayName without the domain
    const user = {
      displayName: displayName ?? email?.split("@")[0]?.slice(0, 15),
      email,
      picture,
    };
    authState.setCurrentUser(user);
  };

  const setNullAuthentication = () => {
    authState.setCurrentUser(-1);
  };

  const onError = (error) => {
    const errorCode = error?.code;
    addToast(getMessageFromFirebaseAuthError(errorCode), "error");
    removeKey("token");
    removeKey("user");
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      startLoading();
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      const idToken = await user.getIdToken();
      setAuthentication(idToken, user.displayName, user.email);
    } catch (error) {
      onError(error);
    } finally {
      stopLoading();
    }
  };

  const loginWithGoogle = async () => {
    try {
      startLoading();
      signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        await setAuthentication(
          idToken,
          user?.displayName,
          user?.email,
          user?.photoURL
        );
      });
    } catch (error) {
      onError(error);
    } finally {
      stopLoading();
    }
  };

  const loginWithFacebook = async () => {
    try {
      startLoading();
      signInWithPopup(auth, facebookProvider).then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        setAuthentication(
          idToken,
          user?.displayName,
          user?.email,
          user?.photoURL
        );
      });
    } catch (error) {
      onError(error);
    } finally {
      stopLoading();
    }
  };

  const logout = () => {
    startLoading();
    signOut(auth)
      .then(() => {
        removeKey("token");
        authState.setCurrentUser(-1);
        queryClient.resetQueries(/^auth_/);
        // Remove the cart
        cart?.clean();
        // Clear checkout and location time
        checkout?.clearState();
        location?.clearState();
        location?.clearDateTime();
        // addToast("Nos vemos pronto", "success");
      })
      .catch((error) => {
        addToast("Error al cerrar sesión", "error");
        // console.log(error);
      })
      .finally(() => {
        stopLoading();
      });
  };

  const verifyAuth = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNullAuthentication();
        return;
      }
      user.getIdToken().then((idToken) => {
        setAuthentication(
          idToken,
          user?.displayName,
          user?.email,
          user?.photoURL
        );
      });
    });
  };

  const registerWithEmailAndPassword = async (email, password) => {
    try {
      startLoading();
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;
      const idToken = await user.getIdToken();
      setAuthentication(idToken, user.displayName ?? "", user.email);
      navigate("/perfil");
    } catch (error) {
      onError(error);
    } finally {
      stopLoading();
    }
  };

  const sendEmailResetPassword = async (email) => {
    try {
      startLoading();
      await sendPasswordResetEmail(auth, email);
      addToast("Se ha enviado un correo para restablecer tu contraseña", "success");
    } catch (error) {
      onError(error);
    } finally {
      stopLoading();
    }
  }

  return {
    loginWithEmailAndPassword,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    verifyAuth,
    registerWithEmailAndPassword,
    sendEmailResetPassword
  };
};

export default AuthService;

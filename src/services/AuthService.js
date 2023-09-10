import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { removeKey, setKey } from "#/utils/localStorageHelper";
import { useUIState } from "#/hooks/UIState";

const AuthService = () => {
  const auth = getAuth();
  const ui = useUIState();
  const provider = new GoogleAuthProvider();

  const setAuthentication = (idToken, displayName, email, picture = null) => {
    setKey("token", idToken);
    const user = {
      displayName,
      email,
      picture,
    };
    setKey("user", JSON.stringify(user));
    ui?.setIsAuthenticated(true);
    ui?.toogleLoginDialog();
  };

  const onError = (error) => {
    console.log(error);
    removeKey("token");
    removeKey("user");
  };
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = credential.user;
      const idToken = await user.getIdToken();
      setAuthentication(idToken, user.displayName, user.email);
    } catch (error) {
      onError(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const idToken = await user.getIdToken();
          setAuthentication(idToken, user?.displayName, user?.email, user?.photoURL);
        });
    } catch (error) {
      onError(error);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      removeKey("token");
      removeKey("user");
      ui?.setIsAuthenticated(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  return {
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
  };
};

export default AuthService;

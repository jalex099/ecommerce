import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { removeKey, setKey } from "#/utils/localStorageHelper";
import { useAuthState } from "#/hooks/AuthState";
import { useQueryClient } from "@tanstack/react-query";

const queryKeys = ["getPreferences", "getAddresses", "getFavoriteProducts"];

const AuthService = () => {
  const auth = getAuth();
  const authState = useAuthState();
  const provider = new GoogleAuthProvider();
  const queryClient = useQueryClient();

  const setAuthentication = (idToken, displayName, email, picture = null) => {
    setKey("token", idToken);
    const user = {
      displayName,
      email,
      picture,
    };
    authState.setCurrentUser(user);
  };

  const setNullAuthentication = () => {
    authState.setCurrentUser(-1);
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
        password
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
      signInWithPopup(auth, provider).then(async (result) => {
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
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        removeKey("token");
        authState.setCurrentUser(-1);
        queryClient.invalidateQueries(queryKeys, {
          type: "inactive", // only invalidate inactive queries
          refetchType: "none", // don't refetch until needed
        });
      })
      .catch((error) => {
        console.log(error);
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

  return {
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
    verifyAuth,
  };
};

export default AuthService;

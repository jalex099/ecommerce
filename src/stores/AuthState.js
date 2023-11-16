import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export const authState = hookstate({
  currentUser: null,
  isAuthenticated: false,
  isVerified: false,
});

export const useAuthState = () => {
  const state = useHookstate(authState);

  useEffect(() => {
    //* If the user is null, means that the validation is not done yet
    if (state.currentUser.value === null) {
      return;
    }
    //* If the user is -1, means that the user is not authenticated
    if (state.currentUser.value == -1) state.isAuthenticated.set(false);
    //* If the user is not null or -1, means that the user is authenticated
    else state.isAuthenticated.set(true);

    //* Make the verified state true
    state.isVerified.set(true);
  }, [state.currentUser.value]);

  return {
    currentUser: state.currentUser.value,
    isAuthenticated: state.isAuthenticated.value,
    isVerified: state.isVerified.value,
    setCurrentUser: (user) => state.currentUser.set(user),
  };
};

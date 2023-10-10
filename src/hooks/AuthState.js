import { hookstate, useHookstate } from "@hookstate/core";
import { useEffect } from "react";

export const authState = hookstate({
  currentUser: null,
  isAuthenticated: false,
});

export const useAuthState = () => {
  const state = useHookstate(authState);

  useEffect(() => {
    if (!state.currentUser.value) state.isAuthenticated.set(false);
    else state.isAuthenticated.set(true);
  }, [state.currentUser.value]);

  return {
    currentUser: state.currentUser.value,
    isAuthenticated: state.isAuthenticated.value,
    setCurrentUser: (user) => state.currentUser.set(user),
  };
};

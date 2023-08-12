import { hookstate, useHookstate } from "@hookstate/core";

export const authState = hookstate({
  picture: "",
  name: "",
  email: "",
  isAuthenticated: false,
});

export const useAuthState = () => {
  const state = useHookstate(authState);

  const fill = (user) => {
    state.name.set(user?.name);
    state.email.set(user?.email);
    state.picture.set(user?.picture);
    state.isAuthenticated.set(true);
  }

  return {
    fill,
    isEmpty: state.name.value === "" && state.email.value === "" && state.picture.value === "",
    isAuthenticated: state.isAuthenticated.value,
    clear: () => {
      state.name.set("");
      state.email.set("");
      state.picture.set("");
      state.isAuthenticated.set(false);
    },
    picture: state.picture.value,
    name: state.name.value,
    email: state.email.value,
  };
};
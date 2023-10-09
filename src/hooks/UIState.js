import { hookstate, useHookstate } from "@hookstate/core";
import { findKey, setKey } from "#/utils/localStorageHelper.js";
import { THEMES, DEFAULT_THEME } from "#/config/constants.js";
import { useEffect } from "react";

export const uiState = hookstate({
  loading: 0,
  showLoginDialog: false,
  isAuthenticated: false,
  title: "",
});

export const startLoading = () => {
  uiState.loading.set(uiState.loading.value + 1);
};

export const stopLoading = () => {
  uiState.loading.set(
    uiState.loading.value > 0 ? uiState.loading.value - 1 : 0
  );
};

export const useUIState = () => {
  const state = useHookstate(uiState);

  useEffect(() => {
    const token = findKey("token");
    if (token) {
      state.isAuthenticated.set(true);
    }
  }, []);

  return {
    isLoadingForeground: state.loading.value > 0,
    showLoginDialog: state.showLoginDialog.value,
    toogleLoginDialog: () => {
      state.showLoginDialog.set(!state.showLoginDialog.value);
    },
    setIsAuthenticated: (value) => {
      state.isAuthenticated.set(value);
    },
    isAuthenticated: state.isAuthenticated.value,
    title: state.title.value,
    setTitle: (title) => {
      state.title.set(title);
    },
  };
};

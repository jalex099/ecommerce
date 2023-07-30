import { hookstate, useHookstate } from "@hookstate/core";
import { findKey, setKey } from "#/utils/localStorageHelper.js";
import { THEMES, DEFAULT_THEME } from "#/config/constants.js";
import PrimeReact from "primereact/api";
import { useEffect } from "react";


export const uiState = hookstate({
  loading: 0,
  theme: ""
});

export const startLoading = () => {
  uiState.loading.set(uiState.loading.value + 1);
};

export const stopLoading = () => {
  uiState.loading.set(uiState.loading.value > 0 ? uiState.loading.value - 1 : 0);
};

export const useUIState = () => {
  const state = useHookstate(uiState);

  useEffect(() => {
    //* Si no es la primera vez que se carga la página, no se hace nada
    if (state.theme.value) return;
    //* Si es la primera vez que se carga la página, se obtiene el tema de la aplicación y se establece
    const appTheme = findKey("theme")
    //* Si existe un tema guardado en el local storage, se establece
    if (appTheme) {
      state.theme.set(appTheme);
      if (appTheme !== THEMES[DEFAULT_THEME])
        handleChangeTheme(THEMES[DEFAULT_THEME], appTheme);
    }
    //* Si no existe un tema guardado en el local storage, se establece el tema por defecto
    else {
      state.theme.set(THEMES[DEFAULT_THEME]);
    }
  }, [state.theme.value]);
  const handleChangeTheme = (current, actual) => {
    PrimeReact.changeTheme(current, actual, "theme-link");
  };

  return {
    isLoadingForeground: state.loading.value > 0,
    theme: state.theme.value,
    toogleTheme:  () => {
      const currentTheme = state.theme.value;
      const newTheme =
        currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      handleChangeTheme(currentTheme, newTheme);
      state.theme.set(newTheme);
      setKey("theme", newTheme);
    }
  };
};

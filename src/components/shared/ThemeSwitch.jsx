import { ToggleButton } from "primereact/togglebutton";
import { useUIState } from "#/hooks/UIState.js";
import { THEMES } from "#/config/constants.js";
const ThemeSwitch = () => {

  const ui = useUIState();
  const handleChangeTheme = () => {
    ui?.toogleTheme();
  };

  return (
    <ToggleButton
      checked={ui?.theme === THEMES.DARK}
      onChange={handleChangeTheme}
      onIcon="pi pi-moon"
      offIcon="pi pi-sun"
      onLabel=""
      offLabel=""
      className="rounded-full"
    />
  )
};

export default ThemeSwitch;

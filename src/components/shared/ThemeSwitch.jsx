import { useUIState } from "#/hooks/UIState.js";
import { THEMES } from "#/config/constants.js";
import { motion } from "framer-motion";
import "#/components/shared/css/components.shared.css";
const ThemeSwitch = () => {

  const ui = useUIState();
  const handleChangeTheme = () => {
    ui?.toogleTheme();
  };

  return (
    <div className="w-full flex gap-2 items-center justify-between">
      <p className={"text-xs text-center"}>Dark mode</p>
      <div className="switch" data-ison={ui?.theme === THEMES.DARK} onClick={handleChangeTheme}>
        <motion.div className="handle" layout transition={spring} data-ison={ui?.theme === THEMES.DARK} />
      </div>
    </div>
  )
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export default ThemeSwitch;

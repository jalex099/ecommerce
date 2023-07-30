import { Avatar } from "primereact/avatar";
import ThemeSwitch from "#/components/shared/ThemeSwitch.jsx";

const TopBar = () => {
  return (
    <nav className="flex flex-row justify-between items-center w-full h-16 p-2">
      <ThemeSwitch />
      <Avatar icon="pi pi-user" shape="circle" size="small" />
    </nav>
  );
};

export default TopBar;

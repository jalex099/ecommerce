import SettingIconSvg from "#/assets/icons/setting.svg";

function CheckSquareIcon({ className, ...props }) {
  return (
    <img
      src={SettingIconSvg}
      alt="setting"
      className={`${className}`}
      {...props}
    />
  );
}

export default CheckSquareIcon;

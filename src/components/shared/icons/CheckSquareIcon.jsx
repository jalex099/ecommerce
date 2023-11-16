import ChecSquareIconSvg from "#/assets/icons/check-square.svg";

function CheckSquareIcon({ className, ...props }) {
  return (
    <img
      src={ChecSquareIconSvg}
      alt="check-square"
      className={`${className}`}
      {...props}
    />
  );
}

export default CheckSquareIcon;

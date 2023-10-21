import GoBackIcon from "#/components/shared/GoBackIcon";

function FloatingGoBackButton() {
  return <GoBackIcon containerStyle={style.container} />;
}

const style = {
  container: {
    position: "absolute",
    top: "32px",
    left: "24px",
    zIndex: "modal",
    backgroundColor: (theme) => theme.palette.neutral0.main,
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
};

export default FloatingGoBackButton;

import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {
  return (
    <div style={style.container}>
      <ProgressSpinner style={style.spinner} strokeWidth="2" fill="transparent"
                       animationDuration="1s" />
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    zIndex: 9999,
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  spinner: {
    width: "64px",
    height: "64px",
  },
};


export default Loading;
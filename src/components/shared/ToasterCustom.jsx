import { Toaster } from "react-hot-toast";
export default function ToasterCustom() {
  return (
    <Toaster
      toastOptions={options}
      position="top-center"
      reverseOrder={false}
    />
  );
}

const options = {
  success: {
    style: {
      background: "#ffffff",
    },
    iconTheme: {
      primary: "#41e8ca",
      secondary: "#0E0E10",
    },
  },
  error: {
    style: {
      background: "#ffffff",
    },
    iconTheme: {
      primary: "#f25b5b",
      secondary: "#0E0E10",
    },
  },
};

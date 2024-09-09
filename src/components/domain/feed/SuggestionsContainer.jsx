import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import Lottie from "lottie-react";
import animationData from "#/assets/animations/suggestion.json";
import { useRef } from "react";

const SuggestionsContainer = ({ suggestions }) => {
  return (
    <Box sx={style.container}>
      <Box sx={style.subcontainer}>
        <Box className="w-[300px]">
          <Lottie animationData={animationData} loop={true} />
        </Box>
        <Regular16>
          Si me permites una sugerencia, te recomendaría estos productos:
        </Regular16>
      </Box>
      <Box>asdasdasd</Box>
    </Box>
  );
};

const style = {
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
  },
  subcontainer: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 2,
  },
};

export default SuggestionsContainer;

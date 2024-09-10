import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import Lottie from "lottie-react";
import animationData from "#/assets/animations/suggestion.json";
import { useRef } from "react";
import Suggestion from "#/components/domain/feed/Suggestion";
import DataService from "#/services/DataService";
import { useMemo } from "react";

const SuggestionsContainer = () => {
  const { menu } = DataService();

  const suggestions = useMemo(() => {
    return menu?.filter((item) => !!item?.isNew);
  }, [menu]);

  return (
    <Box sx={style.container}>
      <Box sx={style.subcontainer}>
        <Box className="w-[300px]">
          <Lottie animationData={animationData} loop={true} />
        </Box>
        <Regular16>
          Los siguientes productos son tendencia, ¡no te los pierdas!
        </Regular16>
      </Box>
      <Box className="w-full grid grid-cols-2 gap-4">
        {suggestions?.map((suggestion) => (
          <Suggestion key={suggestion?._id} suggestion={suggestion} />
        ))}
      </Box>
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

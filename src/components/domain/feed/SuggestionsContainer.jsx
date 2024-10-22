import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import Lottie from "lottie-react";
import animationData from "#/assets/animations/suggestion.json";
import { useRef } from "react";
import Suggestion from "#/components/domain/feed/Suggestion";
import DataService from "#/services/DataService";
import { useMemo } from "react";
import SemiBold24 from "#/components/shared/fonts/SemiBold24";

const SuggestionsContainer = () => {
  const { menu } = DataService();

  const suggestions = useMemo(() => {
    return menu?.filter((item) => !!item?.isNew);
  }, [menu]);

  if (!suggestions?.length) return null;
  return (
    <Box sx={style.container}>
      <Box sx={style.subcontainer}>
        <Box className="w-[100px] lg:w-[200px]">
          <Lottie animationData={animationData} loop={true} />
        </Box>
        <Box className="flex flex-col gap-2 flex-1">
          <SemiBold24 className="text-center">
            ¡Lo m&aacute;s movido de la semana en{" "}
            <span className="font-bold">Ale Art</span>!
          </SemiBold24>
          <Regular16 className=" text-justify lg:text-center">
            Los siguientes productos son tendencia, ¡no te los puedes perder!
          </Regular16>
        </Box>
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
    gap: 4,
  },
  subcontainer: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
};

export default SuggestionsContainer;

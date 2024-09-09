import Box from "@mui/material/Box";

import Lottie from "lottie-react";
import animationData from "#/assets/animations/feed-sleep2.json";

const FeedSleep2 = () => {
  return (
    <Box className="w-[200px] lg:w-[400px] max-h-[200px] lg:max-h-[400px]">
      <Lottie animationData={animationData} loop={true} />
    </Box>
  );
};

export default FeedSleep2;

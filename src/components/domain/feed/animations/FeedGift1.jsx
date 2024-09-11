import Box from "@mui/material/Box";

import Lottie from "lottie-react";
import animationData from "#/assets/animations/feed-gift1.json";

const FeedGift1 = () => {
  return (
    <Box className="w-[200px] lg:w-[400px] max-h-[200px]">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "200px" }}
      />
    </Box>
  );
};

export default FeedGift1;

import { Box, Button } from "@mui/material";
import Regular24 from "#/components/shared/fonts/Regular24";
import SemiBold24 from "#/components/shared/fonts/SemiBold24";
import Regular12 from "#/components/shared/fonts/Regular12";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from "#/config/constants";
import Lottie from "lottie-react";
import animationData from "#/assets/animations/feed-sleep1.json";
import FeedSleep1 from "#/components/domain/feed/animations/FeedSleep1";
import FeedSleep2 from "#/components/domain/feed/animations/FeedSleep2";
import FeedFriends1 from "#/components/domain/feed/animations/FeedFriends1";
import FeedFriends2 from "#/components/domain/feed/animations/FeedFriends2";
import FeedGift1 from "#/components/domain/feed/animations/FeedGift1";
import FeedGift2 from "#/components/domain/feed/animations/FeedGift2";
import DataService from "#/services/DataService";
import { useMemo } from "react";
import CategoriesFeedLink from "#/components/domain/feed/CategoriesFeedLink";
import HorizontalScroller from "#/components/shared/HorizontalScroller";

const WelcomeContainer = ({ name, isLoading, isAuthenticated }) => {
  const { messages } = DataService();

  const activeMessage = useMemo(() => {
    if (messages?.length == 0) {
      return null;
    }
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const nowMessage = messages.find((message) => {
      const start = message?.startHour;
      const end = message?.endHour;
      if (!start || !end) {
        return false;
      }

      const startHour = parseInt(start.split(":")[0]);
      const startMinute = parseInt(start.split(":")[1]);
      const endHour = parseInt(end.split(":")[0]);
      const endMinute = parseInt(end.split(":")[1]);

      if (hour > startHour && hour < endHour) {
        return true;
      }

      if (hour === startHour && minute >= startMinute) {
        return true;
      }

      if (hour === endHour && minute <= endMinute) {
        return true;
      }

      return false;
    });

    return nowMessage;
  }, [messages]);

  return (
    <motion.div
      initial={SLIDE_UP_ANIMATION.initial}
      animate={SLIDE_UP_ANIMATION.animate}
      transition={SLIDE_UP_ANIMATION.transition}
      exit={SLIDE_UP_ANIMATION.exit}
      className="flex flex-row items-start justify-between gap-2"
    >
      {/* <Regular24
        styles={{
          color: (theme) => theme?.palette?.neutral90?.main,
        }}
      >
        &#161;Hola,{" "}
        {isAuthenticated && isLoading ? (
          "..."
        ) : (
          <SemiBold24
            component="span"
            styles={{
              color: (theme) => theme?.palette?.neutral100?.main,
            }}
          >
            {" "}
            {isAuthenticated && !!name ? name : "amigo"}
            &#33;
          </SemiBold24>
        )}
      </Regular24>
      <Regular12
        styles={{
          color: (theme) => theme?.palette?.neutral60?.main,
        }}
      >
        &#191;Qué te gustaría pedir hoy?
      </Regular12> */}
      <Box className="flex flex-col gap-3 items-center justify-center w-3/5">
        <Regular24 className="text-left lg:text-center">
          {activeMessage != null ? activeMessage?.text : "Hola de nuevo!"}
        </Regular24>
        <HorizontalScroller separate>
          <CategoriesFeedLink />
        </HorizontalScroller>
        {/* <Button
          variant="outlined"
          color="primary"
          size={"small"}
          className="w-[150px] h-[40px] rounded-[20px] bg-primary"
          onClick={handleGoToMenu}
        >
          Ver men&uacute;
        </Button> */}
      </Box>
      {!activeMessage && <FeedFriends2 />}
      {activeMessage?.animation === "FG1" && <FeedGift1 />}
      {activeMessage?.animation === "FG2" && <FeedGift2 />}
      {activeMessage?.animation === "FF1" && <FeedFriends1 />}
      {activeMessage?.animation === "FF2" && <FeedFriends2 />}
      {activeMessage?.animation === "FS1" && <FeedSleep1 />}
      {activeMessage?.animation === "FS2" && <FeedSleep2 />}
    </motion.div>
  );
};

export default WelcomeContainer;

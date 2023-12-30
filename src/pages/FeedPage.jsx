import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";
import Container from "@mui/material/Container";
import SliderComponent from "#/components/domain/feed/SliderComponent.jsx";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import NewContent from "#/components/domain/feed/NewContent.jsx";
import Box from "@mui/material/Box";
import OffersContainer from "#/components/domain/feed/OffersContainer.jsx";

const FeedPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Feed");
  }, []);
  return (
    <Container sx={style.container}>
      <HelmetMeta page="feed" />
      <Box className="w-full flex flex-col gap-6">
        <SliderComponent />
        <OffersContainer />
      </Box>
      <NewContent />
    </Container>
  );
};

const style = {
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "32px",
  },
};

export default FeedPage;

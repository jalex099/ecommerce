import { useEffect } from "react";
import { useUIState } from "#/stores/UIState.js";
import Container from "@mui/material/Container";
import SliderComponent from "#/components/domain/feed/SliderComponent.jsx";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";
import NewContent from "#/components/domain/feed/NewContent.jsx";
import Box from "@mui/material/Box";

const FeedPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Feed");
  }, []);
  return (
    <Container sx={style.container}>
      <HelmetMeta page="feed" />
      <Box className="w-full">
        <SliderComponent />
      </Box>
      <NewContent />
    </Container>
  );
};

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "32px",
  },
};

export default FeedPage;

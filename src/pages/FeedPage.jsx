import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState.js";
import Container from "@mui/material/Container";
import SliderComponent from "#/components/domain/feed/SliderComponent.jsx";
import HelmetMeta from "#/components/shared/HelmetMeta.jsx";

const FeedPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Feed");
  }, []);
  return (
    <Container>
      <HelmetMeta page="feed" />
      <SliderComponent />
    </Container>
  );
};

export default FeedPage;

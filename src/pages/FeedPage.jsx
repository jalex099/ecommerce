import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState.js";
import Container from "@mui/material/Container";
import SliderComponent from "#/components/domain/feed/SliderComponent.jsx";

const FeedPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Feed");
  }, []);
  return (
    <Container>
      <SliderComponent />
    </Container>
  );
};

export default FeedPage;

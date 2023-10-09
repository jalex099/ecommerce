import { useEffect } from "react";
import { useUIState } from "#/hooks/UIState.js";
import Container from "@mui/material/Container";

const FeedPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Feed");
  }, []);
  return <Container>Feed</Container>;
};

export default FeedPage;

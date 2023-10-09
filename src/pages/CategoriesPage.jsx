import { useUIState } from "#/hooks/UIState";
import { useEffect } from "react";
import Container from "@mui/material/Container";

const CategoriesPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Menú");
  }, []);
  return (
    <Container>
      <h1>Categories Page</h1>
    </Container>
  );
};

export default CategoriesPage;

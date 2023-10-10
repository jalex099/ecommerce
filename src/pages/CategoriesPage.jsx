import { useUIState } from "#/hooks/UIState";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import CategoriesContainer from "#/components/domain/menu/CategoriesContainer";

const CategoriesPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Menú");
  }, []);
  return (
    <Container>
      <CategoriesContainer />
    </Container>
  );
};

export default CategoriesPage;

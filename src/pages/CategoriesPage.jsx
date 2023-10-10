import { useUIState } from "#/hooks/UIState";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import CategoriesContainer from "#/components/domain/menu/CategoriesContainer";
import HelmetMeta from "#/components/shared/HelmetMeta";

const CategoriesPage = () => {
  const ui = useUIState();
  useEffect(() => {
    ui?.setTitle("Menú");
  }, []);
  return (
    <Container>
      <HelmetMeta page="menu" />
      <CategoriesContainer />
    </Container>
  );
};

export default CategoriesPage;

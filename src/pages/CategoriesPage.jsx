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
    <Container sx={style.container}>
      <HelmetMeta page="menu" />
      <CategoriesContainer />
    </Container>
  );
};

const style = {
  container: {
  },
};

export default CategoriesPage;

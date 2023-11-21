import { useUIState } from "#/stores/UIState";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import CategoriesList from "#/components/domain/menu/CategoriesList";
import ProductsList from "#/components/domain/menu/ProductsList";
import DataService from "#/services/DataService";
import { useHookstate } from "@hookstate/core";
import RedirectionService from "#/services/RedirectionService";
import { getCategory } from "#/utils/directoryUtils";
import { useLocation } from "react-router-dom";

const MenuPage = () => {
  const { categories, menu } = DataService();
  const selected = useHookstate(null);
  const ui = useUIState();
  const { redirectToProduct, redirectToFirstCategory, redirectTo } =
    RedirectionService();
  const { pathname } = useLocation();
  const category = getCategory(categories, pathname);

  useEffect(() => {
    ui?.setTitle("Menú");
  }, []);

  useEffect(() => {
    category && selected.set(category._id); // Si existe, la selecciona en las tabs
    !category && redirectToFirstCategory(); // Si no existe, redirige a la primera categoria
  }, [category]);

  const handleChange = (e, value) => {
    selected.set(value);
    redirectTo("category", value);
  };

  const handleProductClick = (productId) => {
    redirectToProduct(productId);
  };

  return (
    <Container sx={style.container}>
      <HelmetMeta page="menu" />
      {categories?.length !== 0 && selected.get() !== null && (
        <>
          <CategoriesList
            items={categories}
            selected={selected.get()}
            handleChange={handleChange}
          />
          <ProductsList
            category={selected.get()}
            products={menu}
            handleClick={handleProductClick}
          />
        </>
      )}
    </Container>
  );
};

const style = {
  container: {},
};

export default MenuPage;

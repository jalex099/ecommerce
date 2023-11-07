import { useUIState } from "#/hooks/UIState";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import CategoriesList from "#/components/domain/menu/CategoriesList";
import ProductsList from "#/components/domain/menu/ProductsList";
import DataService from "#/services/DataService";
import { useHookstate } from "@hookstate/core";
import RedirectionService from "#/services/RedirectionService";

const MenuPage = () => {
  const { categories, menu } = DataService();
  const selected = useHookstate(null);
  const ui = useUIState();
  const { redirectToProduct } = RedirectionService();

  useEffect(() => {
    ui?.setTitle("Menú");
  }, []);

  useEffect(() => {
    if (categories?.length === 0) return;
    if (selected.get() === null) selected.set(categories[0]._id);
  }, [categories]);

  const handleChange = (e, value) => {
    selected.set(value);
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

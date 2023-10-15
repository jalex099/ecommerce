import DataService from "#/services/DataService.js";
import CategoriesList from "#/components/domain/menu/CategoriesList.jsx";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

function CategoriesContainer() {
  const { categories } = DataService();
  const selected = useHookstate(null);

  useEffect(() => {
    if (categories?.length === 0) return;
    if (selected.get() === null) selected.set(categories[0]._id);
  }, [categories]);

  const handleChange = (e, value) => {
    selected.set(value);
  };

  if (categories?.length === 0 || selected.get() === null) return null;
  return (
    <CategoriesList
      items={categories}
      selected={selected.get()}
      handleChange={handleChange}
    />
  );
}

export default CategoriesContainer;

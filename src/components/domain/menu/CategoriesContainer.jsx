import DataService from "#/services/DataService.js";
import CategoriesList from "#/components/domain/menu/CategoriesList.jsx";
import { useHookstate } from "@hookstate/core";
import { useEffect } from "react";

const categories = [
  {
    _id: "65034bfea446e3d85dbdd3c8",
    name: "Comidas",
    description: "",
    order: null,
  },
  {
    _id: "65034c0da446e3d85dbdd3ca",
    name: "Arreglos florales",
    description: "",
    order: null,
  },
  {
    _id: "65034c2aa446e3d85dbdd3cc",
    name: "Manualidades",
    description: "",
    order: null,
  },
];

function CategoriesContainer() {
  // const { categories } = DataService();
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

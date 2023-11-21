//* funcion que retorna una ruta segun el nombre de una categoria
export const getRoute = (name) => {
  return encodeURI(
    `/${name
      ?.trim()
      ?.toLowerCase()
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.replace(/\s/g, "-")}`
  );
};

export const getRouteFromId = (categories, id) => {
  const category = categories?.find((cat) => cat?._id === id);
  return getRoute(category?.name);
};

//* funcion que retorna el indice de una categoria al renderizar
export const getPageIndex = (menuPrincipal, page) => {
  const index =
    menuPrincipal
      ?.filter((cat) => !cat?.idpad)
      ?.findIndex(
        (category) => category?.cat === Number(page?.split("_")[1])
      ) !== -1
      ? menuPrincipal
          ?.filter((cat) => !cat?.idpad)
          ?.findIndex(
            (category) => category?.cat === Number(page?.split("_")[1])
          )
      : menuPrincipal
          ?.filter((cat) => !cat?.idpad)
          ?.findIndex((category) => category?.CODIGO_URL === decodeURI(page));
  return index;
};

//* funcion que retorna la categoria primera disponible en el sitio para renderizar
export const getFirstCategory = (categories) =>
  categories?.sort((a, b) => a?.order - b?.order)?.[0] || null;

//* funcion que toma una ruta y retorna el nombre de una categoria
export const getCategory = (categories, pathname) => {
  const cat =
    categories?.find(
      (category) =>
        category?.name
          ?.trim()
          ?.normalize("NFD")
          ?.replace(/[\u0300-\u036f]/g, "")
          ?.toLowerCase() ===
        pathname
          ?.split("/")[3]
          ?.split?.("_")[0]
          ?.normalize("NFD")
          ?.replace(/[\u0300-\u036f]/g, "")
          ?.replaceAll("-", " ")
    ) ||
    categories?.find(
      (cat) => cat?.CODIGO_URL === decodeURI(pathname?.split("/")[3])
    );
  return cat;
};
//* retorna el indice de una subcategoria
export const findIndexSubCat = (menuPrincipal, subCat) => {
  return menuPrincipal?.find(
    (category) =>
      category?.nombre?.trim()?.toLowerCase()?.normalize("NFD") ===
        subCat?.replaceAll("-", " ") && category?.idpad
  )?.cat;
};
//* retorna el nombre de categoria segun su id
export const getCategoryById = (menuPrincipal, id) =>
  menuPrincipal?.find((category) => category?.cat === id)?.nombre;

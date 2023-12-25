import DataService from "#/services/DataService.js";
import { useNavigate } from "react-router-dom";
import { getRoute } from "#/utils/directoryUtils.js";

const RedirectionService = () => {
  const navigate = useNavigate();
  const { menu, categories } = DataService();
  const redirectToProduct = (id, replace = false) => {
    const prd = menu?.find((product) => product._id === id);
    if (!prd) return;
    if (!prd?._id) return;
    //* If there is a urlName defined, redirect to the product page with the urlName
    if (prd?.urlName) return navigate(`/producto/${prd?.urlName}`);
    //* Else, redirect to the product page with the id
    return navigate(`/producto/${prd?._id}`, { replace });
  };

  const findProductByUrlNameOrId = (urlNameOrId) => {
    const product = menu?.find(
      (product) =>
        product._id === urlNameOrId || product.urlName === urlNameOrId
    );
    if (!product) return null;
    return product;
  };

  const redirectToFirstCategory = () => {
    const firstCat = categories?.sort((a, b) => a?.order - b?.order)?.[0];
    if (!firstCat) return;
    return navigate(`/menu/categorias${getRoute(firstCat?.name)}`);
  };

  const redirectToCategory = (id, replace = false) => {
    const category = categories?.find((cat) => cat?._id === id);
    if (!category) return;
    return navigate(`/menu/categorias${getRoute(category?.name)}`, { replace });
  };

  const redirectTo = (type, id, replace = false) => {
    switch (type) {
      case "product":
        return redirectToProduct(id, replace);
      case "category":
        return redirectToCategory(id, replace);
      default:
        return;
    }
  };

  return {
    redirectToProduct,
    findProductByUrlNameOrId,
    redirectToFirstCategory,
    redirectTo,
  };
};

export default RedirectionService;

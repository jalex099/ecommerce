import DataService from "#/services/DataService.js";
import { useNavigate } from "react-router-dom";
import { getRoute } from "#/utils/directoryUtils.js";

const RedirectionService = () => {
  const navigate = useNavigate();
  const { menu, categories } = DataService();
  const redirectToProduct = (id) => {
    const { _id, urlName } = menu?.find((product) => product._id === id);

    if (!_id) return;
    //* If there is a urlName defined, redirect to the product page with the urlName
    if (urlName) return navigate(`/product/${urlName}`);
    //* Else, redirect to the product page with the id
    return navigate(`/product/${_id}`);
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
    return navigate(`/menu/category${getRoute(firstCat?.name)}`);
  };

  const redirectToCategory = (id) => {
    const category = categories?.find((cat) => cat?._id === id);
    if (!category) return;
    return navigate(`/menu/category${getRoute(category?.name)}`);
  };

  const redirectTo = (type, id) => {
    switch (type) {
      case "product":
        return redirectToProduct(id);
      case "category":
        return redirectToCategory(id);
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

import DataService from "#/services/DataService.js";
import { useNavigate } from "react-router-dom";

const RedirectionService = () => {
  const navigate = useNavigate();
  const { menu } = DataService();
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

  return {
    redirectToProduct,
    findProductByUrlNameOrId,
  };
};

export default RedirectionService;

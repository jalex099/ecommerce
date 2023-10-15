import API from "#/repositories/API.js";

const ClientFavoriteProductsRepository = () => {
  const getFavoriteProducts = async () => {
    return await API.get("/client/favorite-products", {
      secure: true,
    });
  };

  return {
    getFavoriteProducts,
  };
};

export default ClientFavoriteProductsRepository;

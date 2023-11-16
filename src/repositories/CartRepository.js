import API from "#/repositories/API.js";

const CartRepository = () => {
  const getCarts = async () => {
    return await API.get("/carts", {
      secure: true,
    });
  };

  const saveCart = async (data) => {
    return await API.post("/carts", data, {
      secure: true,
    });
  };

  return {
    getCarts,
    saveCart,
  };
};

export default CartRepository;

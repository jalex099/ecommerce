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

  const cloneCart = async (code) => {
    return await API.post(
      `/carts/clone/${code}`,
      {},
      {
        secure: true,
        await: true,
      }
    );
  };

  return {
    getCarts,
    saveCart,
    cloneCart,
  };
};

export default CartRepository;

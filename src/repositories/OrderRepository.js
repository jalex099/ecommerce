import API from "#/repositories/API.js";

const OrderRepository = () => {
  const saveOrder = async (data) => {
    return await API.post("/orders", data, {
      await: true,
    });
  }

  return {
    saveOrder,
  }
}

export default OrderRepository;
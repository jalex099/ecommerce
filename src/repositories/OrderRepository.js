import API from "#/repositories/API.js";

const OrderRepository = () => {

  const getOrder = async (id) => {
    return await API.get(`/orders/${id}`, {
      await: true,
    });
  }

  const saveOrder = async (data) => {
    return await API.post("/orders", data, {
      await: true,
    });
  }

  return {
    getOrder,
    saveOrder,
  }
}

export default OrderRepository;
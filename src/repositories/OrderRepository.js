import API from "#/repositories/API.js";

const OrderRepository = () => {

  const getOrdersPending = async () => {
    return await API.get("/orders/pending", {
      await: true,
    });
  }

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
    getOrdersPending,
    saveOrder,
  }
}

export default OrderRepository;
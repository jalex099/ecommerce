import API from "#/repositories/API.js";

const OrderRepository = () => {

  const getAllOrders = async () => {
    return await API.get("/orders", {
      secure: true
    });
  }

  const getOrdersPending = async () => {
    return await API.get("/orders/pendings", {
      secure: true
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
      secure: true,
    });
  }

  const confirmPayment = async (data) => {
    return await API.post(`/orders/${data?.idTransaccion}/confirm`, data, {
      await: true,
    });
  }

  return {
    getOrder,
    getAllOrders,
    getOrdersPending,
    saveOrder,
    confirmPayment
  }
}

export default OrderRepository;
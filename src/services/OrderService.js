import OrderRepository from "#/repositories/OrderRepository.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocationState } from "#/stores/LocationState.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import useCartState from "#/stores/cart.js";
import { addToast } from "#/stores/UIState.js";
import { useNavigate } from "react-router-dom";

const OrderService = ()=>{
  const {
    getOrder: _getOrder,
    saveOrder: _saveOrder
  } = OrderRepository();
  const cart = useCartState();
  const checkout = useCheckoutState();
  const location = useLocationState();
  const navigate = useNavigate();

 const getOrder = useMutation({
    mutationFn: _getOrder,
    onError: (error)=>{
      console.log(error?.response?.data);
      addToast("Hubo un error al obtener la orden", "error")
    }
 })

  const saveOrder = useMutation({
    mutationFn: _saveOrder,
    onSuccess: ({data})=>{
      console.log(data);
      cart?.clean()
      checkout?.clearState();
      location?.clearState();
      location?.clearDateTime();
      addToast("Tu orden se ha guardado correctamente", "success")
      if(data?._id)
        navigate(`/confirmacion-de-orden/${data._id}`, {replace: true})
      else
        navigate(`/`, {replace: true})
    },
    onError: (error)=>{
      console.log(error?.response?.data);
      addToast("Hubo un error al guardar la orden", "error")
    }
  })

  return {
    getOrder,
    saveOrder
  }
}

export default OrderService;
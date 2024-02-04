import OrderRepository from "#/repositories/OrderRepository.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocationState } from "#/stores/LocationState.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import useCartState from "#/stores/cart.js";
import { addToast } from "#/stores/UIState.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "#/stores/AuthState.js";

const OrderService = ()=>{
  const {
    getOrder: _getOrder,
    getOrdersPending: _getOrdersPending,
    saveOrder: _saveOrder
  } = OrderRepository();
  const cart = useCartState();
  const checkout = useCheckoutState();
  const location = useLocationState();
  const navigate = useNavigate();
  const auth = useAuthState();
  const queryClient = useQueryClient();

 const getOrder = useMutation({
   mutationKey: ["specific-order"],
   cacheTime: 1000 * 60 * 10,
    mutationFn: _getOrder,
    onError: (error)=>{
      console.log(error?.response?.data);
      addToast("Hubo un error al obtener la orden", "error")
    }
 })

  const {data: pendingOrders, isLoading: isLoadingPendingOrders} = useQuery({
    queryKey: ["orders-pending"],
    queryFn: _getOrdersPending,
    staleTime: Infinity,
    enabled: auth?.isAuthenticated && auth?.isVerified,
    onError: (error)=>{
      console.log(error?.response?.data);
      addToast("Hubo un error al obtener las ordenes pendientes", "error")
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
      // Invalidate pending orders query
      queryClient.invalidateQueries(["orders-pending", "specific-order"], {});
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
    saveOrder,
    pendingOrders,
    pendingOrdersLength: pendingOrders?.data?.length || 0,
    isLoadingPendingOrders
  }
}

export default OrderService;
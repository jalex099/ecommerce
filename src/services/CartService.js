import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "#/stores/AuthState";
import useCartState from "#/stores/cart";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";
import { addToast } from "#/stores/UIState.js";

const CartService = () => {
  const {
    getCarts: _getCarts,
    saveCart: _saveCart,
    cloneCart: _cloneCart,
    deleteCart: _deleteCart,
  } = CartRepository();
  const { fillFromApi } = useCartUtils();
  const queryClient = useQueryClient();
  const cart = useCartState();

  const auth = useAuthState();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["auth_getCarts"],
    queryFn: _getCarts,
    refetchOnWindowFocus: false,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: ({ data }) => {
      cart?.setOwnerCart(data?._id, data?.code);
      fillFromApi(data);
      // queryClient.invalidateQueries(["auth_getCarts"], {});
    },
    onError: (error) => {
      console.log(error?.response?.data);
      addToast("Hubo un error al guardar el carrito", "error");
    },
  });

  const cloneCart = useMutation({
    mutationFn: _cloneCart,
    onSuccess: ({ data }) => {
      cart?.setOwnerCart(data?._id, data?.code);
      fillFromApi(data);
      queryClient.invalidateQueries(["auth_getCarts"], {});
    },
    onError: (error) => {
      console.log(error?.response?.data);
      addToast("Hubo un error al clonar el carrito", "error");
    },
  });

  const deleteCart = useMutation({
    mutationFn: _deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["auth_getCarts"], {});
    },
    onError: (error) => {
      console.log(error?.response?.data);
      addToast("Hubo un error al eliminar el carrito", "error");
    },
  });

  return {
    carts: data?.data,
    isLoading,
    isSuccess,
    isError,
    saveCart,
    cloneCart,
    deleteCart,
  };
};

export default CartService;

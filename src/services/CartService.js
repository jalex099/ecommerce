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

  const { data, isLoading, isSuccess, isRefetching, isError, refetch } =
    useQuery({
      queryKey: ["auth_getCarts"],
      queryFn: _getCarts,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: auth?.isAuthenticated && auth?.isVerified,
      onSuccess: ({ data }) => {
        if (!cart?.isIdentified()) return;
        const isValid = cart?.validateLocalWithSynced(data);
        if (isValid) return;
        cart?.clean();
      },
    });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: ({ data }) => {
      if(data === null) {
        queryClient.invalidateQueries(["auth_getCarts"], {});
        cart?.clean();
        return;
      }
      fillFromApi(data);
      cart?.setDirty(false);
    },
    onError: (error) => {
      console.log(error?.response?.data);
      addToast("Hubo un error al guardar el carrito", "error");
    },
  });

  const cloneCart = useMutation({
    mutationFn: _cloneCart,
    onSuccess: ({ data }) => {
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
    isRefetching,
    refetch,
    saveCart,
    cloneCart,
    deleteCart,
  };
};

export default CartService;

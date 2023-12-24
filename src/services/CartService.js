import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";
// import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "#/stores/AuthState";
import useCartState from "#/stores/cart";
import useCartUtils from "#/components/domain/cart/controllers/useCartUtils";

const CartService = () => {
  const { getCarts: _getCarts, saveCart: _saveCart } = CartRepository();
  const { fillFromApi } = useCartUtils();
  // const queryClient = useQueryClient();
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
  });

  return {
    carts: data?.data,
    isLoading,
    isSuccess,
    isError,
    saveCart,
  };
};

export default CartService;

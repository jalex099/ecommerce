import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "#/stores/AuthState";
import useCartState from "#/stores/cart";

const CartService = () => {
  const { getCarts: _getCarts, saveCart: _saveCart } = CartRepository();
  const queryClient = useQueryClient();
  const cart = useCartState();

  const auth = useAuthState();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["auth_getCarts"],
    queryFn: _getCarts,
    refetchOnWindowFocus: false,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: ({ data }) => {
      cart?.setOwnerCart(data?._id, data?.code);
      queryClient.invalidateQueries(["auth_getCarts"], {});
    },
  });

  return {
    carts: data?.data,
    isLoading,
    isSuccess,
    saveCart,
  };
};

export default CartService;

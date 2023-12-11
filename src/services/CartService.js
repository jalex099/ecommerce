import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "#/stores/AuthState";

const CartService = () => {
  const { getCarts: _getCarts, saveCart: _saveCart } = CartRepository();
  const queryClient = useQueryClient();

  const auth = useAuthState();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["getCarts"],
    queryFn: _getCarts,
    refetchOnWindowFocus: false,
    enabled: auth?.isAuthenticated && auth?.isVerified,
  });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: () => {
      queryClient.invalidateQueries("getCarts");
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

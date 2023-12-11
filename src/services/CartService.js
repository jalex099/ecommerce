import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";
import { useCartState } from "#/stores/cart";

const CartService = () => {
  const { getCarts: _getCarts, saveCart: _saveCart } = CartRepository();
  const cart = useCartState();

  const { data, isLoading } = useQuery({
    queryKey: ["getCarts"],
    queryFn: _getCarts,
    refetchOnWindowFocus: false,
  });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: ({ data }) => {
      cart?.setCartId(data?._id);
      cart?.setCartCode(data?.code);
    },
  });

  return {
    carts: data?.data,
    isLoading,
    saveCart,
  };
};

export default CartService;

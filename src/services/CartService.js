import { useMutation, useQuery } from "@tanstack/react-query";
import CartRepository from "#/repositories/CartRepository";

const CartService = () => {
  const { getCarts: _getCarts, saveCart: _saveCart } = CartRepository();

  const { data, isLoading } = useQuery({
    queryKey: ["getCarts"],
    queryFn: _getCarts,
    refetchOnWindowFocus: false,
  });

  const saveCart = useMutation({
    mutationFn: _saveCart,
    onSuccess: (data) => {
      console.log(data);
    },
  });


  return {
    carts: data,
    isLoading,
    saveCart,
  };
};

export default CartService;

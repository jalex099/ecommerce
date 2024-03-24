import { useCartState } from "#/stores/cart";
import CartService from "#/services/CartService";
import { parseMenu } from "#/utils/adapterUtil/cartAdapterUtil";

export default function useCartSyncUtils() {
  const cart = useCartState();
  const { saveCart: _saveCart } = CartService();

  const saveCartFirstTime = ({ name, onSuccess }) => {
    _saveCart.mutate(
      {
        _id: null,
        status: "ACT",
        visibility: "PUBLIC",
        menu: parseMenu(cart?.get()),
        name,
      },
      {
        onSuccess: ({ data }) => {
          if (typeof onSuccess === "function") {
            onSuccess(data);
          }
        },
      }
    );
  };

  const saveCartExisting = ({ onSuccess }) => {
    // if(!cart?.getCartId()) return;
    _saveCart.mutate(
      {
        _id: cart?.getCartId(),
        status: "ACT",
        visibility: "PUBLIC",
        menu: parseMenu(cart?.get()),
        name: cart?.getName(),
      },
      {
        onSuccess: ({ data }) => {
          if (typeof onSuccess === "function") {
            onSuccess(data);
          }
        },
      }
    );
  };


  return {
    saveCartFirstTime,
    saveCartExisting,
  };
}

import { useCartState } from "#/stores/cart";
import { useTemporalProduct } from "#/stores/temporalProduct";
import serializeState from "#/utils/serializeState";
import { useNavigate } from "react-router-dom";

export default function useAddToCart() {
  const cart = useCartState();
  const { temp } = useTemporalProduct();
  const navigate = useNavigate();

  const addToCart = () => {
    const itemToAdd = serializeState(temp);
    let aditionalPrice = 0;
    const options = itemToAdd?.options?.reduce((acc, option) => {
      const selectedOption = option?.options?.find(
        (subopt) => subopt?._id === option?.selected
      );
      if (!selectedOption) return acc;
      aditionalPrice += selectedOption?.aditionalPrice || 0;
      return [
        ...acc,
        {
          option: option?._id,
          selected: option?.selected,
          aditionalPrice: selectedOption?.aditionalPrice,
        },
      ];
    }, []);
    cart?.add({
      _id: temp?._id,
      name: temp?.name,
      basePrice: temp?.price,
      aditionalPrice,
      orden: cart?.getOrdenAgregado(),
      options,
    });

    cart?.updateOrdenAgregado(cart?.getOrdenAgregado() + 1);
    navigate("/menu");
  };

  return {
    addToCart,
  };
}

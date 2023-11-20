import { useCartState } from "#/stores/cart";
import DataService from "#/services/DataService";
import serializeState from "#/utils/serializeState";
export default function useCartUtils() {
  const cart = useCartState();
  const { menu, isLoading } = DataService();

  const getItemsToShow = () => {
    if (isLoading) return undefined;
    const items = cart?.get();
    return items;
  };

  const handleRemoveFromCart = (idProduct, index) => {
    const itemsToKeep = cart?.get()?.reduce((acc, item, i) => {
      if (i !== index || item._id !== idProduct) {
        acc.push(item);
      }
      return acc;
    }, []);
    cart?.removeFromCart(serializeState(itemsToKeep));
  };

  const getDetails = (idProduct, optionsSavedOnCart) => {
    const product = menu?.find((product) => product?._id === idProduct);
    if (!product) return [];
    const options = product?.options;
    if (!options) return [];
    return optionsSavedOnCart?.reduce((acc, optionSavedOnCart, index) => {
      const selectedDetail = options[index]?.options?.find(
        (option) => option?._id === optionSavedOnCart?.selected
      );
      let response = {
        name: selectedDetail?.option?.cartName,
        aditionalPrice: selectedDetail?.aditionalPrice,
      };
      return [...acc, response];
    }, []);
  };

  const getProductTotal = (product) => {
    return (
      product?.price +
      product?.options?.reduce((acc, opt) => {
        return acc + opt?.aditionalPrice || 0;
      }, 0)
    );
  };

  return {
    getItemsToShow,
    handleRemoveFromCart,
    getDetails,
    getProductTotal,
  };
}

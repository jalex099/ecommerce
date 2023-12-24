import { useCartState } from "#/stores/cart";
import DataService from "#/services/DataService";
import serializeState from "#/utils/serializeState";
export default function useCartUtils() {
  const cart = useCartState();
  const { menu, isLoading } = DataService();

  const getItemsToShow = () => {
    if (isLoading) return undefined;
    const items = cart?.get();
    if (items?.length === 0) return undefined;
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

  const handleUpdateQuantity = (action, index) => {
    cart?.updateQuantity(action, index);
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

  const fillFromApi = (cartItem) => {
    if (!cartItem) return;
    const { _id: cartId, code: cartCode, menu: cartMenu } = cartItem;
    const menuItems = cartMenu?.reduce((acc, cartItemProduct) => {
      const product = menu?.find(
        (product) => product?._id == cartItemProduct?.product
      );
      if (!product) return acc;
      let aditionalPrice = 0;
      const options = product?.options?.reduce(
        (accOption, productOption, indexProductOption) => {
          // Encontrar la opcion seleccionada dentro del cartItemProduct
          const selectedOption = cartItemProduct?.options?.find(
            (cartItemOption, index) =>
              cartItemOption?.option === productOption?._id &&
              indexProductOption === index
          );
          // Detalles de la opcion seleccionada
          const selectedDetail = productOption?.options?.find(
            (option) => option?._id === selectedOption?.selected
          );

          if (!selectedOption) return accOption;
          aditionalPrice += selectedDetail?.aditionalPrice || 0;
          return [
            ...accOption,
            {
              option: productOption?._id,
              selected: selectedOption?.selected,
              aditionalPrice: selectedDetail?.aditionalPrice,
            },
          ];
        },
        []
      );
      // Verifica si, la cantidad de opciones mapeadas es igual a la cantidad de opciones del producto
      if (options?.length !== product?.options?.length) return acc;
      return [
        ...acc,
        {
          _id: product?._id,
          name: product?.name,
          basePrice: product?.price,
          aditionalPrice,
          orden: cartItemProduct?.order,
          quantity: cartItemProduct?.quantity,
          options,
        },
      ];
    }, []);
    cart?.setCartId(cartId);
    cart?.setCartCode(cartCode);
    cart?.setItems(menuItems);
    cart?.updateOrdenAgregado(menuItems?.length);
  };

  const handleRemoveAllFromCart = () => {
    cart?.removeAllFromCart();
  };

  return {
    getItemsToShow,
    handleRemoveFromCart,
    handleUpdateQuantity,
    getDetails,
    getProductTotal,
    handleRemoveAllFromCart,
    fillFromApi,
  };
}

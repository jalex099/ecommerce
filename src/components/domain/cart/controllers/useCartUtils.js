import { useCartState } from "#/stores/cart";
import DataService from "#/services/DataService";
import serializeState from "#/utils/serializeState";
import { isPast, parseISO } from "date-fns";
export default function useCartUtils() {
  const cart = useCartState();
  const { menu, isLoading, offers } = DataService();

  const getItemsToShow = () => {
    if (isLoading) return undefined;
    const items = cart?.get();
    if (items?.length === 0) return undefined;
    return items?.filter((item) => item?.type !== "DELIVERY");
  };

  const handleRemoveFromCart = (idProduct, index) => {
    const itemsToKeep = cart?.get()?.reduce((acc, item, i) => {
      if (i !== index || item.idprs !== idProduct) {
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
    const product = menu?.find((product) => product?.idprs === idProduct);
    if (!product) return [];
    const options = product?.options;
    if (!options) return [];
    return optionsSavedOnCart?.reduce((acc, optionSavedOnCart, index) => {
      const selectedDetail = options[index]?.suboptions?.find(
        (option) => option?.idpod === optionSavedOnCart?.selected
      );
      let response = {
        name: selectedDetail?.cartName || selectedDetail?.name,
        aditionalPrice: selectedDetail?.additionalPrice,
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
    if (!cartItem || cartItem?.menu?.length === 0) {
      cart?.clean();
      cart?.addToLocalStorage();
      return;
    }
    const {
      _id: cartId,
      code: cartCode,
      name: cartName,
      menu: cartMenu,
    } = cartItem;
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
              cartItemOption?.label === productOption?.label &&
              indexProductOption === index
          );
          // Detalles de la opcion seleccionada
          const selectedDetail = productOption?.subOptions?.find(
            (option) => option?._id === selectedOption?.selected
          );
          if (!selectedOption) return accOption;
          aditionalPrice += selectedDetail?.aditionalPrice || 0;
          return [
            ...accOption,
            {
              label: productOption?.label,
              selected: selectedOption?.selected,
              aditionalPrice: selectedDetail?.aditionalPrice,
            },
          ];
        },
        []
      );
      // Verifica si, la cantidad de opciones mapeadas es igual a la cantidad de opciones del producto
      if (options?.length !== product?.options?.length) return acc;
      // Verifica si hay ofertas para ese producto
      const offer = offers?.find(
        (offer) =>
          offer?.product === product?._id && !isPast(parseISO(offer?.to))
      );
      // Si hay oferta, se calcula el precio con la oferta
      let discount = 0;
      if (offer) {
        const { amount, behavior } = offer;
        switch (behavior) {
          case "PRC":
            discount = product?.price * (amount / 100);
            break;
          case "MNT":
            discount = amount;
            break;
          default:
            break;
        }
      }
      return [
        ...acc,
        {
          _id: product?._id,
          name: product?.name,
          basePrice: product?.price - discount,
          aditionalPrice,
          orden: cartItemProduct?.order,
          quantity: cartItemProduct?.quantity,
          options,
          discount,
          nonOfferPrice: product?.price + aditionalPrice,
        },
      ];
    }, []);
    cart?.setCartId(cartId);
    cart?.setCartCode(cartCode);
    cart?.setItems(menuItems);
    cart?.setName(cartName);
    cart?.setSyncable(!!cartId);
    cart?.updateOrdenAgregado(menuItems?.length);
  };

  const handleRemoveAllFromCart = () => {
    cart?.removeAllFromCart();
    if(cart?.getSyncable())
      cart?.setSyncable(false);
    if(cart?.getCartId())
      cart?.setCartId(null);
    if(cart?.getCartCode())
      cart?.setCartCode(null);
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

import useCartState from "#/stores/cart.js";
import { useCheckoutState } from "#/stores/CheckoutState.js";
import { useLocationState } from "#/stores/LocationState.js";
import { parseMenu } from "#/utils/adapterUtil/cartAdapterUtil.js";
import { PAYMENT_METHODS } from "#/config/constants.js";
import { findKey } from "#/utils/localStorageHelper.js";

export default function useOrderParser() {
  const cart = useCartState();
  const checkout = useCheckoutState();
  const location = useLocationState();

  const parseOrder = () => {
    //* Obtener el menu parseado desde el carrito
    const menu = parseMenu(cart?.get());

    //* Datos generales del usuario
    const userGeneralData = {
      email: checkout?.email,
      name: checkout?.completeName,
      phone: checkout?.phone,
    };
    //* Datos de la dirección de entrega
    const deliveryData = {
      deliveryMethod: location?.delivery
        ? "DELIVERY"
        : location?.shop
        ? "PICKUP"
        : location?.meetup
        ? "MEETUP"
        : null,
      latitude: location?.delivery?.latitude || null,
      longitude: location?.delivery?.longitude || null,
      address:
        location?.delivery &&
        location?.delivery?.street +
          " #" +
          location?.delivery?.houseNumber +
          ", " +
          location?.delivery?.reference,
      shop: location?.shop?._id || null,
      meetup: location?.meetup?._id || null,
    };

    //* Datos de horario de entrega
    const deliverySchedule = {
      deliveryDate: location?.dateTime,
    };

    //* Datos de pago
    const paymentData = {
      paymentMethod: PAYMENT_METHODS?.find(
        (method) => method?.value === checkout?.paymentMethod
      )?.code,
      total: cart?.getTotal(),
      ccNumber: checkout?.cardNumber || null,
      ccExp: checkout?.cardExpiration || null,
      ccCsc: checkout?.cardCVC || null,
      ccName: checkout?.cardHolderName || null,
      payAddress: checkout?.paymentAddress || null,
      payCountry: checkout?.paymentCountry || null,
      payRegion: checkout?.paymentRegion || null,
      payPostalCode: checkout?.paymentPostalCode || null,
    };

    //* Comentarios extras de la orden
    const extraComments = {
      comments: checkout?.comments || null,
    };

    return {
      _id: findKey('order') || null,
      menu,
      ...userGeneralData,
      ...deliveryData,
      ...deliverySchedule,
      ...paymentData,
      ...extraComments,
    };
  };

  return {
    parseOrder,
  };
}

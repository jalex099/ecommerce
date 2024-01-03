import { hookstate, useHookstate } from "@hookstate/core";

export const locationState = hookstate({
  deliveryMethod: null,
  lat: null,
  lng: null,
  street: null,
  houseNumber: null,
  reference: null,
  shop: null,
  addressRegister: null,
});

export const useLocationState = () => {
  const state = useHookstate(locationState);

  //* Funcion para guardar el estado en el localstorage
  const addToLocalStorage = () => {
    window.localStorage.setItem("location_state", JSON.stringify(state?.value));
    //   // }
  };

  //* Funcion para llenar los campos desde delivery
  const fillFromDeliveryAddress = (data) => {
    state.lat.set(data?.lat);
    state.lng.set(data?.lng);
    state.street.set(data?.street);
    state.houseNumber.set(data?.houseNumber);
    state.reference.set(data?.reference);
    state.addressRegister.set(data?.addressRegister || null);
  };

  //* Funcion para setear el metodo de entrega
  const setDeliveryMethod = (method) => {
    state.deliveryMethod.set(method);
    switch (method) {
      case 0:
        state.shop.set(null);
        break;
      case 1:
        state.lat.set(null);
        state.lng.set(null);
        state.street.set(null);
        state.houseNumber.set(null);
        state.reference.set(null);
        state.addressRegister.set(null);
        break;
      case 2:
        state.shop.set(null);
        state.street.set(null);
        state.houseNumber.set(null);
        state.addressRegister.set(null);
        break;
      default:
        break;
    }
  };

  return {
    addToLocalStorage,
    deliveryMethod: state.deliveryMethod.get(),
    setDeliveryMethod,
    lat: state.lat.get(),
    lng: state.lng.get(),
    street: state.street.get(),
    houseNumber: state.houseNumber.get(),
    reference: state.reference.get(),
    shop: state.shop.get(),
    addressRegister: state.addressRegister.get(),
    setStreet: (value) => state.street.set(value),
    setHouseNumber: (value) => state.houseNumber.set(value),
    fillFromDeliveryAddress,
  };
};

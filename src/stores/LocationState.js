import { hookstate, useHookstate } from "@hookstate/core";
import { useNavigate } from "react-router-dom";
import { stateToString } from "#/utils/adapterUtil/index.js";
import { format, parse, parseISO } from "date-fns";

const getLocationFromLocalStorage = () => {
  const location = window.localStorage.getItem("location_state");
  if (!location) return null;
  return JSON.parse(location);
};
export const locationState = hookstate(() => {
  const location = getLocationFromLocalStorage();
  return {
    delivery: location?.delivery || null,
    shop: location?.shop || null,
    meetup: location?.meetup || null,
    dateTime: location?.dateTime ? parseISO(location?.dateTime) : null,
    step: 0,
  };
});

export const useLocationState = () => {
  const state = useHookstate(locationState);
  const navigate = useNavigate();

  //* Funcion para guardar el estado en el localstorage
  const addToLocalStorage = () => {
    window.localStorage.setItem("location_state", JSON.stringify(state?.value));
    //   // }
  };

  //* Funcion para limpiar el estado de delivery
  const clearState = () => {
    state?.delivery.set(null);
    state?.shop.set(null);
    state?.meetup.set(null);
  };

  //* Funcion para limpiar el estado de fecha y hora
  const clearDateTime = () => {
    state?.dateTime.set(null);
  };

  //* Funcion para llenar los campos desde delivery
  const fillFromDeliveryAddress = (data) => {
    clearState();
    state?.delivery.set(data);
  };

  //* Funcion para llenar los campos desde shop
  const fillFromShop = (data) => {
    clearState();
    state?.shop.set(data);
  };

  //* Funcion para llenar los campos desde meetup
  const fillFromMeetup = (data) => {
    clearState();
    state?.meetup.set(data);
  };

  //* Funcion para saber que metodo es el seleccionado
  const getSelected = () => {
    if (state?.delivery.value) {
      return 0;
    } else if (state?.shop.value) {
      return 1;
    } else if (state?.meetup.value) {
      return 2;
    } else {
      return null;
    }
  };

  //* Funcion para ir al siguiente paso
  const nextStep = async () => {
    if (state?.step.value === 1) {
      navigate(-1, { replace: true });
      await new Promise((resolve) => setTimeout(resolve, 100));
      state?.step.set(0);
      return;
    }
    state.step.set(state.step.value + 1);
  };

  //* Funcion para ir al paso anterior
  const prevStep = () => {
    state.step.set(state.step.value - 1);
  };

  //* Funcion continuar desde date time
  const continueFromDateTime = () => {
    navigate(-1, { replace: true });
  };

  //* Funcion para llenar la calle desde el mapa
  const setStreetOnDelivery = (street) => {
    state?.delivery.street.set(street);
  };

  //* Funcion para llenar el numero de casa / piso desde el mapa
  const setHouseNumberOnDelivery = (number) => {
    state?.delivery.houseNumber.set(number);
  };

  const validateByMethod = (method) => {
    switch (method) {
      case 0:
        if (
          !state?.delivery?.value ||
          !state?.delivery?.value?.street ||
          !state?.delivery?.value?.houseNumber ||
          !state?.delivery?.value?.latitude ||
          !state?.delivery?.value?.longitude
        ) {
          return false;
        }
        break;
      case 1:
        if (!state?.shop.value) {
          return false;
        }
        break;
      case 2:
        if (!state?.meetup.value) {
          return false;
        }
        break;
      default:
        return false;
    }
    return true;
  };

  const fillDateTime = (date) => {
    state?.dateTime.set(date);
  };

  const formatedDateTime = () => {
    if (!state?.dateTime?.value) {
      return null;
    }
    return format(state?.dateTime?.value, "dd/MM/yyyy hh:mm a");
  };

  const isValidAddress = () => {
    if (
      !state?.delivery?.value ||
      !state?.delivery?.value?.street ||
      !state?.delivery?.value?.houseNumber ||
      !state?.delivery?.value?.latitude ||
      !state?.delivery?.value?.longitude
    ) {
      return false;
    }
    return true;
  };

  const isValidShop = () => {
    if (!state?.shop.value || !state?.shop?.value?._id) {
      return false;
    }
    return true;
  };

  const isValidMeetup = () => {
    if (!state?.meetup.value || !state?.meetup?.value?._id) {
      return false;
    }
    return true;
  };

  return {
    addToLocalStorage,
    clearState,
    clearDateTime,
    delivery: state?.delivery.value,
    shop: state?.shop.value,
    meetup: state?.meetup.value,
    dateTime: state?.dateTime.value,
    step: state?.step.value,
    selected: getSelected(),
    fillFromDeliveryAddress,
    fillFromShop,
    fillFromMeetup,
    fillDateTime,
    nextStep,
    prevStep,
    setStreetOnDelivery,
    setHouseNumberOnDelivery,
    validateByMethod,
    formatedDateTime,
    continueFromDateTime,
    hash: () => stateToString(state.get()),
    isValidAddress,
    isValidShop,
    isValidMeetup,
  };
};

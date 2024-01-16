import { hookstate, useHookstate } from "@hookstate/core";
import { useNavigate } from "react-router-dom";
import { stateToString } from "#/utils/adapterUtil/index.js";


const getLocationFromLocalStorage = () => {
  const location = window.localStorage.getItem("location_state");
  if (!location) return null;
  return JSON.parse(location);
}
export const locationState = hookstate(()=>{
  const location = getLocationFromLocalStorage();
  return {
    delivery: location?.delivery || null,
    shop: location?.shop || null,
    meetup: location?.meetup || null,
    step: 0
  }
});


export const useLocationState = () => {
  const state = useHookstate(locationState);
  const navigate = useNavigate();

  //* Funcion para guardar el estado en el localstorage
  const addToLocalStorage = () => {
    window.localStorage.setItem("location_state", JSON.stringify(state?.value));
    //   // }
  };



  //* Funcion para limpiar el estado
  const clearState = () => {
    state?.delivery.set(null);
    state?.shop.set(null);
    state?.meetup.set(null);
  }

  //* Funcion para llenar los campos desde delivery
  const fillFromDeliveryAddress = (data) => {
    clearState()
    state?.delivery.set(data);
  };

  //* Funcion para llenar los campos desde shop
  const fillFromShop = (data) => {
    clearState()
    state?.shop.set(data);
  };

  //* Funcion para llenar los campos desde meetup
  const fillFromMeetup = (data) => {
    clearState()
    state?.meetup.set(data);
  };

  //* Funcion para saber que metodo es el seleccionado
  const getSelected = () => {
    if (state?.delivery.value) {
      return 0;
    } else if (state?.shop.value) {
      return 1;
    } else if (state?.meetup.value) {
      return 2
    } else {
      return null;
    }
  };

  //* Funcion para ir al siguiente paso
  const nextStep = () => {
    if(state?.step.value === 1){
      navigate(-1, { replace: true })
      state?.step.set(0);
      return
    }
    state.step.set(state.step.value + 1);
  };

  //* Funcion para ir al paso anterior
  const prevStep = () => {
    state.step.set(state.step.value - 1);
  };

  //* Funcion para llenar la calle desde el mapa
  const setStreetOnDelivery = (street) => {
    state?.delivery.street.set(street);
  }

  //* Funcion para llenar el numero de casa / piso desde el mapa
  const setHouseNumberOnDelivery = (number) => {
    state?.delivery.houseNumber.set(number);
  }

  const validateByMethod = (method) => {
    switch(method){
      case 0:
        if(
          !state?.delivery?.value ||
          !state?.delivery?.value?.street ||
          !state?.delivery?.value?.houseNumber ||
          !state?.delivery?.value?.latitude ||
          !state?.delivery?.value?.longitude
        ){
          return false
        }
        break;
      case 1:
        if(!state?.shop.value){
          return false
        }
        break;
      case 2:
        if(!state?.meetup.value){
          return false
        }
        break;
      default:
        return false
    }
    return true
  }

  return {
    addToLocalStorage,
    clearState,
    delivery: state?.delivery.value,
    shop: state?.shop.value,
    meetup: state?.meetup.value,
    step: state?.step.value,
    selected: getSelected(),
    fillFromDeliveryAddress,
    fillFromShop,
    fillFromMeetup,
    nextStep,
    prevStep,
    setStreetOnDelivery,
    setHouseNumberOnDelivery,
    validateByMethod,
    hash: () => stateToString(state.get()),
  };
};

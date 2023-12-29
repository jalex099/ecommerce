import { useCartState } from "#/stores/cart";
import { useTemporalProduct } from "#/stores/temporalProduct";
import serializeState from "#/utils/serializeState";
import RedirectionService from "#/services/RedirectionService";
import { addToast } from "#/stores/UIState.js";
import DataService from "#/services/DataService";

export default function useAddToCart() {
  const cart = useCartState();
  const { temp } = useTemporalProduct();
  const { redirectTo } = RedirectionService();
  const { menu } = DataService();

  const addToCart = () => {
    if (!validateProduct()) return;
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
      quantity: temp?.quantity || 1,
      aditionalPrice,
      orden: cart?.getOrdenAgregado(),
      options,
      discount: Math.round(temp?.discount, 2),
    });

    cart?.updateOrdenAgregado(cart?.getOrdenAgregado() + 1);
    redirectTo("category", temp?.category, true);
  };

  const validateProduct = () => {
    const itemToAdd = serializeState(temp);
    // Validate if the products exists and are in the menu
    const itemInMenu = menu?.find((item) => item?._id === itemToAdd?._id);
    if (!itemInMenu) {
      addToast("El producto no se encuentra disponible", "error");
      return false;
    }
    // Validate if the product has options and the temp has the exact amount of options
    if (
      itemToAdd?.options?.length > 0 &&
      itemToAdd?.options?.length !== temp?.options?.length
    ) {
      addToast("Hubo un error. Recarga el sitio", "error");
      return false;
    }
    // Validate if all the options are selected
    const allOptionsAreSelected = itemToAdd?.options?.every((option) => {
      return option?.selected;
    });
    if (!allOptionsAreSelected) {
      addToast("Selecciona todas las opciones", "error");
      return false;
    }
    // Validate if the options are valid
    const optionsAreValid = itemToAdd?.options?.every((option, index) => {
      const selected = option?.selected;
      const existsSelectedInMenuItem = itemInMenu?.options?.[
        index
      ]?.options?.find((subopt) => subopt?._id === selected);
      return existsSelectedInMenuItem;
    });
    if (!optionsAreValid) {
      addToast("Algunas de las opciones no son válidas", "error");
      return false;
    }
    return true;
  };
  return {
    addToCart,
  };
}

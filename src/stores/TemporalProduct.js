import { hookstate, useHookstate } from "@hookstate/core";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import { orderBy } from "lodash";

const temporalProduct = hookstate({
  idprs: "",
  name: "",
  description: "",
  price: "",
  category: "",
  options: [],
  isNew: false,
  tags: [],
  isOffer: false,
  discount: 0,
  quantity: 1,
});

export const useTemporalProduct = () => {
  const state = useHookstate(temporalProduct);
  const { preferences } = ClientPreferenceService();

  const clear = () => {
    state.idprs.set("");
    state.name.set("");
    state.description.set("");
    state.price.set("");
    state.category.set("");
    state.options.set([]);
    state.isNew.set(false);
    state.tags.set([]);
    state.isOffer.set(false);
    state.discount.set(0);
    state.quantity.set(1);
  };

  const fill = ({
    idprs,
    name,
    description,
    price,
    category,
    options,
    isNew,
    tags,
  }) => {
    state.idprs.set(idprs);
    state.name.set(name);
    state.description.set(description);
    state.price.set(price);
    state.category.set(category);
    state.quantity.set(1);
    state.options?.set(
      options?.reduce((acc, option) => {
        const opt = {
          label: option?.name,
          selected: null,
          options: orderBy(
            option?.suboptions?.reduce((acc, suboption) => {
              const opt = {
                ...suboption,
                suggest: preferences?.values?.includes(suboption?.option?.idopt) ?? null,
              };
              acc.push(opt);
              return acc;
            }, []),
            ["suggest"],
            ["desc"]
          ),
        };
        acc.push(opt);
        return acc;
      }, [])
    );
    state.isNew.set(isNew);
    state.tags.set(tags);
  };

  const preparedDataToServer = () => {
    let options = state.options?.get()?.reduce((acc, option) => {
      const opt = {
        _id: option?.idpop,
        selected: option?.selected,
      };
      acc.push(opt);
      return acc;
    }, []);
    return {
      _id: state.idprs?.get(),
      quantity: 1,
      order: 0,
      options,
    };
  };

  const setSelectedOption = (optionIndex, selectionId) => {
    state.options[optionIndex].selected.set(selectionId);
  };

  const updatePriceFromOffer = (offer) => {
    if (!offer) return;
    switch (offer?.behavior) {
      case "PRC":
        state?.discount?.set(state?.price?.get() * (offer?.amount / 100));
        state.isOffer.set(true);
        state.price.set(
          state.price?.get() - (state.price?.get() * offer?.amount) / 100
        );
        break;
      case "MNT":
        state?.discount?.set(offer?.amount);
        state.isOffer.set(true);
        state.price.set(state.price?.get() - offer?.amount);
        break;
      default:
        return;
    }
  };

  const increment = () => {
    if (state.quantity.get() === 10) return;
    state.quantity.set(state.quantity.get() + 1);
  };

  const decrement = () => {
    if (state.quantity.get() === 1) return;
    state.quantity.set(state.quantity.get() - 1);
  };

  return {
    clear,
    fill,
    temp: state?.get(),
    setSelectedOption,
    preparedDataToServer,
    updatePriceFromOffer,
    increment,
    decrement,
  };
};

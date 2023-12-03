import { hookstate, useHookstate } from "@hookstate/core";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import { orderBy } from "lodash";

const temporalProduct = hookstate({
  _id: "",
  name: "",
  description: "",
  price: "",
  category: "",
  options: [],
  isNew: false,
  tags: [],
});

export const useTemporalProduct = () => {
  const state = useHookstate(temporalProduct);
  const { preferences } = ClientPreferenceService();

  const clear = () => {
    state._id.set("");
    state.name.set("");
    state.description.set("");
    state.price.set("");
    state.category.set("");
    state.options.set([]);
    state.isNew.set(false);
    state.tags.set([]);
  };

  const fill = ({
    _id,
    name,
    description,
    price,
    category,
    options,
    isNew,
    tags,
  }) => {
    state._id.set(_id);
    state.name.set(name);
    state.description.set(description);
    state.price.set(price);
    state.category.set(category);
    state.options?.set(
      options?.reduce((acc, option) => {
        const opt = {
          _id: option?._id,
          label: option?.label,
          selected: null,
          options: orderBy(
            option?.options?.reduce((acc, suboption) => {
              const opt = {
                ...suboption,
                suggest: preferences?.values?.includes(suboption?.option?._id),
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
        _id: option?._id,
        selected: option?.selected,
      };
      acc.push(opt);
      return acc;
    }, []);
    return {
      _id: state._id?.get(),
      quantity: 1,
      order: 0,
      options,
    };
  };

  const setSelectedOption = (optionIndex, selectionId) => {
    state.options[optionIndex].selected.set(selectionId);
  };

  return {
    clear,
    fill,
    temp: state?.get(),
    setSelectedOption,
    preparedDataToServer,
  };
};

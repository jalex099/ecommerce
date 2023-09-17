import { hookstate, useHookstate } from "@hookstate/core";

const temporalProductState = hookstate({
  _id: "",
  name: "",
  description: "",
  price: "",
  options: [],
  isNew: false,
  imagesUrl: [],
});

export const useTemporalProductState = () => {
  const state = useHookstate(temporalProductState);

  const clear = () => {
    state._id.set("");
    state.name.set("");
    state.description.set("");
    state.price.set("");
    state.options.set([]);
    state.isNew.set(false);
  };

  const fill = ({ _id, name, description, price, options, isNew }) => {
    state._id.set(_id);
    state.name.set(name);
    state.description.set(description);
    state.price.set(price);
    state.options?.set(
      options?.reduce((acc, option) => {
        const opt = {
          _id: option?._id,
          label: option?.label,
          selected: option?.options[0]?._id,
        };
        acc.push(opt);
        return acc;
      }, [])
    );
    state.isNew.set(isNew);
  };

  return {
    clear,
    fill,
    temp: state?.get(),
  };
};

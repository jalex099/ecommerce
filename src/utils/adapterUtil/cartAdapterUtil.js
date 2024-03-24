export const parseMenu = (menu) => {
  return menu?.reduce((acc, item) => {
    const product = {
      product: item?._id,
      quantity: item?.quantity,
      order: item?.orden,
      options: item?.options?.reduce((accOpt, opt) => {
        return [
          ...accOpt,
          {
            label: opt?.label,
            selected: opt?.selected,
            aditionalPrice: opt?.aditionalPrice,
          },
        ];
      }, []),
    };
    return [...acc, product];
  }, []);
};

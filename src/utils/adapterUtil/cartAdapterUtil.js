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
            option: opt?.option,
            selected: opt?.selected,
          },
        ];
      }, []),
    };
    return [...acc, product];
  }, []);
};

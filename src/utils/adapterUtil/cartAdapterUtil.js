export const parseMenu = (menu) => {
  return menu?.reduce((acc, item) => {
    const unitPrice = (item?.basePrice || 0 + item?.aditionalPrice || 0) - (item?.discount || 0);
    const product = {
      product: item?._id,
      quantity: item?.quantity,
      unitPrice,
      total: unitPrice * item?.quantity,
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

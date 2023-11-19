import DataService from "#/services/DataService";

const CartController = () => {
  const { menu } = DataService();

  //* Retorna un array con los detalles de las opciones seleccionadas de un producto
  const optionDetails = (idProduct, optionsSavedOnCart) => {
    const product = menu?.find((product) => product?._id === idProduct);
    if (!product) return [];
    const options = product?.options;
    if (!options) return [];
    return optionsSavedOnCart?.reduce((acc, optionSavedOnCart, index) => {
      const selectedDetail = options[index]?.options?.find(
        (option) => option?._id === optionSavedOnCart?.selected
      );
      let response = {
        name: selectedDetail?.option?.name,
        aditionalPrice: selectedDetail?.aditionalPrice,
      };
      return [...acc, response];
    }, []);
  };

  return {
    optionDetails,
  };
};

export default CartController;

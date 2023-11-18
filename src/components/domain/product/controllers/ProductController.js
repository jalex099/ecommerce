import { useTemporalProduct } from "#/stores/temporalProduct";
import { useMemo } from "react";

const ProductController = () => {
  const { temp, setSelectedOption } = useTemporalProduct();

  const options = useMemo(
    () => temp?.options?.map((option) => option?._id),
    [temp?.options]
  );

  const getIndexOptionRepeated = (optionIndex) => {
    if (!options) return -1;
    const option = options[optionIndex];
    // Remove the option from the array of options
    options.splice(optionIndex, 1);
    // If the option is not repeated, then we return -1
    if (!options?.some((optionRepeated) => optionRepeated === option))
      return -1;
    // Options repeated
    const optionsRepeated = options.filter((opt) => opt === option);
    if (!optionsRepeated) return -1;

    let index = 0;
    // We look for the index of the option in the repeated options
    optionsRepeated?.map((opt, i) => {
      if (i < optionIndex) index++;
    });
    // We return the index + 1 because the index starts at 0
    return index + 1;
  };

  const getSelectedOption = (optionIndex) => {
    return temp?.options[optionIndex]?.selected;
  };

  const setSelection = (optionIndex, selectionId) => {
    setSelectedOption(optionIndex, selectionId);
  };

  const getSelectedOptionName = (optionIndex, maxLength = null) => {
    const selectedOptionId = getSelectedOption(optionIndex);
    const option = temp?.options[optionIndex];
    const selectedOption = option?.options?.find(
      (option) => option?._id === selectedOptionId
    );
    if (!selectedOption) return "";
    if (maxLength && selectedOption?.option?.name?.length > maxLength + 5) {
      return `${selectedOption?.option?.name?.substring(0, maxLength)}...`;
    }
    return selectedOption?.option?.name;
  };

  const getTotal = () => {
    const basePrice = temp?.price;
    const optionsPrice = getOptionsSubtotal();
    return basePrice + optionsPrice;
  };

  const getOptionsSubtotal = () => {
    return (
      temp?.options?.reduce((acc, option) => {
        const selectedOption = option?.options?.find(
          (subopt) => subopt?._id === option?.selected
        );
        if (!selectedOption) return acc;
        return acc + (selectedOption?.aditionalPrice || 0);
      }, 0) || 0
    );
  };

  return {
    getIndexOptionRepeated,
    getSelectedOption,
    setSelection,
    getSelectedOptionName,
    getTotal,
    getOptionsSubtotal,
  };
};

export default ProductController;

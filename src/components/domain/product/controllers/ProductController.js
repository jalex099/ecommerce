import { useTemporalProductState } from "#/hooks/TemporalProductState";
import { useMemo } from "react";

const ProductController = () => {
  const { temp, setSelectedOption } = useTemporalProductState();

  const options = useMemo(
    () => temp?.options?.map((option) => option?._id),
    [temp?.options]
  );

  const getIndexOptionRepeated = (optionIndex) => {
    if (!options) return -1;
    const option = options[optionIndex];
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

  return {
    getIndexOptionRepeated,
    getSelectedOption,
    setSelection,
  };
};

export default ProductController;

/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import OptionChip from "#/components/domain/product/OptionChip";
import HorizontalScroller from "#/components/shared/HorizontalScroller";
import Regular14 from "#/components/shared/fonts/Regular14";
import ProductController from "#/components/domain/product/controllers/ProductController";
import { useMemo } from "react";

function OptionContainer({ label, options, index }) {
  const { getIndexOptionRepeated, getSelectedOption, setSelection } =
    ProductController();

  const indexOptionRepeated = useMemo(() => {
    return getIndexOptionRepeated(index);
  }, [index]);

  const handleSelectOption = (optionId) => {
    setSelection(index, optionId);
  };

  return (
    <Box className="flex flex-col gap-1">
      <Regular14 className="flex flex-row gap-1 items-center">
        {label}
        {indexOptionRepeated !== -1 && <span>{indexOptionRepeated}</span>}
      </Regular14>
      <HorizontalScroller>
        {options?.map((opt) => {
          return (
            <OptionChip
              key={opt?._id}
              option={opt}
              isSelected={getSelectedOption(index) === opt?._id}
              onSelect={handleSelectOption}
            />
          );
        })}
      </HorizontalScroller>
    </Box>
  );
}

export default OptionContainer;

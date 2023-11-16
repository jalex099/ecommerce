/* eslint-disable react-hooks/exhaustive-deps */

import OptionChip from "#/components/domain/product/OptionChip";
import Regular14 from "#/components/shared/fonts/Regular14";
import ProductController from "#/components/domain/product/controllers/ProductController";
import { useMemo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useHookstate } from "@hookstate/core";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Regular12 from "#/components/shared/fonts/Regular12";

function OptionContainer({ label, options, index }) {
  const isDialogOpen = useHookstate(false);
  const {
    getIndexOptionRepeated,
    getSelectedOption,
    setSelection,
    getSelectedOptionName,
  } = ProductController();

  const indexOptionRepeated = useMemo(() => {
    return getIndexOptionRepeated(index);
  }, [index]);

  const handleSelectOption = (optionId) => {
    setSelection(index, optionId);
  };

  const handleClickOption = () => {
    isDialogOpen.set(true);
  };

  const labelToShow = useMemo(() => {
    return `${label} ${indexOptionRepeated} ` || "";
  }, [options]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOption}
        className="flex flex-col items-center justify-center "
      >
        <Regular14>{`${labelToShow} `}</Regular14>
        <Regular12 styles={style.selectedOption}>
          {getSelectedOptionName(index)}
        </Regular12>
      </Button>
      <Dialog
        open={isDialogOpen.get()}
        onClose={() => isDialogOpen.set(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { padding: "8px 0px" },
        }}
      >
        <DialogTitle>
          <Regular14>{labelToShow}</Regular14>
        </DialogTitle>
        <DialogContent sx={style.dialogContent}>
          <Stack spacing={0}>
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
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

const style = {
  dialogContent: {
    minHeight: "100px",
    maxHeight: "300px",
    p: 0,
    m: 0,
  },
  selectedOption: {
    opacity: 0.75,
  },
};

export default OptionContainer;

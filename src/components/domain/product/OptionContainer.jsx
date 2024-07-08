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
import LabelSelected from "#/components/domain/product/LabelSelected";
import LabelNoSelected from "#/components/domain/product/LabelNoSelected";
import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "#/components/shared/icons/CloseIcon";
import { useMediaQuery } from "@mui/material";

function OptionContainer({ label, options, index, className }) {

  const isLg = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const isDialogOpen = useHookstate(false);
  const {
    getIndexOptionRepeated,
    getSelectedOption,
    setSelection,
    getSelectedOptionName,
    isOptionSelected,
  } = ProductController();

  const indexOptionRepeated = useMemo(() => {
    return getIndexOptionRepeated(index);
  }, [index]);

  const handleSelectOption = (optionId) => {
    setSelection(index, optionId);
    isDialogOpen.set(false);
  };

  const handleClickOption = () => {
    isDialogOpen.set(true);
  };

  const labelToShow = useMemo(() => {
    if (indexOptionRepeated === -1) return label;
    return `${label} ${indexOptionRepeated}`;
  }, [options]);

  const handleCloseDialog = () => {
    isDialogOpen.set(false);
  };

  const isSomePrefered = useMemo(
    () => options?.some((opt) => opt?.suggest),
    [options]
  );

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOption}
        className={`flex flex-col items-center justify-center px-1 h-[60px] ${className}`}
      >
        {isOptionSelected(index) ? (
          <LabelSelected text={getSelectedOptionName(index)} />
        ) : (
          <LabelNoSelected text={labelToShow} />
        )}
      </Button>
      <Dialog
        open={isDialogOpen.get()}
        onClose={() => isDialogOpen.set(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { padding: "8px 0px" , minWidth: { xs: "100%", lg: "500px" }, maxWidth: { xs: "100%", lg: "500px" }, position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0},
        }}
      >
        <DialogTitle className={"cursor-default"}>
          <Regular14>{labelToShow}</Regular14>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className="w-6 h-6" />
        </IconButton>
        <DialogContent sx={style.dialogContent}>
          {isSomePrefered && (
            <Box
              className="w-full flex  items-center gap-2 justify-center py-1 cursor-default"
              sx={{ bgcolor: (theme) => theme.palette.opacity5.main }}
            >
              <Regular12>
                Tus preferencias se ver&aacute;n con el distintivo:
              </Regular12>
              <Box
                className="w-2 h-2 rounded-full"
                sx={{ bgcolor: (theme) => theme.palette.green100.main }}
              />
            </Box>
          )}

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
    maxHeight: { xs: "calc(100vh - 200px)", lg: "500px" },
  },
  selectedOption: {
    // opacity: 0.75,
  },
};

export default OptionContainer;

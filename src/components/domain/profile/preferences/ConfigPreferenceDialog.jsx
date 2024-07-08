import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PreferenceItem from "#/components/domain/profile/preferences/PreferenceItem";
import { useMemo } from "react";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import { addToast } from "#/stores/UIState.js";

const ConfigPreferenceDialog = ({
  open,
  onClose,
  optionsList,
  optionsActive,
  handleAddPreference,
  handleRemovePreference,
}) => {
  const group = useMemo(() => {
    return optionsList[0]?.group || "";
  }, [optionsList]);

  const quantityPreferencesOnGroup = useMemo(() => {
    return optionsList?.reduce((acc, option) => {
      if (optionsActive?.includes(option?._id)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }, [optionsList, optionsActive]);

  const handleAddOrRemovePreference = (item) => {
    if (optionsActive?.includes(item?._id)) {
      handleRemovePreference(item?._id);
    } else {
      if (quantityPreferencesOnGroup >= 3) {
        addToast("Limite alcanzado", "error");
        return;
      }
      handleAddPreference(item?._id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: style.dialog }}>
      <DialogTitle>
        <SemiBold14>{group}</SemiBold14>
      </DialogTitle>
      <DialogContent sx={style?.content}>
        {optionsList?.map((item) => (
          <PreferenceItem
            onClick={() => handleAddOrRemovePreference(item)}
            key={item?._id}
            id={item?._id}
            name={item?.name}
            active={optionsActive?.includes(item?._id)}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
};

const style = {
  button: {},
  dialog: {
    // minHeight: "250px",
    width: "100%",
    position: { xs: "absolute" , lg: "relative"}, bottom: 0, left:0, right: 0
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "0",
  },
};

export default ConfigPreferenceDialog;

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PreferenceItem from "#/components/domain/profile/preferences/PreferenceItem";

const ConfigPreferenceDialog = ({
  open,
  onClose,
  optionsList,
  optionsActive,
  handleAddPreference,
  handleRemovePreference,
}) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: style.dialog }}>
      <DialogTitle>Configurar preferencias</DialogTitle>
      <DialogContent sx={style?.content}>
        {optionsList?.map((item) => (
          <PreferenceItem
            onClick={() => {
              if (optionsActive?.includes(item?._id)) {
                handleRemovePreference(item?._id);
              } else {
                handleAddPreference(item?._id);
              }
            }}
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
    minHeight: "250px",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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

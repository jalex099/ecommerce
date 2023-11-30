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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configurar preferencias</DialogTitle>
      <DialogContent>
        {optionsList?.map((item) => (
          <PreferenceItem
            onClick={() => {
              if (optionsActive?.includes(item?._id)) {
                handleRemovePreference({ id: "CODE", value: item?._id });
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

export default ConfigPreferenceDialog;

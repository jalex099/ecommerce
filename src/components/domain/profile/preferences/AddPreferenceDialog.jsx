import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PreferenceItemToAdd from "#/components/domain/profile/preferences/PreferenceItemToAdd";

const AddPreferenceDialog = ({
  open,
  onClose,
  optionsList,
  optionsActive,
  handleAddPreference,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar preferencia</DialogTitle>
      <DialogContent>
        {optionsList?.map((item) => (
          <PreferenceItemToAdd
            onClick={() => handleAddPreference(item?._id)}
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

export default AddPreferenceDialog;

import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import Chip from "@mui/material/Chip";
import ConfigPreferenceDialog from "#/components/domain/profile/preferences/ConfigPreferenceDialog";
import { useHookstate } from "@hookstate/core";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect";

export default function GroupOfOption({
  group,
  preferences,
  handleAddPreference,
  handleRemovePreference,
}) {
  const isDialogOpen = useHookstate(false);
  const optionsWithPreferences = group?.options?.filter((option) => {
    return preferences?.values?.includes(option?._id);
  });

  const handleOpenDialog = () => {
    isDialogOpen.set(true);
  };

  const handleCloseDialog = () => {
    isDialogOpen.set(false);
  };

  return (
    <>
      <Box
        className=" flex flex-row items-center justify-between w-full relative"
        onClick={handleOpenDialog}
      >
        <TouchRippleEffect className="w-full py-1">
          <Box className="flex-1">
            <Regular14 styles={style.textMuted}>
              {group?.label?.charAt(0).toUpperCase() +
                group?.label?.slice(1)?.toLowerCase()}
            </Regular14>
            <Box>
              <Regular14>
                {optionsWithPreferences?.length === 0 && "-"}
                {optionsWithPreferences?.length > 0 &&
                  optionsWithPreferences
                    ?.map((option) => {
                      return option?.name;
                    })
                    .join(", ")}
              </Regular14>
            </Box>
          </Box>
        </TouchRippleEffect>
        <Chip label={group?.label?.charAt(0)} />
      </Box>
      <ConfigPreferenceDialog
        open={isDialogOpen.get()}
        onClose={handleCloseDialog}
        optionsList={group?.options}
        optionsActive={preferences?.values}
        handleAddPreference={handleAddPreference}
        handleRemovePreference={handleRemovePreference}
      />
    </>
  );
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
  },
  subcontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subcontainerI: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
  textMuted: {
    color: (theme) => theme.palette.neutral60.main,
  },
};

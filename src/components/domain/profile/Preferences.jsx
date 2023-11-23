import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Regular14 from "#/components/shared/fonts/Regular14";
import Regular12 from "#/components/shared/fonts/Regular12";
import Chip from "@mui/material/Chip";
import PreferenceSkeleton from "#/components/domain/profile/skeletons/PreferenceSkeleton";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import { useHookstate } from "@hookstate/core";
import AddPreferenceDialog from "#/components/domain/profile/preferences/AddPreferenceDialog";
import DataService from "#/services/DataService";
import AddPreferenceButton from "#/components/domain/profile/preferences/AddPreferenceButton";

function Preferences() {
  const { preferences, isLoading, isRefetching, add } =
    ClientPreferenceService();
  const { options } = DataService();
  const isOpenDialog = useHookstate(false);
  const getTitleOfCode = (code) => {
    switch (code) {
      case "OPT":
        return "Opciones";
      default:
        return "Sin definir";
    }
  };

  const handleOpenDialog = () => {
    isOpenDialog.set(true);
  };

  const handleCloseDialog = () => {
    isOpenDialog.set(false);
  };

  const handleAddPreference = (value) => {
    console.log(value);
    add?.mutate({ code: "OPT", value });
  };

  if (isLoading || isRefetching) return <PreferenceSkeleton />;
  return (
    <Box sx={style.container}>
      <Box className="flex flex-row justify-between items-center w-full">
        <Regular18>Mis preferencias</Regular18>
        <AddPreferenceButton onClick={handleOpenDialog} />
      </Box>
      {preferences?.length === 0 && (
        <Regular12 styles={{ color: (theme) => theme.palette.neutral60.main }}>
          No tienes preferencias registradas
        </Regular12>
      )}
      {preferences?.length > 0 &&
        preferences?.map((item, index) => (
          <Box key={index} sx={style.subcontainer}>
            <Box>
              <Regular14 styles={style.textMuted}>
                {getTitleOfCode(item?.code)}
              </Regular14>
              <Regular14>
                {item?.value
                  ?.map((value) => {
                    const option = options?.find((item) => item?._id === value);
                    return option?.name;
                  })
                  .join(", ")}
              </Regular14>
            </Box>

            <Chip label={item?.code?.charAt(0)} />
          </Box>
        ))}
      <AddPreferenceDialog
        open={isOpenDialog.get()}
        handleAddPreference={handleAddPreference}
        optionsList={options}
        optionsActive={
          preferences?.find((item) => item?.code === "OPT")?.value || []
        }
        onClose={handleCloseDialog}
      />
    </Box>
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

export default Preferences;

import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Regular14 from "#/components/shared/fonts/Regular14";
import Regular12 from "#/components/shared/fonts/Regular12";
import Chip from "@mui/material/Chip";
import PreferenceSkeleton from "#/components/domain/profile/skeletons/PreferenceSkeleton";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import { useHookstate } from "@hookstate/core";
import ConfigPreferenceDialog from "#/components/domain/profile/preferences/ConfigPreferenceDialog";
import DataService from "#/services/DataService";
import ConfigPreferenceButton from "#/components/domain/profile/preferences/ConfigPreferenceButton";
import GroupOfOption from "#/components/domain/profile/preferences/GroupOfOption";

function Preferences() {
  const { preferences, isLoading, isRefetching, add, remove } =
    ClientPreferenceService();
  const { groupsOfOptions } = DataService();

  const handleAddPreference = (value) => {
    add?.mutate({ code: "OPT", value });
  };

  const handleRemovePreference = (value) => {
    remove?.mutate(value);
  };
  if (isLoading || isRefetching) return <PreferenceSkeleton />;
  return (
    <Box sx={style.container}>
      <Box className="flex flex-row justify-between items-center w-full">
        <Regular18>Mis preferencias</Regular18>
      </Box>
      {!preferences && preferences?.value?.length === 0 && (
        <Regular12 styles={{ color: (theme) => theme.palette.neutral60.main }}>
          No tienes preferencias registradas
        </Regular12>
      )}
      {groupsOfOptions?.map((group) => {
        return (
          <GroupOfOption
            key={group?.name}
            group={group}
            preferences={preferences}
            handleAddPreference={handleAddPreference}
            handleRemovePreference={handleRemovePreference}
          />
        );
      })}
      {/* <ConfigPreferenceDialog
        open={isOpenDialog.get()}
        handleAddPreference={handleAddPreference}
        id={preferences?._id}
        handleRemovePreference={handleRemovePreference}
        optionsList={options}
        optionsActive={preferences?.value || []}
        onClose={handleCloseDialog}
      /> */}
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

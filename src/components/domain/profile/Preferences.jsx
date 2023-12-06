import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Regular12 from "#/components/shared/fonts/Regular12";
import PreferenceSkeleton from "#/components/domain/profile/skeletons/PreferenceSkeleton";
import ClientPreferenceService from "#/services/ClientPreferenceService";
import DataService from "#/services/DataService";
import GroupOfOption from "#/components/domain/profile/preferences/GroupOfOption";
import { useHookstate } from "@hookstate/core";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

function Preferences() {
  const { preferences, isLoading, isRefetching, addOrRemove } =
    ClientPreferenceService();
  const { groupsOfOptions } = DataService();
  const showAll = useHookstate(false);

  const handleShowAll = () => {
    showAll.set(!showAll.get());
  };

  const handleAddPreference = (value) => {
    addOrRemove?.mutate({ action: "add", value });
  };

  const handleRemovePreference = (value) => {
    addOrRemove?.mutate({ action: "remove", value });
  };
  if (isLoading || isRefetching) return <PreferenceSkeleton />;
  return (
    <Box sx={style.container}>
      <Box className="flex flex-row justify-between items-center w-full">
        <Regular18>Mis preferencias</Regular18>
      </Box>
      {!preferences && preferences?.values?.length === 0 && (
        <Regular12 styles={{ color: (theme) => theme.palette.neutral60.main }}>
          No tienes preferencias registradas
        </Regular12>
      )}
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="w-full h-full overflow-y-auto "
      >
        {groupsOfOptions
          ?.slice(0, showAll?.get() ? groupsOfOptions?.length : 2)
          ?.map((group, index) => {
            return (
              <GroupOfOption
                key={group?.name || index}
                group={group}
                preferences={preferences}
                handleAddPreference={handleAddPreference}
                handleRemovePreference={handleRemovePreference}
              />
            );
          })}
      </motion.ul>
      {!showAll?.get() && (
        <Button variant="outlined" onClick={handleShowAll}>
          Ver todo
        </Button>
      )}
    </Box>
  );
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default Preferences;

import Box from "@mui/material/Box";
import Regular18 from "#/components/shared/fonts/Regular18";
import Regular14 from "#/components/shared/fonts/Regular14";
import Regular12 from "#/components/shared/fonts/Regular12";
import { Chip } from "@mui/material";
import PreferenceSkeleton from "#/components/domain/profile/skeletons/PreferenceSkeleton";
import ClientPreferenceService from "#/services/ClientPreferenceService";

function Preferences() {
  const { preferences, isLoading, isRefetching } = ClientPreferenceService();
  const getTitleOfCode = (code) => {
    switch (code) {
      case "OPT":
        return "Opciones";
      default:
        return "Sin definir";
    }
  };

  if (isLoading || isRefetching) return <PreferenceSkeleton />;
  return (
    <Box sx={style.container}>
      <Regular18>Mis preferencias</Regular18>
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
                {item?.value?.map((value) => value).join(", ")}
              </Regular14>
            </Box>

            <Chip label={item?.code?.charAt(0)} />
          </Box>
        ))}
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

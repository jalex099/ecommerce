import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16";
import Regular18 from "#/components/shared/fonts/Regular18";

function DetailsContainer({ details }) {
  if (!details) {
    return null;
  }
  return (
    <Box className="flex flex-col gap-6 my-6">
      <Regular18>Descripci&oacute;n</Regular18>

      <Regular16>{details}</Regular16>
    </Box>
  );
}

export default DetailsContainer;

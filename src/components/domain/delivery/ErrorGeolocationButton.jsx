import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";

const errorGeolocationButton = ({handleRetry}) => (
  <Box className={"flex flex-col h-full w-full justify-center items-center gap-4"}>
    <Regular14>
      No se pudo obtener tu ubicación
    </Regular14>
    <Button
      variant="outlined"
      color={"primary"}
      onClick={handleRetry}
    >
      Intentar de nuevo
    </Button>
  </Box>
)

export default errorGeolocationButton;
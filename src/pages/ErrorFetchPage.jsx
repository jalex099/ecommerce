import Box from "@mui/material/Box";
import SemiBold20 from "#/components/shared/fonts/SemiBold20";
import Regular16 from "#/components/shared/fonts/Regular16";
import { Button } from "@mui/material";
import ErrorNotFoundIcon from "#/components/shared/icons/ErrorNotFoundIcon";
import Container from "@mui/material/Container";

export default function ErrorFetchPage({ refetch }) {
  return (
    <Container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
      }}
      className="fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center"
    >
      <ErrorNotFoundIcon className="w-24" />
      <Box className="max-w-[400px] text-center">
        <SemiBold20>
          Ocurri&oacute; un error al cargar la p&aacute;gina
        </SemiBold20>
        <Regular16>
          Lo sentimos, no pudimos cargar la p&aacute;gina. Por favor, intente de
          nuevo.
        </Regular16>
      </Box>
      <Button variant="contained" color="primary" onClick={refetch}>
        Reintentar
      </Button>
    </Container>
  );
}

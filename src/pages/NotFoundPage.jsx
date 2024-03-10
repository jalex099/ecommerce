import { useNavigate } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import SemiBold18 from "#/components/shared/fonts/SemiBold18.jsx";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }


  return (
    <Container className={"flex-col gap-8 items-center justify-between h-full"} sx={{display: "flex"}}>
      <Box className={"flex-1 flex items-center justify-center flex-col gap-2"}>
        <SemiBold18>
          P&aacute;gina no encontrada
        </SemiBold18>
        <Regular16>
          La p&aacute;gina que buscas no existe
        </Regular16>
      </Box>
      <Button variant={"contained"} fullWidth onClick={handleClick}>Ir a inicio</Button>
    </Container>
  );
}

export default NotFoundPage;
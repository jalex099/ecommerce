import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import MarkChatUnreadOutlinedIcon
  from "@mui/icons-material/MarkChatUnreadOutlined.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PendingOrdersAdvise = () => {
  const navigate = useNavigate();

  const handleClickGoToOrders = () => {
    navigate("/perfil/ordenes-y-mensajes");
  }

  return (
    <Box sx={style.container} className={"px-6 py-4 rounded-2xl w-full flex flex-col gap-4 items-center"}>
      <Box className={"w-full flex flex-row gap-2 justify-between items-center"}>
        <MarkChatUnreadOutlinedIcon className={"flex-1"}/>
        <Box className={"text-end flex flex-col gap-0 w-3/4"}>
          <SemiBold16>
            Tienes pedidos en proceso
          </SemiBold16>
          <Regular12>
            Estamos trabajando para que tu compra sea un &eacute;xito
          </Regular12>
        </Box>
      </Box>
      <Button
        variant="contained"
        size={"small"}
        color="secondary"
        onClick={handleClickGoToOrders}
        >
        Ver pedidos
      </Button>
    </Box>
  );
}

const style = {
  container: {
    backgroundColor: theme => theme?.palette?.secondary10?.main
  },
};

export default PendingOrdersAdvise;
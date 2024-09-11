import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined.js";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import { Button } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ORDER_STEPS } from "#/config/constants.js";
import BoxIcon from "#/components/shared/icons/BoxIcon.jsx";

const NotFinishedOrdersAdvise = () => {
  const navigate = useNavigate();

  const handleClickGoToOrders = () => {
    navigate({
      pathname: "/perfil/ordenes-y-mensajes",
      search: `?${createSearchParams({
        "estado-orden": ["PENDING", "CONFIRMED", "INPROCESS", "ONTHEWAY"],
      })}`,
    });
  };

  return (
    <Box
      sx={style.container}
      className={
        "px-6 py-4 rounded-2xl w-full flex flex-col gap-4 items-center justify-center  lg:w-[400px] min-h-[200px]"
      }
    >
      <Box
        className={"w-full flex flex-row gap-2 justify-between items-center"}
      >
        <BoxIcon className={"w-8 h-8"} />
        <Box className={"text-end flex flex-col gap-0 w-3/4"}>
          <SemiBold16>Tienes pedidos en proceso</SemiBold16>
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
};

const style = {
  container: {
    backgroundColor: (theme) => theme?.palette?.secondary10?.main,
  },
};

export default NotFinishedOrdersAdvise;

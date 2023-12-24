import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Box from "@mui/material/Box";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import { useNavigate } from "react-router-dom";

function OrdersAndMessages() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/perfil/orders-and-messages");
  };

  return (
    <Box sx={style.container} onClick={handleClick}>
      <SemiBold14 className={"text-center"}>Mis ordenes y mensajes</SemiBold14>
      <MarkChatUnreadOutlinedIcon />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "24px 0",
  },
};
export default OrdersAndMessages;

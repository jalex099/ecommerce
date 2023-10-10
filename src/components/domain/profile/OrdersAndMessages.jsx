import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Box from "@mui/material/Box";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";

function OrdersAndMessages() {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <Box sx={style.container} onClick={handleClick}>
      <SemiBold14 className={"text-center"}>
        Mis &oacute;rdenes y mensajes
      </SemiBold14>
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
    padding: "0 24px",
    margin: "24px 0",
  },
};
export default OrdersAndMessages;

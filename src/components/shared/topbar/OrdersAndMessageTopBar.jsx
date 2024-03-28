
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import GoBackIcon from "#/components/shared/GoBackIcon.jsx";
import Box from "@mui/material/Box";
import CategoriesList from "#/components/domain/menu/CategoriesList.jsx";
import { useUIState } from "#/stores/UIState.js";
import { useEffect } from "react";

const elements = [
  {
    _id: 1,
    name: "Pedidos",
  },
  {
    _id: 2,
    name: "Mensajes",
  }
]
const OrdersAndMessageTopBar = ()=> {
  const ui = useUIState();

  useEffect(() => {
    ui?.setOrdAndMesTopBarSelection(elements?.[0]?._id);
  }, []);

  const handleChange = (event, newValue) => {
    ui?.setOrdAndMesTopBarSelection(newValue);
  }

  return (
    <Box className={"flex justify-center"}>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar className={"w-full lg:w-[1000px]"}>
          <IconButton
            aria-label="go-back"
            variant="contained"
            className="w-8 h-8"
          >
            <GoBackIcon />
          </IconButton>
          <Box className={"w-full flex justify-center"}>
            { ui?.ordAndMesTopBarSelection != null && (<CategoriesList items={elements} selected={ui?.ordAndMesTopBarSelection}  handleChange={handleChange}/> )}
          </Box>
          <Box/>
        </Toolbar>
      </Fade>
    </Box>
  )
}

export default OrdersAndMessageTopBar;
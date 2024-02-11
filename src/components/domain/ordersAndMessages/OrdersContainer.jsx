import OrderService from "#/services/OrderService.js";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import OrderCard from "#/components/domain/ordersAndMessages/OrderCard.jsx";
import { motion } from "framer-motion";

const OrdersContainer = () => {
  const { pendingOrders } = OrderService();
  const searchOrdersRef = useRef();

  return (
    <Box className={"flex-grow flex flex-col gap-4 w-full"}>
      {/*<Regular16>*/}
      {/*  Encuentra aquí todos los pedidos que has realizado.*/}
      {/*</Regular16>*/}
      <TextField
        label="Buscar..."
        name="search-orders"
        variant="standard"
        autoComplete="search-orders"
        sx={{ width: "100%" }}
        inputRef={searchOrdersRef}
      />
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full "
      >
        {
          pendingOrders?.map((order, index) => (
            <OrderCard key={index + order?._id} order={order}
                       isLastItem={index === pendingOrders?.length - 1}/>
          ))
        }
      </motion.ul>
    </Box>
)
}

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};


export default OrdersContainer;
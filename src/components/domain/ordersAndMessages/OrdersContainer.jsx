import OrderService from "#/services/OrderService.js";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import OrderCard from "#/components/domain/ordersAndMessages/OrderCard.jsx";
import { motion } from "framer-motion";
import { useHookstate } from "@hookstate/core";
import * as _ from "lodash";

const OrdersContainer = () => {
  const { pendingOrders } = OrderService();
  const searchOrdersRef = useRef();
  const ordersFiltered = useHookstate(null);

  const handleSearch = _.debounce(() => {
    const search = searchOrdersRef.current.value;
    if (search.length < 3) {
      ordersFiltered?.set(null);
      return;
    }
    //* Filtra por código, estado, fecha y nombre de producto en el pedido
    ordersFiltered?.set(
      pendingOrders?.filter((a) =>
        ['code', 'status', 'date'].some((prop) => _.includes(_.toLower(a[prop]), _.toLower(search))) ||
        (a.menu && a.menu.some(product => _.includes(_.toLower((product?.product?.name || '').replace(/\s/g, '')), _.toLower(search.replace(/\s/g, '')))))      )
    );
  }, 500);

  return (
    <Box className={"flex-grow flex flex-col gap-4 w-full"}>
      {/*<Regular16>*/}
      {/*  Encuentra aquí todos los pedidos que has realizado.*/}
      {/*</Regular16>*/}
      <TextField
        // label="Buscar pedidos"
        placeholder={"Buscar pedidos"}
        name="search-orders"
        variant={"filled"}
        autoComplete="search-orders"
        sx={{ width: "100%" }}
        inputRef={searchOrdersRef}
        onKeyUp={handleSearch}
      />
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full "
      >
        {
          ordersFiltered?.value !== null ? (
            ordersFiltered?.value?.length > 0 ? (
              ordersFiltered?.value?.map((order, index) => (
                <OrderCard key={index + order?._id} order={order}
                           isLastItem={index === ordersFiltered?.value?.length - 1}/>
              ))
            ) :
              <Box className={"w-full text-center min-h-[100px] flex items-center"}>
                <Regular16>
                  No se encontraron resultados para la b&uacute;squeda
                </Regular16>
              </Box>
          ) : (
            pendingOrders?.map((order, index) => (
              <OrderCard key={index + order?._id} order={order}
                         isLastItem={index === pendingOrders?.length - 1}/>
            ))
          )
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
import OrderService from "#/services/OrderService.js";
import Box from "@mui/material/Box";
import Regular16 from "#/components/shared/fonts/Regular16.jsx";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useRef } from "react";
import OrderCard from "#/components/domain/ordersAndMessages/OrderCard.jsx";
import { motion } from "framer-motion";
import { useHookstate } from "@hookstate/core";
import * as _ from "lodash";
import OrdersFilters
  from "#/components/domain/ordersAndMessages/OrdersFilters.jsx";
import DialogOrdersFilter
  from "#/components/domain/ordersAndMessages/DialogOrdersFilter.jsx";
import { ORDER_STEPS, PAYMENT_METHODS } from "#/config/constants.js";
import serializeState from "#/utils/serializeState.js";
import { useParams } from "react-router-dom";

const OrdersContainer = () => {
  const { allOrders } = OrderService();
  const searchOrdersRef = useRef();
  const ordersFiltered = useHookstate(null);
  const filters = useHookstate(null);
  const params = useParams()

  const pendingOrders = useMemo(()=>{
    return allOrders?.filter(order => order?.status === "PENDING") || []
  }, [allOrders?.length])

  const handleSearch = _.debounce(() => {
    findByFiltersAndSearch();
  }, 500);

  const findByFiltersOnly = () => {
    ordersFiltered?.set( pendingOrders?.filter((item) => filters?.value?.status?.includes(item?.status) && filters?.value?.paymentMethod?.includes(item?.paymentMethod)) );
  }

  const findByFiltersAndSearch = () => {
    const search = searchOrdersRef?.current?.value;
    if (search.length < 3) {
      findByFiltersOnly();
      return;
    }
    ordersFiltered?.set(
      pendingOrders
        ?.filter((a) => {
          return ['code', 'date'].some((prop) => _.includes(_.toLower(a[prop]), _.toLower(search))) ||
            (a.menu && a.menu.some(product => _.includes(_.toLower((product?.product?.name || '').replace(/\s/g, '')), _.toLower(search.replace(/\s/g, ''))))
            )
        })
        ?.filter((item) => filters?.value?.status?.includes(item?.status) && filters?.value?.paymentMethod?.includes(item?.paymentMethod))
    );
  }

  const handleSetFilters = (data) => {
    filters?.set(data);
    // Clean search input
    if (searchOrdersRef.current && searchOrdersRef.current.value) {
      findByFiltersAndSearch();
      return;
    }
    findByFiltersOnly();
  }

  //* Use effect para inicializar el filtro
  useEffect(() => {
    let initialFilters = {
      status: params?.estado ? [params?.estado] : ORDER_STEPS?.map(step => step?.value),
      paymentMethod: params?.metodoPago ? [params?.metodoPago] : PAYMENT_METHODS?.map(method => method?.code),
    }
    filters?.set(initialFilters);
  }, []);

  useEffect(()=>{
    if(!filters?.value) return;
    if (searchOrdersRef.current && searchOrdersRef.current.value) {
      findByFiltersAndSearch();
      return;
    }
    findByFiltersOnly();
  }, [pendingOrders?.length])


  return (
    <Box className={"flex-grow flex flex-col gap-4 w-full"}>
      {/*<Regular16>*/}
      {/*  Encuentra aquí todos los pedidos que has realizado.*/}
      {/*</Regular16>*/}

      <Box className={"flex flex-row gap-4 justify-between items-center"}>
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
        <OrdersFilters filters={filters?.value} setFilters={handleSetFilters} handleSearch={handleSearch}
                       searchRef={searchOrdersRef}
        />
      </Box>
      <motion.ul
        variants={list}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 w-full "
      >
        {
          ordersFiltered?.value !== null && ordersFiltered?.value?.length > 0 &&
              ordersFiltered?.value?.map((order, index) => (
                <OrderCard key={index + order?._id} order={order}
                           isLastItem={index === ordersFiltered?.value?.length - 1}/>
              )
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
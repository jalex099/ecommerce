import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import DataService from "#/services/DataService";
import ImageService from "#/services/ImageService";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useUIState } from "#/stores/UIState";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import Picture from "#/components/shared/Picture";
import Bold16 from "#/components/shared/fonts/Bold16";
import { formatCurrency } from "#/utils/currency";
import ProductConfigContainer from "#/components/domain/product/ProductConfigContainer";
import AddToCartButton from "#/components/domain/product/AddToCartButton";
import ExtrasContainer from "#/components/domain/product/ExtrasContainer";
import DetailsContainer from "#/components/domain/product/DetailsContainer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ProductController from "#/components/domain/product/controllers/ProductController";
import Regular12 from "#/components/shared/fonts/Regular12";
// import { motion, AnimatePresence } from "framer-motion";
import FavoriteToogleContainer from "#/components/domain/product/FavoriteToogleContainer";
import DiscountChipContainer from "#/components/domain/product/DiscountChipContainer";
import { useMediaQuery } from "@mui/material";
import SemiBold24 from "#/components/shared/fonts/SemiBold24.jsx";
import Bold20 from "#/components/shared/fonts/Bold20.jsx";
import ProductCounter from "#/components/domain/product/ProductCounter.jsx";

const ProductPage = () => {
  const { isLoading } = DataService();
  const { findImage } = ImageService();
  const { id } = useParams();
  const ui = useUIState();
  const { initTemp, clearTemp, temporal, getOptionsSubtotal, handleAddToCart, handleDecrement, handleIncrement } =
    ProductController();
  const isLg = useMediaQuery(theme => theme.breakpoints.up('lg'));

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  useEffect(() => {
    clearTemp();
    // If is loading the data from the API, then we don't need to do anything
    if (isLoading) return;
    initTemp(id);
    // We clear the temporal state when the component is unmounted
    return () => {
      clearTemp();
    };
  }, [isLoading]);

  const optionsSubtotal = useMemo(() => {
    return getOptionsSubtotal();
  }, [temporal]);

  if (isLoading || !temporal) {
    return <></>;
  }
  return (
    <Container sx={style.container}>
      <HelmetMeta page="product" product={temporal} />
      <Box className={"flex flex-col gap-6 lg:flex-row lg:gap-6"}>
        <Picture
          webp={findImage(temporal?._id, "PRD", "webp")}
          jpg={findImage(temporal?._id, "PRD", "jpg")}
          alt={temporal?.name}
          style={{ width: !isLg ? "100%" : "400px", height: !isLg ? "auto" : "400px"}}
          imgStyle={{
            width: "100%",
            aspectRatio: "1/1",
            borderRadius: "16px",
          }}
        />
        <ProductDetails temporal={temporal} optionsSubtotal={optionsSubtotal} handleAddToCart={handleAddToCart} isLg={isLg}
          handleDecrement={handleDecrement} handleIncrement={handleIncrement}
        />
      </Box>

    </Container>
  );
};

const ProductDetails = ({ temporal, optionsSubtotal, handleAddToCart, isLg, handleDecrement, handleIncrement }) => {
  return (
    <Box className={"flex-1 flex flex-col gap-[24px]"}>
      <Box className="flex flex-col gap-1 relative">
        {
          !isLg ? (
            <>
              <SemiBold18> {temporal?.name}</SemiBold18>
              <Bold16>
                {formatCurrency(temporal?.price + optionsSubtotal)}
                {optionsSubtotal > 0 && <span>*</span>}
              </Bold16>
            </>
          ) : (
            <>
              <SemiBold24> {temporal?.name}</SemiBold24>
              <Bold20>
                {formatCurrency(temporal?.price + optionsSubtotal)}
                {optionsSubtotal > 0 && <span>*</span>}
              </Bold20>
            </>
          )
        }

        {temporal?.isOffer && !!temporal?.discount && (
          <DiscountChipContainer
            price={temporal?.price}
            amount={temporal?.discount}
          />
        )}
        {/* <AnimatePresence>
            {getOptionsSubtotal() > 0 && (
              <motion.div
                key="extraAmount"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
              >
                <Regular14>{formatCurrency(getOptionsSubtotal())}</Regular14>
              </motion.div>
            )}
          </AnimatePresence> */}
        <FavoriteToogleContainer />
      </Box>
      <ProductConfigContainer options={temporal?.options} />

      <Box className={"flex flex-row gap-3 items-center justify-center h-[70px]"}>
        <ProductCounter quantity={temporal?.quantity} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
        <AddToCartButton onClick={handleAddToCart} total={formatCurrency((temporal?.price + optionsSubtotal) * temporal?.quantity)}/>
      </Box>
      {optionsSubtotal > 0 && (
        <Regular12 className="w-full opacity-70">
          * Los precios pueden variar seg&uacute;n tu selecci&oacute;n de
          opciones
        </Regular12>
      )}
      <Box>
        <Divider />
        <DetailsContainer details={temporal?.description} />

        <Divider />
        <ExtrasContainer tags={temporal?.tags} />
      </Box>
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
  },
};



export default ProductPage;

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

const ProductPage = () => {
  const { isLoading } = DataService();
  const { findImage } = ImageService();
  const { id } = useParams();
  const ui = useUIState();
  const { initTemp, clearTemp, temporal, getOptionsSubtotal, handleAddToCart } =
    ProductController();

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
      <Picture
        webp={findImage(temporal?._id, "PRD", "webp")}
        jpg={findImage(temporal?._id, "PRD", "jpg")}
        alt={temporal?.name}
        imgStyle={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: "16px",
        }}
      />
      <Box className="flex flex-col gap-1 relative">
        <SemiBold18> {temporal?.name}</SemiBold18>
        <Bold16>
          {formatCurrency(temporal?.price + optionsSubtotal)}
          {optionsSubtotal > 0 && <span>*</span>}
        </Bold16>
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

      <AddToCartButton onClick={handleAddToCart} />
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
    </Container>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
  },
};

export default ProductPage;

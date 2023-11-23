import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DataService from "#/services/DataService";
import ImageService from "#/services/ImageService";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useUIState } from "#/stores/UIState";
import SemiBold20 from "#/components/shared/fonts/SemiBold20";
import Picture from "#/components/shared/Picture";
import Bold18 from "#/components/shared/fonts/Bold18";
import { formatCurrency } from "#/utils/currency";
import ProductConfigContainer from "#/components/domain/product/ProductConfigContainer";
import AddToCartButton from "#/components/domain/product/AddToCartButton";
import ExtrasContainer from "#/components/domain/product/ExtrasContainer";
import DetailsContainer from "#/components/domain/product/DetailsContainer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ProductController from "#/components/domain/product/controllers/ProductController";
import Regular12 from "#/components/shared/fonts/Regular12";
import { motion, AnimatePresence } from "framer-motion";

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
      <SemiBold20> {temporal?.name}</SemiBold20>
      <Box className="flex flex-row justify-between gap-0 ">
        <Bold18>{formatCurrency(temporal?.price)}</Bold18>
        <AnimatePresence>
          {getOptionsSubtotal() > 0 && (
            <motion.div
              key="extraAmount"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <Regular12>
                Monto extra: {formatCurrency(getOptionsSubtotal())}
              </Regular12>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      <ProductConfigContainer options={temporal?.options} />
      <Box>
        <Divider />
        <DetailsContainer details={temporal?.description} />

        <Divider />
        <ExtrasContainer tags={temporal?.tags} />
      </Box>
      <AddToCartButton onClick={handleAddToCart} />
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

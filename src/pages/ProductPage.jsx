import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DataService from "#/services/DataService";
import ImageService from "#/services/ImageService";
import RedirectionService from "#/services/RedirectionService";
import { useTemporalProduct } from "#/stores/temporalProduct";
import { useNavigate } from "react-router-dom";
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
import { useCartState } from "#/stores/cart";

const ProductPage = () => {
  const { findProductByUrlNameOrId } = RedirectionService();
  const { isLoading } = DataService();
  const { findImage } = ImageService();
  // const { saveCart } = CartService();
  const { add, addToLocalStorage } = useCartState();
  const { temp, clear, fill } = useTemporalProduct();
  const { id } = useParams();
  const navigate = useNavigate();
  const ui = useUIState();
  const { getOptionsSubtotal, processedDataToSaveOnCart } = ProductController();

  useEffect(() => {
    ui?.setTitle("");
  }, []);

  useEffect(() => {
    clear();
    // If is loading the data from the API, then we don't need to do anything
    if (isLoading) return;
    // If the product is not in the menu, then we redirect to the home page
    const productFromMenu = findProductByUrlNameOrId(id);
    if (!productFromMenu) {
      navigate("/");
    }
    // If the product is in the menu, then we fill the temporal state
    fill(productFromMenu);

    // We clear the temporal state when the component is unmounted
    return () => {
      clear();
    };
  }, [isLoading]);

  const handleClickAddToCart = () => {
    add(processedDataToSaveOnCart());
    addToLocalStorage();
    navigate(-1, { replace: true });
  };

  if (isLoading || !temp) {
    return <></>;
  }
  return (
    <Container sx={style.container}>
      <HelmetMeta page="product" product={temp} />
      <Picture
        webp={findImage(temp?._id, "PRD", "webp")}
        jpg={findImage(temp?._id, "PRD", "jpg")}
        alt={temp?.name}
        imgStyle={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: "16px",
        }}
      />
      <SemiBold20> {temp?.name}</SemiBold20>
      <Box className="flex flex-col gap-0 ">
        <Bold18>{formatCurrency(temp?.price)}</Bold18>
        {getOptionsSubtotal() > 0 && (
          <Regular12>
            Monto extra por opciones: {formatCurrency(getOptionsSubtotal())}
          </Regular12>
        )}
      </Box>
      <ProductConfigContainer options={temp?.options} />
      <Box>
        <Divider />
        <DetailsContainer details={temp?.description} />

        <Divider />
        <ExtrasContainer tags={temp?.tags} />
      </Box>
      <AddToCartButton onClick={handleClickAddToCart} />
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

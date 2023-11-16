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
import TextShowMore from "#/components/shared/TextShowMore";
import AddToCartButton from "#/components/domain/product/AddToCartButton";
import CartService from "#/services/CartService";

const ProductPage = () => {
  const { findProductByUrlNameOrId } = RedirectionService();
  const { isLoading } = DataService();
  const { findImage } = ImageService();
  const { saveCart } = CartService();
  const { temp, clear, fill, preparedDataToServer } = useTemporalProduct();
  const { id } = useParams();
  const navigate = useNavigate();
  const ui = useUIState();

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
    // console.log(preparedDataToServer());
    saveCart.mutate(preparedDataToServer());
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
      <Bold18>{formatCurrency(temp?.price)}</Bold18>

      {temp?.description && (
        <TextShowMore text={temp?.description} maxChars={100} />
      )}
      <ProductConfigContainer options={temp?.options} />

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

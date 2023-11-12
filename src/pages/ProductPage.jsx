import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DataService from "#/services/DataService";
import ImageService from "#/services/ImageService";
import RedirectionService from "#/services/RedirectionService";
import { useTemporalProductState } from "#/hooks/TemporalProductState";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import HelmetMeta from "#/components/shared/HelmetMeta";
import { useUIState } from "#/hooks/UIState";
import SemiBold20 from "#/components/shared/fonts/SemiBold20";
import Picture from "#/components/shared/Picture";
import Bold18 from "#/components/shared/fonts/Bold18";
import { formatCurrency } from "#/utils/currency";
import Regular16 from "#/components/shared/fonts/Regular16";
import Box from "@mui/material/Box";
import ProductConfigContainer from "#/components/domain/product/ProductConfigContainer";

const ProductPage = () => {
  const { findProductByUrlNameOrId } = RedirectionService();
  const { isLoading } = DataService();
  const { findImage } = ImageService();
  const { temp, clear, fill } = useTemporalProductState();
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
        }}
      />
      <Box className="px-4">
        <SemiBold20>{temp?.name}</SemiBold20>
        <Bold18>{formatCurrency(temp?.price)}</Bold18>
      </Box>
      {temp?.description && (
        <Regular16 className="opacity-75 px-4">{temp?.description}</Regular16>
      )}
      <ProductConfigContainer options={temp?.options} />
    </Container>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    p: 0,
  },
};

export default ProductPage;

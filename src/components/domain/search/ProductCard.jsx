import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import RedirectionService from "#/services/RedirectionService.js";
import { startLoading, stopLoading } from "#/stores/UIState.js";

const ProductCard = ({ id, name, description, handleClose }) => {
  const { redirectToProduct } =
    RedirectionService();

  const handleClick = () => {
    startLoading();
    handleClose();

    setTimeout(() => {
      redirectToProduct(id);
      stopLoading();
    }
    , 300);
  }

  return(
    <Box
      className={"flex flex-col items-center h-[140px] justify-center p-2 rounded-lg bg-white shadow-md"}
      sx={{
        backgroundImage: `url(https://picsum.photos/200/300?random=${id})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
      onClick={handleClick}
    >
      <SemiBold16 className={"cursor-pointer"}>
        {name}
      </SemiBold16>
      <Regular12 className={"overflow-hidden overflow-ellipsis whitespace-normal line-clamp-2 cursor-pointer"}>
        {description}
      </Regular12>
    </Box>
  )
}

export default ProductCard;
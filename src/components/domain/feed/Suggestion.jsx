import Box from "@mui/material/Box";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import ImageService from "#/services/ImageService.js";
import Regular14 from "#/components/shared/fonts/Regular14";
import TextEllipsis from "#/components/shared/TextEllipsis";
import RedirectionService from "#/services/RedirectionService.js";
import {formatCurrency} from "#/utils/currency";

const Suggestion = ({ suggestion }) => {
  const { findImage } = ImageService();
  const { redirectToProduct } = RedirectionService();

  const handleClick = () => {
    redirectToProduct(suggestion?._id);
  };

  return (
    <Box
      className="w-full aspect-square relative flex flex-col gap-2 items-center justify-center rounded-md overflow-hidden"
      style={{
        backgroundImage: `url(${findImage(suggestion?._id, "PRD", "jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <Box
        className=" max-h-1/2 w-full p-2 text-center"
        sx={{
          bgcolor: (theme) => theme.palette.neutral0.main,
        }}
      >
        <SemiBold14>{suggestion?.name || ""}</SemiBold14>
        {/* <TextEllipsis text={suggestion?.description || ""} /> */}
        <Regular14>{formatCurrency(suggestion?.price)}</Regular14>
      </Box>
    </Box>
  );
};

export default Suggestion;

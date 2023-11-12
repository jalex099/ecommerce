import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import { formatCurrency } from "#/utils/currency";
import Picture from "#/components/shared/Picture";
import ImageService from "#/services/ImageService";
import TouchRippleEffect from "#/components/shared/TouchRippleEffect";

function OptionCard({ option }) {
  const { findImage } = ImageService();
  return (
    <Box className="min-w-[120px] max-w-[200px] h-[200px] ">
      <TouchRippleEffect className="flex flex-col items-start justify-start p-3 shadow-md rounded-md gap-2 relative h-full w-full">
        <Picture
          webp={findImage(option?.option?._id, "PRD", "webp")}
          jpg={findImage(option?.option?._id, "PRD", "jpg")}
          alt={option?.option?.name}
          imgStyle={{
            borderRadius: "16px",
            width: "100%",
            aspectRatio: "1/1",
          }}
        />
        <Regular14>{option?.option?.name}</Regular14>
        {option?.adicionalPrice > 0 && (
          <SemiBold14>{formatCurrency(option?.aditionalPrice)}</SemiBold14>
        )}
      </TouchRippleEffect>
    </Box>
  );
}

export default OptionCard;
